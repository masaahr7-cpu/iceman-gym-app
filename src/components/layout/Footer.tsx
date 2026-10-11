import { Link } from 'react-router-dom';

export default function Footer({ lang }: { lang: 'sw' | 'en' }) {
  return (
    <footer className="border-t border-[#D4AF37]/10 bg-[#0B0B0B]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-zinc-400 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <div className="text-lg font-black tracking-[0.18em] text-white">ICEMAN</div>
          <div className="mt-1">Premium gym apparel & performance nutrition</div>
        </div>

        <div className="flex items-center gap-5">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/auth" className="hover:text-white">Auth</Link>
          <Link to="/pos" className="hover:text-white">POS</Link>
        </div>

        <div className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">
          {lang === 'sw' ? 'Kiswahili' : 'English'}
        </div>
      </div>
    </footer>
  );
}
