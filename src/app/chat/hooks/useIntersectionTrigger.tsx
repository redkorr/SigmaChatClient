import Loading from '@/app/shared/components/loading';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useIntersectionTrigger({ loadCallback, loading }: props) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entries.every((e) => e.intersectionRatio === 0) || loading) return;

      loadCallback();
    },
    [loadCallback, loading]
  );

  useEffect(() => {
    if (!triggerRef.current) return;

    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    } as IntersectionObserverInit;

    if (observer) {
      observer.disconnect();
      observer.unobserve(triggerRef.current);
    }

    const newObserver = new IntersectionObserver(callback, options);

    newObserver.observe(triggerRef.current);

    setObserver(newObserver);
  }, [callback, triggerRef]);

  const triggerElement = (
    <div ref={triggerRef}>
      {loading ? <Loading></Loading> : 'End of messages'}
    </div>
  );
  return { triggerElement };
}

interface props {
  loadCallback: () => any;
  loading: boolean;
}
