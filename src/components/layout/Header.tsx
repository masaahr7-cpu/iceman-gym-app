import { Link, useLocation } from 'react-router-dom';

type HeaderProps = {
  lang: 'sw' | 'en';
  setLang: (v: 'sw' | 'en') => void;
};

export default function Header({ lang, setLang }: HeaderProps) {
  const location = useLocation();
  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Storefront', to: '/' },
    { label: 'Auth', to: '/auth' },
    { label: 'POS', to: '/pos' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[#D4AF37]/10 bg-[#0b0b0b]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-lg font-black text-[#F6D77D]">
            I
          </div>
          <div>
            <div className="text-xl font-black tracking-[0.18em] text-white">ICEMAN</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">Gym Performance</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to + item.label}
              to={item.to}
              className={`text-sm font-medium transition ${location.pathname === item.to ? 'text-[#F6D77D]' : 'text-zinc-300 hover:text-white'}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === 'sw' ? 'en' : 'sw')}
            className="rounded-full border border-[#D4AF37]/25 bg-[#111] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#F6D77D]"
          >
            {lang === 'sw' ? 'EN' : 'SW'}
          </button>
        </div>
      </div>
    </header>
  );
}
