import { useState, useEffect } from "react";

export const SCREEN_SIZES = {
  SMALL: "(min-width: 640px)",
  MEDIUM: "(min-width: 768px)",
  LARGE: "(min-width: 1024px)",
  XL: "(min-width: 1280px)",
};

export default function useMediaQuery(query: string, isIOS: boolean) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const updateMatch = () => setMatch(window.matchMedia(query).matches);

    updateMatch();
    if (isIOS) {
      // Note: addListener and removeListener are deprecated. I am intentionally using them
      // only on iOS devices because I found that addEventListener and removeEventListener breaks
      // on iOS platform. Hopefully, this gets resolved soon
      window.matchMedia(query).addListener(updateMatch);

      // remove listener on unmount
      return () => {
        window.matchMedia(query).removeListener(updateMatch);
      };
    } else {
      window.matchMedia(query).addEventListener("change", updateMatch);

      // remove listener on unmount
      return () => {
        window.matchMedia(query).removeEventListener("change", updateMatch);
      };
    }
  }, [query, isIOS]);

  return match;
}
