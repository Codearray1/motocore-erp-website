// Prints one ADMIN_USERS entry for the website admin (/admin). Usage:
//   node scripts/admin-user.mjs someone@example.com
// It asks for the password without echoing it. Join several entries with commas in the ADMIN_USERS
// environment variable on Vercel. The password itself is never stored, only a salted scrypt hash.
import { randomBytes, scryptSync } from 'node:crypto';
import { createInterface } from 'node:readline';

const email = (process.argv[2] || '').trim().toLowerCase();
if (!/^[^\s@:,]+@[^\s@:,]+$/.test(email)) {
  console.error('Usage: node scripts/admin-user.mjs <email>');
  process.exit(1);
}
const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
rl._writeToOutput = (s) => { if (!rl.muted) rl.output.write(s); };
rl.question('Password (min 12 characters): ', (pw) => {
  rl.close();
  process.stdout.write('\n');
  if (pw.length < 12) { console.error('Password must be at least 12 characters.'); process.exit(1); }
  const salt = randomBytes(16).toString('base64url');
  const hash = scryptSync(pw, salt, 64).toString('base64url');
  console.log(`${email}:${salt}:${hash}`);
});
rl.muted = true;
