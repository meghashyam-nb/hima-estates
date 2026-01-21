import React, { useState, useEffect } from 'react';
import { Star, MapPin, Users, Bed, Bath, Phone, MessageCircle, X, ChevronLeft, ChevronRight, Home, Check, ExternalLink, Shield, Award, ArrowRight } from 'lucide-react';

// Helper function to get correct image path
const getImagePath = (path) => {
  try {
    const PUBLIC_URL = process.env.PUBLIC_URL || '';
    return `${PUBLIC_URL}${path}`;
  } catch {
    return path;
  }
};

const styles = `
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
`;

const properties = [
  {
    id: 1,
    name: "Heritage Villa Mysore",
    location: "Mysore, Karnataka",
    tagline: "Stay in the Heart of Mysore's History",
    price: 40000,
    guests: 14,
    bedrooms: 6,
    bathrooms: 7,
    coverImage: getImagePath("/images/exterior.jpg"),
    images: [
      getImagePath("/images/exterior.jpg"),
      getImagePath("/images/living_room_1.jpg"),
      getImagePath("/images/bedroom_one.jpg"),
      getImagePath("/images/bedroom_two.jpg"),
      getImagePath("/images/bedroom_three.jpg"),
      getImagePath("/images/bedroom_four.jpg"),
      getImagePath("/images/bedroom_five.jpg"),
      getImagePath("/images/bedroom_six.jpg"),
      getImagePath("/images/bathroom_one.jpg"),
      getImagePath("/images/bathroom_two.jpg"),
      getImagePath("/images/bathroom_three.jpg"),
      getImagePath("/images/bathroom_four.jpg"),
      getImagePath("/images/bathroom_five.jpg"),
      getImagePath("/images/bathroom_six.jpg"),
      getImagePath("/images/bathroom_seven.jpg"),
      getImagePath("/images/terrace.jpg"),
      getImagePath("/images/terrace_two.jpg"),
      getImagePath("/images/terrace_three.jpg")
    ],
    description: `Stay in the Heart of Mysore's History.

Whether you're a family, a group of friends, or a business traveler, our home offers the perfect stay in Mysore. Centrally located to explore the city's most iconic landmarks, vibrant markets, and cultural treasures.

📍 Nearby Attractions:
• Mysore Palace – 2.5 km
• Chamundi Hill – 6.5 km
• St. Philomena's Church – 2.2 km
• Devaraja Market – 2 km
• Mysore Zoo – 3 km
• Brindavan Gardens – 18 km

🏛️ The Space:
Welcome to our 80-year-old ancestral home, recently restored. It blends modern comfort with timeless heritage – more than just a stay, it's a living piece of the city's history.

You'll stay in a spacious 6BHK heritage villa, where high ceilings, antique furniture, and warm wooden accents meet modern comforts for a peaceful stay.

This isn't a hotel, it's a home. With vintage tiles, heirloom photographs, and soulful details, every corner tells a story. We welcome travelers from around the world to be part of it, even if only for a few days.

✨ Guest Access:
Room Features:
• Air conditioning in all rooms
• Fast Wi-Fi throughout
• Wardrobes for storage
• Clean, secure bathrooms
• Hot water 24/7
• Housekeeping available on request

Spaces You Can Use:
• Living Room
• Balcony
• Garden
• Courtyard
• Ample on-site parking
• Dining area

🌟 Explore the Neighborhood:
You'll find cafes, local eateries, yoga studios, and shops just a short walk or drive away. Whether you're here to explore Mysore's royal legacy or soak in the city's vibrant culture, everything is within reach.

Come stay with us. Be close to everything, yet surrounded by history, comfort, and quiet charm.`,
    amenities: ["WiFi", "Parking", "Kitchen", "AC", "Hot Water", "Garden", "Balcony", "Living Room", "Dining Area", "Courtyard", "Housekeeping"],
    houseRules: ["Check-in: 2 PM", "Check-out: 11 AM", "No smoking inside", "Max 12 guests", "Respectful of heritage property"],
    whatsapp: "919739283637",
    phone: "+91 97392 83637"
  }
];

export default function HimaEstates() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedProperty ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProperty]);

  return (
    <>
      <style>{styles}</style>
      <div className="min-h-screen bg-white">
        <Header scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <HomePage setSelectedProperty={setSelectedProperty} />
        <Footer />
        {selectedProperty && <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />}
      </div>
    </>
  );
}

function Header({ scrolled, menuOpen, setMenuOpen }) {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className={`text-xl font-light tracking-wider ${scrolled ? 'text-neutral-900' : 'text-white'}`}>HIMA ESTATES</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#home" className={`text-sm font-light ${scrolled ? 'text-neutral-900' : 'text-white'}`}>Home</a>
          <a href="#properties" className={`text-sm font-light ${scrolled ? 'text-neutral-900' : 'text-white'}`}>Properties</a>
          <a href="#contact" className={`text-sm font-light ${scrolled ? 'text-neutral-900' : 'text-white'}`}>Contact</a>
          <a href={`tel:${properties[0].phone}`} className="bg-neutral-900 text-white px-6 py-2.5 rounded-full text-sm font-light hover:bg-neutral-800">Call Now</a>
        </nav>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          {menuOpen ? <X className={`w-6 h-6 ${scrolled ? 'text-neutral-900' : 'text-white'}`} /> : 
            <div className="space-y-1.5">
              <div className={`w-6 h-0.5 ${scrolled ? 'bg-neutral-900' : 'bg-white'}`}></div>
              <div className={`w-6 h-0.5 ${scrolled ? 'bg-neutral-900' : 'bg-white'}`}></div>
            </div>
          }
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="p-6 space-y-4">
            <a href="#home" onClick={() => setMenuOpen(false)} className="block py-3 text-neutral-900 font-light">Home</a>
            <a href="#properties" onClick={() => setMenuOpen(false)} className="block py-3 text-neutral-900 font-light">Properties</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="block py-3 text-neutral-900 font-light">Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
}

function HomePage({ setSelectedProperty }) {
  const [heroIdx, setHeroIdx] = useState(0);
  const heroImages = [
    getImagePath("/images/living_room_1.jpg"),
    getImagePath("/images/exterior.jpg"),
    getImagePath("/images/terrace.jpg"),
    getImagePath("/images/bedroom_one.jpg")
  ];

  useEffect(() => {
    const int = setInterval(() => setHeroIdx((i) => (i + 1) % heroImages.length), 5000);
    return () => clearInterval(int);
  }, []);

  return (
    <div id="home">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {heroImages.map((img, idx) => (
          <div key={idx} className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out ${idx === heroIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}>
            <img src={img} alt="Heritage Villa" className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        <div className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight animate-slideUp opacity-0" style={{animation: 'slideUp 1s ease-out 0.2s forwards'}}>Welcome to Hima Estates</h1>
          <p className="text-lg md:text-2xl font-light mb-12 text-white/90 animate-slideUp opacity-0" style={{animation: 'slideUp 1s ease-out 0.4s forwards'}}>Handpicked luxury vacation rentals for unforgettable stays</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slideUp opacity-0" style={{animation: 'slideUp 1s ease-out 0.6s forwards'}}>
            <a href="#properties" className="bg-white text-neutral-900 px-10 py-4 rounded-full font-light hover:bg-neutral-100 hover:scale-105 hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center gap-2">
              View Our Property<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href={`https://wa.me/${properties[0].whatsapp}`} target="_blank" rel="noopener noreferrer" className="border-2 border-white text-white px-10 py-4 rounded-full font-light hover:bg-white hover:text-neutral-900 hover:scale-105 transition-all duration-300">Enquire on WhatsApp</a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/80 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-white/80 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b bg-neutral-50/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            {icon: Shield, text: "Verified Hosts"},
            {icon: Star, text: "5-Star Properties"},
            {icon: Home, text: `${properties.length} Premium Location${properties.length > 1 ? 's' : ''}`},
            {icon: Award, text: "Professional Service"}
          ].map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-3 opacity-0 animate-slideUp hover:scale-110 transition-all duration-300" style={{animation: `slideUp 0.6s ease-out ${0.8 + i * 0.1}s forwards`}}>
              <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:shadow-xl transition-shadow">
                <f.icon className="w-8 h-8 text-neutral-900" strokeWidth={1.5} />
              </div>
              <span className="text-sm font-light text-neutral-700">{f.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="properties" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light mb-4">Our Properties</h2>
            <p className="text-neutral-600 font-light text-lg">
              {properties.length === 1 ? 'Discover our exclusive property' : `Explore ${properties.length} handpicked luxury stays`}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} setSelectedProperty={setSelectedProperty} />
            ))}
          </div>
          {properties.length === 1 && (
            <div className="text-center mt-12">
              <p className="text-neutral-600 font-light mb-4">More properties coming soon!</p>
              <a href="#contact" className="text-rose-500 font-light inline-flex items-center gap-2">
                Contact us for early access<ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <img src={getImagePath("/images/terrace.jpg")} alt="About" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-6">Heritage Meets Luxury</h2>
          <p className="text-lg font-light text-white/90 leading-relaxed">Experience the charm of an 80-year-old ancestral home, lovingly restored to blend timeless heritage with modern comfort. Every corner tells a story, every stay becomes a memory.</p>
        </div>
      </section>

      <section id="contact" className="py-20 px-6 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6">Ready to Book Your Stay?</h2>
          <p className="text-lg font-light mb-10 text-white/80">Contact us directly or book through Airbnb</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`https://wa.me/${properties[0].whatsapp}`} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-full font-light inline-flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />WhatsApp Us
            </a>
            <a href={`tel:${properties[0].phone}`} className="bg-white text-neutral-900 px-10 py-4 rounded-full font-light hover:bg-neutral-100 inline-flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function PropertyCard({ property, setSelectedProperty }) {
  const [hover, setHover] = useState(false);
  return (
    <div className="cursor-pointer" onClick={() => setSelectedProperty(property)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="relative overflow-hidden rounded-2xl mb-4 h-72">
        <img src={property.coverImage} alt={property.name} className={`w-full h-full object-cover transition-transform duration-700 ${hover ? 'scale-110' : 'scale-100'}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-sm font-light opacity-90">{property.bedrooms} beds · {property.bathrooms} baths</p>
        </div>
      </div>
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-xl font-light text-neutral-900">{property.name}</h3>
      </div>
      <p className="text-sm font-light text-neutral-600 flex items-center gap-1 mb-3">
        <MapPin className="w-4 h-4" />{property.location}
      </p>
      <p className="text-neutral-900 mb-3">
        <span className="text-xl font-light">₹{property.price.toLocaleString()}</span>
        <span className="text-sm font-light text-neutral-600"> / night</span>
      </p>
      <button className="w-full bg-neutral-900 text-white py-3 rounded-xl font-light hover:bg-neutral-800 text-sm">Enquire Now</button>
    </div>
  );
}

function PropertyModal({ property, onClose }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center overflow-y-auto">
        <div className="relative w-full max-w-7xl bg-white m-4 rounded-2xl">
          <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg">
            <X className="w-6 h-6" />
          </button>
          <div className="p-6 md:p-10 max-h-[90vh] overflow-y-auto">
            <h1 className="text-4xl font-light mb-3">{property.name}</h1>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-neutral-600 font-light flex items-center gap-2">
                <MapPin className="w-5 h-5" />{property.location}
              </span>
            </div>
            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <div className="relative rounded-2xl overflow-hidden mb-6 cursor-pointer" onClick={() => setFullscreen(true)}>
                  <img src={property.images[imgIdx]} alt="" className="w-full h-96 object-cover" />
                  <div className="absolute bottom-4 left-0 right-0 flex gap-2 justify-center">
                    {property.images.map((_, i) => (
                      <button key={i} onClick={(e) => { e.stopPropagation(); setImgIdx(i); }} className={`h-2 rounded-full transition ${i === imgIdx ? 'bg-white w-8' : 'bg-white/60 w-2'}`} />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-3 mb-8">
                  {property.images.map((img, i) => (
                    <img key={i} src={img} onClick={() => setImgIdx(i)} className={`w-full h-20 object-cover rounded-lg cursor-pointer ${i === imgIdx ? 'ring-2 ring-neutral-900' : 'opacity-60'}`} />
                  ))}
                </div>
                <div className="flex gap-8 pb-8 border-b mb-8">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span className="font-light">{property.guests} guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5" />
                    <span className="font-light">{property.bedrooms} bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5" />
                    <span className="font-light">{property.bathrooms} bathrooms</span>
                  </div>
                </div>
                <div className="mb-8">
                  <h2 className="text-2xl font-light mb-4">About</h2>
                  <div className="text-neutral-700 font-light leading-relaxed space-y-4">
                    {property.description.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="whitespace-pre-line">{paragraph}</p>
                    ))}
                  </div>
                </div>
                <div className="mb-8">
                  <h2 className="text-2xl font-light mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {property.amenities.map((a, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 rounded-lg border">
                        <Check className="w-5 h-5 text-neutral-900" />
                        <span className="font-light">{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-light mb-4">House Rules</h2>
                  <ul className="space-y-2">
                    {property.houseRules.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-neutral-700 font-light">
                        <Check className="w-5 h-5 text-neutral-900 mt-0.5" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-6 border-2 rounded-3xl p-6 shadow-xl">
                  <div className="mb-6 pb-6 border-b">
                    <span className="text-3xl font-light">₹{property.price.toLocaleString()}</span>
                    <span className="text-neutral-600 font-light"> / night</span>
                  </div>
                  <div className="space-y-3">
                    <a href={property.airbnbUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-neutral-900 text-white py-4 rounded-xl font-light hover:bg-neutral-800 flex items-center justify-center gap-2">
                      Book on Airbnb<ExternalLink className="w-4 h-4" />
                    </a>
                    <a href={`https://wa.me/${property.whatsapp}`} target="_blank" rel="noopener noreferrer" className="w-full bg-green-600 text-white py-4 rounded-xl font-light hover:bg-green-700 flex items-center justify-center gap-2">
                      <MessageCircle className="w-5 h-5" />WhatsApp
                    </a>
                    <a href={`tel:${property.phone}`} className="w-full border-2 border-neutral-900 text-neutral-900 py-4 rounded-xl font-light hover:bg-neutral-50 flex items-center justify-center gap-2">
                      <Phone className="w-5 h-5" />Call Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {fullscreen && (
        <div className="fixed inset-0 bg-black z-[60] flex items-center justify-center">
          <button onClick={() => setFullscreen(false)} className="absolute top-6 right-6 text-white">
            <X className="w-10 h-10" />
          </button>
          <img src={property.images[imgIdx]} alt="" className="max-w-[90%] max-h-[90%] object-contain" />
          <button onClick={() => setImgIdx((imgIdx - 1 + property.images.length) % property.images.length)} className="absolute left-6 text-white">
            <ChevronLeft className="w-12 h-12" />
          </button>
          <button onClick={() => setImgIdx((imgIdx + 1) % property.images.length)} className="absolute right-6 text-white">
            <ChevronRight className="w-12 h-12" />
          </button>
        </div>
      )}
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-neutral-50 py-12 px-6 border-t">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-light">HIMA ESTATES</span>
          </div>
          <p className="text-neutral-600 text-sm font-light">Premium vacation rentals for unforgettable stays.</p>
        </div>
        <div>
          <h3 className="font-light mb-4">Contact</h3>
          <div className="space-y-3 text-sm font-light text-neutral-600">
            <a href={`tel:${properties[0].phone}`} className="flex items-center gap-2 hover:text-neutral-900 transition">
              <Phone className="w-4 h-4" />97392 83637
            </a>
            <a href={`https://wa.me/${properties[0].whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-neutral-900 transition">
              <MessageCircle className="w-4 h-4" />WhatsApp
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-light mb-4">Location</h3>
          <p className="text-sm font-light text-neutral-600">Mysore, Karnataka</p>
          <p className="text-sm font-light text-neutral-600 mt-2">Heritage Villa in the Heart of Mysore</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t text-center text-sm font-light text-neutral-500">
        © 2025 Hima Estates. All rights reserved.
      </div>
    </footer>
  );
}