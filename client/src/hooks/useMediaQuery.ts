import { useState, useEffect } from "react";

// Custom hook for handling media queries
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  // UseEffect to update the matches state based on the media query
  useEffect(() => {
    // Creating a media query object based on the provided query string
    const media = window.matchMedia(query);

    // Checking if the media query matches the current state and updating if necessary
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // Function to update matches state when the window is resized
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);

    // Cleanup function to remove event listener when component is unmounted or the query changes
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
};
