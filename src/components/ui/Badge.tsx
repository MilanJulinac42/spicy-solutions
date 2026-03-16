interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-spicy-400/10 text-spicy-400 border border-spicy-400/20 ${className}`}
    >
      {children}
    </span>
  );
}
