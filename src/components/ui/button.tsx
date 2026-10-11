import * as React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
};

export function Button({
  className = '',
  variant = 'primary',
  size = 'md',
  children,
  ...props
}: ButtonProps) {
  const sizeClass = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-5 py-3.5 text-base',
  }[size];

  const variantClass =
    variant === 'secondary'
      ? 'border border-[#D4AF37]/25 bg-[#161616] text-white hover:border-[#D4AF37]/50 hover:bg-[#1B1B1B]'
      : 'bg-[#D4AF37] text-[#111] hover:bg-[#E4C767]';

  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl font-semibold transition focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/60 ${sizeClass} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
