import React from "react";

interface LogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export default function Logo({ className = "h-11 w-auto", showSubtitle = true }: LogoProps) {
  return (
    <svg
      viewBox="0 0 540 240"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      {/* Icon Group (M + C with Speedometer) */}
      <g transform="translate(100, 15) scale(1.05)">
        <g transform="skewX(-14)">
          <defs>
            <linearGradient id="logo-m-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
          </defs>
          
          {/* M Shape - Sporty Racing Red */}
          <path
            d="M 30,110 L 68,15 L 100,15 L 132,75 L 164,15 L 196,15 L 158,110 L 134,110 L 115,75 L 96,110 Z"
            fill="url(#logo-m-gradient)"
          />
          
          {/* C Shape - Dark Charcoal / Modern Light Grey */}
          <path
            d="M 235,15 L 305,15 L 282,42 L 252,42 C 242,42 234,48 231,62 C 228,76 233,83 245,83 L 295,83 L 285,110 L 235,110 C 202,110 188,92 188,62 C 188,32 206,15 235,15 Z"
            className="fill-gray-800 dark:fill-gray-100"
            fill="currentColor"
          />
          
          {/* Speedometer Details inside C */}
          <path
            d="M 235,62 A 20,20 0 0,1 275,62"
            fill="none"
            stroke="#EF4444"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeDasharray="4,2.5"
          />
          {/* Center Hub */}
          <circle cx="255" cy="62" r="5" fill="#EF4444" />
          {/* Dial Needle pointing up-right */}
          <line
            x1="255"
            y1="62"
            x2="271"
            y2="46"
            stroke="#EF4444"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* Brand Text Section */}
      <g transform="skewX(-14)">
        <text
          x="270"
          y="160"
          textAnchor="middle"
          fontSize="52"
          fontWeight="900"
          fontStyle="italic"
          fontFamily="'Space Grotesk', 'Plus Jakarta Sans', system-ui, sans-serif"
          letterSpacing="1px"
        >
          <tspan className="fill-gray-900 dark:fill-white" fill="currentColor">MOTO</tspan>
          <tspan className="fill-[#EF4444]" fill="#EF4444">CORE</tspan>
        </text>

        {/* E R P Subline with Horizontal Boundary Lines */}
        <text
          x="270"
          y="198"
          textAnchor="middle"
          fontSize="23"
          fontWeight="800"
          fontStyle="italic"
          fontFamily="'Space Grotesk', 'Plus Jakarta Sans', system-ui, sans-serif"
          letterSpacing="11px"
          className="fill-gray-800 dark:fill-gray-200"
          fill="currentColor"
        >
          ERP
        </text>
      </g>

      {/* Thin elegant horizontal red divider lines flanking ERP */}
      <line
        x1="105"
        y1="190"
        x2="215"
        y2="190"
        stroke="#EF4444"
        strokeWidth="2.5"
      />
      <line
        x1="325"
        y1="190"
        x2="435"
        y2="190"
        stroke="#EF4444"
        strokeWidth="2.5"
      />

      {/* Tagline / Subtitle */}
      {showSubtitle && (
        <text
          x="270"
          y="228"
          textAnchor="middle"
          fontSize="11.5"
          fontWeight="600"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          letterSpacing="4.8px"
          className="fill-gray-500 dark:fill-gray-400 font-medium"
          fill="currentColor"
        >
          DRIVING AUTOMOTIVE OPERATIONS FORWARD
        </text>
      )}
    </svg>
  );
}
