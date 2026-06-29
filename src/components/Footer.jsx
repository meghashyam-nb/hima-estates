import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { WHATSAPP, PHONE } from '../data/properties';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--offwhite)', padding: '40px 24px', borderTop: '1px solid var(--line)' }}>
      <div className="footer-inner" style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--brand)' }}>hima</span>
          <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink)', marginLeft: 4 }}>estates</span>
          <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>Premium Vacation Rentals · Karnataka</div>
        </div>
        <div style={{ color: 'var(--muted)', fontSize: 13 }}>© 2026 HIMA ESTATES. All rights reserved.</div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <a href={`tel:${PHONE}`} style={{ color: 'var(--ink)', fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
            <Phone size={14} /> {PHONE}
          </a>
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink)', fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
            <MessageCircle size={14} /> WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
