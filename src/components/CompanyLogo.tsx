import React from 'react';

interface CompanyLogoProps {
  className?: string;
  size?: number;
}

export default function CompanyLogo({ className = "w-8 h-8 text-[#FF6B00]", size }: CompanyLogoProps) {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      style={style}
      fill="currentColor"
      aria-hidden="true"
    >
      {/* Base horizontal floor line at the bottom */}
      <rect x="10" y="88" width="80" height="2.5" rx="0.5" />
      
      {/* Left-side curved base slope */}
      <path d="M 12 88 C 24 88, 33 86, 38 78 L 38 88 Z" />
      
      {/* Rising columns at the bottom that meet the diagonal split */}
      <rect x="42" y="72" width="5.5" height="16" rx="0.5" />
      <rect x="57" y="54" width="5.5" height="34" rx="0.5" />
      <rect x="72" y="36" width="5.5" height="52" rx="0.5" />
      
      {/* Rightmost taller master pillar column */}
      <rect x="83" y="24" width="5.5" height="64" rx="0.5" />
      
      {/* Diagonal split / cut path (draw the primary skyscraper block above the cut) */}
      <path d="M 49 68 L 49 15 L 73 5 L 73 35 Z" />
      
      {/* Right facade panel of the skyscraper block to add depth projection matching image */}
      <path d="M 74 11 L 83 14 L 83 31 L 74 23 Z" />
      
      {/* Three sloped custom negative-space window stripes with exact isometric alignment */}
      <path d="M 54 26 L 68 20 L 68 23.5 L 54 29.5 Z" fill="#060709" />
      <path d="M 54 34 L 68 28 L 68 31.5 L 54 37.5 Z" fill="#060709" />
      <path d="M 54 42 L 68 36 L 68 39.5 L 54 45.5 Z" fill="#060709" />
    </svg>
  );
}
