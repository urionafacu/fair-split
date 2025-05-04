import { useEffect, useState } from 'react'

const MOBILE_BREAKPOINT = 768

/**
 * Detects if the device width is <= 768px.
 * Compatible with modern, older, and very old browsers.
 * Optimized for performance and compatible with Server Components.
 *
 * @returns {boolean} True if width <= 768px, false otherwise.
 */
export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    // Safe check for window object
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT)
      }

      if (window.matchMedia) {
        const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)

        const handleMediaQueryChange = (event: MediaQueryListEvent | MediaQueryList) => {
          setIsMobile(event.matches)
        }

        // Set initial value
        setIsMobile(mediaQuery.matches)

        // Add event listener
        if (mediaQuery.addEventListener) {
          mediaQuery.addEventListener('change', handleMediaQueryChange)
        } else if (mediaQuery.addListener) {
          // Fallback for older browsers
          mediaQuery.addListener(handleMediaQueryChange)
        } else {
          // Fallback for very old browsers
          window.addEventListener('resize', checkMobile)
        }

        // Clean up
        return () => {
          if (mediaQuery.removeEventListener) {
            mediaQuery.removeEventListener('change', handleMediaQueryChange)
          } else if (mediaQuery.removeListener) {
            // Fallback for older browsers
            mediaQuery.removeListener(handleMediaQueryChange)
          } else {
            // Fallback for very old browsers
            window.removeEventListener('resize', checkMobile)
          }
        }
      } else {
        // Fallback for browsers without matchMedia support
        checkMobile() // Set initial value
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
      }
    }
  }, [])

  return isMobile
}
