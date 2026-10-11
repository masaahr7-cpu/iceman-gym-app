import React, { useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { mockProducts, type Product } from './data/mockData';
import { t } from './lib/i18n';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Input } from './components/ui/input';

const categories = ['all', 'supplements', 'apparel', 'essentials'];

function HomePage({ lang, setLang }: { lang: 'sw' | 'en'; setLang: (v: 'sw' | 'en') => void }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [basket, setBasket] = useState<Record<string, number>>({});

  const filteredProducts = useMemo(() => {
    const s = search.toLowerCase();
    return mockProducts.filter((product) => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch =
        product.name[lang].toLowerCase().includes(s) ||
        product.description[lang].toLowerCase().includes(s) ||
        product.category.toLowerCase().includes(s);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, lang, search]);

  const basketItems = Object.entries(basket)
    .map(([id, qty]) => ({
      ...mockProducts.find((p) => p.id === id)!,
      qty,
    }))
    .filter((item) => item);

  const total = basketItems.reduce((sum, item) => {
    if (item.price === null) return sum;
    return sum + item.price * item.qty;
  }, 0);

  const addToBasket = (product: Product) => {
    setBasket((current) => ({ ...current, [product.id]: (current[product.id] ?? 0) + 1 }));
  };

  const updateBasketQuantity = (productId: string, delta: number) => {
    setBasket((current) => {
      const next = (current[productId] ?? 0) + delta;
      if (next <= 0) {
        const { [productId]: _, ...remaining } = current;
        return remaining;
      }
      return { ...current, [productId]: next };
    });
  };

  const getStockBadge = (product: Product) => {
    if (product.stock === 0) return { label: t[lang].outOfStock, className: 'bg-red-500/20 text-red-200 border-red-500/40' };
    if (product.stock <= 5) return { label: t[lang].lowStock, className: 'bg-yellow-500/20 text-yellow-100 border-yellow-500/40' };
    return { label: t[lang].inStock, className: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/40' };
  };

  return (
    <main className="min-h-screen text-white">
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <div className="grid-pattern panel relative overflow-hidden rounded-[32px] border border-[#D4AF37]/20 p-8 sm:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.2),transparent_30%)]" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Badge className="mb-4 border border-[#D4AF37]/30 bg-[#D4AF37]/10 text-[#F6D77D]">
                {t[lang].premiumPerformance}
              </Badge>
              <h1 className="max-w-xl text-4xl font-black uppercase leading-tight text-white sm:text-5xl lg:text-6xl">
                {t[lang].heroTitle}
              </h1>
              <p className="mt-5 max-w-lg text-base text-zinc-300 sm:text-lg">
                {t[lang].heroSubtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button className="bg-[#D4AF37] text-[#111] hover:bg-[#E4C767]">{t[lang].shopNow}</Button>
                <Button variant="secondary">{t[lang].viewCatalog}</Button>
              </div>
              <div className="mt-8 flex gap-6 text-sm text-zinc-300">
                <div>
                  <div className="text-2xl font-bold text-[#F6D77D]">1.2K+</div>
                  <div>{t[lang].athletes}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#F6D77D]">4.9/5</div>
                  <div>{t[lang].rating}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#F6D77D]">24h</div>
                  <div>{t[lang].dispatch}</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="overflow-hidden rounded-[28px] border border-[#D4AF37]/30 bg-[#181818] p-4 shadow-glow">
                <img
                  src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80"
                  alt="ICEMAN athlete"
                  className="h-[420px] w-full rounded-[22px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-3">
          {['all', 'supplements', 'apparel', 'essentials'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                activeCategory === category
                  ? 'border-[#D4AF37] bg-[#D4AF37] text-[#111]'
                  : 'border-[#D4AF37]/30 bg-[#161616] text-zinc-300 hover:border-[#D4AF37]/60'
              }`}
            >
              {t[lang].categories[category as keyof typeof t[lang].categories]}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.8fr_0.8fr]">
          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[#D4AF37]">ICEMAN</p>
                <h2 className="mt-2 text-3xl font-bold text-white">{t[lang].catalog}</h2>
              </div>
              <div className="w-full max-w-xs">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t[lang].searchPlaceholder}
                  className="bg-[#141414]"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => {
                const stockState = getStockBadge(product);
                return (
                  <div key={product.id} className="panel overflow-hidden rounded-3xl">
                    <img src={product.image_url} alt={product.name[lang]} className="h-56 w-full object-cover" />
                    <div className="p-4">
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">
                            {product.category}
                          </p>
                          <h3 className="mt-1 text-lg font-semibold text-white">{product.name[lang]}</h3>
                        </div>
                        <span className={`rounded-full border px-2 py-1 text-[10px] font-medium ${stockState.className}`}>
                          {stockState.label}
                        </span>
                      </div>

                      <p className="mb-4 line-clamp-3 min-h-[72px] text-sm text-zinc-400">{product.description[lang]}</p>

                      <div className="mb-4 flex items-center justify-between">
                        <div className="text-xl font-bold text-[#F6D77D]">
                          {product.price === null ? t[lang].priceOnRequest : `${product.price.toLocaleString()} TZS`}
                        </div>
                        <div className="text-xs text-zinc-500">{product.stock} {t[lang].units}</div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-[#D4AF37] text-[#111] hover:bg-[#E4C767]"
                          onClick={() => addToBasket(product)}
                        >
                          {t[lang].addToBasket}
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => setSelectedProduct(product)}>
                          {t[lang].details}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="panel h-fit rounded-3xl p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">{t[lang].basketTitle}</h3>
              <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-2 py-1 text-xs text-[#F6D77D]">
                {basketItems.length} {t[lang].items}
              </span>
            </div>

            <div className="space-y-3">
              {basketItems.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-zinc-700 bg-[#111] p-5 text-sm text-zinc-400">
                  {t[lang].emptyBasket}
                </div>
              ) : (
                basketItems.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-[#D4AF37]/10 bg-[#111] p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium text-white">{item.name[lang]}</p>
                        <p className="text-xs text-zinc-400">{item.price === null ? t[lang].priceOnRequest : `${item.price} TZS`}</p>
                      </div>
                      <div className="text-sm font-semibold text-[#F6D77D]">
                        {item.price === null ? t[lang].priceOnRequest : `${(item.price * item.qty).toLocaleString()} TZS`}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateBasketQuantity(item.id, -1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1A1A1A] text-lg text-white"
                        >
                          −
                        </button>
                        <span className="min-w-8 text-center text-sm text-white">{item.qty}</span>
                        <button
                          onClick={() => updateBasketQuantity(item.id, 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D4AF37] text-lg text-[#111]"
                        >
                          +
                        </button>
                      </div>
                      <button className="text-xs uppercase tracking-[0.16em] text-zinc-400">{t[lang].remove}</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-5 rounded-2xl border border-[#D4AF37]/15 bg-[#0F0F0F] p-4">
              <div className="mb-3 flex items-center justify-between text-sm text-zinc-300">
                <span>{t[lang].subtotal}</span>
                <span>{total.toLocaleString()} TZS</span>
              </div>
              <div className="mb-3 flex items-center justify-between text-sm text-zinc-300">
                <span>{t[lang].shipping}</span>
                <span>{t[lang].free}</span>
              </div>
              <div className="flex items-center justify-between border-t border-[#D4AF37]/10 pt-3 text-lg font-bold text-white">
                <span>{t[lang].total}</span>
                <span className="text-[#F6D77D]">{total.toLocaleString()} TZS</span>
              </div>
            </div>

            <Button className="mt-5 w-full bg-[#D4AF37] text-[#111] hover:bg-[#E4C767]">{t[lang].requestQuote}</Button>
          </aside>
        </div>
      </section>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="panel max-w-3xl overflow-hidden rounded-[28px]">
            <div className="grid md:grid-cols-2">
              <img src={selectedProduct.image_url} alt={selectedProduct.name[lang]} className="h-full w-full object-cover" />
              <div className="p-6 sm:p-8">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">{selectedProduct.category}</p>
                  <button onClick={() => setSelectedProduct(null)} className="text-zinc-400 hover:text-white">✕</button>
                </div>
                <h3 className="text-3xl font-bold text-white">{selectedProduct.name[lang]}</h3>
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-3xl font-black text-[#F6D77D]">
                    {selectedProduct.price === null ? t[lang].priceOnRequest : `${selectedProduct.price.toLocaleString()} TZS`}
                  </span>
                  <span className={`rounded-full border px-2 py-1 text-[10px] ${getStockBadge(selectedProduct).className}`}>
                    {getStockBadge(selectedProduct).label}
                  </span>
                </div>
                <p className="mt-5 text-sm leading-7 text-zinc-300">{selectedProduct.description[lang]}</p>
                <div className="mt-6 flex gap-3">
                  <Button
                    className="flex-1 bg-[#D4AF37] text-[#111] hover:bg-[#E4C767]"
                    onClick={() => {
                      addToBasket(selectedProduct);
                      setSelectedProduct(null);
                    }}
                  >
                    {t[lang].addToBasket}
                  </Button>
                  <Button variant="secondary" onClick={() => setSelectedProduct(null)}>
                    {t[lang].close}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function AuthPage({ lang, setLang }: { lang: 'sw' | 'en'; setLang: (v: 'sw' | 'en') => void }) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [pendingApproval, setPendingApproval] = useState(true);

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="panel grid overflow-hidden rounded-[28px] lg:grid-cols-2">
        <div className="bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.15),transparent_30%)] p-8 sm:p-10">
          <p className="text-xs uppercase tracking-[0.28em] text-[#D4AF37]">ICEMAN</p>
          <h1 className="mt-4 text-4xl font-black uppercase text-white">{mode === 'signin' ? t[lang].welcomeBack : t[lang].joinTheTeam}</h1>
          <p className="mt-4 text-zinc-300">{t[lang].authDescription}</p>
          <div className="mt-8 rounded-2xl border border-[#D4AF37]/20 bg-[#0E0E0E] p-5">
            <p className="text-sm text-zinc-300">{t[lang].approvalStatus}</p>
            <p className="mt-2 text-lg font-semibold text-[#F6D77D]">
              {pendingApproval ? t[lang].pendingApproval : t[lang].approved}
            </p>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <div className="mb-6 flex rounded-full border border-[#D4AF37]/20 bg-[#111] p-1">
            <button
              onClick={() => setMode('signin')}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-medium ${mode === 'signin' ? 'bg-[#D4AF37] text-[#111]' : 'text-zinc-300'}`}
            >
              {t[lang].signIn}
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-medium ${mode === 'signup' ? 'bg-[#D4AF37] text-[#111]' : 'text-zinc-300'}`}
            >
              {t[lang].signUp}
            </button>
          </div>

          <form className="space-y-4">
            <Input type="email" placeholder={t[lang].emailAddress} className="bg-[#101010]" />
            <Input type="password" placeholder={t[lang].password} className="bg-[#101010]" />
            {mode === 'signup' && <Input type="text" placeholder={t[lang].fullName} className="bg-[#101010]" />}
            {mode === 'signup' && (
              <select className="w-full rounded-xl border border-[#D4AF37]/20 bg-[#101010] px-4 py-3 text-white outline-none">
                <option value="worker">{t[lang].workerRole}</option>
                <option value="owner">{t[lang].ownerRole}</option>
              </select>
            )}
            <Button className="w-full bg-[#D4AF37] text-[#111] hover:bg-[#E4C767]">
              {mode === 'signin' ? t[lang].signIn : t[lang].createAccount}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}

function PosPage({ lang }: { lang: 'sw' | 'en' }) {
  const [activeTab, setActiveTab] = useState<'terminal' | 'stock' | 'products' | 'staff'>('terminal');
  const [role, setRole] = useState<'owner' | 'worker'>('owner');
  const [search, setSearch] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerNote, setCustomerNote] = useState('');
  const [draft, setDraft] = useState<{ [key: string]: number }>({
    product-1: 2,
    product-2: 1,
  });
  const [stockAdjustment, setStockAdjustment] = useState(12);

  const filteredProducts = mockProducts.filter((product) => {
    const q = search.toLowerCase();
    return product.name[lang].toLowerCase().includes(q) || product.category.toLowerCase().includes(q);
  });

  const total = Object.entries(draft).reduce((sum, [id, qty]) => {
    const product = mockProducts.find((p) => p.id === id);
    if (!product || product.price === null) return sum;
    return sum + product.price * qty;
  }, 0);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37]">ICEMAN Office</p>
          <h1 className="mt-2 text-3xl font-black text-white">{t[lang].posTitle}</h1>
        </div>
        <div className="rounded-full border border-[#D4AF37]/20 bg-[#101010] p-1">
          {(['terminal', 'stock', 'products', 'staff'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm capitalize ${activeTab === tab ? 'bg-[#D4AF37] text-[#111]' : 'text-zinc-300'}`}
            >
              {t[lang].tabs[tab]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
        <div className="space-y-6">
          {activeTab === 'terminal' && (
            <div className="space-y-6">
              <div className="panel rounded-[28px] p-5">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t[lang].quickLookup} className="bg-[#121212]" />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as 'owner' | 'worker')}
                    className="rounded-xl border border-[#D4AF37]/20 bg-[#121212] px-3 py-2 text-sm text-white outline-none"
                  >
                    <option value="owner">Owner</option>
                    <option value="worker">Worker</option>
                  </select>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      className="rounded-2xl border border-[#D4AF37]/15 bg-[#101010] p-3 text-left transition hover:border-[#D4AF37]/40"
                      onClick={() => setDraft((current) => ({ ...current, [product.id]: (current[product.id] ?? 0) + 1 }))}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium text-white">{product.name[lang]}</span>
                        <span className="text-xs text-[#F6D77D]">{product.stock}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <span>{product.category}</span>
                        <span>{product.price === null ? t[lang].priceOnRequest : `${product.price} TZS`}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stock' && (
            <div className="panel rounded-[28px] p-5">
              <h3 className="mb-4 text-xl font-bold text-white">{t[lang].stockAdjustment}</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <button onClick={() => setStockAdjustment((prev) => prev + 10)} className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-left">
                  <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">Restock</p>
                  <p className="mt-2 text-2xl font-bold text-white">+10</p>
                </button>
                <button onClick={() => setStockAdjustment((prev) => prev - 5)} className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-left">
                  <p className="text-xs uppercase tracking-[0.18em] text-yellow-300">Inventory</p>
                  <p className="mt-2 text-2xl font-bold text-white">-5</p>
                </button>
                <button onClick={() => setStockAdjustment((prev) => prev - 8)} className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-left">
                  <p className="text-xs uppercase tracking-[0.18em] text-red-300">Damaged</p>
                  <p className="mt-2 text-2xl font-bold text-white">-8</p>
                </button>
              </div>

              <div className="mt-6 rounded-2xl border border-[#D4AF37]/20 bg-[#111] p-5">
                <label className="mb-2 block text-sm text-zinc-300">{t[lang].adjustedQuantity}</label>
                <div className="flex items-center gap-3">
                  <button onClick={() => setStockAdjustment((prev) => prev - 1)} className="h-10 w-10 rounded-full bg-[#202020] text-xl">−</button>
                  <div className="min-w-20 text-center text-2xl font-bold text-[#F6D77D]">{stockAdjustment}</div>
                  <button onClick={() => setStockAdjustment((prev) => prev + 1)} className="h-10 w-10 rounded-full bg-[#D4AF37] text-2xl text-[#111]">+</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && role === 'owner' && (
            <div className="panel rounded-[28px] p-5">
              <h3 className="mb-4 text-xl font-bold text-white">{t[lang].productManagement}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <Input placeholder={t[lang].productName} className="bg-[#121212]" />
                <Input placeholder={t[lang].priceTzs} className="bg-[#121212]" />
                <Input placeholder={t[lang].stockCount} className="bg-[#121212]" />
                <Input placeholder={t[lang].category} className="bg-[#121212]" />
              </div>
              <textarea placeholder={t[lang].description} className="mt-4 min-h-32 w-full rounded-xl border border-[#D4AF37]/20 bg-[#121212] p-4 text-white outline-none" />
              <div className="mt-4 flex gap-3">
                <Button className="bg-[#D4AF37] text-[#111] hover:bg-[#E4C767]">{t[lang].saveProduct}</Button>
                <Button variant="secondary">{t[lang].uploadPhoto}</Button>
              </div>
            </div>
          )}

          {activeTab === 'staff' && role === 'owner' && (
            <div className="panel rounded-[28px] p-5">
              <h3 className="mb-4 text-xl font-bold text-white">{t[lang].staffApproval}</h3>
              <div className="space-y-3">
                {['Grace K.', 'Juma T.', 'Asha M.'].map((name) => (
                  <div key={name} className="flex items-center justify-between rounded-2xl border border-[#D4AF37]/15 bg-[#111] p-4">
                    <div>
                      <p className="font-medium text-white">{name}</p>
                      <p className="text-xs text-zinc-400">Worker • pending approval</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30">Approve</Button>
                      <Button size="sm" variant="secondary">Reject</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="panel rounded-[28px] p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">{t[lang].receiptPreview}</h3>
            <span className="text-xs uppercase tracking-[0.18em] text-[#D4AF37]">POS</span>
          </div>

          <div className="space-y-3">
            {Object.entries(draft).map(([id, qty]) => {
              const product = mockProducts.find((p) => p.id === id);
              if (!product || qty <= 0) return null;
              return (
                <div key={id} className="flex items-center justify-between rounded-2xl border border-[#D4AF37]/10 bg-[#101010] p-3">
                  <div>
                    <p className="font-medium text-white">{product.name[lang]}</p>
                    <p className="text-xs text-zinc-400">Qty: {qty}</p>
                  </div>
                  <p className="text-sm font-semibold text-[#F6D77D]">
                    {product.price === null ? t[lang].priceOnRequest : `${(product.price * qty).toLocaleString()} TZS`}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-4 space-y-3">
            <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder={t[lang].customerName} className="bg-[#121212]" />
            <textarea value={customerNote} onChange={(e) => setCustomerNote(e.target.value)} placeholder={t[lang].note} className="min-h-20 w-full rounded-xl border border-[#D4AF37]/20 bg-[#121212] p-3 text-white outline-none" />
          </div>

          <div className="mt-5 rounded-2xl border border-[#D4AF37]/10 bg-[#0F0F0F] p-4 text-sm text-zinc-300">
            <div className="mb-2 flex items-center justify-between">
              <span>{t[lang].subtotal}</span>
              <span>{total.toLocaleString()} TZS</span>
            </div>
            <div className="mb-2 flex items-center justify-between">
              <span>{t[lang].shipping}</span>
              <span>{t[lang].free}</span>
            </div>
            <div className="flex items-center justify-between border-t border-[#D4AF37]/10 pt-2 text-lg font-bold text-white">
              <span>{t[lang].total}</span>
              <span className="text-[#F6D77D]">{total.toLocaleString()} TZS</span>
            </div>
          </div>

          <Button className="mt-5 w-full bg-[#D4AF37] text-[#111] hover:bg-[#E4C767]">{t[lang].chargeCustomer}</Button>
        </aside>
      </div>
    </main>
  );
}

export default function App() {
  const [lang, setLang] = useState<'sw' | 'en'>('sw');

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <Header lang={lang} setLang={setLang} />
      <Routes>
        <Route path="/" element={<HomePage lang={lang} setLang={setLang} />} />
        <Route path="/auth" element={<AuthPage lang={lang} setLang={setLang} />} />
        <Route path="/pos" element={<PosPage lang={lang} />} />
      </Routes>
      <Footer lang={lang} />
    </div>
  );
}
