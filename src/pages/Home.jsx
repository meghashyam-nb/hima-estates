import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, ShieldCheck, Home as HomeIcon, Sparkles } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { properties, WHATSAPP, PHONE } from '../data/properties';

export default function Home() {
  const [location, setLocation] = useState('Anywhere');
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [guests, setGuests] = useState(1);
  const routerLocation = useLocation();

  useEffect(() => {
    if (routerLocation.hash) {
      const el = document.querySelector(routerLocation.hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  }, [routerLocation]);

  const filtered = useMemo(() => properties.filter(p =>
    (location === 'Anywhere' || p.location.includes(location)) && p.guests >= guests
  ), [location, guests]);

  const scrollToListings = () => {
    document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Nav />
      <Hero location={location} setLocation={setLocation} range={range} setRange={setRange} guests={guests} setGuests={setGuests} onSearch={scrollToListings} />
      <WhyUs />
      <Properties properties={filtered} />
      <About />
      <Contact />
      <Footer />
    </>
  );
}

function Hero({ location, setLocation, range, setRange, guests, setGuests, onSearch }) {
  const [idx, setIdx] = useState(0);
  const slides = [
    { img: "/images/mysore/exterior.jpg", label: "Mysore, Karnataka" },
    { img: "/images/rajfarms/ext_1.jpg", label: "Mangalore, Karnataka" },
    { img: "/images/rajretreat/exterior.JPG", label: "Bejai, Mangalore" },
    { img: "/images/rajheritage/exterior_2.JPG", label: "Farmhouse Living" },
  ];

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section id="home" style={{ position: 'relative', height: '78vh', minHeight: 480, overflow: 'hidden', background: '#111' }}>
      {slides.map((s, i) => (
        <img key={i} src={s.img} alt={s.label} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          opacity: i === idx ? 1 : 0, transition: 'opacity 1.2s ease',
        }} />
      ))}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,.35) 0%, rgba(0,0,0,.15) 45%, rgba(0,0,0,.55) 100%)' }} />

      <div className="hero-content" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 24px' }}>
        <h1 style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, maxWidth: 760 }}>
          Whole homes, booked your way
        </h1>
        <p style={{ color: 'rgba(255,255,255,.9)', fontSize: 'clamp(14px, 2vw, 18px)', marginTop: 14, maxWidth: 480 }}>
          Heritage villas and farm retreats across Karnataka — search dates, check guests, request to book in minutes.
        </p>

        <div style={{ marginTop: 36, width: '100%', maxWidth: 880 }}>
          <SearchBar location={location} setLocation={setLocation} range={range} setRange={setRange} guests={guests} setGuests={setGuests} onSearch={onSearch} />
          <SearchBar location={location} setLocation={setLocation} range={range} setRange={setRange} guests={guests} setGuests={setGuests} onSearch={onSearch} compact />
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const features = [
    { icon: <ShieldCheck size={22} />, title: "Verified & curated", body: "Every property personally inspected for quality, comfort, and character." },
    { icon: <HomeIcon size={22} />, title: "Whole-home privacy", body: "Each booking is exclusive — your group, your space, no shared amenities." },
    { icon: <Sparkles size={22} />, title: "Authentic heritage", body: "Stay in homes that tell stories — ancestral villas, working farms, century-old architecture." },
  ];
  return (
    <section className="section-pad whyus-section" style={{ padding: '64px 24px', maxWidth: 1280, margin: '0 auto' }}>
      <div className="whyus-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
        {features.map((f, i) => (
          <div key={i} className="whyus-card">
            <div className="whyus-icon" style={{ color: 'var(--brand)', marginBottom: 12 }}>{f.icon}</div>
            <h3 className="whyus-title" style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{f.title}</h3>
            <p className="whyus-body" style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Properties({ properties }) {
  return (
    <section id="properties" className="section-pad" style={{ padding: '32px 24px 64px', maxWidth: 1280, margin: '0 auto' }}>
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20 }}>
        {properties.length ? `${properties.length} stays in Karnataka` : 'No stays match your search'}
      </h2>
      <div className="props-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
        {properties.map(p => <PropertyCard key={p.id} p={p} />)}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-pad" style={{ padding: '64px 24px', background: 'var(--offwhite)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }} className="about-grid">
        <div style={{ position: 'relative', height: 420 }} className="about-collage">
          <img src="/images/mysore/terrace.jpg" alt="Terrace" style={{ position: 'absolute', top: 0, left: 0, width: '78%', height: '82%', objectFit: 'cover', borderRadius: 16, boxShadow: '0 16px 40px rgba(0,0,0,.15)' }} />
          <img src="/images/rajfarms/ext_1.jpg" alt="Farm" style={{ position: 'absolute', bottom: 0, right: 0, width: '58%', height: '52%', objectFit: 'cover', borderRadius: 16, border: '6px solid var(--offwhite)', boxShadow: '0 16px 40px rgba(0,0,0,.18)' }} />
        </div>
        <div>
          <h2 style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 800, lineHeight: 1.15 }}>This isn't just about real estate.</h2>
          <p style={{ color: 'var(--muted)', marginTop: 18, lineHeight: 1.8, fontSize: 15 }}>
            It's about finding a place that feels right. We started HIMA ESTATES because we believed travel deserved better — not hotel rooms and checkout times, but homes with soul.
          </p>
          <p style={{ color: 'var(--muted)', marginTop: 14, lineHeight: 1.8, fontSize: 15 }}>
            Every property in our collection has been personally visited, lived in, and chosen because it moved us.
          </p>
          <div style={{ display: 'flex', gap: 36, marginTop: 32, flexWrap: 'wrap' }} className="about-stats">
            {[['4', 'Properties'], ['2', 'Cities'], ['100%', 'Private']].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: 26, fontWeight: 800 }}>{n}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section-pad" style={{ padding: '72px 24px', textAlign: 'center' }}>
      <h2 style={{ fontSize: 'clamp(26px, 4vw, 44px)', fontWeight: 800 }}>Ready for your perfect stay?</h2>
      <p style={{ color: 'var(--muted)', marginTop: 14, maxWidth: 440, margin: '14px auto 0' }}>
        Reach out and we'll help you find the right property for your dates, your group, and your vision.
      </p>
      <div className="contact-buttons" style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 28, flexWrap: 'wrap' }}>
        <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="btn-primary">
          <MessageCircle size={16} /> Message on WhatsApp
        </a>
        <a href={`tel:${PHONE}`} className="btn-outline">
          <Phone size={16} /> {PHONE}
        </a>
      </div>
      <div className="contact-locations" style={{ display: 'flex', gap: 40, justifyContent: 'center', marginTop: 48, flexWrap: 'wrap' }}>
        {[['Mysore', 'Karnataka'], ['Mangalore', 'Karnataka']].map(([city, state]) => (
          <div key={city} style={{ textAlign: 'center' }}>
            <MapPin size={18} color="var(--brand)" style={{ margin: '0 auto 8px' }} />
            <div style={{ fontWeight: 700 }}>{city}</div>
            <div style={{ color: 'var(--muted)', fontSize: 12 }}>{state}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
