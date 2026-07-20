export function Logo({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="0.75"
        y="0.75"
        width="38.5"
        height="38.5"
        rx="11"
        stroke="url(#lg-stroke)"
        strokeWidth="1.5"
        className="stroke-white/15"
      />
      <path
        d="M13 11v18M27 11v18M13 20h14"
        stroke="url(#lg-grad)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="27" cy="11" r="2.4" fill="#f88613" />
      <defs>
        <linearGradient id="lg-grad" x1="11" y1="11" x2="29" y2="29" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3bc994" />
          <stop offset="1" stopColor="#14b07b" />
        </linearGradient>
        <linearGradient id="lg-stroke" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.18" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.04" />
        </linearGradient>
      </defs>
    </svg>
  );
}