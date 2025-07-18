import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { EyeIcon, ClockIcon, BellIcon, ChartBarIcon, EnvelopeIcon, GlobeAltIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import Head from 'next/head';

interface Feature {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        if (window.scrollY >= heroBottom) {
          setShowNav(true);
          setShowScrollTop(true);
        } else {
          setShowNav(false);
          setShowScrollTop(false);
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

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Screenshots', href: '#screenshots' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const features: Feature[] = [
    {
      icon: EyeIcon,
      title: 'Blink Detection',
      description: 'Real-time blink detection using advanced computer vision technology',
    },
    {
      icon: ClockIcon,
      title: '20-20-20 Timer',
      description: 'Smart reminders to take breaks every 20 minutes',
    },
    {
      icon: BellIcon,
      title: 'Smart Notifications',
      description: 'Gentle reminders to maintain healthy eye habits',
    },
    // Blink Analytics moved below
  ];

  // Carousel state for screenshots
  const screenshots = [
    {
      src: "/screenshots/main_interface.png",
      alt: "Main Interface",
      title: "Main Interface",
      desc: "Real-time blink detection and eye care monitoring"
    },
    {
      src: "/screenshots/break_reminder.png",
      alt: "Break Reminder",
      title: "Break Reminder",
      desc: "Immersive, full-screen break overlay with countdown and tips"
    },
    {
      src: "/screenshots/settings_dialog.png",
      alt: "Customizable Settings",
      title: "Customizable Settings",
      desc: "Personalize your experience, including Smart Glasses Mode"
    },
    {
      src: "/screenshots/smart_glasses_mode.png",
      alt: "Smart Glasses Mode",
      title: "Smart Glasses Mode",
      desc: "Industry-leading blink detection, even for users wearing glasses"
    }
  ];
  const [currentShot, setCurrentShot] = useState(0);
  const [slideDirection, setSlideDirection] = useState('');
  const timeoutRef = useRef<number | null>(null);

  const goToPrev = () => {
    setSlideDirection('left');
    setCurrentShot((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  };
  const goToNext = () => {
    setSlideDirection('right');
    setCurrentShot((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  // Auto-play carousel every 3 seconds with slide effect
  useEffect(() => {
    timeoutRef.current = window.setTimeout(() => {
      setSlideDirection('right');
      setCurrentShot((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [currentShot, screenshots.length]);

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error' | 'submitting'>('idle');

  return (
    <>
      <Head>
        <title>EyeCare: Optimize Your Vision, Break by Break</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-[#E8F5FF] via-[#F0F7FF] to-[#F8FBFF]">
        {/* Navigation Bar */}
        <AnimatePresence>
          {showNav && (
            <motion.nav
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                  ? 'bg-[#E8F5FF] shadow-md'
                  : 'bg-transparent'
              }`}
              style={{
                backgroundImage: isScrolled ? 'linear-gradient(to right, #E8F5FF, #F0F7FF, #F8FBFF)' : 'none',
                backgroundColor: isScrolled ? '#E8F5FF' : 'transparent'
              }}
            >
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                  {/* Logo */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center"
                  >
                    <span className={`text-2xl font-bold font-outfit bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600`}>
                      EyeCare
                    </span>
                  </motion.div>

                  {/* Navigation Links */}
                  <div className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        className={`text-sm font-medium transition-colors ${
                          isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.name}
                      </motion.a>
                    ))}
                  </div>

                  {/* Download Button */}
                  <motion.a
                    href="/downloads/EyeCareInstaller.exe"
                    download
                    className="hidden md:block px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    Download for Windows
                  </motion.a>

                  {/* Mobile Menu Button */}
                  <button className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Hero Navbar */}
          <div className="absolute top-0 left-0 right-0 z-40">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex items-center">
                  <span className="text-2xl font-bold font-outfit bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                    EyeCare
                  </span>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-8">
                  {navItems.map((item) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="font-sans text-sm font-medium text-white/90 hover:text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </div>

                {/* Download Button */}
                <motion.a
                  href="/downloads/EyeCareInstaller.exe"
                  download
                  className="hidden md:block px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Download for Windows
                </motion.a>

                {/* Mobile Menu Button */}
                <button className="md:hidden p-2 rounded-lg text-white hover:bg-white/10">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-100/50 via-transparent to-transparent" />
          </div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
          </div>

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8"
              >
                <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-800 font-medium text-sm mb-4">
                  Now Available for Windows
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-outfit text-5xl md:text-7xl font-bold mb-4 leading-tight"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  EyeCare
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-4 mb-8"
              >
                <h2 className="font-outfit text-display-sm md:text-display-md font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 tracking-tight">
                  Keep your eyes healthy, stay productive
                </h2>
                <p className="text-xl md:text-2xl text-gray-700 font-medium">
                  AI-powered care that fits your workflow
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <motion.a
                  href="/downloads/EyeCareInstaller.exe"
                  download
                  className="btn btn-primary font-sans text-lg px-8 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Download for Windows
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#features"
                  className="btn font-sans text-lg px-8 py-3 bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 shadow-lg"
                >
                  Learn More
                </motion.a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-12 flex items-center justify-center gap-8 text-gray-600"
              >
                <div className="flex items-center gap-2">
                  <EyeIcon className="w-5 h-5 text-blue-600" />
                  <span className="font-sans">Real-time Blink Detection</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-5 h-5 text-purple-600" />
                  <span className="font-sans">Smart Break Reminders</span>
                </div>
                <div className="flex items-center gap-2">
                  <ChartBarIcon className="w-5 h-5 text-pink-600" />
                  <span className="font-sans">Detailed Analytics</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" ref={ref} className="py-20 bg-white">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-outfit text-display-md font-bold text-gray-900 mb-4">
                Smart Eye Care Features
              </h2>
              <p className="font-sans text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to maintain healthy eye habits
              </p>
            </motion.div>

            {/* First row: 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mx-auto px-8 max-w-7xl">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-6"
                >
                  <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="font-outfit text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
            {/* Second row: Centered two cards */}
            <div className="flex justify-center gap-12 mt-12 flex-wrap">
              {[
                {
                  icon: ChartBarIcon,
                  title: 'Blink Analytics',
                  description: 'Track and analyze your blink patterns over time',
                },
                {
                  icon: () => (
                    <span role="img" aria-label="Smart Glasses" className="text-3xl">👓</span>
                  ),
                  title: 'Smart Glasses Mode™',
                  description: 'Industry-leading blink detection, even for users wearing glasses',
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
                  className="card p-6 w-full max-w-xs"
                >
                  {feature.title === 'Smart Glasses Mode™' ? (
                    <img src="/glasses-icon.png" alt="Smart Glasses Icon" className="w-12 h-12 mb-4" />
                  ) : (
                    <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                  )}
                  <h3 className="font-outfit text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Screenshots Section as Carousel */}
        <section id="screenshots" className="py-20 bg-gray-50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-outfit text-display-md font-bold text-gray-900 mb-4">
                See EyeCare in Action
              </h2>
              <p className="font-sans text-xl text-gray-600 max-w-2xl mx-auto">
                A beautiful and intuitive interface for better eye care
              </p>
            </motion.div>
            <div className="flex flex-col items-center">
              <div className="relative max-w-[220px] w-[220px] h-[140px] mx-auto mb-6 flex items-center justify-center rounded-lg bg-white overflow-hidden">
                <button onClick={goToPrev} aria-label="Previous" className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2">
                  <span className="text-2xl">&#8592;</span>
                </button>
                <div className={`w-full h-full transition-transform duration-500 ${slideDirection === 'right' ? 'animate-slide-right' : slideDirection === 'left' ? 'animate-slide-left' : ''}`}
                  onAnimationEnd={() => setSlideDirection('')}
                >
                  <img
                    src={screenshots[currentShot].src}
                    alt={screenshots[currentShot].alt}
                    width="900"
                    height="500"
                    className="object-contain w-[220px] h-[140px]"
                  />
                </div>
                <button onClick={goToNext} aria-label="Next" className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2">
                  <span className="text-2xl">&#8594;</span>
                </button>
                </div>
              <div className="flex justify-center gap-2 mb-4">
                {screenshots.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSlideDirection(idx > currentShot ? 'right' : 'left'); setCurrentShot(idx); }}
                    className={`w-3 h-3 rounded-full ${currentShot === idx ? 'bg-blue-600' : 'bg-gray-300'} transition-colors`}
                    aria-label={`Go to screenshot ${idx + 1}`}
                  />
                ))}
                </div>
              <h3 className="font-outfit text-xl font-bold mb-2">{screenshots[currentShot].title}</h3>
              <p className="font-sans text-gray-600">{screenshots[currentShot].desc}</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-white">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What Users Say
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join thousands of users who have improved their eye health
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "This app has completely changed how I work. My eyes feel so much better now!",
                  author: "Sarah K.",
                  role: "Software Developer"
                },
                {
                  quote: "The blink detection is incredibly accurate. It's like having a personal eye care assistant.",
                  author: "Michael T.",
                  role: "Digital Artist"
                },
                {
                  quote: "Finally, an app that actually helps me remember to take breaks. Highly recommended!",
                  author: "David R.",
                  role: "Content Writer"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card p-6"
                >
                  <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-500">{testimonial.role}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-gray-50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about EyeCare
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {[
                {
                  question: "How does the blink detection work?",
                  answer: "EyeCare uses advanced computer vision technology to detect your blinks in real-time through your webcam. It analyzes facial landmarks to accurately track your blink rate."
                },
                {
                  question: "Is my privacy protected?",
                  answer: "Yes! All processing is done locally on your computer. We don't store or transmit any video data. Your privacy is our top priority."
                },
                {
                  question: "What is the 20-20-20 rule?",
                  answer: "The 20-20-20 rule suggests taking a 20-second break every 20 minutes to look at something 20 feet away. EyeCare helps you follow this rule automatically."
                },
                {
                  question: "Can I customize the break reminders?",
                  answer: "Absolutely! You can adjust the duration of work sessions, break times, and notification preferences in the settings."
                },
                {
                  question: "How do I install and use the EyeCare app?",
                  answer: "Download the EyeCare installer from our website and run the .exe file. Follow the on-screen instructions to complete the installation. Once installed, launch the app from your Start menu or desktop. The app will guide you through setup, and you can access features and settings from the main interface."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mb-6 bg-white rounded-xl p-6 shadow-lg"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Have questions? We'd love to hear from you
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5 }}
                  className="card p-8 flex flex-col"
                >
                  <form
                    className="flex flex-col"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setFormStatus('submitting');
                      try {
                        const res = await fetch('https://formspree.io/f/mrblblwq', {
                          method: 'POST',
                          headers: { 'Accept': 'application/json' },
                          body: new FormData(e.target as HTMLFormElement),
                        });
                        if (res.ok) {
                          setFormStatus('success');
                          setFormData({ name: '', email: '', message: '' });
                        } else {
                          setFormStatus('error');
                        }
                      } catch {
                        setFormStatus('error');
                      }
                    }}
                  >
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="input mt-1"
                        required
                        value={formData.name}
                        onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="_replyto"
                        className="input mt-1"
                        required
                        value={formData.email}
                        onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={2}
                        className="input mt-1"
                        required
                        value={formData.message}
                        onChange={e => setFormData(f => ({ ...f, message: e.target.value }))}
                      />
                    </div>
                    <input type="hidden" name="_subject" value="New message from EyeCare contact form" />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-4 px-4 py-2 rounded-lg text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg"
                      type="submit"
                      disabled={formStatus === 'submitting'}
                    >
                      {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                    </motion.button>
                    {formStatus === 'success' && (
                      <div className="text-green-600 text-center mt-4">Thank you for contacting us! We will get back to you soon.</div>
                    )}
                    {formStatus === 'error' && (
                      <div className="text-red-600 text-center mt-4">Something went wrong. Please try again later.</div>
                    )}
                  </form>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="space-y-8"
                >
                  <div className="card p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <EnvelopeIcon className="w-6 h-6 text-blue-600" />
                        <a href="mailto:prakhar.madnani@gmail.com" className="text-gray-600 hover:text-blue-600">
                          prakhar.madnani@gmail.com
                        </a>
                      </div>
                      <div className="flex items-center space-x-4">
                        <GlobeAltIcon className="w-6 h-6 text-blue-600" />
                        <a href="https://eyecare-app.github.io" className="text-gray-600 hover:text-blue-600">
                          eyecare-app.github.io
                        </a>
                      </div>
                      <div className="flex items-center space-x-4">
                        <CodeBracketIcon className="w-6 h-6 text-blue-600" />
                        <a href="https://github.com/eyecare-app" className="text-gray-600 hover:text-blue-600">
                          github.com/eyecare-app
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="card p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Follow Us
                    </h3>
                    <div className="flex space-x-6">
                      <a
                        href="https://www.linkedin.com/in/prakhar-madnani"
                        className="text-gray-600 hover:text-blue-600 text-2xl"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <FaLinkedin />
                      </a>
                      <a
                        href="https://github.com/PM4305"
                        className="text-gray-600 hover:text-blue-600 text-2xl"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                      >
                        <FaGithub />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container">
            <div className="text-center">
              <p className="text-gray-400">
                © {new Date().getFullYear()} EyeCare App. All rights reserved.
              </p>
              <p className="text-gray-400 mt-2">
                Made with <span className="text-red-500" role="img" aria-label="love">❤️</span> by{' '}
                <a
                  href="https://www.linkedin.com/in/prakhar-madnani"
                  className="underline hover:text-blue-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Prakhar Madnani
                </a>
              </p>
            </div>
          </div>
        </footer>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
            aria-label="Scroll to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )}
      </div>
    </>
  );
} 