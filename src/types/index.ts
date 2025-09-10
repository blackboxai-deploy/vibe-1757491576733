export interface Property {
  id: number;
  title: string;
  city: string;
  price: number;
  beds: number;
  baths: number;
  area: number;
  type: 'Villa' | 'Apartment' | 'Townhouse';
  image: string;
}

export interface Company {
  name: string;
  phone: string;
  email: string;
  tagline: string;
  city: string;
  license: string;
  logo: string;
}

export interface FilterState {
  q: string;
  type: string;
  maxPrice: number;
}