import { useEffect } from 'react'

const useResizeObserver = (elements, callback) => {
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      callback(entries);
    });

    for (const elem of elements) {
      elem.current && resizeObserver.observe(elem.current);
    }

    return () => resizeObserver.disconnect();
  }, []);
};

export default useResizeObserver
