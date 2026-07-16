export const WHATSAPP = "917090520216";
export const PHONE = "+91 70905 20216";
export const EMAIL = "himaestates@gmail.com";

// Manually maintained per-property blocked date ranges (no backend yet).
// Each entry is an inclusive [from, to] pair in "YYYY-MM-DD" format.
export const blockedDates = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
};

export const properties = [
  {
    id: 1,
    slug: "heritage-villa-mysore",
    name: "Heritage Villa",
    subtitle: "Mysore",
    location: "Mysore, Karnataka",
    tagline: "Where History Meets Comfort",
    price: 40000,
    cleaningFee: 2500,
    guests: 14, bedrooms: 6, bathrooms: 6,
    badge: "Heritage Stay",
    coverImage: "/images/mysore/exterior.jpg",
    images: [
      "/images/mysore/exterior.jpg","/images/mysore/living_room_1.jpg","/images/mysore/bedroom_one.jpg",
      "/images/mysore/bedroom_two.jpg","/images/mysore/bedroom_three.jpg","/images/mysore/bedroom_four.jpg",
      "/images/mysore/bedroom_five.jpg","/images/mysore/bedroom_six.jpg","/images/mysore/bathroom_one.jpg",
      "/images/mysore/bathroom_two.jpg","/images/mysore/bathroom_three.jpg","/images/mysore/bathroom_four.jpg",
      "/images/mysore/terrace.jpg","/images/mysore/terrace_two.jpg","/images/mysore/terrace_three.jpg"
    ],
    description: `An 80-year-old ancestral home, lovingly restored to blend timeless heritage with modern comfort. Located in the heart of Mysore, this spacious villa offers the perfect base to explore the city's royal legacy.\n\nWithin easy reach of Mysore's most iconic landmarks—Mysore Palace, Chamundi Hill, St. Philomena's Church, and vibrant local markets—this isn't just a place to stay. It's a living piece of history.\n\nThe 6-bedroom villa features high ceilings, antique furniture, and warm wooden accents, complemented by all modern amenities including air conditioning, fast WiFi, and 24/7 hot water.`,
    highlights: ["80-year heritage property","Walking distance to Mysore Palace","6 spacious bedrooms with AC","Beautiful garden & terrace","Modern amenities in historic setting"],
    amenities: ["WiFi","Parking","Kitchen","Air Conditioning","Hot Water","Garden","Balcony","Living Room","Dining Area","Courtyard","Housekeeping"],
    houseRules: ["Check-in: 2 PM","Check-out: 11 AM","No smoking inside","Maximum 14 guests","Respect heritage property"],
    whatsapp: "917090520216", phone: "+91 70905 20216"
  },
  {
    id: 2,
    slug: "raj-farms-mangalore",
    name: "Raj Farms",
    subtitle: "Mangalore",
    location: "Mangalore, Karnataka",
    tagline: "A Peaceful Retreat in Nature",
    price: 25000,
    cleaningFee: 1500,
    guests: 6, bedrooms: 3, bathrooms: 2,
    badge: "Farm Retreat",
    coverImage: "/images/rajfarms/ext_1.jpg",
    images: [
      "/images/rajfarms/ext_1.jpg","/images/rajfarms/ext_2.jpg","/images/rajfarms/ext_3.jpg",
      "/images/rajfarms/ext_4.jpg","/images/rajfarms/ground_common_area_1.jpg","/images/rajfarms/ground_common_area_2.jpg",
      "/images/rajfarms/floor_1_common_area.jpg","/images/rajfarms/bed_1_1.jpg","/images/rajfarms/bed_1_2.jpg",
      "/images/rajfarms/bed_2_1.jpg","/images/rajfarms/bed_2_2.jpg","/images/rajfarms/bath_1_1.jpg",
      "/images/rajfarms/dining_1.jpg","/images/rajfarms/balcony_1.jpg","/images/rajfarms/stairs.jpg"
    ],
    description: `Nestled in the lush farmlands near Mangalore, this peaceful retreat offers a unique blend of rural charm and modern comfort. Experience authentic coastal Karnataka culture while enjoying all contemporary amenities.\n\nThe property sits on agricultural land surrounded by fruitful farms, providing a serene escape from city life. With spacious common areas, balconies overlooking the countryside, and a unique farm-to-table culinary experience, this is more than just a stay—it's an immersion in nature.\n\nPerfect for families, small groups, or anyone seeking tranquility in a beautiful rural setting.`,
    highlights: ["Surrounded by active farmlands","Authentic coastal Karnataka experience","Farm-to-table dining available","Peaceful rural setting","Modern amenities"],
    amenities: ["WiFi","Parking","Kitchen","Hot Water","Balcony","Dining Area","Farm Views","Peaceful Location","Natural Setting"],
    houseRules: ["Check-in: 2 PM","Check-out: 11 AM","No smoking inside","Maximum 6 guests","Respect farm operations"],
    whatsapp: "917090520216", phone: "+91 70905 20216"
  },
  {
    id: 3,
    slug: "raj-retreat-bejai-mangalore",
    name: "Raj Retreat",
    subtitle: "Bejai, Mangalore",
    location: "Bejai, Mangalore, Karnataka",
    tagline: "Luxury Villa | Private Stay in Prime Location",
    price: 25000,
    cleaningFee: 1500,
    guests: 12, bedrooms: 4, bathrooms: 3,
    badge: "City Luxury",
    coverImage: "/images/rajretreat/exterior.JPG",
    images: [
      "/images/rajretreat/exterior.JPG","/images/rajretreat/exterior_3.JPG","/images/rajretreat/exterior_4.JPG",
      "/images/rajretreat/exterior_5.JPG","/images/rajretreat/living_room.JPG","/images/rajretreat/living_rooom_2.JPG",
      "/images/rajretreat/bedroom_1.JPG","/images/rajretreat/bedroom_2.JPG","/images/rajretreat/bedroom_3.JPG",
      "/images/rajretreat/bedroom_4.JPG","/images/rajretreat/bedroom_5.JPG","/images/rajretreat/bathroom.JPG",
      "/images/rajretreat/Bathroom_2.JPG","/images/rajretreat/dining_area.JPG","/images/rajretreat/Dining_area_2.JPG"
    ],
    description: `A beautifully appointed 4-bedroom home nestled in the heart of Mangalore's sought-after Bejai neighbourhood on Pintos Lane. Ideal for families and groups of 8–12, this spacious villa offers the perfect blend of privacy, comfort, and convenience.\n\nDespite its prime central location, the property offers a calm and peaceful atmosphere — a true retreat away from the city's hustle. Enjoy expansive interiors, well-furnished bedrooms, and easy access to top attractions, popular cafés, and Mangalore's stunning beaches.\n\nWhether you're planning a relaxing getaway, a family celebration, or a work trip, Raj Retreat delivers an exceptional private stay with all the comforts of home.`,
    highlights: ["Prime location in Bejai, Pintos Lane","Quiet & private despite city-centre setting","4 spacious bedrooms for up to 12 guests","Easy access to beaches, cafés & attractions","Ideal for families, celebrations & work trips"],
    amenities: ["WiFi","Parking","Kitchen","Air Conditioning","Hot Water","Living Room","Dining Area","Housekeeping","Private Entrance","24/7 Access"],
    houseRules: ["Check-in: 2 PM","Check-out: 11 AM","No smoking inside","Maximum 12 guests","No loud music after 10 PM"],
    whatsapp: "917090520216", phone: "+91 70905 20216"
  },
  {
    id: 4,
    slug: "raj-heritage-mangalore",
    name: "Raj Heritage",
    subtitle: "Mangalore",
    location: "Mangalore, Karnataka",
    tagline: "Spacious Farmhouse | Lawn + Rural Serenity",
    price: 10000,
    cleaningFee: 1000,
    guests: 4, bedrooms: 2, bathrooms: 2,
    badge: "Countryside",
    coverImage: "/images/rajheritage/exterior_2.JPG",
    images: [
      "/images/rajheritage/exterior_2.JPG","/images/rajheritage/exterior_2(1).JPG","/images/rajheritage/exterior_3.JPG",
      "/images/rajheritage/exterior_4.JPG","/images/rajheritage/entrance.JPG","/images/rajheritage/living_room.JPG",
      "/images/rajheritage/dining_hall.JPG","/images/rajheritage/kitchen_2.JPG","/images/rajheritage/bedroom__1.JPG",
      "/images/rajheritage/bedroom_1_1.JPG","/images/rajheritage/bedroom_2.JPG","/images/rajheritage/bathroom_1.JPG",
      "/images/rajheritage/bathroom_2.JPG","/images/rajheritage/veranda.JPG","/images/rajheritage/veranda_1.JPG"
    ],
    description: `Escape to a private 2-bedroom farmhouse set across acres of lush greenery, just 15 minutes from the city. Enjoy a massive open lawn, peaceful surroundings, and ample parking — perfect for relaxing getaways, intimate gatherings, or weekend retreats.\n\nExperience the perfect blend of nature, space, and comfort in this charming farmhouse. With a welcoming veranda, open dining hall, and fully equipped kitchen, every detail is designed to help you unwind.\n\nWhether you're looking for a quiet nature escape or a cosy base for exploring Mangalore's coast, Raj Heritage offers a truly refreshing stay surrounded by greenery.`,
    highlights: ["Private farmhouse on acres of lush greenery","Massive open lawn — ideal for gatherings","Just 15 minutes from the city centre","Ample parking space on premises","Charming veranda with open farm views"],
    amenities: ["WiFi","Free Parking","Kitchen","Air Conditioning","Firepit","Veranda","Open Lawn","Dining Hall","Living Room","Security Cameras","Smoking Allowed"],
    houseRules: ["Check-in: 2 PM","Check-out: 11 AM","Maximum 4 guests","Smoking allowed outdoors","Respect farm surroundings"],
    whatsapp: "917090520216", phone: "+91 70905 20216"
  },
  {
    id: 5,
    slug: "la-villa-by-beach-mangalore",
    name: "La Villa",
    subtitle: "Kulai, Mangalore",
    location: "Kulai, Mangalore, Karnataka",
    tagline: "Quiet Luxury, Less Than 1 km from the Beach",
    price: 30000,
    guests: 6, bedrooms: 3, bathrooms: 3,
    badge: "Beach Retreat",
    coverImage: "/images/lavillabeach/indoor.jpg",
    images: [
      "/images/lavillabeach/indoor.jpg","/images/lavillabeach/entrance.jpg","/images/lavillabeach/outdoor.jpg",
      "/images/lavillabeach/outdoor_2.jpg","/images/lavillabeach/indoor1.jpg","/images/lavillabeach/indoor3.jpg",
      "/images/lavillabeach/indoor4.jpg","/images/lavillabeach/indoor5.jpg","/images/lavillabeach/bedroom.jpg",
      "/images/lavillabeach/bathroon.jpg","/images/lavillabeach/kitchen.jpg","/images/lavillabeach/kitchen1.jpg"
    ],
    description: `A thoughtfully designed adults-only retreat less than 1 km from the beach. With warm interiors, natural textures, and a private outdoor space perfect for quiet evenings or casual gatherings, this home offers calm, comfort, and character. One of the best local restaurants is right next door, and the peaceful setting makes it ideal for those who prefer intention over noise. Not for everyone — and that's exactly the point.\n\nTucked less than 1 km from the shoreline, this adults-only retreat offers a quiet kind of luxury — the kind that doesn't try too hard.\n\nDesigned with care and character, the home blends warm lighting, thoughtful textures, and natural tones to create a space that feels calm, grounded, and quietly beautiful. From the custom wood finishes to the curated decor, every detail is meant to make you feel at ease the moment you step in.\n\nOutside, a breezy open space invites you to slow down. It's perfect for sharing a drink as the sun sets, or gathering with close friends for a mellow evening under the stars. It's the kind of place that holds space for both conversation and stillness.\n\nNext door, you'll find one of the area's most beloved restaurants — making meals something to look forward to, not plan around. Whether it's an early breakfast or a late-night bite, good food is always just a few steps away.\n\nAnd while the beach isn't at your doorstep, it's just under a kilometre away — close enough for spontaneous dips, but far enough to keep your mornings quiet and your nights peaceful.\n\nThis home isn't for everyone — and that's its quiet strength. It's meant for adults who appreciate thoughtful design, easy rhythms, and a little space from the expected.`,
    highlights: ["Adults-only retreat for quiet, intentional stays","Less than 1 km from the beach","Private outdoor space with warm, natural textures","One of the area's most-loved restaurants next door","3 bedrooms, 6 beds — ideal for small groups"],
    amenities: ["WiFi","Parking","Kitchen","Air Conditioning","Hot Water","Private Outdoor Space","Dining Area","Living Room","Housekeeping"],
    houseRules: ["Check-in: 2 PM","Check-out: 11 AM","No smoking inside","Maximum 6 guests","Adults only (18+)"],
    whatsapp: "917090520216", phone: "+91 70905 20216"
  }
];

export const getPropertyBySlug = (slug) => properties.find(p => p.slug === slug);
