import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X, ArrowRight, Plus, Minus, Star, Sparkles, Layout, FileCode, Zap, Search, Grid3X3 } from 'lucide-react'

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
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 leading-none">
            <span className="text-[clamp(3rem,10vw,7rem)] font-bold tracking-[-0.02em]">
              Unlimited
            </span>

            {/* Slideshow - Vertical scroll effect */}
            <motion.div
              style={{ rotate: -2 }}
              className="relative w-[100px] h-[75px] sm:w-[140px] sm:h-[105px] md:w-[160px] md:h-[120px] rounded-xl overflow-hidden border border-black/80 shadow-lg flex-shrink-0"
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

            <span className="text-[clamp(3rem,10vw,7rem)] font-bold tracking-[-0.02em] text-black/50">
              Design
            </span>
          </div>

          {/* Row 2: for [Logo Ticker] */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 leading-none mt-1">
            <span className="text-[clamp(3rem,10vw,7rem)] font-bold tracking-[-0.02em] text-black/50">
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
            <span className="text-[clamp(3rem,10vw,7rem)] font-bold tracking-[-0.02em]">
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

// Process Section
function Process() {
  const steps = [
    {
      number: '01',
      title: 'Subscribe',
      description: 'Pick a plan that fits your needs. No contracts, cancel anytime.',
      color: '#FFD500'
    },
    {
      number: '02',
      title: 'Request',
      description: 'Submit unlimited design requests through our simple dashboard.',
      color: '#05A9FF'
    },
    {
      number: '03',
      title: 'Receive',
      description: 'Get your designs delivered in 48 hours on average. Revise until perfect.',
      color: '#52FF69'
    }
  ]

  return (
    <section id="process" className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[#E8E8E8] rounded-full text-sm font-medium mb-6">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Simple Process, Great Results
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              variants={fadeInUp}
              whileHover={{ y: -10, rotate: i === 1 ? 0 : (i === 0 ? -2 : 2) }}
              className="p-8 rounded-3xl border-2 border-black shadow-xl"
              style={{ backgroundColor: step.color }}
            >
              <span className="text-6xl font-bold text-black/20 mb-4 block">
                {step.number}
              </span>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-black/70">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
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

// Testimonials Section
function Testimonials() {
  const testimonials = [
    {
      quote: "Hanzo transformed our brand completely. The subscription model is genius - we get unlimited revisions and the quality is always top-notch.",
      author: "Sarah Chen",
      role: "CEO, TechFlow",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
    },
    {
      quote: "Best investment we've made. The turnaround time is incredible and the designs consistently exceed our expectations.",
      author: "Marcus Rodriguez",
      role: "Founder, Skyline",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
    },
    {
      quote: "Finally, a design service that understands startups. Fast, flexible, and affordable. Highly recommended!",
      author: "Emily Watson",
      role: "CMO, GrowthLab",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 bg-[#1A1A1A] text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            What Our Clients Say
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              variants={fadeInUp}
              whileHover={{ y: -10, rotate: i === 1 ? 0 : (i === 0 ? -1 : 1) }}
              className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FF3700] text-[#FF3700]" />
                ))}
              </div>
              <p className="text-white/80 mb-6">{t.quote}</p>
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                />
                <div>
                  <p className="font-semibold">{t.author}</p>
                  <p className="text-white/60 text-sm">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Pricing Section
function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$1,995',
      period: '/month',
      description: 'Perfect for startups and small teams',
      features: [
        'One request at a time',
        'Average 48h delivery',
        'Unlimited revisions',
        'Pause or cancel anytime'
      ],
      featured: false,
      color: '#FFD500'
    },
    {
      name: 'Pro',
      price: '$3,995',
      period: '/month',
      description: 'For growing companies with more needs',
      features: [
        'Two requests at a time',
        'Average 24h delivery',
        'Unlimited revisions',
        'Priority support',
        'Pause or cancel anytime'
      ],
      featured: true,
      color: '#FF3700'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large teams with custom needs',
      features: [
        'Unlimited requests',
        'Same-day delivery',
        'Dedicated designer',
        '24/7 support',
        'Custom integrations'
      ],
      featured: false,
      color: '#52FF69'
    }
  ]

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-white rounded-full text-sm font-medium mb-6 border border-black/10 shadow-sm">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            No surprises. No hidden fees. Pick a plan that works for you.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={fadeInUp}
              whileHover={{ y: -10, rotate: i === 1 ? 0 : (i === 0 ? -1 : 1) }}
              className={`p-8 rounded-3xl border-2 border-black shadow-xl ${
                plan.featured
                  ? 'bg-[#1A1A1A] text-white'
                  : 'bg-white'
              }`}
            >
              {plan.featured && (
                <span className="inline-block px-3 py-1 bg-[#FF3700] text-white text-xs font-semibold rounded-full mb-4">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className={plan.featured ? 'text-white/60 mb-6' : 'text-text-muted mb-6'}>
                {plan.description}
              </p>
              <div className="mb-6">
                <span className="text-4xl sm:text-5xl font-bold">{plan.price}</span>
                <span className={plan.featured ? 'text-white/60' : 'text-text-muted'}>
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5"
                      style={{ color: plan.color }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className={plan.featured ? 'text-white/80' : ''}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-full font-semibold transition-colors border-2 border-black ${
                  plan.featured
                    ? 'bg-[#FF3700] text-white hover:bg-[#E63200]'
                    : 'bg-[#1A1A1A] text-white hover:bg-black'
                }`}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// FAQ Section
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'How does the subscription work?',
      answer: 'Simply choose a plan and submit as many design requests as you need. We work on them one at a time (or two for Pro) and deliver within 48 hours on average.'
    },
    {
      question: "What if I don't like the design?",
      answer: "No worries! We offer unlimited revisions. We'll keep iterating until you're 100% satisfied with the result."
    },
    {
      question: 'Can I really pause or cancel anytime?',
      answer: "Yes! There are no contracts or commitments. Pause when you don't need design work, and resume when you do."
    },
    {
      question: 'What types of design do you cover?',
      answer: 'We handle everything from web and mobile UI design, branding, social media graphics, presentations, and more.'
    },
    {
      question: 'Who are the designers?',
      answer: 'Our team consists of senior designers with 5+ years of experience working with startups and Fortune 500 companies.'
    }
  ]

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[#E8E8E8] rounded-full text-sm font-medium mb-6">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Got Questions?
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-4"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="rounded-2xl bg-[#E8E8E8] overflow-hidden border border-black/10"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  {openIndex === i ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="px-6 pb-6 text-text-muted">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// CTA Section
function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative p-12 sm:p-16 rounded-3xl bg-[#1A1A1A] text-white text-center overflow-hidden border-2 border-black shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF3700] rounded-full blur-[100px] opacity-30" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FFD500] rounded-full blur-[80px] opacity-20" />

          <div className="relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform
              <br />
              Your Brand?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Join 100+ startups already growing with Hanzo. Start your design journey today.
            </p>
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF3700] text-white rounded-full font-semibold hover:bg-[#E63200] transition-colors shadow-lg"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 border-t border-black/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <span className="text-2xl font-bold">Hanzo</span>
            <p className="text-text-muted mt-2">Design subscriptions for startups</p>
          </div>

          <div className="flex gap-6">
            <a href="#work" className="text-text-muted hover:text-text transition-colors">Work</a>
            <a href="#about" className="text-text-muted hover:text-text transition-colors">About</a>
            <a href="#pricing" className="text-text-muted hover:text-text transition-colors">Pricing</a>
            <a href="#faq" className="text-text-muted hover:text-text transition-colors">FAQ</a>
          </div>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md border border-black/10">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md border border-black/10">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-black/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-text-muted text-sm">
          <p>&copy; 2024 Hanzo. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-text transition-colors">Privacy</a>
            <a href="#" className="hover:text-text transition-colors">Terms</a>
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
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <LogoTicker />
      <ImageShowcase />
      <About />
      <Process />
      <Work />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  )
}

export default App
