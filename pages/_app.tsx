import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Outfit, Inter } from 'next/font/google'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

function MyApp({ Component, pageProps }: AppProps) {
  const [showNav, setShowNav] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroTop = heroSection.offsetTop;
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        if (window.scrollY < heroTop || window.scrollY >= heroBottom) {
          setShowNav(true);
        } else {
          setShowNav(false);
        }
        if (window.scrollY >= heroBottom) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style jsx global>{`
        :root {
          --font-outfit: ${outfit.style.fontFamily};
          --font-inter: ${inter.style.fontFamily};
        }
      `}</style>
      <div className={`${outfit.variable} ${inter.variable}`}>
        <AnimatePresence>
          {showNav && (
            <motion.nav
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              exit={{ y: -100 }}
              transition={{ duration: 0.3 }}
              className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                  ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 shadow-lg'
                  : 'bg-transparent'
              }`}
            >
              {/* ...rest of your navbar code... */}
            </motion.nav>
          )}
        </AnimatePresence>
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp 