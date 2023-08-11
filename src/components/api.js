
const API_KEY = '37280539-cd6db321c9edd6308828ea5a9';

/*const fetchImages = async (query, page = 1) => {
  const baseUrl = 'https://pixabay.com/api/';
  const perPage = 12;
  const orientation = 'horizontal';

  const response = await fetch(
    `${baseUrl}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=${orientation}&per_page=${perPage}`
  );

  if (!response.ok) {
    throw new Error('Error fetching images');
  }

  const data = await response.json();
  return data.hits.map(() => ({
    id: hit.id,
    webformatURL: hit.webformatURL,
    largeImageURL: hit.largeImageURL,
  }));
};

export { fetchImages };*/

const fetchImages = async (query, page = 1) => {
  const baseUrl = 'https://pixabay.com/api/';
  const perPage = 12;
  const orientation = 'horizontal';

  const response = await fetch(
    `${baseUrl}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=${orientation}&per_page=${perPage}`
  );

  if (!response.ok) {
    throw new Error('Error fetching images');
  }

  const data = await response.json();
  return {
    total: data.total,
    hits: data.hits.map((hit) => ({
      id: hit.id,
      webformatURL: hit.webformatURL,
      largeImageURL: hit.largeImageURL,
    })),
  };
};

export { fetchImages };

