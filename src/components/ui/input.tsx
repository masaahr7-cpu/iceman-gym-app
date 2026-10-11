import * as React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-xl border border-[#D4AF37]/20 bg-[#101010] px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-[#D4AF37]/60 ${className}`}
      {...props}
    />
  );
}
