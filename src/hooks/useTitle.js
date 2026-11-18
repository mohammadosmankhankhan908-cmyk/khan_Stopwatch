import { useEffect } from 'react';
export default function useTitle(active, text) {
  useEffect(() => { if (active) document.title = text; }, [active, text]);
}
