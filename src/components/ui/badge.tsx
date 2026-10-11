import * as React from 'react';

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ className = '', children, ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs font-medium text-[#F6D77D] ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
