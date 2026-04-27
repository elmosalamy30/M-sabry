export interface Artwork {
  id: string;
  title: string;
  category: 'Pencil' | 'Colors' | 'Oil Painting';
  imageUrl: string;
  description?: string;
  price?: number;
}

export const ARTWORKS: Artwork[] = [
  {
    id: 'art-7',
    title: 'New Vision 1',
    category: 'Pencil',
    imageUrl: '/IMG-20260427-WA0063.jpg',
    description: 'A newly added pencil setup.',
    price: 150
  },
  {
    id: 'art-8',
    title: 'New Vision 2',
    category: 'Colors',
    imageUrl: 'https://archive.org/download/img-20260427-wa-0057/IMG-20260427-WA0057.jpg',
    description: 'A newly added colored artwork.',
    price: 200
  },
  {
    id: 'art-1',
    title: 'Silent Whisper',
    category: 'Pencil',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=1200',
    description: 'A deep exploration of silence and emotion rendered in dark charcoal and graphite.',
    price: 120
  },
  {
    id: 'art-2',
    title: 'Golden Hour',
    category: 'Oil Painting',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&q=80&w=1200',
    description: 'Capturing the transient light of the setting sun over a serene landscape with rich oil textures.',
    price: 350
  },
  {
    id: 'art-3',
    title: 'The Thinker',
    category: 'Pencil',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1200',
    description: 'Intricate details focused on human expression and thought, achieved through precise pencil strokes.',
    price: 90
  },
  {
    id: 'art-4',
    title: 'Abstract Harmony',
    category: 'Colors',
    imageUrl: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80&w=1200',
    description: 'A vibrant mix of colors representing chaos finding balance using mixed color mediums.',
    price: 250
  },
  {
    id: 'art-5',
    title: 'Urban Rhythm',
    category: 'Colors',
    imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f1146143ec?auto=format&fit=crop&q=80&w=1200',
    description: 'The pulse of the city captured through sharp lines, bright watercolors, and dynamic tones.',
    price: 180
  },
  {
    id: 'art-6',
    title: 'Nature’s Embrace',
    category: 'Oil Painting',
    imageUrl: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?auto=format&fit=crop&q=80&w=1200',
    description: 'Soft colors blending into a serene forest scene, painted with classic oil techniques.',
    price: 400
  }
];

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Ahmed Y.',
    rating: 5,
    text: 'Mohamed is an incredibly talented artist. The charcoal portrait I commissioned exceeded all my expectations. Highly recommended!',
    date: '2023-11-15'
  },
  {
    id: 'rev-2',
    name: 'Sara K.',
    rating: 5,
    text: 'Beautiful details and emotional depth in every piece. The delivery was fast and the artwork arrived in perfect condition.',
    date: '2023-12-02'
  },
  {
    id: 'rev-3',
    name: 'Tarek M.',
    rating: 4,
    text: 'Very professional process from start to finish. The oil painting looks stunning in our living room.',
    date: '2024-01-10'
  }
];
