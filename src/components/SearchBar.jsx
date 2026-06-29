import React, { useState, useRef, useEffect } from 'react';
import { Search, Minus, Plus } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { format } from 'date-fns';

const LOCATIONS = ['Anywhere', 'Mysore', 'Mangalore'];

export default function SearchBar({ location, setLocation, range, setRange, guests, setGuests, onSearch, compact = false }) {
  const [open, setOpen] = useState(null); // 'where' | 'dates' | 'guests' | null
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

  return (
    <div ref={wrapRef} className={compact ? 'search-pill-mobile' : 'search-pill'} style={compact ? { display: 'flex', flexDirection: 'column', gap: 12, background: 'var(--white)', border: '1px solid var(--line)', borderRadius: 16, padding: 16 } : {}}>
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
              onSelect={setRange}
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

      <div style={{ display: 'flex', alignItems: 'center', padding: compact ? 0 : '8px' }}>
        <button
          className="btn-primary"
          style={{ width: compact ? '100%' : 48, height: 48, padding: 0, borderRadius: compact ? 12 : '50%' }}
          onClick={(e) => { e.stopPropagation(); setOpen(null); onSearch && onSearch(); }}
        >
          <Search size={18} />{compact && <span style={{ marginLeft: 8 }}>Search</span>}
        </button>
      </div>
    </div>
  );
}
