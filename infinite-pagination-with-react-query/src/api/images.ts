export const images = Array.from({ length: 100 }).map((_, index) => ({
  id: index + 1,
  url: `https://placehold.co/1200x1400?text=index${index + 1}`,
}));

type Image = (typeof images)[0];
const LIMIT = 40;

export function fetchImages({ pageParam }: { pageParam: number }): Promise<{
  data: Image[];
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: images.slice(pageParam, pageParam + LIMIT),
        currentPage: pageParam,
        nextPage: pageParam + LIMIT < images.length ? pageParam + LIMIT : null,
        prevPage: pageParam - LIMIT >= 0 ? pageParam - LIMIT : null,
      });
    }, 1000);
  });
}
