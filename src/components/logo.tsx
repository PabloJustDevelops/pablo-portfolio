export function Logo({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 80V20H45C55 20 65 25 65 40C65 55 55 60 45 60H20"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinejoin="round"
      />
      <path
        d="M50 60L75 80M50 20H75C85 20 95 25 95 40C95 55 85 60 75 60H50"
        stroke="currentColor"
        strokeWidth="12"
        strokeLinejoin="round"
      />
    </svg>
  );
}
