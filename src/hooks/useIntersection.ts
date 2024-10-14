import { useEffect, useState } from "react";

export const useIntersection = (
  element: React.RefObject<HTMLDivElement>,
  rootMargin: string
) => {
  const [isVisible, setState] = useState(false);

  useEffect(() => {
    const current = element.current;
    if (!current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setState(entry?.isIntersecting ?? false);
      },
      { rootMargin }
    );
    current && observer?.observe(current);

    return () => observer.unobserve(current);
  }, []);

  return isVisible;
};
