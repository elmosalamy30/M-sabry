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
    id: 'art-8',
    title: 'New Vision 2',
    category: 'Colors',
    imageUrl: 'https://archive.org/download/img-20260427-wa-0057/IMG-20260427-WA0057.jpg',
    description: 'A newly added colored artwork.',
    price: 200
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
