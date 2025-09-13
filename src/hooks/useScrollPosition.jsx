import { useState, useEffect, useRef } from "react";

export const useScrollPosition = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [savedScrollPosition, setSavedScrollPosition] = useState({ x: 0, y: 0 });
  const scrollTimeoutRef = useRef(null);
  const isScrollingRef = useRef(false);

  // Track cursor position
  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Maintain scroll position during state updates with debouncing
  useEffect(() => {
    if (savedScrollPosition.x !== 0 || savedScrollPosition.y !== 0) {
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set flag to prevent scroll event interference
      isScrollingRef.current = true;
      
      // Immediate scroll restoration
      window.scrollTo({ 
        top: savedScrollPosition.y, 
        left: savedScrollPosition.x, 
        behavior: 'instant' 
      });
      
      // Additional restoration after a short delay to handle any async updates
      scrollTimeoutRef.current = setTimeout(() => {
        window.scrollTo({ 
          top: savedScrollPosition.y, 
          left: savedScrollPosition.x, 
          behavior: 'instant' 
        });
        isScrollingRef.current = false;
      }, 50);
    }
  }, [savedScrollPosition]);

  // Prevent unwanted scroll events during quiz interactions
  useEffect(() => {
    const preventUnwantedScroll = (event) => {
      if (isScrollingRef.current) {
        event.preventDefault();
        return false;
      }
    };

    const handleScroll = () => {
      if (isScrollingRef.current) {
        window.scrollTo({ 
          top: savedScrollPosition.y, 
          left: savedScrollPosition.x, 
          behavior: 'instant' 
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: false });
    window.addEventListener('wheel', preventUnwantedScroll, { passive: false });
    window.addEventListener('touchmove', preventUnwantedScroll, { passive: false });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', preventUnwantedScroll);
      window.removeEventListener('touchmove', preventUnwantedScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [savedScrollPosition]);

  const preserveScrollPosition = () => {
    // Store current scroll position with multiple fallbacks
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    const scrollX = window.scrollX || window.pageXOffset || document.documentElement.scrollLeft || 0;
    
    // Save scroll position to state
    setSavedScrollPosition({ x: scrollX, y: scrollY });
    
    // Set scrolling flag
    isScrollingRef.current = true;

    // Multiple methods to ensure scroll position is maintained
    window.scrollTo({ top: scrollY, left: scrollX, behavior: 'instant' });
    
    // Fallback methods
    requestAnimationFrame(() => {
      window.scrollTo(scrollX, scrollY);
      document.documentElement.scrollTop = scrollY;
      document.documentElement.scrollLeft = scrollX;
      document.body.scrollTop = scrollY;
      document.body.scrollLeft = scrollX;
    });
    
    // Additional safety net
    setTimeout(() => {
      window.scrollTo({ top: scrollY, left: scrollX, behavior: 'instant' });
    }, 10);
  };

  return {
    cursorPosition,
    savedScrollPosition,
    preserveScrollPosition,
  };
};
