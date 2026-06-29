export const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink:    #222222;
    --ink-2:  #484848;
    --muted:  #6a6a6a;
    --line:   #ebebeb;
    --paper:  #ffffff;
    --offwhite: #f7f7f7;
    --brand:  #FF385C;
    --brand-dark: #E61E4D;
    --white:  #ffffff;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Inter', sans-serif;
    background: var(--paper);
    color: var(--ink);
    overflow-x: hidden;
  }

  a { color: inherit; }

  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: var(--offwhite); }
  ::-webkit-scrollbar-thumb { background: #cfcfcf; border-radius: 99px; }

  /* ── Buttons ── */
  .btn-primary {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    background: var(--brand);
    color: var(--white);
    padding: 14px 28px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    border: none; cursor: pointer;
    transition: background .2s;
  }
  .btn-primary:hover { background: var(--brand-dark); }
  .btn-primary:disabled { background: #d7d7d7; cursor: not-allowed; }

  .btn-outline {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    background: transparent;
    color: var(--ink);
    padding: 13px 27px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    border: 1px solid var(--ink);
    cursor: pointer;
    transition: background .2s;
  }
  .btn-outline:hover { background: var(--offwhite); }

  .btn-dark {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    background: var(--ink);
    color: var(--white);
    padding: 14px 28px;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 600;
    text-decoration: none;
    border: none; cursor: pointer;
    transition: background .2s;
  }
  .btn-dark:hover { background: #000; }

  .icon-btn {
    width: 42px; height: 42px;
    border-radius: 50%;
    border: 1px solid var(--line);
    background: var(--white);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: box-shadow .2s, background .2s;
  }
  .icon-btn:hover { box-shadow: 0 2px 8px rgba(0,0,0,.15); }

  /* ── Nav ── */
  .nav-link {
    font-size: 14px;
    font-weight: 600;
    color: var(--ink);
    text-decoration: none;
    padding: 10px 16px;
    border-radius: 22px;
    transition: background .2s;
  }
  .nav-link:hover { background: var(--offwhite); }

  .mobile-menu {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 200;
    background: var(--white);
    display: flex; flex-direction: column;
    padding: 24px;
    transform: translateX(100%);
    transition: transform .35s cubic-bezier(.2,.6,.2,1);
  }
  .mobile-menu.open { transform: translateX(0); }
  .mobile-menu-link {
    font-size: 22px; font-weight: 600; color: var(--ink);
    text-decoration: none; padding: 18px 0;
    border-bottom: 1px solid var(--line);
  }

  /* ── Search pill ── */
  .search-pill {
    display: flex; align-items: stretch;
    background: var(--white);
    border: 1px solid var(--line);
    border-radius: 40px;
    box-shadow: 0 1px 4px rgba(0,0,0,.08);
    overflow: visible;
    transition: box-shadow .2s;
    position: relative;
  }
  .search-pill:hover { box-shadow: 0 4px 16px rgba(0,0,0,.14); }
  .search-seg {
    flex: 1;
    padding: 12px 24px;
    cursor: pointer;
    border-radius: 40px;
    transition: background .2s;
    min-width: 0;
  }
  .search-seg:hover { background: var(--offwhite); }
  .search-seg-label { font-size: 11px; font-weight: 700; color: var(--ink); }
  .search-seg-value { font-size: 13px; color: var(--muted); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .search-divider { width: 1px; background: var(--line); margin: 10px 0; }

  /* ── Property cards ── */
  .prop-card { cursor: pointer; }
  .prop-card-img {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    background: var(--offwhite);
  }
  .prop-card-img img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform .4s ease;
  }
  .prop-card:hover .prop-card-img img { transform: scale(1.04); }

  .prop-badge {
    position: absolute; top: 12px; left: 12px;
    background: rgba(255,255,255,.95);
    color: var(--ink);
    font-size: 11px; font-weight: 700;
    padding: 5px 12px;
    border-radius: 8px;
  }

  /* ── Amenity pill ── */
  .amenity-pill {
    font-size: 14px;
    padding: 14px 0;
    color: var(--ink);
    display: flex; align-items: center; gap: 14px;
    border-bottom: 1px solid var(--line);
  }

  /* ── Gallery grid ── */
  .gallery-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 8px;
    border-radius: 16px;
    overflow: hidden;
    height: 480px;
  }
  .gallery-grid img { width: 100%; height: 100%; object-fit: cover; cursor: pointer; transition: filter .2s; }
  .gallery-grid img:hover { filter: brightness(.92); }
  .gallery-main { grid-row: 1 / 3; }

  .show-all-btn {
    position: absolute; bottom: 20px; right: 20px;
    background: var(--white);
    border: 1px solid var(--ink);
    border-radius: 10px;
    padding: 9px 16px;
    font-size: 13px; font-weight: 600;
    display: flex; align-items: center; gap: 8px;
    cursor: pointer;
  }

  /* ── Booking widget ── */
  .booking-card {
    background: var(--white);
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 6px 20px rgba(0,0,0,.12);
  }
  .booking-input {
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 10px 14px;
    cursor: pointer;
  }
  .stepper-btn {
    width: 32px; height: 32px;
    border-radius: 50%;
    border: 1px solid #b0b0b0;
    background: var(--white);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
  }
  .stepper-btn:disabled { border-color: var(--line); color: var(--line); cursor: not-allowed; }

  /* ── Modal / overlay ── */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 300;
    background: rgba(0,0,0,.5);
    display: flex; align-items: center; justify-content: center;
    padding: 16px;
    overflow-y: auto;
  }
  .modal-panel {
    background: var(--white);
    max-width: 560px;
    width: 100%;
    border-radius: 16px;
    position: relative;
    max-height: 92vh;
    overflow-y: auto;
  }

  .lightbox {
    position: fixed; inset: 0; z-index: 400;
    background: #000;
    display: flex; align-items: center; justify-content: center;
  }

  /* ── Day picker theming (react-day-picker) ── */
  .rdp-root {
    --rdp-accent-color: var(--ink) !important;
    --rdp-today-color: var(--brand) !important;
  }
  .rdp-day_selected, .rdp-day_selected:hover { background: var(--ink) !important; color: var(--white) !important; }
  .rdp-range_start .rdp-day_button, .rdp-range_end .rdp-day_button { background: var(--ink) !important; color: var(--white) !important; }
  .rdp-range_middle .rdp-day_button { background: var(--offwhite) !important; }

  @media (max-width: 900px) {
    .nav-desktop { display: none !important; }
    .nav-hamburger { display: flex !important; }
    .search-pill { display: none !important; }
    .search-pill-mobile { display: flex !important; }

    .props-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .gallery-grid { grid-template-columns: 1fr !important; grid-template-rows: 220px 100px 100px !important; height: auto !important; }
    .gallery-grid > img:nth-child(n+4) { display: none; }
    .gallery-main { grid-row: auto !important; }

    .detail-grid { grid-template-columns: 1fr !important; }
    .booking-sidebar { position: static !important; order: -1; }

    .section-pad { padding: 56px 20px !important; }
    .hero-content { padding: 0 20px 48px !important; }

    /* Why-us: compact horizontal-scroll chips instead of full cards */
    .whyus-section { padding: 32px 20px !important; }
    .whyus-grid {
      display: flex !important;
      grid-template-columns: none !important;
      gap: 10px !important;
      overflow-x: auto !important;
      padding-bottom: 4px !important;
      -webkit-overflow-scrolling: touch;
    }
    .whyus-card {
      flex: 0 0 auto !important;
      display: flex !important;
      align-items: center !important;
      gap: 8px !important;
      background: var(--offwhite) !important;
      border-radius: 30px !important;
      padding: 10px 16px !important;
      white-space: nowrap !important;
    }
    .whyus-icon { margin-bottom: 0 !important; display: flex !important; }
    .whyus-icon svg { width: 16px !important; height: 16px !important; }
    .whyus-title { font-size: 13px !important; margin-bottom: 0 !important; font-weight: 600 !important; }
    .whyus-body { display: none !important; }
  }

  @media (min-width: 901px) {
    .nav-hamburger { display: none !important; }
    .mobile-menu { display: none !important; }
    .search-pill-mobile { display: none !important; }
  }

  @media (max-width: 600px) {
    .props-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
  }
`;
