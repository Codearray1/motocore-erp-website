import React from "react";
import logo from "../assets/motocore-logo.png";

interface LogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export default function Logo({
  className = "h-14 w-auto",
}: LogoProps) {
  return (
    <img
      src={logo}
      alt="MotoCore ERP"
      className={className}
    />
  );
}