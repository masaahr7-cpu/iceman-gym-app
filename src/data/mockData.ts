export type Product = {
  id: string;
  name: {
    sw: string;
    en: string;
  };
  category: 'supplements' | 'apparel' | 'essentials';
  description: {
    sw: string;
    en: string;
  };
  price: number | null;
  stock: number;
  image_url: string;
  sort_order: number;
};

export const mockProducts: Product[] = [
  {
    id: 'product-1',
    name: { sw: 'Ultra Protein Blend', en: 'Ultra Protein Blend' },
    category: 'supplements',
    description: {
      sw: 'Mfuko wa protini wa kiwango cha juu kwa ukarabati wa misuli na kujenga nguvu baada ya mazoezi.',
      en: 'High-performance protein blend for muscle recovery, endurance support, and strength building after training.',
    },
    price: 39000,
    stock: 18,
    image_url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80',
    sort_order: 1,
  },
  {
    id: 'product-2',
    name: { sw: 'Kifuko cha Kazi - Gold', en: 'Performance Hoodie - Gold' },
    category: 'apparel',
    description: {
      sw: 'Sweta la premium linalofaa kwa mazoezi ya viwango vya juu na mtindo wa dzungu la gym.',
      en: 'Premium training hoodie designed for intense workouts and refined gym aesthetics.',
    },
    price: 54000,
    stock: 7,
    image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    sort_order: 2,
  },
  {
    id: 'product-3',
    name: { sw: 'Kikapu cha Damu na Ikolojia', en: 'Power Fuel Energy Pack' },
    category: 'supplements',
    description: {
      sw: 'Kuchochea viwango vya nishati kwa muda mrefu na usaidizi wa hidration ya kimwili ya mazoezi.',
      en: 'Boosts energy output and supports hydration during demanding training and endurance sessions.',
    },
    price: 26000,
    stock: 11,
    image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
    sort_order: 3,
  },
  {
    id: 'product-4',
    name: { sw: 'Mikono ya Kizazi - T1', en: 'Athlete Tee - T1' },
    category: 'apparel',
    description: {
      sw: 'T-shirt yenye nyenzo ya kupumzika yenye uwezo wa kuingiza hewa kwa mazoezi ya kila siku.',
      en: 'Breathable daily training tee with an athletic fit and all-day comfort.',
    },
    price: 28000,
    stock: 23,
    image_url: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=900&q=80',
    sort_order: 4,
  },
  {
    id: 'product-5',
    name: { sw: 'Energizer Pre-Workout', en: 'Energizer Pre-Workout' },
    category: 'supplements',
    description: {
      sw: 'Mchanganyiko unaokuza stamina, macho ya ndani na moyo kwa mazoezi ya mkali.',
      en: 'Fast-acting formula designed to improve focus, power, and stamina before intense training.',
    },
    price: null,
    stock: 4,
    image_url: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=900&q=80',
    sort_order: 5,
  },
  {
    id: 'product-6',
    name: { sw: 'Gym Kit ya Mifuko', en: 'Gym Essentials Kit' },
    category: 'essentials',
    description: {
      sw: 'Kikapu cha vifaa vya msingi kwa mazoezi ya nyumbani na studio.',
      en: 'Essential gym kit for home workouts, travel, and every-day performance support.',
    },
    price: 47000,
    stock: 9,
    image_url: 'https://images.unsplash.com/photo-1541534401786-2077eed87a74?auto=format&fit=crop&w=900&q=80',
    sort_order: 6,
  },
  {
    id: 'product-7',
    name: { sw: 'Mifuko ya Michezo', en: 'Sports Bags' },
    category: 'essentials',
    description: {
      sw: 'Mifuko ya kukamatia vifaa vya michezo na mazoezi, iliyotengenezwa kwa nyenzo thabiti.',
      en: 'Durable sports bags designed to carry training gear and gym equipment with comfort and style.',
    },
    price: null,
    stock: 0,
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
    sort_order: 7,
  },
  {
    id: 'product-8',
    name: { sw: 'Mikono ya Kuuza Uzani', en: 'Fitness Gloves' },
    category: 'essentials',
    description: {
      sw: 'Mikono iliyotengenezwa kwa nyenzo za juu kwa nguvu na kinga ya mikono wakati wa mazoezi.',
      en: 'Premium fitness gloves providing superior grip and wrist support during weight training sessions.',
    },
    price: null,
    stock: 0,
    image_url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80',
    sort_order: 8,
  },
  {
    id: 'product-9',
    name: { sw: 'Shortz ya Mazoezi', en: 'Training Shorts' },
    category: 'apparel',
    description: {
      sw: 'Shortz nyepesi zenye kupumzika, iliyotengenezwa kwa nyenzo ya kuchanganya kwa mwendo wa haraka.',
      en: 'Lightweight training shorts with moisture-wicking fabric for maximum comfort and performance.',
    },
    price: null,
    stock: 0,
    image_url: 'https://images.unsplash.com/photo-1506629082632-11c46f339b90?auto=format&fit=crop&w=900&q=80',
    sort_order: 9,
  },
  {
    id: 'product-10',
    name: { sw: 'Kapuli cha Kichwa Kufa', en: 'Skull Balaclava' },
    category: 'apparel',
    description: {
      sw: 'Kapuli ya mtindo wa skull, inayotoa kwa baridi na uumeme wakati wa mazoezi ya nje.',
      en: 'Stylish skull-print balaclava mask for cold weather training and enhanced athletic look.',
    },
    price: null,
    stock: 0,
    image_url: 'https://images.unsplash.com/photo-1529148482759-b4f4201a5e84?auto=format&fit=crop&w=900&q=80',
    sort_order: 10,
  },
];
