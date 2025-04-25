export interface BeritaItem {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
  
  export const fetchBerita = async (): Promise<BeritaItem[]> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Gagal memuat data berita');
    }
    return await response.json();
  };
  
  export const fetchBeritaById = async (id: number): Promise<BeritaItem> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!response.ok) {
      throw new Error('Gagal memuat detail berita');
    }
    return await response.json();
  };
  