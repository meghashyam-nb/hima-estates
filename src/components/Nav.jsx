import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP } from '../data/properties';

export default function Nav({ solidByDefault = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const solid = solidByDefault || scrollY > 20;
  const links = [
    { label: 'Home', to: '/' },
    { label: 'Properties', to: '/#properties' },
    { label: 'About', to: '/#about' },
    { label: 'Contact', to: '/#contact' },
  ];

  return (
    <>
      <header style={{
        position: solidByDefault ? 'sticky' : 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: solid ? 'rgba(255,255,255,.97)' : 'transparent',
        borderBottom: solid ? '1px solid var(--line)' : '1px solid transparent',
        backdropFilter: solid ? 'blur(10px)' : 'none',
        transition: 'all .25s ease',
        padding: '16px 0',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, zIndex: 60, position: 'relative' }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: solidByDefault || solid ? 'var(--brand)' : 'var(--white)', letterSpacing: '-.02em' }}>hima</span>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.2em', color: solidByDefault || solid ? 'var(--ink)' : 'var(--white)', textTransform: 'uppercase' }}>estates</span>
          </Link>

          <nav className="nav-desktop" style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {links.map(l => (
              <Link key={l.label} to={l.to} className="nav-link" style={{ color: solidByDefault || solid ? 'var(--ink)' : 'var(--white)' }}>{l.label}</Link>
            ))}
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="btn-dark" style={{ padding: '10px 20px', fontSize: 13, marginLeft: 8 }}>
              <MessageCircle size={14} /> Enquire
            </a>
          </nav>

          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 5, padding: 8, zIndex: 60, position: 'relative' }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 22, height: 2, borderRadius: 2,
                background: menuOpen ? 'var(--ink)' : (solidByDefault || solid ? 'var(--ink)' : 'var(--white)'),
                transition: 'all .25s',
                transform: menuOpen && i === 0 ? 'rotate(45deg) translate(4px, 5px)' : menuOpen && i === 2 ? 'rotate(-45deg) translate(4px, -5px)' : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer' }}>✕</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 24 }}>
          {links.map(l => (
            <Link key={l.label} to={l.to} className="mobile-menu-link" onClick={() => setMenuOpen(false)}>{l.label}</Link>
          ))}
        </div>
        <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: 24 }} onClick={() => setMenuOpen(false)}>
          <MessageCircle size={16} /> Enquire on WhatsApp
        </a>
      </div>
    </>
  );
}
