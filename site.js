/**
 * VR Exhibits — site content
 * ------------------------------------------------------------------
 * Every piece of copy, contact detail, project, statistic and image on
 * the site is defined here. Edit this file; components read from it.
 *
 * Items marked PLACEHOLDER must be replaced with verified information
 * before the site goes live.
 */

/* Real VR Exhibits photography (optimised WebP, two sizes each) */
import eyegear from '../assets/photos/eyegear.webp';
import eyegearSm from '../assets/photos/eyegear-sm.webp';
import eirich from '../assets/photos/eirich.webp';
import eirichSm from '../assets/photos/eirich-sm.webp';
import benFranklin from '../assets/photos/ben-franklin.webp';
import benFranklinSm from '../assets/photos/ben-franklin-sm.webp';
import cke from '../assets/photos/cke.webp';
import ckeSm from '../assets/photos/cke-sm.webp';
import hall from '../assets/photos/exhibition-hall.webp';
import hallSm from '../assets/photos/exhibition-hall-sm.webp';

/* Client logos */
import logoBuhler from '../assets/logos/buhler.webp';
import logoArvind from '../assets/logos/arvind.webp';
import logoEtoGruppe from '../assets/logos/eto-gruppe.webp';
import logoEtas from '../assets/logos/etas.webp';
import logoTornos from '../assets/logos/tornos.webp';
import logoOaktree from '../assets/logos/oaktree.webp';
import logoHealthAndGlow from '../assets/logos/health-and-glow.webp';
import logoCraftsman from '../assets/logos/craftsman.webp';
import logoBiesse from '../assets/logos/biesse.webp';
import logoEirich from '../assets/logos/eirich.webp';
import logoBasantBetons from '../assets/logos/basant-betons.webp';
import logoAshirvad from '../assets/logos/ashirvad.webp';
import logoEpiroc from '../assets/logos/epiroc.webp';
import logoExide from '../assets/logos/exide.webp';
import logoZydus from '../assets/logos/zydus.webp';
import logoSiyarams from '../assets/logos/siyarams.webp';
import logoAyurghar from '../assets/logos/ayurghar.webp';
import logoAyurvedaone from '../assets/logos/ayurvedaone.webp';
import logoAyurcentral from '../assets/logos/ayurcentral.webp';
import logoRehau from '../assets/logos/rehau.webp';
import logoSalamander from '../assets/logos/salamander.webp';
import logoParcomm from '../assets/logos/parcomm.webp';
import logoChemTrend from '../assets/logos/chem-trend.webp';
import logoFanuc from '../assets/logos/fanuc.webp';
import logoApolloPharmacy from '../assets/logos/apollo-pharmacy.webp';
import logoHp from '../assets/logos/hp.webp';
import logoGreenTrends from '../assets/logos/green-trends.webp';
import logoGe from '../assets/logos/ge.webp';
import logoMitsubishiHitachi from '../assets/logos/mitsubishi-hitachi.webp';

/** Builds a responsive image object: { src, srcSet, alt } */
const photo = (large, small, alt) => ({ src: large, srcSet: `${small} 600w, ${large} 1200w`, alt });

const photos = {
  eyegear: photo(eyegear, eyegearSm, 'Eyegear exhibition stand in royal blue with illuminated lettering, large display screens and white lounge seating'),
  eirich: photo(eirich, eirichSm, 'Eirich exhibition stand with a white double-height structure, backlit logo panels and a branded reception counter'),
  benFranklin: photo(benFranklin, benFranklinSm, 'Ben Franklin exhibition stand with a black exterior, gold-lit fascia, white fins and yellow lounge seating'),
  cke: photo(cke, ckeSm, 'CKE Cukurova Kimya exhibition stand with a curved white and orange frame, illuminated logo and product graphics'),
  hall: photo(hall, hallSm, 'Busy exhibition hall with visitors walking between brand stands under a steel truss ceiling'),
};


/* ------------------------------------------------------------------ */
/* Company & contact (PLACEHOLDER values)                              */
/* ------------------------------------------------------------------ */
export const company = {
  name: 'VR Exhibits',
  legalName: 'VR Exhibits',
  owner: { name: 'Shrikanth Kunchipudi', title: 'Founder' }, // change title if needed, e.g. 'Owner'
  shortDescription: 'Exhibition stands, events, retail spaces and signage, designed and built by one team.',
  location: { city: 'Navsari', country: 'Gujarat, India', coordinates: '20.95° N, 72.95° E' },
  phone: { display: '+91 94485 53301', href: 'tel:+919448553301' },
  // Every "email us" link on the site opens one email addressed to ALL of these.
  emails: ['onlystall@gmail.com'],
  whatsapp: { display: '+91 94485 53301', number: '919448553301' }, // international format, digits only
  // Offices: each has its own address, map link and local contact person.
  // Add `email` to a contact once confirmed; it appears on the site automatically.
  offices: [
    {
      id: 'navsari',
      label: 'Navsari office',
      address: ['Ground Floor, Building Number 6344', 'Plot Number 3, Bardoli Road', 'Kabilpore, Navsari', 'Gujarat 396424, India'],
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Ground%20Floor%2C%20Building%20Number%206344%2C%20Plot%20Number%203%2C%20Bardoli%20Road%2C%20Kabilpore%2C%20Navsari%2C%20Gujarat%20396424',
      contact: { name: 'Rajesh Rathod', title: 'Manager', phone: { display: '+91 99099 94878', href: 'tel:+919909994878' }, email: 'enquiry@mantra360.in' },
    },
    {
      id: 'mumbai',
      label: 'Mumbai office',
      address: ['C/203, Manku Narayan Somavansham Co. Housing Society', 'R.J Nagar, Phool Pada Road', 'Virar (East), Thane', 'Maharashtra 401305, India'],
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=C/203%2C%20Manku%20Narayan%20Somavansham%20Co.%20Housing%20Society%2C%20R.J%20Nagar%2C%20Phool%20Pada%20Road%2C%20Virar%20East%2C%20Maharashtra%20401305',
      contact: { name: 'Milind Jadhav', title: 'Manager', phone: { display: '+91 99705 69393', href: 'tel:+919970569393' }, email: 'milind@mantra360.in' },
    },
    {
      id: 'bangalore',
      label: 'Bangalore office',
      address: ['178/179, Paramount Garden', 'Next to Nandi Toyota Showroom', 'Kanakapura Main Road, Thalagattapura', 'Bangalore, Karnataka 560109, India'],
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=178/179%2C%20Paramount%20Garden%2C%20Kanakapura%20Main%20Road%2C%20Thalagattapura%2C%20Bangalore%2C%20Karnataka%20560109',
      contact: { name: 'Shrikanth Kunchipudi', title: 'Founder', phone: { display: '+91 94485 53301', href: 'tel:+919448553301' }, email: 'shrikant@mantra360.in' },
    },
  ],
  hours: 'Mon to Sat, 10:00 to 19:00',
  // Paste your full profile links (e.g. 'https://www.instagram.com/yourhandle/').
  // Entries left empty are hidden from the site automatically.
  social: [
    { label: 'Instagram', href: '' },
    { label: 'LinkedIn', href: '' },
    { label: 'Facebook', href: '' },
    { label: 'YouTube', href: '' },
  ],
};

/* ------------------------------------------------------------------ */
/* Enquiry form delivery                                               */
/* Form submissions are emailed to every address below via FormSubmit  */
/* (https://formsubmit.co). The first address receives a one-time      */
/* activation email the first time the live form is used.             */
/* ------------------------------------------------------------------ */
export const enquiryDelivery = {
  recipients: ['onlystall@gmail.com'],
  subject: 'New website enquiry',
  // Optional: after activation, FormSubmit emails you a random alias (e.g. 'a1b2c3d4...').
  // Paste it here to hide the first email address from the page source.
  formsubmitAlias: '',
};

/** mailto: link that addresses every company email at once */
export const mailtoAll = (subject = 'Project enquiry') =>
  `mailto:${company.emails.join(',')}?subject=${encodeURIComponent(subject)}`;

export const navigation = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Process', href: '#process' },
  { label: 'Work', href: '#work' },
  { label: 'Clients', href: '#clients' },
  { label: 'Contact', href: '#contact' },
];

/* ------------------------------------------------------------------ */
/* 1. Hero                                                             */
/* ------------------------------------------------------------------ */
export const hero = {
  statement: 'We Build Spaces That Make Brands Impossible to Ignore.',
  intro:
    'Exhibition stands, launch events, retail environments and signage. Planned, designed, engineered and built by one team.',
  primaryCta: { label: 'Start a project', href: '#contact' },
  secondaryCta: { label: 'See the work', href: '#work' },
  image: photos.eyegear,
  imageCaption: 'Eyegear stand',
  dimension: '12.0 m', // architectural dimension label shown above the hero image
};

/* ------------------------------------------------------------------ */
/* 2. Brand statement                                                  */
/* ------------------------------------------------------------------ */
export const brand = {
  heading: 'A design-and-build partner for brands that need to show up in person.',
  body: [
    'A trade-show stand, a launch night and a flagship store all ask the same question: what should people feel when they walk in? We answer it with strategy first, then drawings, then timber, steel and light.',
    'Designers, engineers and fabricators work on your project from the first meeting. Fewer handovers, faster decisions, and a finished space that matches the render you signed off.',
  ],
  facts: [
    { title: 'One team', text: 'Strategy, design, engineering and fabrication in the same studio.' },
    { title: 'One project lead', text: 'A single point of contact from first brief to final dismantle.' },
  ],
  images: [photos.eirich, photos.benFranklin],
};

/* ------------------------------------------------------------------ */
/* Full-width image band (between About and Capabilities)             */
/* ------------------------------------------------------------------ */
export const showcase = {
  heading: 'From the first render to the last light switched on.',
  text: 'Every space we deliver starts as a drawing you can walk through, and ends as a build that matches it.',
  caption: 'On the show floor',
  image: photos.hall,
};

/* ------------------------------------------------------------------ */
/* 3. Capabilities                                                     */
/* ------------------------------------------------------------------ */
export const capabilities = [
  {
    id: 'exhibition',
    number: '01',
    title: 'Exhibition Environments',
    summary: 'Stands that earn attention on a crowded show floor.',
    description:
      'From shell-scheme upgrades to double-deck pavilions, we plan every stand around sightlines, visitor flow and the conversations your team needs to have. Concept, 3D visualisation, structural drawings, organiser approvals and on-site build sit with one team.',
    deliverables: ['Custom and modular stands', 'Country and brand pavilions', '3D visualisation', 'Venue compliance'],
    image: photos.eirich,
  },
  {
    id: 'events',
    number: '02',
    title: 'Event Experiences',
    summary: 'Launches, conferences and brand events that run to the minute.',
    description:
      'We design the environment and run everything behind it: stage sets, AV, registration, vendor coordination and show-day management, so your guests only ever see the finished moment.',
    deliverables: ['Product launches', 'Conferences and summits', 'Stage and set design', 'Show-day management'],
    image: photos.hall,
  },
  {
    id: 'retail',
    number: '03',
    title: 'Retail & Brand Spaces',
    summary: 'Stores, shop-in-shops and experience centres built to sell.',
    description:
      'We translate brand guidelines into fixtures, materials and layouts that work for one flagship or a hundred franchise outlets, with drawings your local contractors can follow exactly.',
    deliverables: ['Shop-in-shop units', 'Experience centres', 'Fixtures and display systems', 'Roll-out documentation'],
    image: photos.benFranklin,
  },
  {
    id: 'signage',
    number: '04',
    title: 'Signage Systems',
    summary: 'Wayfinding and brand signage that holds up for years.',
    description:
      'Façade signs, illuminated letters, directional systems and digital displays, engineered for local weather and building conditions, then installed to specification.',
    deliverables: ['Façade and fascia signs', 'Wayfinding systems', 'Illuminated letters', 'Digital signage'],
    image: photos.eyegear,
  },
  {
    id: 'fabrication',
    number: '05',
    title: 'Fabrication & Installation',
    summary: 'Built in our workshop, installed by our own crew.',
    description:
      'Joinery, metalwork, acrylic, print and finishing happen under one roof, which keeps quality visible and timelines honest. Our site teams install, maintain and dismantle every build.',
    deliverables: ['Joinery and metalwork', 'Print and finishing', 'Workshop pre-build', 'Install and dismantle'],
    image: photos.cke,
  },
];

/* ------------------------------------------------------------------ */
/* 4. Process                                                          */
/* ------------------------------------------------------------------ */
export const process = [
  { number: '01', title: 'Discover', text: 'Objectives, audience, venue rules and budget, so the first drawing already answers the right questions.' },
  { number: '02', title: 'Design', text: 'Concepts, 3D renders and material boards. You see exactly what you are approving before anything is cut.' },
  { number: '03', title: 'Engineer', text: 'Structural drawings, electrical layouts and organiser submissions, checked for safety and buildability.' },
  { number: '04', title: 'Build', text: 'Fabrication, finishing and a full pre-build in the workshop, with progress updates you can see.' },
  { number: '05', title: 'Deliver', text: 'Installation, handover, show support and dismantle, managed by the same project lead.' },
];

/* ------------------------------------------------------------------ */
/* 5. Featured work (PLACEHOLDER projects)                             */
/* layout: 'full' | 'side' | 'tall' | 'wide' | 'broad'               */
/* service must match one of workFilters (except 'All')                 */
/* ------------------------------------------------------------------ */
export const workFilters = ['All', 'Exhibition', 'Event', 'Retail', 'Signage'];

export const projects = [
  // location and year: add when known (empty fields are hidden automatically)
  { id: 'eirich', name: 'Eirich', industry: 'Industrial machinery', location: '', year: '', service: 'Exhibition', layout: 'full', href: '#contact',
    image: photos.eirich },
  { id: 'ben-franklin', name: 'Ben Franklin', industry: 'Retail', location: '', year: '', service: 'Exhibition', layout: 'broad', href: '#contact',
    image: photos.benFranklin },
  { id: 'cke', name: 'CKE Cukurova Kimya', industry: 'Chemicals', location: '', year: '', service: 'Exhibition', layout: 'side', href: '#contact',
    image: photos.cke },
  { id: 'eyegear', name: 'Eyegear', industry: 'Eyewear', location: '', year: '', service: 'Exhibition', layout: 'full', href: '#contact',
    image: photos.eyegear },
];

export const workInitialCount = 6; // projects shown before "View all work"

/* ------------------------------------------------------------------ */
/* 6. Impact (PLACEHOLDER figures — replace with verified numbers)     */
/* ------------------------------------------------------------------ */
export const impact = {
  heading: 'The work so far',
  intro: 'A running count of what the studio has designed, built and delivered.',
  isPlaceholder: true, // section is HIDDEN while true. Enter verified numbers, then set to false to show it.
  stats: [
    { value: 250, suffix: '+', label: 'Projects delivered' },
    { value: 40, suffix: '+', label: 'Cities covered' },
    { value: 15, suffix: '', label: 'Years of experience' },
    { value: 70, suffix: '%', label: 'Returning clients' },
  ],
};

/* ------------------------------------------------------------------ */
/* 7. Clients (PLACEHOLDER logos — replace with real client logos)     */
/* To use a real logo, add `logo: importedImage` to an entry.          */
/* ------------------------------------------------------------------ */
export const clients = {
  heading: 'Built for brands with ambition.',
  intro: 'From global automation leaders to India\u2019s best-loved fashion, wellness and home brands, companies trust us with the spaces where they meet their customers.',
  // Order is mixed by industry so each sliding row stays varied.
  // Entries without `logo` are shown as a clean text wordmark.
  logos: [
    { name: 'Bühler', sector: 'Industrial & automation', logo: logoBuhler },
    { name: 'Arvind', sector: 'Fashion, retail & lifestyle', logo: logoArvind },
    { name: 'Zydus', sector: 'Healthcare & wellness', logo: logoZydus },
    { name: 'Rehau', sector: 'Building materials', logo: logoRehau },
    { name: 'Fanuc', sector: 'Industrial & automation', logo: logoFanuc },
    { name: 'HP', sector: 'Technology & services', logo: logoHp },
    { name: 'Exide', sector: 'Energy & power', logo: logoExide },
    { name: 'Eirich', sector: 'Industrial & automation', logo: logoEirich },
    { name: 'Siyaram’s', sector: 'Fashion, retail & lifestyle', logo: logoSiyarams },
    { name: 'Apollo Pharmacy', sector: 'Healthcare & wellness', logo: logoApolloPharmacy },
    { name: 'Ashirvad', sector: 'Building materials', logo: logoAshirvad },
    { name: 'Chem-Trend', sector: 'Chemicals', logo: logoChemTrend },
    { name: 'GE', sector: 'Energy & power', logo: logoGe },
    { name: 'Biesse', sector: 'Industrial & automation', logo: logoBiesse },
    { name: 'Oaktree', sector: 'Technology & services', logo: logoOaktree },
    { name: 'Green Trends', sector: 'Fashion, retail & lifestyle', logo: logoGreenTrends },
    { name: 'health & glow', sector: 'Healthcare & wellness', logo: logoHealthAndGlow },
    { name: 'Salamander', sector: 'Building materials', logo: logoSalamander },
    { name: 'Epiroc', sector: 'Industrial & automation', logo: logoEpiroc },
    { name: 'Mitsubishi Hitachi Power Systems', sector: 'Energy & power', logo: logoMitsubishiHitachi },
    { name: 'Tornos', sector: 'Industrial & automation', logo: logoTornos },
    { name: 'Ben Franklin', sector: 'Fashion, retail & lifestyle' },
    { name: 'Ayurghar', sector: 'Healthcare & wellness', logo: logoAyurghar },
    { name: 'Basant Betons', sector: 'Building materials', logo: logoBasantBetons },
    { name: 'ETAS', sector: 'Industrial & automation', logo: logoEtas },
    { name: 'CKE Cukurova Kimya', sector: 'Chemicals' },
    { name: 'Parcomm', sector: 'Technology & services', logo: logoParcomm },
    { name: 'Craftsman Automation', sector: 'Industrial & automation', logo: logoCraftsman },
    { name: 'Eyegear', sector: 'Fashion, retail & lifestyle' },
    { name: 'AyurvedaOne', sector: 'Healthcare & wellness', logo: logoAyurvedaone },
    { name: 'ETO Gruppe', sector: 'Industrial & automation', logo: logoEtoGruppe },
    { name: 'AyurCentral', sector: 'Healthcare & wellness', logo: logoAyurcentral },
  ],
};

/* ------------------------------------------------------------------ */
/* 8. Contact                                                          */
/* ------------------------------------------------------------------ */
export const contact = {
  heading: 'Have a space in mind?',
  intro: 'Tell us about the show, the venue or the store. We reply within one working day.',
  projectTypes: ['Exhibition stand', 'Event experience', 'Retail space', 'Signage system', 'Fabrication only', 'Something else'],
  budgets: ['Under ₹10 lakh', '₹10 to 25 lakh', '₹25 to 50 lakh', '₹50 lakh and above', 'Not sure yet'],
  successTitle: 'Enquiry sent.',
  successText: 'Thank you. A project lead will reply to you by email within one working day.',
};

export const footer = {
  line: 'Exhibition, event, retail and signage environments, designed and built by one team.',
};

/* ================================================================== */
/* Admin portal: saved changes are applied on top of the defaults      */
/* above. src/data/content.json is written at build time from the      */
/* admin's saved content (see scripts/fetch-content.mjs).              */
/* ================================================================== */
import savedContent from './content.json';

const logoAssets = {
  buhler: logoBuhler, arvind: logoArvind, 'eto-gruppe': logoEtoGruppe, etas: logoEtas, tornos: logoTornos, oaktree: logoOaktree,
  'health-and-glow': logoHealthAndGlow, craftsman: logoCraftsman, biesse: logoBiesse, eirich: logoEirich, 'basant-betons': logoBasantBetons,
  ashirvad: logoAshirvad, epiroc: logoEpiroc, exide: logoExide, zydus: logoZydus, siyarams: logoSiyarams, ayurghar: logoAyurghar,
  ayurvedaone: logoAyurvedaone, ayurcentral: logoAyurcentral, rehau: logoRehau, salamander: logoSalamander, parcomm: logoParcomm,
  'chem-trend': logoChemTrend, fanuc: logoFanuc, 'apollo-pharmacy': logoApolloPharmacy, hp: logoHp, 'green-trends': logoGreenTrends,
  ge: logoGe, 'mitsubishi-hitachi': logoMitsubishiHitachi,
};
Object.entries(photos).forEach(([k, v]) => { v.ref = `photo:${k}`; });

/** Image object -> { ref } or { url } (what the admin stores) */
const imgOut = (img) => (img?.ref ? { ref: img.ref, alt: img.alt } : { url: img?.src || '', alt: img?.alt || '' });
/** Stored image -> image object the components use */
const imgIn = (d, fallback) => {
  if (!d) return fallback;
  if (d.ref?.startsWith('photo:') && photos[d.ref.slice(6)]) return { ...photos[d.ref.slice(6)], alt: d.alt || photos[d.ref.slice(6)].alt };
  if (d.url) return { src: d.url, alt: d.alt || 'Exhibition stand designed and built by VR Exhibits' };
  return fallback;
};
const logoOut = (src) => {
  const key = Object.keys(logoAssets).find((k) => logoAssets[k] === src);
  return key ? `logo:${key}` : src || '';
};
const logoIn = (v) => (v?.startsWith('logo:') ? logoAssets[v.slice(5)] : v || undefined);
const digits = (s) => String(s || '').replace(/\D/g, '');
const telHref = (display) => {
  const d = digits(display);
  return `tel:+${d.length === 10 ? `91${d}` : d}`;
};
const phoneOut = (p) => p?.display || '';
const phoneIn = (display) => ({ display, href: telHref(display) });

/** Everything the admin portal can edit, as plain JSON */
export function toEditable() {
  return {
    hero: { statement: hero.statement, intro: hero.intro, image: imgOut(hero.image) },
    showcase: { heading: showcase.heading, text: showcase.text, image: imgOut(showcase.image) },
    brand: { heading: brand.heading, images: brand.images.map(imgOut) },
    projects: projects.map((p) => ({ id: p.id, name: p.name, industry: p.industry, location: p.location, year: p.year, service: p.service, layout: p.layout, image: imgOut(p.image) })),
    clients: clients.logos.map((c) => ({ name: c.name, sector: c.sector, logo: logoOut(c.logo) })),
    company: {
      owner: { ...company.owner },
      phone: phoneOut(company.phone),
      whatsapp: company.whatsapp.display,
      emails: [...company.emails],
      hours: company.hours,
      offices: company.offices.map((o) => ({
        label: o.label,
        address: o.address.join('\n'),
        contact: { name: o.contact?.name || '', title: o.contact?.title || '', phone: phoneOut(o.contact?.phone), email: o.contact?.email || '' },
      })),
      social: company.social.map((s) => ({ ...s })),
    },
    impact: { show: !impact.isPlaceholder, stats: impact.stats.map((s) => ({ ...s })) },
  };
}

const replaceArray = (arr, next) => arr.splice(0, arr.length, ...next);

/** Applies saved admin content on top of the defaults */
export function applyContent(c) {
  if (!c || typeof c !== 'object') return;
  if (c.hero) Object.assign(hero, { statement: c.hero.statement ?? hero.statement, intro: c.hero.intro ?? hero.intro, image: imgIn(c.hero.image, hero.image) });
  if (c.showcase) Object.assign(showcase, { heading: c.showcase.heading ?? showcase.heading, text: c.showcase.text ?? showcase.text, image: imgIn(c.showcase.image, showcase.image) });
  if (c.brand) {
    if (c.brand.heading) brand.heading = c.brand.heading;
    if (Array.isArray(c.brand.images)) brand.images = c.brand.images.map((d, i) => imgIn(d, brand.images[i]));
  }
  if (Array.isArray(c.projects)) {
    replaceArray(projects, c.projects.filter((p) => p.name).map((p, i) => ({
      id: p.id || `project-${i}`, name: p.name, industry: p.industry || '', location: p.location || '', year: p.year || '',
      service: p.service || 'Exhibition', layout: p.layout || 'side', href: '#contact', image: imgIn(p.image, projects[0]?.image),
    })));
  }
  if (Array.isArray(c.clients)) replaceArray(clients.logos, c.clients.filter((x) => x.name).map((x) => ({ name: x.name, sector: x.sector || 'Other', logo: logoIn(x.logo) })));
  if (c.company) {
    const k = c.company;
    if (k.owner) company.owner = { ...company.owner, ...k.owner };
    if (k.phone) company.phone = phoneIn(k.phone);
    if (k.whatsapp) company.whatsapp = { display: k.whatsapp, number: digits(telHref(k.whatsapp)) };
    if (Array.isArray(k.emails)) {
      const list = k.emails.map((e) => e.trim()).filter(Boolean);
      if (list.length) { company.emails = list; enquiryDelivery.recipients = list; }
    }
    if (k.hours) company.hours = k.hours;
    if (Array.isArray(k.offices)) {
      company.offices = k.offices.filter((o) => o.label).map((o, i) => {
        const address = String(o.address || '').split('\n').map((l) => l.trim()).filter(Boolean);
        return {
          id: `office-${i}`, label: o.label, address,
          mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.join(', '))}`,
          contact: o.contact?.name ? { name: o.contact.name, title: o.contact.title || '', phone: phoneIn(o.contact.phone || ''), email: o.contact.email || '' } : null,
        };
      });
    }
    if (Array.isArray(k.social)) company.social = k.social;
  }
  if (c.impact) {
    impact.isPlaceholder = !c.impact.show;
    if (Array.isArray(c.impact.stats)) replaceArray(impact.stats, c.impact.stats.map((s) => ({ value: Number(s.value) || 0, suffix: s.suffix || '', label: s.label || '' })));
  }
}

applyContent(savedContent);

/** Admin previews: stored image/logo -> displayable URL */
export const resolveImage = (d) => imgIn(d, null)?.src || '';
export const resolveLogo = (v) => logoIn(v) || '';
