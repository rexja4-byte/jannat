import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Menu, X, Shield, Database, Cpu, Wifi, ChevronRight, ChevronLeft, ArrowRight, GraduationCap, HeartHandshake, MapPin, Sun, Leaf, Users, Newspaper, Lightbulb, ZoomIn, Coffee, Phone, Mail } from 'lucide-react';

const galleryImages = [
  { src: 'https://i.postimg.cc/Pf1KgGVF/656296734-122223271298048356-6897526949192723431-n.jpg', alt: 'Jannatul at Orenda & Beans Cafe', category: 'Business' },
  { src: 'https://orendabeans.com/wp-content/uploads/2025/06/Jannatul.jpg', alt: 'Distributing relief during floods', category: 'Humanitarian' },
  { src: 'https://orendabeans.com/wp-content/uploads/2025/06/orenda-social-01-768x1021.webp', alt: 'Speaking at a women empowerment seminar', category: 'Speaking' },
  { src: 'https://orendabeans.com/wp-content/uploads/2025/06/orenda-social-05-768x1020.webp', alt: 'Solar panel installation at the cafe', category: 'Sustainability' },
  { src: 'https://orendabeans.com/wp-content/uploads/2023/10/orenda-human-2-new-768x577.png', alt: 'Spending time with children at the orphanage', category: 'Humanitarian' },
  { src: 'https://orendabeans.com/wp-content/uploads/2024/02/Shelter-Home-Treats-2-768x576.jpg', alt: 'Receiving an award for social impact', category: 'Awards' }
];

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Enterprise', href: '#cafe' },
  { name: 'Impact', href: '#humanitarian' },
  { name: 'Achievements', href: '#achievements' },
];

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'contact'>('home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen || selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen, selectedImage]);

  return (
    <div className="min-h-screen font-sans text-ink selection:bg-accent selection:text-white">
      
      {/* Header matching the reference */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-md border-b border-line py-3' : 'bg-white border-b border-line py-4'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); window.scrollTo(0,0); }} className="flex items-center gap-3 z-50">
            <img src="https://i.postimg.cc/XvPwtx0Q/unnamed.jpg" alt="Avatar" className="w-10 h-10 rounded-full object-cover border border-line" onError={(e) => { e.currentTarget.src = 'https://picsum.photos/seed/jf-avatar/100/100'; }} />
            <span className="font-bold text-xl tracking-tight">
              Jannat<span className="text-accent">Orenda</span><span className="text-ink-muted font-medium">.com</span>
            </span>
          </a>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, idx) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => {
                  if (currentPage !== 'home') {
                    e.preventDefault();
                    setCurrentPage('home');
                    setTimeout(() => {
                      if (link.href === '#') window.scrollTo(0,0);
                      else {
                        const el = document.querySelector(link.href);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }
                }}
                className={`text-[15px] font-semibold transition-colors ${idx === 0 ? 'text-accent' : 'text-ink-muted hover:text-ink'}`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-6">
            <div className="w-[1px] h-6 bg-line"></div>
            <button className="text-ink-muted hover:text-ink transition-colors">
              <Search size={20} strokeWidth={2.5} />
            </button>
            <button 
              onClick={() => { setCurrentPage('contact'); window.scrollTo(0,0); }}
              className="bg-[#0F172A] hover:bg-black text-white px-6 py-2.5 rounded-lg font-semibold text-[15px] transition-colors shadow-sm"
            >
              Let's Talk
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden z-50 relative p-2 -mr-2 text-ink"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 pb-12 flex flex-col md:hidden"
          >
            <nav className="flex flex-col space-y-6 mt-8">
              {navLinks.map((link, i) => (
                <motion.a 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  href={link.href} 
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    if (currentPage !== 'home') {
                      e.preventDefault();
                      setCurrentPage('home');
                      setTimeout(() => {
                        if (link.href === '#') window.scrollTo(0,0);
                        else {
                          const el = document.querySelector(link.href);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }
                  }}
                  className={`text-3xl font-bold tracking-tight transition-colors ${i === 0 ? 'text-accent' : 'text-ink hover:text-accent'}`}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-4">
              <button 
                onClick={() => { setIsMobileMenuOpen(false); setCurrentPage('contact'); window.scrollTo(0,0); }}
                className="w-full bg-[#0F172A] text-white px-6 py-4 rounded-xl font-bold text-lg shadow-sm"
              >
                Let's Talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Hero Section matching the reference */}
        <section className="relative pt-32 pb-20 min-h-[90vh] flex flex-col items-center justify-center bg-grid-pattern overflow-hidden px-6">
          
          {/* Floating Background Icons */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div animate={{ y: [0, -20, 0], rotate: [-12, -5, -12] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[20%] left-[5%]">
              <Coffee className="text-[#1F1F1F]/20 w-24 h-24" strokeWidth={2} />
            </motion.div>
            <motion.div animate={{ y: [0, 15, 0], rotate: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[30%] left-[15%]">
              <Leaf className="text-[#2A140E]/30 w-16 h-16" strokeWidth={1.5} />
            </motion.div>
            <motion.div animate={{ y: [0, -15, 0], x: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute top-[10%] right-[10%]">
              <HeartHandshake className="text-[#20C1C1]/30 w-20 h-20" strokeWidth={1.5} />
            </motion.div>
            <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-[40%] right-[15%]">
              <Users className="text-[#2A140E]/20 w-16 h-16" strokeWidth={1.5} />
            </motion.div>
            <motion.div animate={{ y: [0, -25, 0], rotate: [0, -10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute bottom-[30%] left-[10%]">
              <Sun className="text-[#20C1C1]/40 w-20 h-20" strokeWidth={1.5} />
            </motion.div>
            <motion.div animate={{ y: [0, 15, 0], x: [0, -10, 0] }} transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} className="absolute bottom-[10%] left-[5%]">
              <Lightbulb className="text-[#1F1F1F]/30 w-20 h-20" strokeWidth={1.5} />
            </motion.div>
          </div>

          {/* Avatar Ring */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.8 }}
            className="relative z-10 mb-8"
          >
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full p-[3px] bg-gradient-to-tr from-[#2A140E] via-[#20C1C1] to-[#1F1F1F] shadow-[0_0_40px_rgba(32,193,193,0.3)]">
              <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-white">
                <img src="https://i.postimg.cc/XvPwtx0Q/unnamed.jpg" alt="Jannat Ferdouse" className="w-full h-full object-cover object-top" onError={(e) => { e.currentTarget.src = 'https://picsum.photos/seed/jf-hero/400/400'; }} />
              </div>
            </div>
          </motion.div>

          {/* Pill Badge */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.15 }}
            className="relative z-10 bg-white border border-line px-5 py-2 rounded-full text-sm font-bold tracking-widest text-ink-muted mb-8 shadow-sm flex items-center gap-2 uppercase"
          >
            <span className="text-yellow-500 text-lg leading-none">⚡</span> ECO-ENTREPRENEUR & HUMANITARIAN
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
            className="relative z-10 text-[54px] font-extrabold text-center max-w-5xl leading-[1.1] tracking-tight text-ink mb-8"
          >
            Hi, I'm Jannat — I build <span className="inline-block bg-accent text-white px-5 py-1 md:py-2 rounded-2xl -rotate-2 shadow-lg mx-1 md:mx-3 transform hover:rotate-0 transition-transform duration-300">sustainable</span> businesses & empower communities.
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.45 }}
            className="relative z-10 text-xl md:text-2xl text-ink-muted text-center max-w-3xl font-medium"
          >
            Eco-friendly cafe owner, women's empowerment advocate, and dedicated humanitarian — based in Dhaka 🌐
          </motion.p>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 border-t border-line max-w-[1400px] mx-auto bg-white">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className="text-sm font-bold tracking-widest text-accent uppercase mb-4">Background</div>
              <h2 className="text-4xl font-extrabold tracking-tight">The Journey</h2>
            </div>
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-2xl border border-line shadow-sm hover:shadow-md transition-shadow">
                <GraduationCap className="text-accent mb-6" size={32} />
                <h3 className="text-xl font-bold mb-3">Education</h3>
                <p className="text-ink-muted leading-relaxed font-medium">Honors & Masters in Marketing. Currently pursuing a second Masters in Development Studies at BUP.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl border border-line shadow-sm hover:shadow-md transition-shadow">
                <HeartHandshake className="text-accent mb-6" size={32} />
                <h3 className="text-xl font-bold mb-3">Experience</h3>
                <p className="text-ink-muted leading-relaxed font-medium">Over 9 years of experience working alongside national and international NGOs dedicated to social welfare.</p>
              </div>
              <div className="sm:col-span-2 bg-white p-8 rounded-2xl border border-line shadow-sm flex flex-col md:flex-row gap-8 items-center hover:shadow-md transition-shadow">
                 <div className="flex-1">
                   <h3 className="text-xl font-bold mb-3">The Catalyst</h3>
                   <p className="text-ink-muted leading-relaxed font-medium">Inspired by her elder brother, Monjur Miah, she stepped into entrepreneurship to create a sustainable funding source for her humanitarian efforts, breaking societal barriers as a solo female entrepreneur.</p>
                 </div>
                 <div className="w-full md:w-48 aspect-square rounded-xl overflow-hidden border border-line shrink-0">
                   <img src="https://i.postimg.cc/XvPwtx0Q/unnamed.jpg" alt="Jannatul Ferdouse" className="w-full h-full object-cover object-top" onError={(e) => { e.currentTarget.src = 'https://picsum.photos/seed/jf-about/400/400'; }} />
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Orenda & Beans Cafe Section */}
        <section id="cafe" className="py-24 px-6 border-t border-line bg-[#F8F5F1]">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-sm font-bold tracking-widest text-accent uppercase mb-4">Enterprise</div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-12">Orenda & Beans</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-white rounded-2xl border border-line overflow-hidden flex flex-col md:flex-row shadow-sm">
                <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 bg-[#EAE4DF] px-3 py-1.5 rounded-lg text-xs font-bold mb-6 w-fit border border-line text-ink-muted">
                    <MapPin size={14} className="text-accent" /> MIRPUR DOHS, DHAKA
                  </div>
                  <h3 className="text-3xl font-extrabold tracking-tight mb-4">A Green Revolution in Dining</h3>
                  <p className="text-ink-muted leading-relaxed font-medium">Pioneering eco-friendly business models. Moving away from traditional gas and electricity, the café operates on a state-of-the-art rooftop solar system.</p>
                </div>
                <div className="w-full md:w-2/5 min-h-[250px] bg-line relative border-l border-line">
                  {/* Replace src with your uploaded image URL (e.g., /cafe-photo.jpg) */}
                  <img src="https://i.postimg.cc/BZKpDjrk/608855077-122216183330048356-1621941167680771836-n.jpg" alt="Cafe Interior" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-2xl border border-line shadow-sm flex flex-col items-center justify-center text-center">
                <Sun size={40} className="text-accent mb-4" />
                <div className="text-5xl font-extrabold tracking-tighter mb-2">100%</div>
                <div className="text-sm font-bold text-ink-muted uppercase tracking-widest">Solar Powered Kitchen</div>
              </div>
              
              <div className="bg-white p-8 rounded-2xl border border-line shadow-sm flex flex-col items-center justify-center text-center">
                <Leaf size={40} className="text-accent mb-4" />
                <div className="text-3xl font-extrabold tracking-tight mb-2">Eco-Friendly</div>
                <div className="text-sm font-bold text-ink-muted uppercase tracking-widest">Paper Packaging</div>
              </div>
              
              <div className="md:col-span-2 bg-white p-8 rounded-2xl border border-line shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="bg-[#F8F5F1] p-4 rounded-xl border border-line shrink-0">
                  <Coffee size={32} className="text-accent" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">70+ Menu Items</h4>
                  <p className="text-ink-muted font-medium">Offering diverse options including pizza, seafood, and a highly demanded 240 BDT student lunch box.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Humanitarian Section */}
        <section id="humanitarian" className="py-24 px-6 border-t border-line bg-white">
          <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-sm font-bold tracking-widest text-accent uppercase mb-4">Impact</div>
              <h2 className="text-5xl lg:text-7xl font-extrabold tracking-tighter mb-8 leading-[1.1]">10 YEARS OF<br/><span className="text-accent">SERVICE.</span></h2>
              <p className="text-xl text-ink-muted leading-relaxed mb-12 font-medium">
                For a decade, Jannatul has been a frontline responder and a consistent pillar of support for the marginalized.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-6 group">
                  <div className="text-accent font-bold text-xl group-hover:translate-x-2 transition-transform">01</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Disaster Relief</h4>
                    <p className="text-ink-muted font-medium">Supported over 500 families during recent devastating floods, and actively responds to slum fires and extreme heatwaves.</p>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-line"></div>
                <div className="flex gap-6 group">
                  <div className="text-accent font-bold text-xl group-hover:translate-x-2 transition-transform">02</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Child & Elderly Care</h4>
                    <p className="text-ink-muted font-medium">Personally funds education, daily meals, and festival clothing for street children, while regularly supporting orphanages and elder care homes.</p>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-line"></div>
                <div className="flex gap-6 group">
                  <div className="text-accent font-bold text-xl group-hover:translate-x-2 transition-transform">03</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Pandemic Frontline</h4>
                    <p className="text-ink-muted font-medium">Used her personal savings to deliver essential groceries door-to-door to families in need during the peak of the Covid-19 lockdowns.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative aspect-square rounded-full border border-line flex items-center justify-center p-8 lg:p-16 bg-[#F8F5F1] shadow-inner">
               <div className="absolute inset-0 border border-dashed border-[#D1C8C1] rounded-full animate-[spin_60s_linear_infinite]"></div>
               <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center text-center p-8 shadow-xl border border-line">
                 <div className="text-7xl md:text-8xl font-extrabold tracking-tighter mb-4 text-ink">500+</div>
                 <div className="text-sm font-bold tracking-widest uppercase text-accent">Families Helped<br/>in Recent Floods</div>
               </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-24 px-6 border-t border-line bg-[#F8F5F1]">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-sm font-bold tracking-widest text-accent uppercase mb-4">Milestones</div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-12">Achievements & Awards</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* 2025 */}
              <div className="bg-white p-8 rounded-2xl border border-line shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-extrabold text-ink">2025</div>
                  <div className="bg-teal-50 text-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Business</div>
                </div>
                <h3 className="text-xl font-bold mb-3">Green Entrepreneur of the Year</h3>
                <p className="text-ink-muted font-medium leading-relaxed">Recognized by the Bangladesh Business Chamber for the pioneering 100% solar-powered initiative at Orenda & Beans Café.</p>
              </div>

              {/* 2023 */}
              <div className="bg-white p-8 rounded-2xl border border-line shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-extrabold text-ink">2023</div>
                  <div className="bg-teal-50 text-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Humanitarian</div>
                </div>
                <h3 className="text-xl font-bold mb-3">National Humanitarian Excellence</h3>
                <p className="text-ink-muted font-medium leading-relaxed">Awarded for frontline disaster relief efforts during the devastating floods, providing critical support to over 500 vulnerable families.</p>
              </div>

              {/* 2021 */}
              <div className="bg-white p-8 rounded-2xl border border-line shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-extrabold text-ink">2021</div>
                  <div className="bg-teal-50 text-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Empowerment</div>
                </div>
                <h3 className="text-xl font-bold mb-3">Women Empowerment Champion</h3>
                <p className="text-ink-muted font-medium leading-relaxed">Acknowledged by local NGOs for consistently funding education and creating safe, discrimination-free jobs for marginalized women.</p>
              </div>

              {/* 2020 */}
              <div className="bg-white p-8 rounded-2xl border border-line shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-extrabold text-ink">2020</div>
                  <div className="bg-teal-50 text-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Community</div>
                </div>
                <h3 className="text-xl font-bold mb-3">Covid-19 Frontline Hero</h3>
                <p className="text-ink-muted font-medium leading-relaxed">Commended by community leaders for personally funding and delivering essential groceries door-to-door during the peak pandemic lockdowns.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-24 px-6 border-t border-line bg-white">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className="text-sm font-bold tracking-widest text-accent uppercase mb-4">Media</div>
                <h2 className="text-4xl font-extrabold tracking-tight">Moments of Impact</h2>
              </div>
              <p className="text-ink-muted max-w-md font-medium">A visual journey through Jannatul's entrepreneurial ventures and humanitarian efforts.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <div 
                  key={index}
                  className="group relative aspect-square bg-white rounded-2xl overflow-hidden cursor-pointer border border-line shadow-sm"
                  onClick={() => setSelectedImage(image.src)}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-ink/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                    <div className="flex justify-end">
                      <ZoomIn className="text-white" size={24} />
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-widest text-accent uppercase mb-2">{image.category}</div>
                      <p className="text-white font-medium">{image.alt}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Press Section */}
        <section id="press" className="py-24 px-6 border-t border-line bg-[#F8F5F1]">
          <div className="max-w-[1400px] mx-auto text-center">
            <div className="text-sm font-bold tracking-widest text-accent uppercase mb-4">Recognition</div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-12">Featured In</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                'https://orendabeans.com/wp-content/uploads/2025/06/orenda-news-02-768x578.webp',
                'https://orendabeans.com/wp-content/uploads/2025/06/orenda-news-01-768x1361.webp',
                'https://orendabeans.com/wp-content/uploads/2025/06/orenda-news-03.webp',
                'https://orendabeans.com/wp-content/uploads/2025/06/orenda-news-04-768x1188.webp',
                'https://orendabeans.com/wp-content/uploads/2025/06/orenda-news-05.webp',
                'https://orendabeans.com/wp-content/uploads/2025/06/orenda-news-07-768x1073.webp',
                'https://orendabeans.com/wp-content/uploads/2025/06/orenda-news-10.webp',
                'https://orendabeans.com/wp-content/uploads/2025/06/orenda-news-08-768x608.webp',
                'https://orendabeans.com/wp-content/uploads/2025/06/orenda-news-06-768x450.webp'
              ].map((src, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ y: -5 }}
                  className="rounded-2xl overflow-hidden border border-line shadow-sm hover:shadow-md transition-all cursor-pointer bg-white flex items-center justify-center p-2" 
                  onClick={() => setSelectedImage(src)}
                >
                  <img src={src} alt={`News Feature ${idx + 1}`} className="w-full h-auto object-contain rounded-xl max-h-[300px]" referrerPolicy="no-referrer" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </motion.main>
        ) : (
          <motion.main
            key="contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="pt-32 pb-20 min-h-[80vh] px-6 max-w-[1400px] mx-auto"
          >
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-line overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/2 p-10 lg:p-14 bg-[#F8F5F1]">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Let's <span className="text-accent">Talk</span></h1>
                <p className="text-ink-muted font-medium mb-10 text-lg">
                  Whether you have a question about our humanitarian projects, want to collaborate, or just want to say hello, we'd love to hear from you.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm text-accent shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Visit Us</h3>
                      <p className="text-ink-muted font-medium">
                        Mirpur DOHS Branch<br />
                        R9PG+CMJ, Shagufta New Rd,<br />
                        Mirpur DOHS, Dhaka, Bangladesh
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm text-accent shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Call Us</h3>
                      <a href="tel:+8801675540681" className="text-ink-muted font-medium hover:text-accent transition-colors">
                        +8801675-540681
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm text-accent shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Email Us</h3>
                      <a href="mailto:hello@jannatorenda.com" className="text-ink-muted font-medium hover:text-accent transition-colors">
                        hello@jannatorenda.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/2 p-10 lg:p-14">
                <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-ink-muted uppercase tracking-wider mb-2">Full Name</label>
                    <input type="text" id="name" className="w-full px-4 py-3 rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all bg-[#F8F5F1]/50" placeholder="John Doe" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-ink-muted uppercase tracking-wider mb-2">Email Address</label>
                    <input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all bg-[#F8F5F1]/50" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-bold text-ink-muted uppercase tracking-wider mb-2">Subject</label>
                    <input type="text" id="subject" className="w-full px-4 py-3 rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all bg-[#F8F5F1]/50" placeholder="How can we help?" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-ink-muted uppercase tracking-wider mb-2">Message</label>
                    <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-xl border border-line focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all bg-[#F8F5F1]/50 resize-none" placeholder="Your message here..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-accent hover:bg-[#D96A1A] text-white px-6 py-4 rounded-xl font-bold text-lg shadow-sm transition-colors flex items-center justify-center gap-2">
                    Send Message <ArrowRight size={20} />
                  </button>
                </form>
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-sm p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-10"
              onClick={() => setSelectedImage(null)}
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer / Contact */}
      <footer id="footer" className="py-24 px-6 border-t border-line bg-[#F8F5F1]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div>
            <div className="font-extrabold tracking-tighter text-3xl mb-4">
              Jannat<span className="text-accent">Orenda</span><span className="text-ink-muted">.com</span>
            </div>
            <p className="text-ink-muted max-w-md font-medium">
              Building sustainable businesses and empowering communities through dedicated humanitarian efforts.
            </p>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto mt-16 pt-8 border-t border-line flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-ink-muted">
          <div>&copy; {new Date().getFullYear()} Jannat Orenda. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-accent" /> Dhaka, Bangladesh
          </div>
        </div>
      </footer>
    </div>
  );
}
