import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, Users, Bed, Bath, Phone, MessageCircle, X, ChevronLeft, ChevronRight, Home, Check, ExternalLink, ArrowUpRight, ArrowRight, Menu } from 'lucide-react';

/* ─── GLOBAL STYLES ─────────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink:    #0f0e0c;
    --paper:  #f7f4ef;
    --cream:  #ede8df;
    --gold:   #c9a96e;
    --gold2:  #e8d5a8;
    --muted:  #7a7469;
    --white:  #ffffff;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--paper);
    color: var(--ink);
    overflow-x: hidden;
  }

  .serif { font-family: 'Cormorant Garamond', serif; }

  /* ── Scrollbar ── */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--paper); }
  ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 99px; }

  /* ── HERO ── */
  .hero-slide {
    position: absolute; inset: 0;
    transition: opacity 1.8s cubic-bezier(.4,0,.2,1), transform 8s linear;
  }
  .hero-slide img { width: 100%; height: 100%; object-fit: cover; }
  .hero-slide.active { opacity: 1; transform: scale(1.06); }
  .hero-slide.inactive { opacity: 0; transform: scale(1); }

  /* ── Reveal animation ── */
  @keyframes revealUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes revealFade {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .reveal { opacity: 0; animation: revealUp .9s cubic-bezier(.2,.6,.2,1) forwards; }
  .reveal-fade { opacity: 0; animation: revealFade 1.2s ease forwards; }

  /* ── Gold rule ── */
  .gold-rule {
    display: inline-block;
    width: 48px; height: 1px;
    background: var(--gold);
    vertical-align: middle;
    margin-right: 12px;
  }

  /* ── Property Cards ── */
  .prop-card {
    background: var(--white);
    border-radius: 2px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    transition: box-shadow .5s ease;
  }
  .prop-card:hover { box-shadow: 0 32px 64px rgba(15,14,12,.12); }

  .prop-card-img { overflow: hidden; position: relative; }
  .prop-card-img img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform .9s cubic-bezier(.2,.6,.2,1);
  }
  .prop-card:hover .prop-card-img img { transform: scale(1.07); }

  .prop-badge {
    position: absolute; top: 20px; left: 20px;
    background: var(--gold);
    color: var(--ink);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: .12em;
    text-transform: uppercase;
    padding: 5px 12px;
    border-radius: 1px;
  }

  /* ── CTA Button ── */
  .btn-dark {
    display: inline-flex; align-items: center; gap: 10px;
    background: var(--ink);
    color: var(--white);
    padding: 14px 32px;
    border-radius: 1px;
    font-size: 13px;
    letter-spacing: .08em;
    text-transform: uppercase;
    text-decoration: none;
    border: none; cursor: pointer;
    transition: background .3s, gap .3s;
  }
  .btn-dark:hover { background: #2a2822; gap: 16px; }

  .btn-outline {
    display: inline-flex; align-items: center; gap: 10px;
    background: transparent;
    color: var(--ink);
    padding: 13px 32px;
    border-radius: 1px;
    font-size: 13px;
    letter-spacing: .08em;
    text-transform: uppercase;
    text-decoration: none;
    border: 1px solid var(--ink);
    cursor: pointer;
    transition: background .3s, color .3s, gap .3s;
  }
  .btn-outline:hover { background: var(--ink); color: var(--white); gap: 16px; }

  .btn-gold {
    display: inline-flex; align-items: center; gap: 10px;
    background: var(--gold);
    color: var(--ink);
    padding: 14px 32px;
    border-radius: 1px;
    font-size: 13px;
    letter-spacing: .08em;
    text-transform: uppercase;
    text-decoration: none;
    border: none; cursor: pointer;
    transition: background .3s, gap .3s;
  }
  .btn-gold:hover { background: #b8904a; gap: 16px; }

  /* ── Nav ── */
  .nav-link {
    font-size: 12px;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    transition: color .3s;
    position: relative;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: -3px; left: 0; right: 0;
    height: 1px; background: var(--gold);
    transform: scaleX(0); transition: transform .3s;
  }
  .nav-link:hover { color: var(--ink); }
  .nav-link:hover::after { transform: scaleX(1); }

  /* ── Mobile menu ── */
  .mobile-menu {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 200;
    background: var(--ink);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
    transform: translateX(100%);
    transition: transform .4s cubic-bezier(.2,.6,.2,1);
  }
  .mobile-menu.open { transform: translateX(0); }
  .mobile-menu-link {
    font-family: 'Cormorant Garamond', serif;
    font-size: 40px;
    font-weight: 300;
    color: var(--white);
    text-decoration: none;
    letter-spacing: .08em;
    transition: color .3s;
  }
  .mobile-menu-link:hover { color: var(--gold); }

  /* ── Modal ── */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 100;
    background: rgba(15,14,12,.7);
    backdrop-filter: blur(4px);
    overflow-y: auto;
  }
  .modal-panel {
    background: var(--paper);
    max-width: 1280px;
    margin: 0 auto;
    border-radius: 2px;
    position: relative;
  }

  /* ── Thumbnail strip ── */
  .thumb-strip { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; }
  .thumb-strip::-webkit-scrollbar { height: 3px; }
  .thumb-strip::-webkit-scrollbar-thumb { background: var(--gold); }
  .thumb { 
    flex: 0 0 80px; height: 60px; border-radius: 1px; overflow: hidden;
    cursor: pointer; opacity: .5; transition: opacity .3s;
    border: 1px solid transparent;
  }
  .thumb.active { opacity: 1; border-color: var(--gold); }
  .thumb:hover { opacity: .8; }
  .thumb img { width: 100%; height: 100%; object-fit: cover; }

  /* ── Amenity pill ── */
  .amenity-pill {
    font-size: 12px;
    padding: 6px 14px;
    border: 1px solid var(--cream);
    border-radius: 1px;
    color: var(--muted);
    white-space: nowrap;
  }

  /* ── Booking sidebar ── */
  .booking-card {
    background: var(--ink);
    color: var(--white);
    padding: 40px 32px;
    border-radius: 2px;
  }

  /* ── Feature cards ── */
  .feature-card {
    padding: 48px 40px;
    border: 1px solid var(--cream);
    border-radius: 2px;
    background: var(--white);
    transition: border-color .4s, transform .4s;
  }
  .feature-card:hover { border-color: var(--gold); transform: translateY(-4px); }

  /* ── Number accent ── */
  .num-accent {
    font-family: 'Cormorant Garamond', serif;
    font-size: 80px;
    font-weight: 300;
    line-height: 1;
    color: var(--cream);
    position: absolute;
    top: 20px; right: 24px;
    pointer-events: none;
  }

  /* ── Divider ── */
  .gold-divider {
    width: 100%; height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    margin: 0;
  }

  /* ── Marquee ── */
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .marquee-track { display: flex; white-space: nowrap; animation: marquee 25s linear infinite; }

  /* ── Full-screen lightbox ── */
  .lightbox {
    position: fixed; inset: 0; z-index: 200;
    background: #000;
    display: flex; align-items: center; justify-content: center;
  }

  /* ── Stats row ── */
  .stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 56px;
    font-weight: 300;
    line-height: 1;
    color: var(--gold);
  }

  /* ─────────────────────────────────────────
     MOBILE RESPONSIVE OVERRIDES
  ───────────────────────────────────────── */
  @media (max-width: 768px) {

    /* Nav */
    .nav-desktop { display: none !important; }
    .nav-hamburger { display: flex !important; }

    /* Hero */
    .hero-content {
      padding: 0 24px 60px !important;
    }
    .hero-dots {
      bottom: 60px !important;
      right: 24px !important;
    }

    /* Hero buttons */
    .hero-buttons {
      flex-direction: column !important;
      gap: 12px !important;
    }
    .hero-buttons a {
      justify-content: center !important;
      text-align: center !important;
    }

    /* WhyUs section */
    .whyus-inner {
      flex-direction: column !important;
      gap: 48px !important;
    }
    .whyus-left {
      flex: unset !important;
      min-width: unset !important;
    }
    .feature-card {
      padding: 32px 24px !important;
    }

    /* Properties grid */
    .props-grid {
      display: flex !important;
      flex-direction: column !important;
      gap: 16px !important;
    }
    .prop-promo-block {
      padding: 40px 28px !important;
    }

    /* About */
    .about-grid {
      grid-template-columns: 1fr !important;
      gap: 40px !important;
    }
    .about-collage {
      height: 320px !important;
    }
    .about-stats {
      gap: 24px !important;
    }

    /* Contact */
    .contact-buttons {
      flex-direction: column !important;
      align-items: center !important;
    }
    .contact-buttons a {
      width: 100% !important;
      justify-content: center !important;
    }
    .contact-locations {
      gap: 32px !important;
    }

    /* Modal */
    .modal-panel {
      margin: 0 !important;
      border-radius: 0 !important;
      min-height: 100vh;
    }
    .modal-hero-img {
      height: 300px !important;
    }
    .modal-body {
      grid-template-columns: 1fr !important;
      gap: 32px !important;
      padding: 24px 20px !important;
    }
    .modal-stats-grid {
      grid-template-columns: repeat(3, 1fr) !important;
    }
    .booking-card {
      padding: 28px 20px !important;
    }

    /* Section padding */
    .section-pad {
      padding: 80px 20px !important;
    }
    .section-pad-dark {
      padding: 64px 20px 80px !important;
    }
    .props-header {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 16px !important;
      margin-bottom: 40px !important;
    }

    /* Footer */
    .footer-inner {
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 20px !important;
    }
  }

  @media (min-width: 769px) {
    .nav-hamburger { display: none !important; }
    .mobile-menu { display: none !important; }
  }
`;

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const properties = [
  {
    id: 1,
    name: "Heritage Villa",
    subtitle: "Mysore",
    location: "Mysore, Karnataka",
    tagline: "Where History Meets Comfort",
    price: 40000,
    guests: 14, bedrooms: 6, bathrooms: 6,
    badge: "Heritage Stay",
    coverImage: "/images/mysore/exterior.jpg",
    images: [
      "/images/mysore/exterior.jpg","/images/mysore/living_room_1.jpg","/images/mysore/bedroom_one.jpg",
      "/images/mysore/bedroom_two.jpg","/images/mysore/bedroom_three.jpg","/images/mysore/bedroom_four.jpg",
      "/images/mysore/bedroom_five.jpg","/images/mysore/bedroom_six.jpg","/images/mysore/bathroom_one.jpg",
      "/images/mysore/bathroom_two.jpg","/images/mysore/bathroom_three.jpg","/images/mysore/bathroom_four.jpg",
      "/images/mysore/terrace.jpg","/images/mysore/terrace_two.jpg","/images/mysore/terrace_three.jpg"
    ],
    description: `An 80-year-old ancestral home, lovingly restored to blend timeless heritage with modern comfort. Located in the heart of Mysore, this spacious villa offers the perfect base to explore the city's royal legacy.\n\nWithin easy reach of Mysore's most iconic landmarks—Mysore Palace, Chamundi Hill, St. Philomena's Church, and vibrant local markets—this isn't just a place to stay. It's a living piece of history.\n\nThe 6-bedroom villa features high ceilings, antique furniture, and warm wooden accents, complemented by all modern amenities including air conditioning, fast WiFi, and 24/7 hot water.`,
    highlights: ["80-year heritage property","Walking distance to Mysore Palace","6 spacious bedrooms with AC","Beautiful garden & terrace","Modern amenities in historic setting"],
    amenities: ["WiFi","Parking","Kitchen","Air Conditioning","Hot Water","Garden","Balcony","Living Room","Dining Area","Courtyard","Housekeeping"],
    houseRules: ["Check-in: 2 PM","Check-out: 11 AM","No smoking inside","Maximum 14 guests","Respect heritage property"],
    whatsapp: "917090520216", phone: "+91 70905 20216"
  },
  {
    id: 2,
    name: "Raj Farms",
    subtitle: "Mangalore",
    location: "Mangalore, Karnataka",
    tagline: "A Peaceful Retreat in Nature",
    price: 25000,
    guests: 6, bedrooms: 3, bathrooms: 2,
    badge: "Farm Retreat",
    coverImage: "/images/rajfarms/ext_1.jpg",
    images: [
      "/images/rajfarms/ext_1.jpg","/images/rajfarms/ext_2.jpg","/images/rajfarms/ext_3.jpg",
      "/images/rajfarms/ext_4.jpg","/images/rajfarms/ground_common_area_1.jpg","/images/rajfarms/ground_common_area_2.jpg",
      "/images/rajfarms/floor_1_common_area.jpg","/images/rajfarms/bed_1_1.jpg","/images/rajfarms/bed_1_2.jpg",
      "/images/rajfarms/bed_2_1.jpg","/images/rajfarms/bed_2_2.jpg","/images/rajfarms/bath_1_1.jpg",
      "/images/rajfarms/dining_1.jpg","/images/rajfarms/balcony_1.jpg","/images/rajfarms/stairs.jpg"
    ],
    description: `Nestled in the lush farmlands near Mangalore, this peaceful retreat offers a unique blend of rural charm and modern comfort. Experience authentic coastal Karnataka culture while enjoying all contemporary amenities.\n\nThe property sits on agricultural land surrounded by fruitful farms, providing a serene escape from city life. With spacious common areas, balconies overlooking the countryside, and a unique farm-to-table culinary experience, this is more than just a stay—it's an immersion in nature.\n\nPerfect for families, small groups, or anyone seeking tranquility in a beautiful rural setting.`,
    highlights: ["Surrounded by active farmlands","Authentic coastal Karnataka experience","Farm-to-table dining available","Peaceful rural setting","Modern amenities"],
    amenities: ["WiFi","Parking","Kitchen","Hot Water","Balcony","Dining Area","Farm Views","Peaceful Location","Natural Setting"],
    houseRules: ["Check-in: 2 PM","Check-out: 11 AM","No smoking inside","Maximum 6 guests","Respect farm operations"],
    whatsapp: "917090520216", phone: "+91 70905 20216"
  },
  {
    id: 3,
    name: "Raj Retreat",
    subtitle: "Bejai, Mangalore",
    location: "Bejai, Mangalore, Karnataka",
    tagline: "Luxury Villa | Private Stay in Prime Location",
    price: 25000,
    guests: 12, bedrooms: 4, bathrooms: 3,
    badge: "City Luxury",
    coverImage: "/images/rajretreat/exterior.JPG",
    images: [
      "/images/rajretreat/exterior.JPG","/images/rajretreat/exterior_3.JPG","/images/rajretreat/exterior_4.JPG",
      "/images/rajretreat/exterior_5.JPG","/images/rajretreat/living_room.JPG","/images/rajretreat/living_rooom_2.JPG",
      "/images/rajretreat/bedroom_1.JPG","/images/rajretreat/bedroom_2.JPG","/images/rajretreat/bedroom_3.JPG",
      "/images/rajretreat/bedroom_4.JPG","/images/rajretreat/bedroom_5.JPG","/images/rajretreat/bathroom.JPG",
      "/images/rajretreat/Bathroom_2.JPG","/images/rajretreat/dining_area.JPG","/images/rajretreat/Dining_area_2.JPG"
    ],
    description: `A beautifully appointed 4-bedroom home nestled in the heart of Mangalore's sought-after Bejai neighbourhood on Pintos Lane. Ideal for families and groups of 8–12, this spacious villa offers the perfect blend of privacy, comfort, and convenience.\n\nDespite its prime central location, the property offers a calm and peaceful atmosphere — a true retreat away from the city's hustle. Enjoy expansive interiors, well-furnished bedrooms, and easy access to top attractions, popular cafés, and Mangalore's stunning beaches.\n\nWhether you're planning a relaxing getaway, a family celebration, or a work trip, Raj Retreat delivers an exceptional private stay with all the comforts of home.`,
    highlights: ["Prime location in Bejai, Pintos Lane","Quiet & private despite city-centre setting","4 spacious bedrooms for up to 12 guests","Easy access to beaches, cafés & attractions","Ideal for families, celebrations & work trips"],
    amenities: ["WiFi","Parking","Kitchen","Air Conditioning","Hot Water","Living Room","Dining Area","Housekeeping","Private Entrance","24/7 Access"],
    houseRules: ["Check-in: 2 PM","Check-out: 11 AM","No smoking inside","Maximum 12 guests","No loud music after 10 PM"],
    whatsapp: "917090520216", phone: "+91 70905 20216"
  },
  {
    id: 4,
    name: "Raj Heritage",
    subtitle: "Mangalore",
    location: "Mangalore, Karnataka",
    tagline: "Spacious Farmhouse | Lawn + Rural Serenity",
    price: 10000,
    guests: 4, bedrooms: 2, bathrooms: 2,
    badge: "Countryside",
    coverImage: "/images/rajheritage/exterior_2.JPG",
    images: [
      "/images/rajheritage/exterior_2.JPG","/images/rajheritage/exterior_2(1).JPG","/images/rajheritage/exterior_3.JPG",
      "/images/rajheritage/exterior_4.JPG","/images/rajheritage/entrance.JPG","/images/rajheritage/living_room.JPG",
      "/images/rajheritage/dining_hall.JPG","/images/rajheritage/kitchen_2.JPG","/images/rajheritage/bedroom__1.JPG",
      "/images/rajheritage/bedroom_1_1.JPG","/images/rajheritage/bedroom_2.JPG","/images/rajheritage/bathroom_1.JPG",
      "/images/rajheritage/bathroom_2.JPG","/images/rajheritage/veranda.JPG","/images/rajheritage/veranda_1.JPG"
    ],
    description: `Escape to a private 2-bedroom farmhouse set across acres of lush greenery, just 15 minutes from the city. Enjoy a massive open lawn, peaceful surroundings, and ample parking — perfect for relaxing getaways, intimate gatherings, or weekend retreats.\n\nExperience the perfect blend of nature, space, and comfort in this charming farmhouse. With a welcoming veranda, open dining hall, and fully equipped kitchen, every detail is designed to help you unwind.\n\nWhether you're looking for a quiet nature escape or a cosy base for exploring Mangalore's coast, Raj Heritage offers a truly refreshing stay surrounded by greenery.`,
    highlights: ["Private farmhouse on acres of lush greenery","Massive open lawn — ideal for gatherings","Just 15 minutes from the city centre","Ample parking space on premises","Charming veranda with open farm views"],
    amenities: ["WiFi","Free Parking","Kitchen","Air Conditioning","Firepit","Veranda","Open Lawn","Dining Hall","Living Room","Security Cameras","Smoking Allowed"],
    houseRules: ["Check-in: 2 PM","Check-out: 11 AM","Maximum 4 guests","Smoking allowed outdoors","Respect farm surroundings"],
    whatsapp: "917090520216", phone: "+91 70905 20216"
  }
];

const WHATSAPP = "917090520216";
const PHONE = "+91 70905 20216";

/* ─── MAIN APP ───────────────────────────────────────────────────────────── */
export default function HimaEstates() {
  const [scrollY, setScrollY] = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <>
      <style>{styles}</style>
      <Nav scrollY={scrollY} />
      <Hero />
      <Marquee />
      <WhyUs />
      <Properties setSelected={setSelected} />
      <About />
      <Contact />
      <Footer />
      {selected && <PropertyModal property={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

/* ─── NAV ────────────────────────────────────────────────────────────────── */
function Nav({ scrollY }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const solid = scrollY > 60;

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: solid ? 'rgba(247,244,239,.97)' : 'transparent',
        borderBottom: solid ? '1px solid var(--cream)' : '1px solid transparent',
        backdropFilter: solid ? 'blur(12px)' : 'none',
        transition: 'all .4s ease',
        padding: solid ? '14px 0' : '22px 0',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          {/* Logo */}
          <a href="#home" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1, zIndex: 60, position: 'relative' }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 500, color: menuOpen ? 'var(--white)' : 'var(--ink)', letterSpacing: '.1em', transition: 'color .3s' }}>HIMA</span>
            <span style={{ fontSize: 9, letterSpacing: '.25em', color: 'var(--gold)', textTransform: 'uppercase', marginTop: 1 }}>ESTATES</span>
          </a>

          {/* Desktop nav */}
          <nav className="nav-desktop" style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
            {['Home','Properties','About','Contact'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
            ))}
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ padding: '10px 24px', fontSize: 11 }}>
              Enquire Now
            </a>
          </nav>

          {/* Hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', gap: 5,
              padding: 8, zIndex: 60, position: 'relative'
            }}
            aria-label="Toggle menu"
          >
            {/* Animated hamburger lines */}
            <span style={{
              display: 'block', width: 24, height: 1.5,
              background: menuOpen ? 'var(--white)' : (solid ? 'var(--ink)' : 'var(--white)'),
              transition: 'all .3s',
              transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none'
            }} />
            <span style={{
              display: 'block', width: 24, height: 1.5,
              background: menuOpen ? 'var(--white)' : (solid ? 'var(--ink)' : 'var(--white)'),
              transition: 'all .3s',
              opacity: menuOpen ? 0 : 1
            }} />
            <span style={{
              display: 'block', width: 24, height: 1.5,
              background: menuOpen ? 'var(--white)' : (solid ? 'var(--ink)' : 'var(--white)'),
              transition: 'all .3s',
              transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none'
            }} />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {['Home','Properties','About','Contact'].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} className="mobile-menu-link" onClick={handleNavClick}>{l}</a>
        ))}
        <a
          href={`https://wa.me/${WHATSAPP}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold"
          onClick={handleNavClick}
          style={{ marginTop: 8 }}
        >
          <MessageCircle size={16} /> Enquire Now
        </a>
      </div>
    </>
  );
}

/* ─── HERO ───────────────────────────────────────────────────────────────── */
function Hero() {
  const [idx, setIdx] = useState(0);
  const slides = [
    { img: "/images/mysore/exterior.jpg", label: "Mysore, Karnataka" },
    { img: "/images/mysore/living_room_1.jpg", label: "Heritage Interiors" },
    { img: "/images/rajfarms/ext_1.jpg", label: "Mangalore, Karnataka" },
    { img: "/images/rajretreat/exterior.JPG", label: "Bejai, Mangalore" },
    { img: "/images/rajheritage/exterior_2.JPG", label: "Farmhouse Living" },
    { img: "/images/mysore/terrace.jpg", label: "Terrace Views" },
  ];

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section id="home" style={{
      position: 'relative',
      height: '100svh', // svh = small viewport height, accounts for mobile browser chrome
      minHeight: 500,
      overflow: 'hidden',
      background: '#0f0e0c'
    }}>
      {slides.map((s, i) => (
        <div key={i} className={`hero-slide ${i === idx ? 'active' : 'inactive'}`}>
          <img src={s.img} alt={s.label} />
        </div>
      ))}
      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(15,14,12,.3) 0%, rgba(15,14,12,.2) 40%, rgba(15,14,12,.82) 100%)'
      }} />

      {/* Content */}
      <div
        className="hero-content"
        style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end', alignItems: 'flex-start',
          padding: '0 40px 72px',
          maxWidth: 1280, margin: '0 auto', left: 0, right: 0
        }}
      >
        <div style={{ marginBottom: 12 }}>
          <span style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase' }}>
            <span className="gold-rule" />
            {slides[idx].label}
          </span>
        </div>
        <h1 className="serif reveal" style={{
          fontSize: 'clamp(44px, 7vw, 96px)',
          fontWeight: 300, color: 'var(--white)',
          lineHeight: 1.05, maxWidth: 700, animationDelay: '.1s'
        }}>
          Extraordinary<br /><em>Places to Stay</em>
        </h1>
        <p className="reveal" style={{
          color: 'rgba(255,255,255,.8)',
          fontSize: 'clamp(14px, 2vw, 17px)',
          marginTop: 16, maxWidth: 440, lineHeight: 1.6,
          fontWeight: 300, animationDelay: '.3s'
        }}>
          Heritage villas and farm retreats across Karnataka — each one a story waiting to be lived.
        </p>
        <div className="reveal hero-buttons" style={{ display: 'flex', gap: 12, marginTop: 32, animationDelay: '.5s', flexWrap: 'wrap' }}>
          <a href="#properties" className="btn-gold">Explore Properties <ArrowRight size={15} /></a>
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ color: 'var(--white)', borderColor: 'rgba(255,255,255,.5)' }}>
            <MessageCircle size={15} /> WhatsApp Us
          </a>
        </div>
      </div>

      {/* Slide dots */}
      <div className="hero-dots" style={{ position: 'absolute', bottom: 72, right: 40, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} style={{
            width: i === idx ? 24 : 4, height: 4,
            background: i === idx ? 'var(--gold)' : 'rgba(255,255,255,.4)',
            border: 'none', borderRadius: 2, cursor: 'pointer',
            transition: 'all .4s ease', padding: 0
          }} />
        ))}
      </div>
    </section>
  );
}

/* ─── MARQUEE ────────────────────────────────────────────────────────────── */
function Marquee() {
  const items = ["Heritage Stays", "Farm Retreats", "Private Villas", "Karnataka", "Mysore", "Mangalore", "Authentic Experiences", "Curated Properties"];
  const doubled = [...items, ...items];
  return (
    <div style={{ background: 'var(--ink)', padding: '18px 0', overflow: 'hidden', borderBottom: '1px solid rgba(201,169,110,.2)' }}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} style={{ padding: '0 32px', fontSize: 12, letterSpacing: '.18em', textTransform: 'uppercase', color: i % 2 === 0 ? 'var(--gold)' : 'rgba(255,255,255,.35)' }}>
            {item} {i % 2 !== 0 && <span style={{ color: 'var(--gold)', margin: '0 8px' }}>◆</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── WHY US ─────────────────────────────────────────────────────────────── */
function WhyUs() {
  const features = [
    { n: "01", title: "Verified & Curated", body: "Every property personally inspected and authenticated for quality, comfort, and character." },
    { n: "02", title: "Whole-Home Privacy", body: "Each booking is exclusive — your group, your space, no shared amenities with strangers." },
    { n: "03", title: "Authentic Heritage", body: "Stay in homes that tell stories — ancestral villas, working farms, century-old architecture." },
  ];
  return (
    <section className="section-pad" style={{ padding: '120px 40px', background: 'var(--paper)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="whyus-inner" style={{ display: 'flex', gap: 80, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div className="whyus-left" style={{ flex: '0 0 360px', minWidth: 260 }}>
            <span style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase' }}>
              <span className="gold-rule" />Why Choose Us
            </span>
            <h2 className="serif" style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 300, marginTop: 16, lineHeight: 1.15, color: 'var(--ink)' }}>
              We choose every<br />stay with care.
            </h2>
            <p style={{ color: 'var(--muted)', marginTop: 20, lineHeight: 1.8, fontSize: 15 }}>
              Not a platform. Not an algorithm. A curation of places we believe are worth your time.
            </p>
            {/* Stats */}
            <div style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
              {[['4', 'Properties'], ['2', 'Cities'], ['100%', 'Private']].map(([n, l]) => (
                <div key={l}>
                  <div className="stat-num">{n}</div>
                  <div style={{ fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 280, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {features.map((f, i) => (
              <div key={i} className="feature-card" style={{ position: 'relative', overflow: 'hidden' }}>
                <span className="num-accent">{f.n}</span>
                <div style={{ fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>{f.n}</div>
                <h3 className="serif" style={{ fontSize: 24, fontWeight: 400, marginBottom: 10, color: 'var(--ink)' }}>{f.title}</h3>
                <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: 14, maxWidth: 480 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROPERTIES ─────────────────────────────────────────────────────────── */
function Properties({ setSelected }) {
  return (
    <section id="properties" className="section-pad-dark" style={{ padding: '80px 40px 120px', background: 'var(--ink)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Header */}
        <div className="props-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <span style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase' }}>
              <span className="gold-rule" />Our Collection
            </span>
            <h2 className="serif" style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 300, color: 'var(--white)', marginTop: 12, lineHeight: 1.1 }}>
              Four exceptional<br />stays await you.
            </h2>
          </div>
          <p style={{ color: 'rgba(255,255,255,.5)', maxWidth: 340, lineHeight: 1.8, fontSize: 14 }}>
            Each property handpicked for its character — from royal heritage to coastal farmland.
          </p>
        </div>

        {/* Desktop: editorial magazine grid | Mobile: stacked flex */}
        <div className="props-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 20 }}>
          {/* Card 1 — large */}
          <div style={{ gridColumn: 'span 7' }}>
            <PropertyCard p={properties[0]} setSelected={setSelected} tall />
          </div>
          {/* Cards 2 & 3 stacked right */}
          <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <PropertyCard p={properties[1]} setSelected={setSelected} />
            <PropertyCard p={properties[2]} setSelected={setSelected} />
          </div>
          {/* Card 4 */}
          <div style={{ gridColumn: 'span 5' }}>
            <PropertyCard p={properties[3]} setSelected={setSelected} />
          </div>
          {/* Promo block */}
          <div
            className="prop-promo-block"
            style={{ gridColumn: 'span 7', background: 'var(--gold)', borderRadius: 2, padding: '56px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <span style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(15,14,12,.6)', marginBottom: 16 }}>Exclusive Bookings</span>
            <h3 className="serif" style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 400, color: 'var(--ink)', marginBottom: 16, lineHeight: 1.2 }}>
              Whole-home.<br />Always private.
            </h3>
            <p style={{ color: 'rgba(15,14,12,.7)', lineHeight: 1.8, marginBottom: 32, fontSize: 14, maxWidth: 400 }}>
              No shared spaces. No strangers. Just your group, your schedule, and a home that's entirely yours.
            </p>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="btn-dark" style={{ alignSelf: 'flex-start' }}>
              Enquire on WhatsApp <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function PropertyCard({ p, setSelected, tall = false }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="prop-card"
      style={{ height: tall ? 540 : 250 }}
      onClick={() => setSelected(p)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="prop-card-img" style={{ height: '100%' }}>
        <img src={p.coverImage} alt={p.name} style={{ transform: hovered ? 'scale(1.07)' : 'scale(1)', transition: 'transform .9s cubic-bezier(.2,.6,.2,1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,14,12,.8) 0%, rgba(15,14,12,.1) 60%, transparent 100%)' }} />
      </div>
      <span className="prop-badge">{p.badge}</span>

      <div style={{
        position: 'absolute', top: 20, right: 20,
        width: 44, height: 44,
        background: 'var(--gold)',
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'scale(1)' : 'scale(.7)',
        transition: 'all .35s cubic-bezier(.2,.6,.2,1)',
      }}>
        <ArrowUpRight size={18} color="var(--ink)" />
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: tall ? '32px 28px' : '20px 22px' }}>
        <div style={{ display: 'flex', gap: 16, marginBottom: 8 }}>
          {[
            { icon: <Users size={12} />, val: p.guests },
            { icon: <Bed size={12} />, val: p.bedrooms },
            { icon: <Bath size={12} />, val: p.bathrooms },
          ].map((s, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'rgba(255,255,255,.7)', letterSpacing: '.05em' }}>
              {s.icon} {s.val}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div className="serif" style={{ color: 'var(--white)', fontSize: tall ? 28 : 20, fontWeight: 400, lineHeight: 1.1 }}>{p.name}</div>
            <div style={{ color: 'var(--gold)', fontSize: 12, marginTop: 2, letterSpacing: '.05em' }}>{p.location}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="serif" style={{ color: 'var(--white)', fontSize: tall ? 24 : 18, fontWeight: 400 }}>₹{p.price.toLocaleString()}</div>
            <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 11 }}>per night</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── ABOUT ──────────────────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="section-pad" style={{ padding: '120px 40px', background: 'var(--paper)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Mobile: stacked. Desktop: side by side */}
        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          {/* Image collage */}
          <div className="about-collage" style={{ position: 'relative', height: 520 }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: '20%', bottom: '15%', borderRadius: 2, overflow: 'hidden', boxShadow: '0 24px 48px rgba(15,14,12,.12)' }}>
              <img src="/images/mysore/terrace.jpg" alt="Terrace" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, left: '30%', top: '40%', borderRadius: 2, overflow: 'hidden', boxShadow: '0 24px 48px rgba(15,14,12,.15)', border: '6px solid var(--paper)' }}>
              <img src="/images/rajfarms/ext_1.jpg" alt="Farm" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ position: 'absolute', top: '35%', right: '16%', width: 80, height: 80, border: '2px solid var(--gold)', borderRadius: 1, zIndex: -1 }} />
          </div>

          {/* Text */}
          <div>
            <span style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase' }}>
              <span className="gold-rule" />Our Story
            </span>
            <h2 className="serif" style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 300, marginTop: 16, lineHeight: 1.15, color: 'var(--ink)' }}>
              This isn't just<br />about real estate.
            </h2>
            <p style={{ color: 'var(--muted)', marginTop: 24, lineHeight: 1.9, fontSize: 15 }}>
              It's about finding a place that feels right. A space that aligns with who you are and where you're going. We started HIMA ESTATES because we believed travel deserved better — not hotel rooms and checkout times, but homes with soul.
            </p>
            <p style={{ color: 'var(--muted)', marginTop: 16, lineHeight: 1.9, fontSize: 15 }}>
              Every property in our collection has been personally visited, lived in, and chosen because it moved us. We think it'll move you too.
            </p>
            <div className="about-stats" style={{ display: 'flex', gap: 40, marginTop: 48, paddingTop: 40, borderTop: '1px solid var(--cream)', flexWrap: 'wrap' }}>
              {[['Karnataka', 'Our Home'], ['2 Cities', 'Covered'], ['4 Villas', 'Curated']].map(([n, l]) => (
                <div key={l}>
                  <div className="serif" style={{ fontSize: 28, fontWeight: 400, color: 'var(--ink)' }}>{n}</div>
                  <div style={{ fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ────────────────────────────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" className="section-pad" style={{ background: 'var(--ink)', padding: '120px 24px', position: 'relative', overflow: 'hidden' }}>
      <div className="serif" style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        fontSize: 'clamp(80px, 20vw, 220px)', fontWeight: 300, color: 'rgba(255,255,255,.025)',
        letterSpacing: '.1em', whiteSpace: 'nowrap', pointerEvents: 'none', lineHeight: 1
      }}>
        HIMA
      </div>
      <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <span style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase' }}>
          <span className="gold-rule" />Get In Touch
        </span>
        <h2 className="serif" style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 300, color: 'var(--white)', marginTop: 20, lineHeight: 1.1 }}>
          Ready for your<br /><em>perfect stay?</em>
        </h2>
        <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 16, marginTop: 24, lineHeight: 1.8, maxWidth: 440, margin: '24px auto 0' }}>
          Reach out and we'll help you find the right property for your dates, your group, and your vision.
        </p>
        <div className="contact-buttons" style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 48, flexWrap: 'wrap' }}>
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="btn-gold">
            <MessageCircle size={16} /> Message on WhatsApp
          </a>
          <a href={`tel:${PHONE}`} className="btn-outline" style={{ color: 'var(--white)', borderColor: 'rgba(255,255,255,.25)' }}>
            <Phone size={16} /> {PHONE}
          </a>
        </div>
        <div className="contact-locations" style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 80, paddingTop: 56, borderTop: '1px solid rgba(255,255,255,.08)', flexWrap: 'wrap' }}>
          {[['Mysore', 'Karnataka'], ['Mangalore', 'Karnataka']].map(([city, state]) => (
            <div key={city} style={{ textAlign: 'center' }}>
              <MapPin size={18} color="var(--gold)" style={{ margin: '0 auto 10px' }} />
              <div className="serif" style={{ color: 'var(--white)', fontSize: 20 }}>{city}</div>
              <div style={{ color: 'var(--muted)', fontSize: 12, letterSpacing: '.08em', marginTop: 2 }}>{state}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: '#0a0908', padding: '48px 24px', borderTop: '1px solid rgba(201,169,110,.15)' }}>
      <div className="footer-inner" style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
        <div>
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, color: 'var(--white)', letterSpacing: '.1em' }}>HIMA ESTATES</span>
          <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 4 }}>Premium Vacation Rentals · Karnataka</div>
        </div>
        <div style={{ color: 'var(--muted)', fontSize: 12, letterSpacing: '.06em' }}>
          © 2025 HIMA ESTATES. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <a href={`tel:${PHONE}`} style={{ color: 'var(--muted)', fontSize: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, transition: 'color .3s' }}
            onMouseEnter={e => e.currentTarget.style.color='var(--gold)'} onMouseLeave={e => e.currentTarget.style.color='var(--muted)'}>
            <Phone size={13} /> {PHONE}
          </a>
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--muted)', fontSize: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, transition: 'color .3s' }}
            onMouseEnter={e => e.currentTarget.style.color='var(--gold)'} onMouseLeave={e => e.currentTarget.style.color='var(--muted)'}>
            <MessageCircle size={13} /> WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─── PROPERTY MODAL ─────────────────────────────────────────────────────── */
function PropertyModal({ property: p, onClose }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = useCallback(() => setImgIdx(i => (i - 1 + p.images.length) % p.images.length), [p.images.length]);
  const next = useCallback(() => setImgIdx(i => (i + 1) % p.images.length), [p.images.length]);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') lightbox ? setLightbox(false) : onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, onClose, prev, next]);

  return (
    <>
      <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="modal-panel">
          {/* Close */}
          <button onClick={onClose} style={{
            position: 'absolute', top: 16, right: 16, zIndex: 10,
            width: 44, height: 44, border: '1px solid var(--cream)',
            borderRadius: '50%', background: 'var(--white)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <X size={18} />
          </button>

          {/* Hero image */}
          <div
            className="modal-hero-img"
            style={{ position: 'relative', height: 520, overflow: 'hidden', borderRadius: '2px 2px 0 0', cursor: 'zoom-in' }}
            onClick={() => setLightbox(true)}
          >
            <img src={p.images[imgIdx]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity .4s' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,14,12,.6) 0%, transparent 60%)' }} />

            {[{ fn: prev, icon: <ChevronLeft size={22} />, side: 'left' }, { fn: next, icon: <ChevronRight size={22} />, side: 'right' }].map(({ fn, icon, side }) => (
              <button key={side} onClick={e => { e.stopPropagation(); fn(); }} style={{
                position: 'absolute', top: '50%', [side]: 12, transform: 'translateY(-50%)',
                width: 44, height: 44, background: 'rgba(247,244,239,.9)', border: 'none', borderRadius: '50%',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{icon}</button>
            ))}

            <div style={{ position: 'absolute', bottom: 24, left: 24 }}>
              <h1 className="serif" style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 400, color: 'var(--white)', lineHeight: 1.1 }}>{p.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, color: 'rgba(255,255,255,.75)', fontSize: 13 }}>
                <MapPin size={14} /> {p.location}
              </div>
            </div>

            <div style={{ position: 'absolute', bottom: 24, right: 24, color: 'rgba(255,255,255,.7)', fontSize: 13 }}>
              {String(imgIdx + 1).padStart(2, '0')} / {String(p.images.length).padStart(2, '0')}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div style={{ padding: '12px 20px', background: 'var(--ink)' }}>
            <div className="thumb-strip">
              {p.images.map((img, i) => (
                <div key={i} className={`thumb ${i === imgIdx ? 'active' : ''}`} onClick={() => setImgIdx(i)}>
                  <img src={img} alt="" />
                </div>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="modal-body" style={{ padding: '48px 40px', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 56 }}>
            {/* Left */}
            <div>
              {/* Stats */}
              <div className="modal-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--cream)', borderRadius: 2, overflow: 'hidden', marginBottom: 48 }}>
                {[{ icon: <Users size={20} />, val: p.guests, label: 'Guests' }, { icon: <Bed size={20} />, val: p.bedrooms, label: 'Bedrooms' }, { icon: <Bath size={20} />, val: p.bathrooms, label: 'Bathrooms' }].map((s, i) => (
                  <div key={i} style={{ background: 'var(--white)', padding: '20px 12px', textAlign: 'center' }}>
                    <div style={{ color: 'var(--gold)', marginBottom: 8 }}>{s.icon}</div>
                    <div className="serif" style={{ fontSize: 32, fontWeight: 400, color: 'var(--ink)', lineHeight: 1 }}>{s.val}</div>
                    <div style={{ fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 6 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div style={{ marginBottom: 40 }}>
                <span style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase' }}>
                  <span className="gold-rule" />About This Property
                </span>
                <div style={{ marginTop: 16 }}>
                  {p.description.split('\n\n').map((para, i) => (
                    <p key={i} style={{ color: 'var(--muted)', lineHeight: 1.9, fontSize: 15, marginBottom: 16 }}>{para}</p>
                  ))}
                </div>
              </div>

              <div className="gold-divider" style={{ marginBottom: 40 }} />

              {/* Highlights */}
              {p.highlights && (
                <div style={{ marginBottom: 40 }}>
                  <span style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase' }}>
                    <span className="gold-rule" />Highlights
                  </span>
                  <ul style={{ marginTop: 16, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {p.highlights.map((h, i) => (
                      <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--gold)', marginTop: 2 }}><Check size={14} strokeWidth={2.5} /></span>
                        <span style={{ color: 'var(--ink)', fontSize: 14, lineHeight: 1.6 }}>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="gold-divider" style={{ marginBottom: 40 }} />

              {/* Amenities */}
              <div style={{ marginBottom: 40 }}>
                <span style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase' }}>
                  <span className="gold-rule" />Amenities
                </span>
                <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {p.amenities.map((a, i) => <span key={i} className="amenity-pill">{a}</span>)}
                </div>
              </div>

              <div className="gold-divider" style={{ marginBottom: 40 }} />

              {/* House Rules */}
              <div>
                <span style={{ color: 'var(--gold)', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase' }}>
                  <span className="gold-rule" />House Rules
                </span>
                <ul style={{ marginTop: 16, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {p.houseRules.map((r, i) => (
                    <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 14, color: 'var(--muted)' }}>
                      <span style={{ color: 'var(--gold)', marginTop: 2 }}><Check size={14} /></span>{r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right — booking card */}
            <div>
              <div className="booking-card">
                <div style={{ fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,.4)', marginBottom: 12 }}>Starting from</div>
                <div className="serif" style={{ fontSize: 48, fontWeight: 300, color: 'var(--white)', lineHeight: 1 }}>
                  ₹{p.price.toLocaleString()}
                </div>
                <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 13, marginTop: 6, marginBottom: 32 }}>per night · exclusive whole-home</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <a href={`https://wa.me/${p.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ justifyContent: 'center' }}>
                    <MessageCircle size={16} /> Message on WhatsApp
                  </a>
                  <a href={`tel:${p.phone}`} className="btn-outline" style={{ justifyContent: 'center', color: 'var(--white)', borderColor: 'rgba(255,255,255,.2)' }}>
                    <Phone size={16} /> {p.phone}
                  </a>
                </div>

                <div style={{ height: 1, background: 'rgba(255,255,255,.08)', margin: '28px 0' }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    { label: 'Check-in', val: '2:00 PM' },
                    { label: 'Check-out', val: '11:00 AM' },
                    { label: 'Max Guests', val: p.guests },
                    { label: 'Bedrooms', val: p.bedrooms },
                  ].map(({ label, val }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                      <span style={{ color: 'rgba(255,255,255,.4)', letterSpacing: '.06em' }}>{label}</span>
                      <span style={{ color: 'var(--white)' }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(false)}>
          <button onClick={() => setLightbox(false)} style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            <X size={32} />
          </button>
          <img src={p.images[imgIdx]} alt="" style={{ maxWidth: '92vw', maxHeight: '92vh', objectFit: 'contain' }} />
          <button onClick={e => { e.stopPropagation(); prev(); }} style={{ position: 'absolute', left: 24, background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            <ChevronLeft size={48} />
          </button>
          <button onClick={e => { e.stopPropagation(); next(); }} style={{ position: 'absolute', right: 24, background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            <ChevronRight size={48} />
          </button>
        </div>
      )}
    </>
  );
}