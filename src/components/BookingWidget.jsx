import React, { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { format, differenceInCalendarDays, parseISO } from 'date-fns';
import { Minus, Plus } from 'lucide-react';
import RequestToBookModal from './RequestToBookModal';

export default function BookingWidget({ property, blockedRanges = [] }) {
  const [range, setRange] = useState({ from: undefined, to: undefined });
  const [guests, setGuests] = useState(2);
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const disabledRanges = [
    { before: new Date() },
    ...blockedRanges.map(([from, to]) => ({ from: parseISO(from), to: parseISO(to) })),
  ];

  const nights = range.from && range.to ? differenceInCalendarDays(range.to, range.from) : 0;
  const subtotal = nights * property.price;
  const total = nights > 0 ? subtotal + property.cleaningFee : 0;

  const dateLabel = (d) => d ? format(d, 'MMM d, yyyy') : '';

  return (
    <div className="booking-card">
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 16 }}>
        <span style={{ fontSize: 22, fontWeight: 700 }}>₹{property.price.toLocaleString()}</span>
        <span style={{ color: 'var(--muted)', fontSize: 14 }}>night</span>
      </div>

      <div ref={wrapRef} style={{ position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid var(--line)', borderRadius: 12, overflow: 'hidden' }}>
          <div className="booking-input" style={{ border: 'none', borderRight: '1px solid var(--line)', borderRadius: 0 }} onClick={() => setOpen('dates')}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase' }}>Check-in</div>
            <div style={{ fontSize: 13, marginTop: 2 }}>{range.from ? dateLabel(range.from) : 'Add date'}</div>
          </div>
          <div className="booking-input" style={{ border: 'none', borderRadius: 0 }} onClick={() => setOpen('dates')}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase' }}>Checkout</div>
            <div style={{ fontSize: 13, marginTop: 2 }}>{range.to ? dateLabel(range.to) : 'Add date'}</div>
          </div>
        </div>

        <div className="booking-input" style={{ borderTop: 'none', borderRadius: '0 0 12px 12px', marginTop: -1 }} onClick={() => setOpen(open === 'guests' ? false : 'guests')}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase' }}>Guests</div>
          <div style={{ fontSize: 13, marginTop: 2 }}>{guests} guest{guests > 1 ? 's' : ''}</div>
        </div>

        {open === 'dates' && (
          <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', top: '100%', left: 0, marginTop: 8, background: 'var(--white)', border: '1px solid var(--line)', borderRadius: 16, boxShadow: '0 8px 28px rgba(0,0,0,.18)', padding: 12, zIndex: 60 }}>
            <DayPicker
              mode="range"
              numberOfMonths={1}
              selected={range}
              onSelect={(r) => setRange(r || { from: undefined, to: undefined })}
              disabled={disabledRanges}
            />
            <div style={{ fontSize: 12, color: 'var(--muted)', padding: '0 8px 4px' }}>Select check-in and check-out dates.</div>
          </div>
        )}

        {open === 'guests' && (
          <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 8, background: 'var(--white)', border: '1px solid var(--line)', borderRadius: 16, boxShadow: '0 8px 28px rgba(0,0,0,.18)', padding: 16, zIndex: 60 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>Guests</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>Max {property.guests}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <button className="stepper-btn" disabled={guests <= 1} onClick={() => setGuests(g => Math.max(1, g - 1))}><Minus size={14} /></button>
                <span style={{ width: 14, textAlign: 'center' }}>{guests}</span>
                <button className="stepper-btn" disabled={guests >= property.guests} onClick={() => setGuests(g => Math.min(property.guests, g + 1))}><Plus size={14} /></button>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        className="btn-primary"
        style={{ width: '100%', marginTop: 16 }}
        disabled={nights <= 0}
        onClick={() => setShowModal(true)}
      >
        {nights > 0 ? 'Request to Book' : 'Check availability'}
      </button>

      {nights > 0 && (
        <>
          <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted)', marginTop: 12 }}>You won't be charged yet</div>
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span style={{ textDecoration: 'underline' }}>₹{property.price.toLocaleString()} x {nights} night{nights > 1 ? 's' : ''}</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
              <span style={{ textDecoration: 'underline' }}>Cleaning fee</span>
              <span>₹{property.cleaningFee.toLocaleString()}</span>
            </div>
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 15 }}>
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>
        </>
      )}

      {showModal && (
        <RequestToBookModal
          property={property}
          range={range}
          guests={guests}
          nights={nights}
          total={total}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
