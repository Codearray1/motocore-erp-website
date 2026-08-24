// import { ComponentType } from "react";
// import { motion } from "motion/react";
// import { CarFront, History, Wrench, Activity, Boxes, Building2 } from "lucide-react";

// const iconsMap: Record<string, ComponentType<{ className?: string }>> = {
//   CarFront,
//   History,
//   Wrench,
//   Activity,
//   Boxes,
//   Building2,
// };

// const SECTORS = [
//   { label: "New Vehicle Dealerships", icon: "CarFront" },
//   { label: "Used Vehicle Dealerships", icon: "History" },
//   { label: "Workshops", icon: "Wrench" },
//   { label: "Service Centers", icon: "Activity" },
//   { label: "Parts Distributors", icon: "Boxes" },
//   { label: "Automotive Enterprises", icon: "Building2" },
// ];

// export default function TrustedBy() {
//   return (
//     <section className="py-14 border-y border-[var(--border)] bg-[var(--bg-secondary)] transition-colors duration-300">
//       <div className="max-w-7xl mx-auto px-6">
//         <p className="text-xs font-semibold font-display tracking-widest text-center text-[var(--text)] opacity-60 uppercase mb-8">
//           Trusted by Automotive Leaders
//         </p>

//         <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-8">
//           {SECTORS.map((sector, idx) => {
//             const IconComponent = iconsMap[sector.icon] || CarFront;

//             return (
//               <motion.div
//                 key={sector.label}
//                 initial={{ opacity: 0, y: 10 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, margin: "-50px" }}
//                 transition={{ duration: 0.5, delay: idx * 0.08 }}
//                 className="flex items-center gap-3 bg-[var(--card)] border border-[var(--border)] px-5 py-3.5 rounded-2xl hover:scale-102 hover:shadow-md hover:border-brand-red/30 transition-all duration-300 group cursor-pointer"
//               >
//                 <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--bg-secondary)] text-[var(--text)] group-hover:text-brand-red transition-colors duration-300">
//                   <IconComponent className="h-5 w-5" />
//                 </div>

//                 <span className="text-sm font-bold tracking-tight text-[var(--text)] group-hover:text-brand-red transition-colors whitespace-nowrap">
//                   {sector.label}
//                 </span>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }