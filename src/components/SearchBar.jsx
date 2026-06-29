import React, { useState, useRef, useEffect } from 'react';
import { Search, Minus, Plus, X } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { format } from 'date-fns';

const LOCATIONS = ['Anywhere', 'Mysore', 'Mangalore'];

export default function SearchBar({ location, setLocation, range, setRange, guests, setGuests, onSearch, compact = false }) {
  const [open, setOpen] = useState(null); // 'where' | 'dates' | 'guests' | null
  const [mobileOpen, setMobileOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(null);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const dateLabel = range?.from
    ? range.to
      ? `${format(range.from, 'MMM d')} - ${format(range.to, 'MMM d')}`
      : format(range.from, 'MMM d')
    : 'Add dates';

  const summary = `${location} · ${dateLabel} · ${guests} guest${guests > 1 ? 's' : ''}`;

  if (compact) {
    return (
      <>
        <button
          className="search-pill-mobile"
          onClick={() => setMobileOpen(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            width: '100%', background: 'rgba(255,255,255,.22)',
            border: '1px solid rgba(255,255,255,.5)', borderRadius: 30,
            padding: '12px 18px', cursor: 'pointer', backdropFilter: 'blur(6px)',
          }}
        >
          <Search size={16} color="#fff" />
          <span style={{ color: '#fff', fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left' }}>
            {summary}
          </span>
        </button>

        {mobileOpen && (
          <div className="modal-overlay" style={{ alignItems: 'flex-end', padding: 0 }} onClick={(e) => e.target === e.currentTarget && setMobileOpen(false)}>
            <div className="modal-panel" style={{ maxWidth: '100%', borderRadius: '20px 20px 0 0', width: '100%' }}>
              <div style={{ padding: '20px 20px 28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                  <h2 style={{ fontSize: 17, fontWeight: 700 }}>Search stays</h2>
                  <button className="icon-btn" onClick={() => setMobileOpen(false)}><X size={16} /></button>
                </div>

                {/* Where */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Where</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {LOCATIONS.map(loc => (
                      <button key={loc} onClick={() => setLocation(loc)}
                        style={{
                          padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                          border: loc === location ? '1.5px solid var(--ink)' : '1px solid var(--line)',
                          background: loc === location ? 'var(--ink)' : 'var(--white)',
                          color: loc === location ? 'var(--white)' : 'var(--ink)',
                        }}
                      >{loc}</button>
                    ))}
                  </div>
                </div>

                {/* Dates */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Check-in / Check-out</div>
                  <div style={{ border: '1px solid var(--line)', borderRadius: 14, padding: 8, display: 'flex', justifyContent: 'center', overflowX: 'auto' }}>
                    <DayPicker
                      mode="range"
                      numberOfMonths={1}
                      selected={range}
                      onSelect={(r) => setRange(r || { from: undefined, to: undefined })}
                      disabled={{ before: new Date() }}
                    />
                  </div>
                </div>

                {/* Guests */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Guests</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--line)', borderRadius: 14, padding: '12px 16px' }}>
                    <span style={{ fontSize: 14 }}>{guests} guest{guests > 1 ? 's' : ''}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <button className="stepper-btn" disabled={guests <= 1} onClick={() => setGuests(g => Math.max(1, g - 1))}><Minus size={14} /></button>
                      <span style={{ width: 16, textAlign: 'center' }}>{guests}</span>
                      <button className="stepper-btn" disabled={guests >= 20} onClick={() => setGuests(g => Math.min(20, g + 1))}><Plus size={14} /></button>
                    </div>
                  </div>
                </div>

                <button
                  className="btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => { setMobileOpen(false); onSearch && onSearch(); }}
                >
                  <Search size={16} /> Search
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div ref={wrapRef} className="search-pill">
      {/* WHERE */}
      <div className="search-seg" style={{ position: 'relative' }} onClick={() => setOpen(open === 'where' ? null : 'where')}>
        <div className="search-seg-label">Where</div>
        <div className="search-seg-value">{location}</div>
        {open === 'where' && (
          <div style={{ position: 'absolute', top: 'calc(100% + 12px)', left: 0, background: 'var(--white)', border: '1px solid var(--line)', borderRadius: 16, boxShadow: '0 8px 28px rgba(0,0,0,.18)', padding: 8, minWidth: 220, zIndex: 50 }}>
            {LOCATIONS.map(loc => (
              <div key={loc}
                onClick={(e) => { e.stopPropagation(); setLocation(loc); setOpen(null); }}
                style={{ padding: '10px 14px', borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: loc === location ? 700 : 500, background: loc === location ? 'var(--offwhite)' : 'transparent' }}
              >
                {loc}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="search-divider" />

      {/* DATES */}
      <div className="search-seg" style={{ position: 'relative', flex: 1.4 }} onClick={() => setOpen(open === 'dates' ? null : 'dates')}>
        <div className="search-seg-label">Check in / Check out</div>
        <div className="search-seg-value">{dateLabel}</div>
        {open === 'dates' && (
          <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', top: 'calc(100% + 12px)', left: 0, background: 'var(--white)', border: '1px solid var(--line)', borderRadius: 16, boxShadow: '0 8px 28px rgba(0,0,0,.18)', padding: 12, zIndex: 50 }}>
            <DayPicker
              mode="range"
              numberOfMonths={2}
              selected={range}
              onSelect={(r) => setRange(r || { from: undefined, to: undefined })}
              disabled={{ before: new Date() }}
            />
          </div>
        )}
      </div>

      <div className="search-divider" />

      {/* GUESTS */}
      <div className="search-seg" style={{ position: 'relative' }} onClick={() => setOpen(open === 'guests' ? null : 'guests')}>
        <div className="search-seg-label">Who</div>
        <div className="search-seg-value">{guests} guest{guests > 1 ? 's' : ''}</div>
        {open === 'guests' && (
          <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', top: 'calc(100% + 12px)', right: 0, background: 'var(--white)', border: '1px solid var(--line)', borderRadius: 16, boxShadow: '0 8px 28px rgba(0,0,0,.18)', padding: 20, minWidth: 260, zIndex: 50 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>Guests</div>
                <div style={{ fontSize: 13, color: 'var(--muted)' }}>Ages 0+</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <button className="stepper-btn" disabled={guests <= 1} onClick={() => setGuests(g => Math.max(1, g - 1))}><Minus size={14} /></button>
                <span style={{ width: 16, textAlign: 'center', fontSize: 15 }}>{guests}</span>
                <button className="stepper-btn" disabled={guests >= 20} onClick={() => setGuests(g => Math.min(20, g + 1))}><Plus size={14} /></button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
        <button
          className="btn-primary"
          style={{ width: 48, height: 48, padding: 0, borderRadius: '50%' }}
          onClick={(e) => { e.stopPropagation(); setOpen(null); onSearch && onSearch(); }}
        >
          <Search size={18} />
        </button>
      </div>
    </div>
  );
}
