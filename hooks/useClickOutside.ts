import { useEffect } from 'react';

const useClickOutside = (ref, handler, excludeRefs = []) => {
  useEffect(() => {
    const listener = (event) => {
      // Kiểm tra nếu ref chưa được gán hoặc click vào element chính/children của nó
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      // Kiểm tra nếu click vào các element được exclude
      const isClickedOnExcludedEl = excludeRefs.some((excludeRef) => {
        return excludeRef.current && excludeRef.current.contains(event.target);
      });

      if (isClickedOnExcludedEl) {
        return;
      }
      
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler, excludeRefs]); // Re-run effect nếu ref, handler hoặc excludeRefs thay đổi
};

export default useClickOutside;