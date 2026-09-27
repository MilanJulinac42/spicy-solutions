/**
 * Every price on the site comes from here. The chat assistant, the voice
 * agent, the Instagram bot and the knowledge base quote the same figures —
 * when a number changes here, update those prompts too (grep for "EUR").
 */

export type Package = {
  id: string;
  name: string;
  price: string;
  /** "od" when the figure is a starting point, not a fixed price. */
  from?: boolean;
  delivery: string;
  forWho: string;
  includes: string[];
  featured?: boolean;
};

export const websitePackages: Package[] = [
  {
    id: "start",
    name: "Start",
    price: "590€",
    delivery: "7 dana",
    forWho: "Frizer, kafić, servis, advokat — firma kojoj treba ozbiljno lice na internetu.",
    includes: [
      "Do 5 stranica, odlično na telefonu",
      "Kontakt forma, poziv i WhatsApp jednim klikom",
      "Podešen Google profil firme i osnovni SEO",
      "Hosting i domen prve godine uključeni",
    ],
  },
  {
    id: "biznis",
    name: "Biznis",
    price: "1.190€",
    delivery: "14 dana",
    forWho: "Restoran, salon, ordinacija, škola — firma kojoj sajt treba da dovodi klijente.",
    includes: [
      "Sve iz paketa Start",
      "Do 10 stranica, dizajn napravljen za vas",
      "Online zakazivanje ili porudžbina",
      "Galerija, cenovnik, blog ili vesti",
      "Praćenje posete — znate odakle dolaze upiti",
    ],
    featured: true,
  },
  {
    id: "prodavnica",
    name: "Prodavnica ili aplikacija",
    price: "2.400€",
    from: true,
    delivery: "3–5 nedelja",
    forWho: "Online prodaja, korisnički nalozi, plaćanje karticom.",
    includes: [
      "Sve iz paketa Biznis",
      "Katalog proizvoda, korpa i plaćanje karticom",
      "Korisnički nalozi i administracija",
      "Povezivanje sa programima koje već koristite",
    ],
  },
];

export const systemPackage: Package = {
  id: "sistem",
  name: "Poslovni sistem",
  price: "2.900€",
  from: true,
  delivery: "3–8 nedelja",
  forWho: "Firma koja radi iz Excel tabela, papira i poruka razbacanih po telefonu.",
  includes: [
    "Evidencije, zakazivanja i interni alati",
    "Pregledne table sa podacima u realnom vremenu",
    "Nalozi i prava pristupa za zaposlene i klijente",
    "Obuka za vaš tim",
  ],
};

export const aiPackages: Package[] = [
  {
    id: "chatbot",
    name: "AI asistent na sajtu",
    price: "690€",
    from: true,
    delivery: "1–2 nedelje",
    forWho: "Odgovara posetiocima 24/7 iz vaših cena i usluga i uzima kontakt.",
    includes: [
      "Na srpskom, u ugao vašeg sajta",
      "Odgovara samo iz vaših podataka — ne izmišlja",
      "Šalje vam kontakt zainteresovanog klijenta",
    ],
  },
  {
    id: "voice",
    name: "AI asistent na telefonu",
    price: "990€",
    from: true,
    delivery: "2–4 nedelje",
    forWho: "Javlja se kad vi ne možete, zakazuje termine, prebacuje vama kad treba.",
    includes: [
      "Prirodan glas na srpskom",
      "Vaš broj telefona ostaje isti",
      "Zapis svakog razgovora",
    ],
  },
  {
    id: "automatizacija",
    name: "AI automatizacija",
    price: "1.200€",
    from: true,
    delivery: "1–4 nedelje",
    forWho: "Mejlovi, fakture i dokumenti se sami razvrstavaju i prepisuju.",
    includes: [
      "Obrada faktura, ugovora i formulara",
      "Razvrstavanje upita po hitnosti",
      "Sažeci sastanaka i prepiski",
    ],
  },
];

/**
 * Monthly care, sold as a partner who keeps the thing improving — not as an
 * upkeep fee. First 30 days after launch: every fix is free regardless.
 */
export type PartnerPlan = { id: string; name: string; price: string; from?: boolean; note?: string };

export const partnerPlans: PartnerPlan[] = [
  { id: "sajt", name: "Za sajt", price: "49€" },
  { id: "chatbot", name: "Za AI asistenta na sajtu", price: "39€" },
  { id: "voice", name: "Za AI asistenta na telefonu", price: "79€", note: "do 200 minuta razgovora, preko toga 0,20€/min" },
  { id: "automatizacija", name: "Za AI automatizaciju", price: "49€" },
  { id: "sistem", name: "Za poslovni sistem", price: "149€", from: true },
];

export const partnerIncludes = [
  { title: "Uvek radi", body: "Pratim da je sve dostupno i brzo. Ako nešto zastane, znam pre vas." },
  { title: "Bezbedno", body: "Bezbednosna ažuriranja i rezervne kopije, bez vaše brige." },
  { title: "Izmene bez čekanja", body: "Nova cena, slika, tekst ili termin — pošaljete poruku, ja sredim." },
  { title: "Mesečni izveštaj", body: "Koliko je ljudi došlo, šta su pitali i odakle stižu upiti." },
  { title: "Sve bolje iz meseca u mesec", body: "Na osnovu izveštaja predlažem šta da doradimo da donosi više upita." },
  { title: "Direktna linija", body: "Mejl ili WhatsApp, odgovor u roku od 24h — uvek ja, bez tiketa." },
];

/** Short strings used in cards and prompts. */
export const priceFrom = {
  websites: "590€",
  enterprise: "2.900€",
  chatbot: "690€",
  voice: "990€",
  aiIntegrations: "1.200€",
} as const;
