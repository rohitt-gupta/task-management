import { useEffect, useCallback } from 'react';

export default function useInfiniteScroll(
  callback: () => void,
  loading: boolean,
  hasMore: boolean
) {
  const handleScroll = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && hasMore) {
        callback();
      }
    },
    [callback, loading, hasMore]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleScroll, {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    });

    const sentinel = document.querySelector('#infinite-scroll-sentinel');
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => observer.disconnect();
  }, [handleScroll]);
}