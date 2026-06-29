import React, { useState } from 'react';
import { X, MessageCircle, Mail, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { EMAIL } from '../data/properties';

export default function RequestToBookModal({ property, range, guests, nights, total, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [sent, setSent] = useState(false);

  const dateLabel = (d) => format(d, 'MMM d, yyyy');
  const canSubmit = name.trim() && phone.trim();

  const buildMessage = () =>
    `Hi HIMA ESTATES, I'd like to request a booking:\n\n` +
    `Property: ${property.name} (${property.location})\n` +
    `Check-in: ${dateLabel(range.from)}\n` +
    `Check-out: ${dateLabel(range.to)}\n` +
    `Guests: ${guests}\n` +
    `Nights: ${nights}\n` +
    `Estimated total: ₹${total.toLocaleString()}\n\n` +
    `Name: ${name}\nPhone: ${phone}` +
    (notes.trim() ? `\nNotes: ${notes}` : '');

  const handleSubmit = () => {
    if (!canSubmit) return;
    const message = buildMessage();
    window.open(`https://wa.me/${property.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  const mailtoHref = `mailto:${EMAIL}?subject=${encodeURIComponent(`Booking request — ${property.name}`)}&body=${encodeURIComponent(buildMessage())}`;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel">
        <button onClick={onClose} className="icon-btn" style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
          <X size={16} />
        </button>

        <div style={{ padding: '32px 28px' }}>
          {!sent ? (
            <>
              <h2 style={{ fontSize: 20, fontWeight: 700 }}>Request to book</h2>
              <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 4 }}>
                {property.name} · {dateLabel(range.from)} – {dateLabel(range.to)} · {guests} guest{guests > 1 ? 's' : ''}
              </p>

              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600 }}>Full name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    style={{ width: '100%', marginTop: 6, padding: '10px 12px', border: '1px solid var(--line)', borderRadius: 10, fontSize: 14 }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600 }}>Phone number</label>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 ..."
                    style={{ width: '100%', marginTop: 6, padding: '10px 12px', border: '1px solid var(--line)', borderRadius: 10, fontSize: 14 }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600 }}>Message to host (optional)</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                    rows={3} placeholder="Anything the host should know?"
                    style={{ width: '100%', marginTop: 6, padding: '10px 12px', border: '1px solid var(--line)', borderRadius: 10, fontSize: 14, resize: 'vertical' }} />
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--line)', marginTop: 20, paddingTop: 16, display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              <button className="btn-primary" style={{ width: '100%', marginTop: 20 }} disabled={!canSubmit} onClick={handleSubmit}>
                <MessageCircle size={16} /> Send request via WhatsApp
              </button>
              <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 10, textAlign: 'center' }}>
                This is a request, not a confirmed booking. The host will confirm availability and payment details with you directly.
              </p>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <CheckCircle2 size={40} color="var(--brand)" style={{ marginBottom: 12 }} />
              <h2 style={{ fontSize: 20, fontWeight: 700 }}>Request sent</h2>
              <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>
                We opened WhatsApp with your booking details prefilled — just hit send there to reach HIMA ESTATES.
                If WhatsApp didn't open, you can email your request instead.
              </p>
              <a href={mailtoHref} className="btn-outline" style={{ marginTop: 16, width: '100%' }}>
                <Mail size={16} /> Email request instead
              </a>
              <button className="btn-dark" style={{ width: '100%', marginTop: 10 }} onClick={onClose}>Done</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
