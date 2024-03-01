import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchImages, images } from './api/images.ts';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

export default function App() {
  const {
    fetchNextPage,
    fetchPreviousPage,
    hasPreviousPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    error,
    status,
    isFetchingPreviousPage,
  } = useInfiniteQuery({
    queryKey: ['images'],
    queryFn: fetchImages,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    getPreviousPageParam: (lastPage) => lastPage.prevPage,
    maxPages: 1,
  });

  const queryClient = useQueryClient();

  const removeImage = (updatedId: number) => {
    queryClient.setQueryData(['images'], (oldData) => {
      const newPagesArray =
        oldData?.pages.map((page) => ({
          ...page, // Preserve other page properties
          data: page.data.filter((image) => image.id !== updatedId),
        })) ?? [];

      return {
        ...oldData,
        pages: newPagesArray,
      };
    });
  };

  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('');
  // Effect to track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (!isFetchingNextPage) {
        const direction = currentScrollPos > lastScrollPos ? 'down' : 'up';
        setScrollDirection(direction);
      }
      setLastScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollPos]);

  const { ref: topRef, inView: topInView } = useInView({
    delay: 100,
    threshold: 0.1,
  });

  const { ref: bottomRef, inView: bottomInView } = useInView({ delay: 100 });

  useEffect(() => {
    if (topInView && scrollDirection === 'up') {
      fetchPreviousPage();
    }
  }, [topInView, fetchPreviousPage, scrollDirection]);

  useEffect(() => {
    if (bottomInView && scrollDirection === 'down') {
      fetchNextPage();
    }
  }, [bottomInView]);

  if (status === 'pending') return <div>Loading...</div>;
  if (status === 'error') return <div>Error: {error.message}</div>;
  return (
    <div>
      {isFetchingPreviousPage ? 'Loading Previous Page' : ''}
      <div ref={topRef}></div>

      <section className="grid gap-x-4 gap-y-5 max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {data.pages.map((page) => (
          <React.Fragment key={page.currentPage}>
            {page.data.map((image) => (
              <div key={image.id} className="w-full">
                <img src={image.url} alt="image" className="h-auto w-full" />
                <button
                  onClick={() => removeImage(image.id)}
                  className="text-red-600"
                >
                  DELETE
                </button>
              </div>
            ))}
          </React.Fragment>
        ))}
      </section>
      <div ref={bottomRef}></div>
    </div>
  );
}
