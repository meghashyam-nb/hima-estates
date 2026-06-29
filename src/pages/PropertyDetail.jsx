import React, { useState, useCallback, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { MapPin, Users, Bed, Bath, Check, X, ChevronLeft, ChevronRight, Grid3x3, ArrowLeft } from 'lucide-react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import BookingWidget from '../components/BookingWidget';
import { getPropertyBySlug, blockedDates } from '../data/properties';

export default function PropertyDetail() {
  const { slug } = useParams();
  const property = getPropertyBySlug(slug);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const images = property ? property.images : [];

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  const prev = useCallback(() => setLightboxIdx(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setLightboxIdx(i => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = e => {
      if (e.key === 'Escape') setLightboxIdx(null);
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIdx, prev, next]);

  if (!property) return <Navigate to="/" replace />;

  const gridImages = property.images.slice(0, 5);

  return (
    <>
      <Nav solidByDefault />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 24px 0' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, textDecoration: 'none', color: 'var(--ink)' }}>
          <ArrowLeft size={15} /> Back to all stays
        </Link>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 24px 0' }}>
        <h1 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700 }}>{property.name}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, color: 'var(--ink-2)', fontSize: 14 }}>
          <MapPin size={14} /> {property.location}
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 24px 0', position: 'relative' }}>
        <div className="gallery-grid">
          <img className="gallery-main" src={gridImages[0]} alt="" onClick={() => setLightboxIdx(0)} />
          {gridImages.slice(1).map((img, i) => (
            <img key={i} src={img} alt="" onClick={() => setLightboxIdx(i + 1)} />
          ))}
        </div>
        <button className="show-all-btn" onClick={() => setLightboxIdx(0)}>
          <Grid3x3 size={14} /> Show all photos
        </button>
      </div>

      <div className="detail-grid" style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px 80px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 56 }}>
        {/* Left column */}
        <div>
          <div style={{ display: 'flex', gap: 4, paddingBottom: 28, borderBottom: '1px solid var(--line)' }}>
            {[{ icon: <Users size={20} />, val: property.guests, label: 'Guests' }, { icon: <Bed size={20} />, val: property.bedrooms, label: 'Bedrooms' }, { icon: <Bath size={20} />, val: property.bathrooms, label: 'Bathrooms' }].map((s, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center', padding: '8px 4px' }}>
                <div style={{ color: 'var(--brand)', marginBottom: 6, display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{s.val}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ padding: '28px 0', borderBottom: '1px solid var(--line)' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>About this place</h2>
            {property.description.split('\n\n').map((para, i) => (
              <p key={i} style={{ color: 'var(--ink-2)', lineHeight: 1.8, fontSize: 15, marginBottom: 14 }}>{para}</p>
            ))}
          </div>

          {property.highlights && (
            <div style={{ padding: '28px 0', borderBottom: '1px solid var(--line)' }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>Highlights</h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {property.highlights.map((h, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'var(--ink-2)' }}>
                    <Check size={15} color="var(--brand)" style={{ marginTop: 2, flexShrink: 0 }} /> {h}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ padding: '28px 0', borderBottom: '1px solid var(--line)' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>What this place offers</h2>
            <div>
              {property.amenities.map((a, i) => (
                <div key={i} className="amenity-pill">
                  <Check size={15} color="var(--ink-2)" /> {a}
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: '28px 0' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>House rules</h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {property.houseRules.map((r, i) => (
                <li key={i} style={{ fontSize: 14, color: 'var(--ink-2)' }}>{r}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right column — booking */}
        <div className="booking-sidebar" style={{ position: 'sticky', top: 96, alignSelf: 'start' }}>
          <BookingWidget property={property} blockedRanges={blockedDates[property.id] || []} />
        </div>
      </div>

      <Footer />

      {lightboxIdx !== null && (
        <div className="lightbox" onClick={() => setLightboxIdx(null)}>
          <button onClick={() => setLightboxIdx(null)} style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            <X size={32} />
          </button>
          <img src={property.images[lightboxIdx]} alt="" style={{ maxWidth: '92vw', maxHeight: '92vh', objectFit: 'contain' }} />
          <button onClick={e => { e.stopPropagation(); prev(); }} style={{ position: 'absolute', left: 24, background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            <ChevronLeft size={48} />
          </button>
          <button onClick={e => { e.stopPropagation(); next(); }} style={{ position: 'absolute', right: 24, background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            <ChevronRight size={48} />
          </button>
          <div style={{ position: 'absolute', bottom: 24, color: 'rgba(255,255,255,.7)', fontSize: 13 }}>
            {lightboxIdx + 1} / {property.images.length}
          </div>
        </div>
      )}
    </>
  );
}
