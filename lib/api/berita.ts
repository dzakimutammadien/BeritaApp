import axios from 'axios';
import { MEDIASTACK_API_KEY, MEDIASTACK_BASE_URL, DEFAULT_COUNTRY } from '../constants';

export interface Berita {
  author: string | null;
  title: string;
  description: string;
  url: string;
  source: string;
  image: string;
  category: string;
  published_at: string;
}

export async function fetchBerita(query: string = ''): Promise<Berita[]> {
  try {
    const params: any = {
      access_key: MEDIASTACK_API_KEY,
      countries: DEFAULT_COUNTRY,
      limit: 30,
    };

    if (query) {
      params.keywords = query;
    }

    const response = await axios.get(MEDIASTACK_BASE_URL, { params });
    return response.data.data;
  } catch (error) {
    console.error('Gagal memuat berita:', error);
    return [];
  }
}






