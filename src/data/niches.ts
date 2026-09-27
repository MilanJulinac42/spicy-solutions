/**
 * Landing pages per industry (/za/[slug]). Each one speaks to one kind of
 * business: its problems in its words, the three things that fix them, and
 * the proof closest to it. Prices come from src/data/pricing.ts.
 */

export type Niche = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  accent: string;
  subtitle: string;
  pains: { title: string; body: string }[];
  solutions: { title: string; body: string; price: string; href: string }[];
  proof: { label: string; title: string; body: string; href: string; cta: string };
  trialService: "sajt" | "asistent" | "sistem";
};

export const niches: Niche[] = [
  {
    slug: "skole-jezika",
    name: "Škole jezika",
    metaTitle: "Sajt i onlajn platforma za škole jezika",
    metaDescription:
      "Sajt koji dovodi upise, platforma za kurseve i zakazivanje časova, AI asistent za pitanja roditelja i polaznika. Primer: Spiko Edu — platforma za 3 nedelje.",
    eyebrow: "Za škole jezika",
    title: "Upisi, raspored i plaćanja —",
    accent: "na jednom mestu.",
    subtitle:
      "Sajt koji dovodi upise, platforma na kojoj polaznici uče i sami zakazuju časove, i asistent koji odgovara na pitanja i kad je škola zatvorena.",
    pains: [
      { title: "Upisi preko poruka", body: "Pitanja o terminima, nivoima i cenama stižu na Instagram, Viber i telefon — i na ista pitanja odgovarate po ceo dan." },
      { title: "Raspored u Excelu i u glavi", body: "Ko je kod kog nastavnika, kad je slobodan termin, ko je platio — sve se vodi ručno i sve zavisi od vas." },
      { title: "Pitanja posle radnog vremena", body: "Roditelji i polaznici pišu uveče. Ko ne dobije odgovor do sutra, često se upiše na drugo mesto." },
    ],
    solutions: [
      { title: "Sajt škole", body: "Kursevi, nivoi, cene i utisci polaznika, uz prijavu za besplatnu konsultaciju.", price: "od 850€", href: "/usluge/websites" },
      { title: "Onlajn platforma", body: "Kursevi i vežbe koje škola sama pravi, nalozi polaznika, zakazivanje časova sa Zoom-om, plaćanje karticom.", price: "od 1.500€", href: "/usluge/enterprise" },
      { title: "AI asistent za upite", body: "Odgovara o terminima, nivoima i cenama iz vaših podataka i šalje vam kontakt zainteresovanih.", price: "od 450€", href: "/usluge/chatbot" },
    ],
    proof: {
      label: "Primer iz prakse",
      title: "Spiko Edu: sajt za 5 dana, platforma za 3 nedelje",
      body: "Škola nemačkog i engleskog iz Bačke Palanke danas upisuje polaznike preko sajta, a nastavu, vežbe i zakazivanje časova vodi na sopstvenoj platformi.",
      href: "/radovi/spiko-edu",
      cta: "Pogledajte studiju slučaja",
    },
    trialService: "sajt",
  },
  {
    slug: "saloni",
    name: "Saloni i frizeri",
    metaTitle: "Sajt, online zakazivanje i AI asistent za salone",
    metaDescription:
      "Online zakazivanje, sajt sa cenovnikom i asistent koji se javlja na telefon dok radite sa mušterijom. Za frizerske, kozmetičke i salone lepote.",
    eyebrow: "Za salone i frizere",
    title: "Dok radite sa mušterijom,",
    accent: "termini se zakazuju sami.",
    subtitle:
      "Sajt sa cenovnikom i online zakazivanjem, i asistent koji se javlja na telefon kad vi ne možete — na srpskom, u ime vašeg salona.",
    pains: [
      { title: "Telefon zvoni dok radite", body: "Ruke su vam zauzete, mušterija je u stolici. Ko ne dobije odgovor, zove sledeći salon." },
      { title: "Dopisivanje za jedan termin", body: "Pet poruka na Instagramu da bi se dogovorio jedan termin — posle radnog vremena, u pauzi, uveče." },
      { title: "Zaboravljeni termini", body: "Mušterija zaboravi da dođe, a vi ste taj termin već odbili nekom drugom." },
    ],
    solutions: [
      { title: "Sajt sa online zakazivanjem", body: "Usluge, cene i slobodni termini — mušterija sama izabere i zakaže, i danju i noću.", price: "od 850€", href: "/usluge/websites" },
      { title: "Asistent na telefonu", body: "Javlja se u ime salona, kaže cenu, zakaže termin ili prebaci vama kad treba. Može i da pozove radi potvrde termina.", price: "od 990€", href: "/usluge/voice" },
      { title: "Asistent na sajtu", body: "Odgovara na pitanja o uslugama i cenama i uzima kontakt kad vi ne stižete.", price: "od 450€", href: "/usluge/chatbot" },
    ],
    proof: {
      label: "Probajte sami",
      title: "Pričajte sa asistentom — sada, iz browsera",
      body: "Na stranici o asistentu na telefonu možete da razgovarate sa pravim asistentom i čujete kako bi zvučao u vašem salonu.",
      href: "/usluge/voice#demo",
      cta: "Probajte asistenta uživo",
    },
    trialService: "asistent",
  },
];

export const getNiche = (slug: string) => niches.find((n) => n.slug === slug);
