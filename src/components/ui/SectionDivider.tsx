interface SectionDividerProps {
  variant?: "wave" | "diagonal" | "curve";
  flip?: boolean;
  className?: string;
  fillClassName?: string;
}

export function SectionDivider({
  variant = "wave",
  flip = false,
  className = "",
  fillClassName = "text-surface-secondary",
}: SectionDividerProps) {
  const paths = {
    wave: "M0,64 C320,120 640,0 960,64 C1280,128 1440,32 1440,32 L1440,128 L0,128 Z",
    diagonal: "M0,0 L1440,96 L1440,128 L0,128 Z",
    curve: "M0,96 Q720,0 1440,96 L1440,128 L0,128 Z",
  };

  return (
    <div
      className={`w-full overflow-hidden leading-none ${className}`}
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
    >
      <svg
        className={`w-full h-12 md:h-20 ${fillClassName}`}
        viewBox="0 0 1440 128"
        preserveAspectRatio="none"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={paths[variant]} />
      </svg>
    </div>
  );
}
