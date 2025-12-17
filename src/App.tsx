import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X, ArrowRight, Sparkles, Layout, FileCode, Zap, Search, Grid3X3 } from 'lucide-react'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

// Service Badge Component
function ServiceBadge({
  label,
  icon: Icon,
  bgColor,
  iconColor,
  rotation = 0,
  delay = 0
}: {
  label: string
  icon: React.ElementType
  bgColor: string
  iconColor: string
  rotation?: number
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
      whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, rotate: 0 }}
      className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full border border-white"
      style={{
        boxShadow: '0px 0px 0px 8px rgba(255, 255, 255, 0.25), 12px 16px 16px 0px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: bgColor }}
      >
        <Icon className="w-5 h-5" style={{ color: iconColor }} />
      </div>
      <span className="font-medium text-[#1A1A1A] pr-2">{label}</span>
    </motion.div>
  )
}

// Header Component
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl sm:text-3xl font-bold tracking-tight"
          >
            Hanzo
          </motion.a>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setIsMenuOpen(true)}
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg"
          >
            <Menu className="w-5 h-5" />
          </motion.button>
        </div>
      </header>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#1A1A1A] text-white"
          >
            <div className="h-full flex flex-col p-6">
              <div className="flex items-center justify-between mb-12">
                <span className="text-2xl sm:text-3xl font-bold">Hanzo</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 flex flex-col justify-center">
                <motion.ul
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                  className="space-y-4"
                >
                  {['Work', 'About', 'Process', 'Pricing', 'FAQ', 'Contact'].map((item) => (
                    <motion.li key={item} variants={fadeInUp}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-4xl sm:text-6xl font-bold hover:text-[#FF3700] transition-colors"
                      >
                        {item}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>

              <div className="flex gap-6 text-white/60">
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-white transition-colors">Dribbble</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Hero Section - Exact Framer Replica
function Hero() {
  const [currentImage, setCurrentImage] = useState(0)
  const images = [
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=400&h=300&fit=crop',
  ]

  const avatars = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto text-center">
        {/* Booking Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 bg-white border border-black/10 rounded-full mb-10"
        >
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-base font-medium">Booking Open — 2 Spots Left</span>
        </motion.div>

        {/* Main Heading - Exact Framer Layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Row 1: Unlimited [Slideshow] Design */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 leading-none">
            <span className="text-[48px] sm:text-[64px] md:text-[80px] font-bold tracking-[-0.02em]">
              Unlimited
            </span>

            {/* Slideshow - Vertical scroll effect */}
            <motion.div
              style={{ rotate: -2 }}
              className="relative w-[80px] h-[60px] sm:w-[100px] sm:h-[75px] md:w-[120px] md:h-[90px] rounded-xl overflow-hidden border border-black/80 shadow-lg flex-shrink-0"
            >
              <motion.div
                animate={{ y: -currentImage * 100 + '%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="absolute top-0 left-0 w-full"
                style={{ height: `${images.length * 100}%` }}
              >
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="w-full object-cover"
                    style={{ height: `${100 / images.length}%` }}
                  />
                ))}
              </motion.div>
            </motion.div>

            <span className="text-[48px] sm:text-[64px] md:text-[80px] font-bold tracking-[-0.02em] text-black/50">
              Design
            </span>
          </div>

          {/* Row 2: for [Logo Ticker] */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 leading-none mt-1">
            <span className="text-[48px] sm:text-[64px] md:text-[80px] font-bold tracking-[-0.02em] text-black/50">
              for
            </span>

            {/* Logo Ticker - Horizontal scroll */}
            <motion.div
              style={{ rotate: 2 }}
              className="relative px-4 py-2 sm:px-5 sm:py-2.5 bg-[#1a1a1a] border border-black rounded-full shadow-lg overflow-hidden flex-shrink-0"
            >
              <div className="flex items-center gap-4 sm:gap-5">
                <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="white">
                  <rect x="3" y="3" width="8" height="8" rx="1" />
                  <rect x="13" y="3" width="8" height="8" rx="1" />
                  <rect x="3" y="13" width="8" height="8" rx="1" />
                  <rect x="13" y="13" width="8" height="8" rx="1" />
                </svg>
                <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="white">
                  <circle cx="12" cy="12" r="10" />
                </svg>
                <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="white">
                  <polygon points="12,2 22,22 2,22" />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Row 3: Solid Startups */}
          <div className="flex flex-wrap items-center justify-center leading-none mt-1">
            <span className="text-[48px] sm:text-[64px] md:text-[80px] font-bold tracking-[-0.02em]">
              Solid Startups
            </span>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-base sm:text-lg text-black/60 max-w-lg mx-auto mt-10 mb-8 leading-relaxed"
        >
          We help startups and brands create beautiful,
          <br />
          functional products — fast and hassle-free.
        </motion.p>

        {/* CTA with Avatar Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#1a1a1a] text-white rounded-full font-semibold hover:bg-black transition-colors"
          >
            Choose your plan
            <ArrowRight className="w-4 h-4" />
          </motion.a>

          {/* Avatar Stack + Trusted by Leaders */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {avatars.map((avatar, i) => (
                <img
                  key={i}
                  src={avatar}
                  alt=""
                  className="w-9 h-9 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <span className="text-sm text-black/50">Trusted by Leaders</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Services Section with Floating Badges
function Services() {
  const services = [
    { label: 'Strategy', icon: Sparkles, bgColor: '#FFD500', iconColor: '#660080', rotation: 4 },
    { label: 'UI/UX', icon: Layout, bgColor: '#474747', iconColor: '#BAFFD0', rotation: 4 },
    { label: 'Prototyping', icon: FileCode, bgColor: '#FF45AB', iconColor: '#C9FFFB', rotation: -4 },
    { label: 'Animation', icon: Zap, bgColor: '#52FF69', iconColor: '#3224FF', rotation: -5 },
    { label: 'Research', icon: Search, bgColor: '#05A9FF', iconColor: '#F8FFBF', rotation: -4 },
    { label: 'Design Systems', icon: Grid3X3, bgColor: '#FF5E00', iconColor: '#FFF3C2', rotation: 3 },
  ]

  const ref = useRef<HTMLDivElement>(null)

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Fading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          <FadingText />
        </motion.div>

        {/* Floating Service Badges */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {services.map((service, i) => (
            <ServiceBadge
              key={service.label}
              {...service}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// Fading Text Component
function FadingText() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  })

  const words = "We help startups and enterprise to establish an emotional connection between their products and happy engaged customers".split(' ')

  return (
    <p ref={ref} className="text-2xl sm:text-3xl md:text-4xl font-normal leading-relaxed max-w-4xl mx-auto">
      {words.map((word, i) => (
        <FadingWord key={i} word={word} index={i} total={words.length} scrollYProgress={scrollYProgress} />
      ))}
    </p>
  )
}

function FadingWord({ word, index, total, scrollYProgress }: { word: string; index: number; total: number; scrollYProgress: any }) {
  const start = index / total
  const end = (index + 1) / total
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1])

  return (
    <motion.span style={{ opacity }} className="inline-block mr-2">
      {word}
    </motion.span>
  )
}

// Logo Ticker
function LogoTicker() {
  const logos = [
    'Stripe', 'Notion', 'Slack', 'Linear', 'Figma', 'Vercel', 'Webflow', 'Framer'
  ]

  return (
    <section className="py-12 overflow-hidden border-y border-black/10">
      <div className="flex animate-marquee">
        {[...logos, ...logos].map((logo, i) => (
          <div
            key={i}
            className="flex-shrink-0 px-8 sm:px-12 text-text-muted text-lg sm:text-xl font-medium"
          >
            {logo}
          </div>
        ))}
      </div>
    </section>
  )
}

// Image Showcase
function ImageShowcase() {
  const images = [
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800',
    'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=800',
  ]

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6"
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -10, rotate: i === 1 ? 0 : (i === 0 ? -2 : 2) }}
              className="aspect-[4/3] rounded-3xl overflow-hidden border-2 border-black shadow-xl"
            >
              <img
                src={img}
                alt={`Showcase ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// About Section - Framer Style
function About() {
  const experiences = [
    { role: 'Freelance Practice', company: 'Hanzo Co.', period: '2011  →  Now' },
    { role: 'Design Lead', company: 'Google', period: '2024  →  Now' },
    { role: 'Senior Designer', company: 'PayPal', period: '2019  →  2024' },
    { role: 'Product Designer', company: 'Meta', period: '2016  →  2019' },
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium mb-6 border border-black/10 shadow-sm">
            <span className="w-1.5 h-1.5 bg-black/40 rounded-full" />
            <em className="not-italic text-black/60">Our Projects</em>
            <span className="w-1.5 h-1.5 bg-black/40 rounded-full" />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Pushing boundaries <span className="text-black/50">since 2011</span>
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left - Image & Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Photo */}
            <motion.div
              style={{ rotate: -2 }}
              className="aspect-[3/2] rounded-2xl overflow-hidden border border-black/10 shadow-lg"
            >
              <img
                src="https://framerusercontent.com/images/zRVCa2eOgJIf1mJK5PYcBLrYI.png"
                alt="Joris van Dijk"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Info Card */}
            <div className="flex items-center justify-between">
              <div className="text-right flex-1">
                <p className="font-semibold">Joris van Dijk</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              {/* Social Links */}
              <div className="flex items-center gap-2">
                <a href="#" className="w-8 h-8 flex items-center justify-center text-black/50 hover:text-black transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 256 256" fill="currentColor">
                    <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 flex items-center justify-center text-black/50 hover:text-black transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 256 256" fill="currentColor">
                    <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z" />
                  </svg>
                </a>
                <a href="#" className="w-8 h-8 flex items-center justify-center text-black/50 hover:text-black transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 256 256" fill="currentColor">
                    <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z" />
                  </svg>
                </a>
              </div>
              <p className="text-sm text-black/50">Hanzo Studio, Founder</p>
            </div>
          </motion.div>

          {/* Right - Bio & Experience */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Bio */}
            <div className="flex items-start gap-4">
              <p className="text-lg sm:text-xl leading-relaxed text-black/80 flex-1">
                Joris van Dijk is a Dutch designer known for his minimalist, expressive digital work. He helps startups and studios create clean interfaces and strong branding. Based in Utrecht, he blends function with emotion — and often spends his free time cycling or exploring generative art.
              </p>
              {/* Smiley Icon */}
              <svg className="w-10 h-10 text-[#FF3700] flex-shrink-0 hidden sm:block" viewBox="0 0 256 256" fill="currentColor">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM80,108a12,12,0,1,1,12,12A12,12,0,0,1,80,108Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,176,108Zm-1.07,48c-10.29,17.79-27.4,28-46.93,28s-36.63-10.2-46.92-28a8,8,0,1,1,13.84-8c7.47,12.91,19.21,20,33.08,20s25.61-7.1,33.07-20a8,8,0,0,1,13.86,8Z" />
              </svg>
            </div>

            {/* Experience List */}
            <div className="border-t border-black/10 pt-6">
              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-center justify-between py-4 border-b border-black/10"
                >
                  <span className="font-medium">{exp.role}</span>
                  <span className="text-black/50 hidden sm:block">{exp.company}</span>
                  <span className="text-sm">{exp.period}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Process Section - Framer Style (Minimal)
function Process() {
  const steps = [
    {
      number: '01',
      title: 'Subscribe',
      description: 'Pick a plan that fits your needs. No contracts, cancel anytime.'
    },
    {
      number: '02',
      title: 'Request',
      description: 'Submit unlimited design requests through our simple dashboard.'
    },
    {
      number: '03',
      title: 'Receive',
      description: 'Get your designs delivered in 48 hours on average. Revise until perfect.'
    }
  ]

  return (
    <section id="process" className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm mb-6 border border-black/10 shadow-sm">
            <span className="w-1.5 h-1.5 bg-black/40 rounded-full" />
            <em className="not-italic text-black/50 font-serif text-lg">Process</em>
            <span className="w-1.5 h-1.5 bg-black/40 rounded-full" />
          </span>
          <h2 className="text-[32px] font-medium tracking-[-0.04em]">
            How it works
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              {/* Number */}
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl font-bold text-[#FF3700]">{step.number}</span>
                {i < steps.length - 1 && (
                  <div className="hidden md:block flex-1 h-px bg-black/10" />
                )}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-black/50 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Work/Projects Section - Framer Style
function Work() {
  const projects = [
    {
      title: 'Strida',
      tags: ['portfolio', 'sidebar'],
      image: 'https://framerusercontent.com/images/aLickQcDkn7JlTftxkq33tHE.jpg'
    },
    {
      title: 'Bravo',
      tags: ['UI/UX', 'App'],
      image: 'https://framerusercontent.com/images/ISAjHKBwJV6BJzD55lhE8XAFBM.jpg'
    },
    {
      title: 'Nitro',
      tags: ['Design System', 'Web'],
      image: 'https://framerusercontent.com/images/nT9mTBoP2h9YdschdGP72ovRHk.jpg'
    },
    {
      title: 'Fargo',
      tags: ['SaaS', 'Web'],
      image: 'https://framerusercontent.com/images/vzQsCEYy7zN2RmDQcgrizz0O0MI.jpg'
    }
  ]

  return (
    <section id="work" className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {projects.map((project) => (
            <motion.a
              key={project.title}
              href="#"
              variants={fadeInUp}
              className="group relative block"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#f5f5f5] border border-white/50">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Hover Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <h4 className="text-lg font-medium text-black/50 mb-2">{project.title}</h4>
                  <div className="flex gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white rounded-full text-xs text-black/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


// Pricing Section - Framer Style
function Pricing() {
  const [isMonthly, setIsMonthly] = useState(true)

  const features = [
    'Unlimited design requests',
    'Fast turnaround',
    'Fixed monthly rate',
    'Async communication',
    'Flexible scope',
    'Pause anytime'
  ]

  const benefits = [
    { icon: 'M176,16H80A24,24,0,0,0,56,40V216a24,24,0,0,0,24,24h96a24,24,0,0,0,24-24V40A24,24,0,0,0,176,16Zm8,200a8,8,0,0,1-8,8H80a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h96a8,8,0,0,1,8,8ZM140,60a12,12,0,1,1-12-12A12,12,0,0,1,140,60Z', label: 'Senior-level quality' },
    { icon: 'M208,40H48A24,24,0,0,0,24,64V176a24,24,0,0,0,24,24h72v16H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V200h72a24,24,0,0,0,24-24V64A24,24,0,0,0,208,40ZM48,56H208a8,8,0,0,1,8,8v80H40V64A8,8,0,0,1,48,56ZM208,184H48a8,8,0,0,1-8-8V160H216v16A8,8,0,0,1,208,184Z', label: 'Systems thinking' },
    { icon: 'M245.66,74.34l-32-32a8,8,0,0,0-11.32,11.32L220.69,72H192a74.49,74.49,0,0,0-28.35,6.73c-13.62,6.29-30.83,19.71-35.54,48-5.32,31.94-29.1,39.22-41,40.86a40,40,0,1,0,.18,16.06A71.65,71.65,0,0,0,108.13,178C121.75,172,139,158.6,143.89,129.31,150.65,88.77,190.34,88,192,88h28.69l-18.35,18.34a8,8,0,0,0,11.32,11.32l32-32A8,8,0,0,0,245.66,74.34ZM48,200a24,24,0,1,1,24-24A24,24,0,0,1,48,200Z', label: 'Developer-friendly' },
    { icon: 'M100,116.43a8,8,0,0,0,4-6.93v-72A8,8,0,0,0,93.34,30,104.06,104.06,0,0,0,25.73,147a8,8,0,0,0,4.52,5.81,7.86,7.86,0,0,0,3.35.74,8,8,0,0,0,4-1.07ZM88,49.62v55.26L40.12,132.51C40,131,40,129.48,40,128A88.12,88.12,0,0,1,88,49.62Z', label: 'Clear process' },
    { icon: 'M176,232a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h80A8,8,0,0,1,176,232Zm40-128a87.55,87.55,0,0,1-33.64,69.21A16.24,16.24,0,0,0,176,186v6a16,16,0,0,1-16,16H96a16,16,0,0,1-16-16v-6a16,16,0,0,0-6.23-12.66A87.59,87.59,0,0,1,40,104.49C39.74,56.83,78.26,17.14,125.88,16A88,88,0,0,1,216,104Z', label: 'On-brand, every time' },
    { icon: 'M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm109.94-52.79a8,8,0,0,0-3.89-5.4l-29.83-17-.12-33.62a8,8,0,0,0-2.83-6.08,111.91,111.91,0,0,0-36.72-20.67,8,8,0,0,0-6.46.59L128,41.85,97.88,25a8,8,0,0,0-6.47-.6A112.1,112.1,0,0,0,54.73,45.15a8,8,0,0,0-2.83,6.07l-.15,33.65-29.83,17a8,8,0,0,0-3.89,5.4,106.47,106.47,0,0,0,0,41.56Z', label: 'Reliable partner' },
    { icon: 'M197.58,129.06l-51.61-19-19-51.65a15.92,15.92,0,0,0-29.88,0L78.07,110l-51.65,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0l19-51.61,51.65-19a15.92,15.92,0,0,0,0-29.88Z', label: 'Fast execution' },
    { icon: 'M223.68,66.15,135.68,18h0a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32h0l80.34,44L128,120,47.66,76ZM40,90l80,43.78v85.79L40,175.82Zm96,129.57V133.82L216,90v85.78Z', label: 'Thoughtful feedback' },
    { icon: 'M224,48V76a8,8,0,0,1-16,0V48H180a8,8,0,0,1,0-16h28A16,16,0,0,1,224,48Zm-8,124a8,8,0,0,0-8,8v28H180a8,8,0,0,0,0,16h28a16,16,0,0,0,16-16V180A8,8,0,0,0,216,172ZM76,208H48V180a8,8,0,0,0-16,0v28a16,16,0,0,0,16,16H76a8,8,0,0,0,0-16ZM40,84a8,8,0,0,0,8-8V48H76a8,8,0,0,0,0-16H48A16,16,0,0,0,32,48V76A8,8,0,0,0,40,84Z', label: 'Smooth handoff' }
  ]

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm mb-6 border border-black/10 shadow-sm">
            <span className="w-1.5 h-1.5 bg-black/40 rounded-full" />
            <em className="not-italic text-black/50 font-serif text-lg">Pricing</em>
            <span className="w-1.5 h-1.5 bg-black/40 rounded-full" />
          </span>
          <h2 className="text-[32px] font-medium tracking-[-0.04em]">
            Fixed Price, Zero Limits
          </h2>
        </motion.div>

        {/* Main Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl p-8 md:p-10"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            boxShadow: '0px 0px 0px 8px rgba(255, 255, 255, 0.25), 12px 16px 16px 0px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left - Price & CTA */}
            <div className="space-y-6">
              {/* Toggle */}
              <div className="flex items-center gap-3">
                <span className={`font-medium ${isMonthly ? 'text-black' : 'text-black/25'}`}>Monthly</span>
                <button
                  onClick={() => setIsMonthly(!isMonthly)}
                  className="relative w-14 h-7 rounded-full transition-colors"
                  style={{ backgroundColor: '#FF5E00', boxShadow: '0px 0px 0px 3px rgba(255, 255, 255, 0.25)' }}
                >
                  <motion.div
                    animate={{ x: isMonthly ? 2 : 26 }}
                    className="absolute top-1 w-5 h-5 bg-white rounded-full"
                  />
                </button>
                <span className={`font-medium ${!isMonthly ? 'text-black' : 'text-black/25'}`}>Custom</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-1">
                <span className="text-5xl md:text-6xl font-bold">$7,500</span>
                <span className="text-xl text-black/25">/mo</span>
              </div>

              {/* Booking Info */}
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm">Booking Open — only 2 Spots Left</span>
              </div>

              {/* CTA Button */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-black text-white rounded-full font-semibold"
                style={{
                  boxShadow: '0px -16px 48px 0px rgb(0, 0, 0) inset, 24px 24px 74px -2.5px rgba(0, 0, 0, 0.18)'
                }}
              >
                Book Free Discovery Call
                <ArrowRight className="w-4 h-4 opacity-50" />
              </motion.a>
            </div>

            {/* Right - Features Card */}
            <motion.div
              style={{ rotate: 1 }}
              className="p-6 rounded-xl"
              initial={{ backgroundColor: 'rgba(255, 255, 255, 0.75)' }}
            >
              <h3 className="font-semibold mb-4">What's included</h3>
              <div className="space-y-3">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 256 256" fill="currentColor">
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z" />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div className="mt-8 pt-6 border-t border-black/10">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="https://framerusercontent.com/images/etglVFVv5e7VnmUVyHsNK3oyIbI.png"
                    alt="Helena Moreau"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm">Helena Moreau</p>
                    <p className="text-xs text-black/50">Creative Director at Studio Novo</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed">
                  Astrid's minimalist design approach transformed our brand. The simplicity and clarity she brought to our identity made us stand out in a crowded market.
                  <span className="text-black/25 font-bold ml-1">"</span>
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {benefits.map((benefit) => (
            <div key={benefit.label} className="flex items-center gap-3 py-3">
              <svg className="w-5 h-5 text-black/50 flex-shrink-0" viewBox="0 0 256 256" fill="currentColor">
                <path d={benefit.icon} />
              </svg>
              <span className="text-sm">{benefit.label}</span>
              <div className="flex-1 h-px bg-black/10 hidden sm:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// FAQ Section - Framer Style with 2 columns
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What's the difference between a subscription and a custom project?",
      answer: 'The subscription is ongoing and flexible — ideal for continuous design needs. Custom projects are one-time, fixed-scope engagements for larger goals like a rebrand or product launch.'
    },
    {
      question: 'How fast is the turnaround?',
      answer: "Most requests are delivered within 1–2 business days. Larger tasks may take longer, but you'll always be kept in the loop."
    },
    {
      question: 'How many requests can I make?',
      answer: 'As many as you like — with a subscription, you can queue unlimited requests, and they\'ll be handled one at a time in priority order.'
    },
    {
      question: 'What types of design do you handle?',
      answer: 'Websites, product UI, landing pages, brand assets, decks, social media visuals — anything digital that needs to look and feel sharp.'
    },
    {
      question: 'What tools do you use?',
      answer: 'Figma for design, Notion for task management, and Slack or email for async communication.'
    },
    {
      question: 'Can I pause the subscription?',
      answer: 'Yes — you can pause anytime and resume when you\'re ready. Unused days roll over.'
    },
    {
      question: 'Do you offer development too?',
      answer: 'Joris focuses on design only, but all deliverables are dev-ready. He can also recommend trusted no-code or Webflow/Framer developers if needed.'
    }
  ]

  return (
    <section id="faq" className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm mb-6 border border-black/10 shadow-sm">
            <span className="w-1.5 h-1.5 bg-black/40 rounded-full" />
            <em className="not-italic text-black/50 font-serif text-lg">FAQ</em>
            <span className="w-1.5 h-1.5 bg-black/40 rounded-full" />
          </span>
          <h2 className="text-[32px] font-medium tracking-[-0.04em]">
            Your Questions, Answered
          </h2>
        </motion.div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ rotate: -2 }}
            className="p-6 rounded-2xl h-fit"
            data-card
          >
            <div
              className="p-6 rounded-2xl"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                boxShadow: '0px 0px 0px 8px rgba(255, 255, 255, 0.25), 12px 16px 16px 0px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Photo */}
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                <img
                  src="https://framerusercontent.com/images/zRVCa2eOgJIf1mJK5PYcBLrYI.png"
                  alt="Joris van Dijk"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-6">
                Have more questions? Book a free discovery call
              </h3>

              {/* CTA Button */}
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-black text-white rounded-full font-semibold w-full justify-center mb-4"
                style={{
                  boxShadow: '0px -16px 48px 0px rgb(0, 0, 0) inset, 24px 24px 74px -2.5px rgba(0, 0, 0, 0.18)'
                }}
              >
                Book a Discovery Call
                <ArrowRight className="w-4 h-4 opacity-50" />
              </motion.a>

              {/* Email */}
              <p className="text-sm text-center">
                Or, email me at{' '}
                <a href="mailto:joris@hanzo.com" className="underline hover:text-[#FF3700] transition-colors">
                  joris@hanzo.com
                </a>
              </p>
            </div>
          </motion.div>

          {/* Right - FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="border-t border-black/25"
          >
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border-b border-black/25"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full py-6 flex items-center justify-between text-left gap-4"
                >
                  <span className="font-semibold">{faq.question}</span>
                  <div className="flex-shrink-0">
                    <svg
                      className="w-5 h-5 transition-transform"
                      viewBox="0 0 256 256"
                      fill="#FF3700"
                      style={{
                        opacity: 0.75,
                        transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
                    </svg>
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-black/60">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}


// Footer - Framer Style with sticky reveal effect
function Footer() {
  return (
    <footer className="sticky bottom-0 left-0 right-0 -z-10">
      {/* Main Footer Container with border */}
      <div className="mx-4 sm:mx-6 mb-4 rounded-2xl overflow-hidden border-8 border-[#D9D9D9]">
        {/* Black Background with effects */}
        <div className="relative bg-black text-white py-20 px-6 sm:px-12 overflow-hidden">
          {/* Radial gradient background */}
          <div
            className="absolute inset-0 opacity-100"
            style={{
              background: 'radial-gradient(100% 100% at 0% 0%, rgb(46, 46, 46) 0%, rgb(0, 0, 0) 100%)',
              mask: 'radial-gradient(125% 100% at 0% 0%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.224) 88%, rgba(0, 0, 0, 0) 100%)'
            }}
          />

          {/* Diagonal light stripes */}
          <div className="absolute inset-0 overflow-hidden opacity-5">
            <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent" style={{ transform: 'skewX(45deg)', left: '10%', width: '2px' }} />
            <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent" style={{ transform: 'skewX(45deg)', left: '30%', width: '1px' }} />
            <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent" style={{ transform: 'skewX(45deg)', left: '50%', width: '2px' }} />
            <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent" style={{ transform: 'skewX(45deg)', left: '70%', width: '1px' }} />
            <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent" style={{ transform: 'skewX(45deg)', left: '85%', width: '2px' }} />
          </div>

          {/* Noise texture */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
              backgroundSize: '150px'
            }}
          />

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/50 max-w-[100px]" />
              <em className="text-white/50 font-serif text-lg not-italic">2 spots available</em>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/50 max-w-[100px]" />
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Let's </span>
              <span className="text-white/50">Connect</span>
            </h2>

            {/* Description */}
            <p className="text-white text-lg mb-10 max-w-lg mx-auto">
              Feel free to contact me if having any questions. I'm available for new projects or just for chatting.
            </p>

            {/* CTA Button */}
            <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-white/30">
              <motion.a
                href="#"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-semibold"
                style={{
                  boxShadow: '0px -16px 48px 0px rgb(0, 0, 0) inset, 24px 24px 74px -2.5px rgba(0, 0, 0, 0.18)'
                }}
              >
                Book a free intro call
                <ArrowRight className="w-4 h-4 opacity-50" />
              </motion.a>
            </div>
          </div>

          {/* Bottom Content */}
          <div className="relative z-10 mt-20 pt-8 border-t border-white/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Copyright */}
              <p className="text-white text-sm">© Hanzo Studio, 2025</p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a href="#" className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 256 256" fill="currentColor">
                    <path d="M128,24a104,104,0,0,0,0,208c21.51,0,44.1-6.48,60.43-17.33a8,8,0,0,0-8.86-13.33C166,210.38,146.21,216,128,216a88,88,0,1,1,88-88c0,26.45-10.88,32-20,32s-20-5.55-20-32V88a8,8,0,0,0-16,0v4.26a48,48,0,1,0,5.93,65.1c6,12,16.35,18.64,30.07,18.64,22.54,0,36-17.94,36-48A104.11,104.11,0,0,0,128,24Zm0,136a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 256 256" fill="currentColor">
                    <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 256 256" fill="currentColor">
                    <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center text-white/50 hover:text-white hover:border-white transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 256 256" fill="currentColor">
                    <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main App
function App() {
  useEffect(() => {
    // Add marquee animation styles
    const style = document.createElement('style')
    style.textContent = `
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        animation: marquee 20s linear infinite;
      }
    `
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [])

  return (
    <div className="min-h-screen relative">
      {/* Main content wrapper with background */}
      <div className="relative z-10 bg-[#E8E8E8]">
        <Header />
        <Hero />
        <Services />
        <LogoTicker />
        <ImageShowcase />
        <About />
        <Process />
        <Work />
        <Pricing />
        <FAQ />
        {/* Spacer for sticky footer reveal */}
        <div className="h-[500px]" />
      </div>
      <Footer />
    </div>
  )
}

export default App
