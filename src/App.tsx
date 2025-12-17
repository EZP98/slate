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

// Hero Section with Image Slideshow - Framer Style
function Hero() {
  const [currentImage, setCurrentImage] = useState(0)
  const images = [
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=400&h=300&fit=crop',
  ]

  const logos = ['Stripe', 'Notion', 'Slack', 'Linear']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24 pb-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        {/* Booking Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-black/10 rounded-full mb-8 shadow-sm"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium">Booking Open — 2 Spots Left</span>
        </motion.div>

        {/* Main Heading - Framer Layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Row 1: Unlimited [Slideshow] Design */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-2">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[120px] font-bold tracking-tight">
              Unlimited
            </h1>

            {/* Slideshow embedded */}
            <motion.div
              style={{ rotate: -2 }}
              className="relative w-[120px] h-[90px] sm:w-[180px] sm:h-[135px] md:w-[220px] md:h-[165px] rounded-2xl overflow-hidden border-2 border-black shadow-xl flex-shrink-0"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={images[currentImage]}
                  alt="Design showcase"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </motion.div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[120px] font-bold tracking-tight text-black/50">
              Design
            </h1>
          </div>

          {/* Row 2: for [Logo Ticker] */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-2">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[120px] font-bold tracking-tight text-black/50">
              for
            </h1>

            {/* Logo Ticker embedded */}
            <motion.div
              style={{ rotate: 2 }}
              className="relative px-4 py-2 sm:px-6 sm:py-3 bg-white border-2 border-black rounded-full shadow-xl overflow-hidden flex-shrink-0"
            >
              <div className="flex items-center gap-4 sm:gap-6">
                {logos.map((logo) => (
                  <span key={logo} className="text-lg sm:text-xl md:text-2xl font-medium text-black/70 whitespace-nowrap">
                    {logo}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Row 3: Solid Startups */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[120px] font-bold tracking-tight">
              Solid Startups
            </h1>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto mt-12 mb-10"
        >
          We help startups and brands create beautiful, functional products — fast and hassle-free.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#pricing"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF3700] text-white rounded-full font-semibold hover:bg-[#E63200] transition-colors shadow-lg"
          >
            See Plans
            <ArrowRight className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="#work"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-text rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg border border-black/10"
          >
            View Work
          </motion.a>
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

// About Section
function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          <motion.div variants={fadeInUp}>
            <span className="inline-block px-4 py-2 bg-white rounded-full text-sm font-medium mb-6 border border-black/10 shadow-sm">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
              We're a creative studio building brands that stand out
            </h2>
            <p className="text-text-muted text-lg mb-8">
              Founded in 2020, Hanzo has helped over 100+ startups transform their
              visual identity. We believe great design should be accessible to
              everyone, which is why we created a subscription model that works.
            </p>
            <div className="flex gap-8">
              <div>
                <p className="text-4xl sm:text-5xl font-bold text-[#FF3700]">100+</p>
                <p className="text-text-muted">Happy Clients</p>
              </div>
              <div>
                <p className="text-4xl sm:text-5xl font-bold text-[#FF3700]">500+</p>
                <p className="text-text-muted">Projects Done</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="relative">
            <motion.div
              whileHover={{ rotate: 0 }}
              animate={{ rotate: 3 }}
              className="aspect-square rounded-3xl overflow-hidden border-2 border-black shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                alt="Team"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              animate={{ rotate: [0, 5, 0], y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 w-28 h-28 bg-[#FF3700] rounded-2xl shadow-xl"
            />
            <motion.div
              animate={{ rotate: [0, -5, 0], y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -top-4 -left-4 w-20 h-20 bg-[#FFD500] rounded-xl shadow-lg"
            />
          </motion.div>
        </motion.div>
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

// Work/Projects Section
function Work() {
  const projects = [
    {
      title: 'Fintech Dashboard',
      category: 'Web Design',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'
    },
    {
      title: 'E-commerce Rebrand',
      category: 'Branding',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
    },
    {
      title: 'Health App UI',
      category: 'Mobile App',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800'
    },
    {
      title: 'SaaS Landing Page',
      category: 'Web Design',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800'
    }
  ]

  return (
    <section id="work" className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <span className="inline-block px-4 py-2 bg-white rounded-full text-sm font-medium mb-6 border border-black/10 shadow-sm">
              Our Work
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Recent Projects
            </h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[#FF3700] font-semibold hover:gap-3 transition-all"
          >
            View All <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <motion.article
              key={project.title}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-4 border-2 border-black shadow-xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-text-muted text-sm">{project.category}</span>
              <h3 className="text-xl sm:text-2xl font-bold group-hover:text-[#FF3700] transition-colors">
                {project.title}
              </h3>
            </motion.article>
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
