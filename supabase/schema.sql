import { t } from '../../lib/i18n';

export default function Footer({ lang }: { lang: 'sw' | 'en' }) {
  return (
    <footer className="border-t border-[#D4AF37]/10 bg-[#0B0B0B]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-zinc-400 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <div className="font-black uppercase tracking-[0.25em] text-white">ICEMAN</div>
          <p className="mt-1">{t[lang].premiumPerformance}</p>
        </div>
        <div className="flex flex-wrap gap-6">
          <span>Instagram</span>
          <span>Threads</span>
          <span>WhatsApp</span>
          <span>support@iceman.fit</span>
        </div>
      </div>
    </footer>
  );
}
