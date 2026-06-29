import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PropertyCard({ p }) {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const previewImages = p.images.slice(0, 5);

  const stop = (fn) => (e) => { e.preventDefault(); e.stopPropagation(); fn(); };

  return (
    <div
      className="prop-card"
      onClick={() => navigate(`/villas/${p.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setIdx(0); }}
    >
      <div className="prop-card-img">
        <img src={previewImages[idx]} alt={p.name} />
        <span className="prop-badge">{p.badge}</span>

        {hovered && previewImages.length > 1 && (
          <>
            <button onClick={stop(() => setIdx(i => (i - 1 + previewImages.length) % previewImages.length))}
              className="icon-btn" style={{ position: 'absolute', top: '50%', left: 8, transform: 'translateY(-50%)', width: 28, height: 28 }}>
              <ChevronLeft size={14} />
            </button>
            <button onClick={stop(() => setIdx(i => (i + 1) % previewImages.length))}
              className="icon-btn" style={{ position: 'absolute', top: '50%', right: 8, transform: 'translateY(-50%)', width: 28, height: 28 }}>
              <ChevronRight size={14} />
            </button>
            <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 4 }}>
              {previewImages.map((_, i) => (
                <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: i === idx ? '#fff' : 'rgba(255,255,255,.5)' }} />
              ))}
            </div>
          </>
        )}
      </div>

      <div style={{ marginTop: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>{p.location}</span>
        </div>
        <div style={{ color: 'var(--muted)', fontSize: 14, marginTop: 2 }}>{p.name}</div>
        <div style={{ color: 'var(--muted)', fontSize: 14, marginTop: 2 }}>{p.guests} guests · {p.bedrooms} bedrooms</div>
        <div style={{ marginTop: 6, fontSize: 15 }}>
          <span style={{ fontWeight: 700 }}>₹{p.price.toLocaleString()}</span>
          <span style={{ color: 'var(--muted)' }}> night</span>
        </div>
      </div>
    </div>
  );
}
