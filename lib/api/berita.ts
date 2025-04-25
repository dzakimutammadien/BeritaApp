// File: lib/api/berita.ts
export interface BeritaItem {
  id: string;
  title: string;
  body: string;
  image_url: string;
  link: string;
  pubDate: string;
  category: string;
}

const API_KEY = 'pub_82938411204aca1910aa9427ca97aa087f329';

export async function fetchBerita(): Promise<BeritaItem[]> {
  try {
    const res = await fetch(
      `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=id&language=id`
    );
    const json = await res.json();

    return (json.results || []).map((item: any, index: number) => ({
      id: item.link || `berita-${index}`,
      title: item.title,
      body: item.description || 'Tidak ada isi',
      image_url: item.image_url || '',
      link: item.link,
      pubDate: item.pubDate,
      category: item.category?.[0] || 'Umum',
    }));
  } catch (error) {
    console.error('Gagal fetch berita:', error);
    return [];
  }
}
