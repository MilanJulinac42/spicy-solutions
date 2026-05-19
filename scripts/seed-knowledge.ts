import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function getEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text.replace(/\n/g, " ").trim(),
  });
  return response.data[0].embedding;
}

type Chunk = {
  content: string;
  locale: string;
  category: string;
};

// ============================================================
// KNOWLEDGE BASE — SRPSKI
// ============================================================

const SR_CHUNKS: Chunk[] = [
  // --- USLUGE: Sajtovi ---
  {
    content:
      "Solvera pravi moderne, brze sajtove sa Next.js koji se učitavaju za manje od sekunde. Kompletno vlasništvo nad kodom, bez zavisnosti od provajdera, sa isporukom u kratkim rokovima. Tehnologije: Next.js, React, TypeScript, Tailwind CSS, Vercel. Funkcionalnosti: responsivan dizajn, SEO ugrađen od prvog dana, učitavanje ispod sekunde, CMS uključen, sve je vaše (kod, domen, hosting).",
    locale: "sr",
    category: "services",
  },
  {
    content:
      "Primeri sajtova koje Solvera pravi: Landing page za prezentaciju firme sa kontakt formom i SEO optimizacijom. E-commerce prodavnica sa katalogom proizvoda, korpom, plaćanjem i praćenjem porudžbina. Web aplikacija sa dashboard-om, korisničkim nalozima i admin panelom. Blog ili portfolio sa CMS-om za samostalno ažuriranje sadržaja.",
    locale: "sr",
    category: "services",
  },
  // --- USLUGE: Poslovni sistemi ---
  {
    content:
      "Solvera gradi poslovne sisteme po meri: dashboard-ove, SaaS platforme, interne alate i API integracije. Skalabilna arhitektura, production-ready kvalitet. Tehnologije: Node.js, .NET, PostgreSQL, MongoDB, Redis, Docker, AWS. Funkcionalnosti: skalabilna arhitektura, dashboard-ovi i analitika, kontrola pristupa, CI/CD pipeline, kompletna dokumentacija.",
    locale: "sr",
    category: "services",
  },
  {
    content:
      "Primeri poslovnih sistema: interni CRM, ERP, sistemi za upravljanje zalihama prilagođeni vašem procesu rada. SaaS platforma sa korisničkim nalozima, plaćanjem i admin panelom. Dashboard sa graficima, izveštajima i KPI-jevima u realnom vremenu. API integracije koje povezuju ERP sa e-commerce-om, CRM sa email platformom.",
    locale: "sr",
    category: "services",
  },
  // --- USLUGE: AI Chatbot (primarno) ---
  {
    content:
      "Solvera primarno gradi AI Chatbot-ove za sajtove klijenata. RAG chatbot povezan sa vašom bazom znanja (dokumenti, FAQ, sajt) odgovara 24/7 na osnovu vaših pravih podataka — bez halucinacija. Tehnologije: OpenAI, Anthropic Claude, LangChain, pgvector, Next.js, Supabase. Funkcionalnosti: RAG nad vašim dokumentima, lead capture (hvata ime/email kad vidi ozbiljan upit), prebacivanje na čoveka, streaming odgovori, analitika razgovora.",
    locale: "sr",
    category: "services",
  },
  {
    content:
      "Primeri AI Chatbot rešenja: Sales chatbot za uslužnu firmu — odgovara o cenama, terminima, načinu rada i traži kontakt kad vidi ozbiljan upit. Support za SaaS — FAQ + dokumentacija u bazi, bot rešava prvi nivo podrške. E-commerce asistent — preporuka proizvoda, status porudžbine, politika vraćanja. Internal knowledge bot integrisan sa Notion/Confluence wiki-jem. Tačnost 90%+, jezici: srpski, engleski i drugi.",
    locale: "sr",
    category: "services",
  },
  // --- USLUGE: AI Voice (primarno) ---
  {
    content:
      "Solvera gradi AI Voice agente — AI koji se javlja na vašem telefonskom broju i vodi razgovor sa klijentima. Prirodan glas (srpski jezik), niska latencija. Tehnologije: Twilio (telefonija), LiveKit (realtime), ElevenLabs ili OpenAI Realtime (glas), Whisper (transkripcija). Funkcionalnosti: prima dolazne pozive, rezerviše termine u kalendaru, daje informacije, kvalifikuje leadove, prebacuje vama kad treba, sve transkriptovano u dashboardu.",
    locale: "sr",
    category: "services",
  },
  {
    content:
      "Primeri AI Voice scenarija: AI recepcionar za salon ili kliniku — prima poziv, proverava kalendar, rezerviše termin. AI posle radnog vremena — beleži upit i prioritet kad klijent zove uveče. Outbound — AI zove klijente da potvrdi termin ili prikupi povratnu informaciju. Kvalifikacija leadova — AI razgovara, kvalifikuje budžet/potrebu, šalje pripremljen lead. Po pozivu ~0.10–0.30€ minut (Twilio + AI model).",
    locale: "sr",
    category: "services",
  },
  // --- USLUGE: AI Asistent za interni tim (primarno) ---
  {
    content:
      "Solvera gradi interne AI asistente za firme — privatan AI obučen na vašoj internoj dokumentaciji, procedurama, ugovorima i istoriji odluka. Vaši zaposleni pitaju umesto da pretražuju Drive i Notion. Opcije hostinga: self-hosted (Llama/Mistral, podaci ne napuštaju firmu), Azure OpenAI ili AWS Bedrock (enterprise privatnost). Integracija u Slack, Teams ili web. Permission-aware — svako vidi samo ono što sme.",
    locale: "sr",
    category: "services",
  },
  {
    content:
      "Primeri internih AI asistenata: Onboarding novih zaposlenih (procedure, alati, ko je za šta zadužen). Sales asistent za ponude (pretraga prošlih sličnih projekata). Legal/HR pomoćnik (politike, ugovori, citira izvor). Pretraga prošlih projekata i odluka. OCR pipeline za skenirane dokumente — stari ugovori i fakture postaju pretraživi. Štedi 3–10 sati nedeljno po osobi.",
    locale: "sr",
    category: "services",
  },
  // --- USLUGE: AI integracije po meri (primarno) ---
  {
    content:
      "Solvera gradi AI integracije po meri — konkretne automatizacije ugrađene tačno tamo gde firme gube vreme. NE radim n8n ili Zapier opšte automatizacije; gradim AI-native rešenja: obrada dokumenata (fakture → strukturirani podaci), klasifikacija i triage mejlova, sumarizacija sastanaka i izveštaja, AI agenti sa tool use (autonomni tokovi koji čitaju API-je i pišu u baze). Integriše se direktno u postojeći sistem (ERP, CRM, custom).",
    locale: "sr",
    category: "services",
  },
  {
    content:
      "Primeri AI integracija: Automatska obrada faktura — AI čita PDF, validira, unosi u računovodstveni sistem. Triage mejlova — klasifikuje (sales/support/spam) i routeuje pravoj osobi. Sumarizacija sastanaka — snimak → transkript → action items u PM alatu. AI agent za research — svako jutro proveri izvore i pošalje sumirano. Pristup: gradi se sa human-in-the-loop gde greška skupo košta, autonomno gde su greške jeftine.",
    locale: "sr",
    category: "services",
  },
  // --- USLUGE: Web razvoj (sekundarno) ---
  {
    content:
      "Solvera i dalje radi sajtove kao SEKUNDARNU uslugu — moderne Next.js sajtove, e-commerce, web aplikacije. Fokus firme je AI, ali web razvoj ostaje u ponudi za klijente kojima treba. Tehnologije: Next.js, React, TypeScript, Tailwind. Često se sajt i AI chatbot prave kao bundle. Pun pristup: kompletno vlasništvo nad kodom, SEO ugrađen, ispod sekunde učitavanje.",
    locale: "sr",
    category: "services",
  },
  // --- CENE ---
  {
    content:
      "Cene Solvera usluga (AI primarno): AI Chatbot za sajt od 600 EUR (mali FAQ bot) do 3000 EUR (full RAG sa integracijama), mesečno trošak modela 10–50 EUR. AI Voice agent od 1500 EUR (recepcionar) do 5000 EUR (outbound + CRM), po pozivu 0.10–0.30 EUR/min. Interni AI asistent od 2000 EUR do 8000 EUR (sa RBAC, više integracija). AI integracija po meri od 800 EUR (mali alat) do 8000 EUR+ (kompleksni agent). Web (sekundarno): landing od 300 EUR, e-commerce od 1000 EUR, web aplikacija od 1500 EUR. Poslovni sistemi od 2000 EUR. Sve cene u eurima, bez PDV.",
    locale: "sr",
    category: "pricing",
  },
  // --- PROCES RADA ---
  {
    content:
      "Proces rada Solvera ima 4 koraka, ali konkretni rokovi zavise od projekta — ne dajemo unapred standardizovane nedelje. Koraci: 1) Upoznavanje i skica — uvodni razgovor (oko sat vremena), pregled potreba, plan stranica/funkcionalnosti. Dobijate pisani dokument sa strukturom i konačan spisak funkcionalnosti. 2) Dizajn — vizuelni predlog svih glavnih ekrana, predlog boja i slova, interaktivan klik-prototip. Jedna runda većih izmena uključena u cenu. 3) Izrada — pravljenje po odobrenom dizajnu, probni sajt vam je dostupan od prvog dana sa svakodnevnim napretkom. 4) Provera i puštanje u rad — testiranje u svim pretraživačima, merenje brzine, SEO osnove, prebacivanje na vaš domen. Tokom celog projekta i nakon: WhatsApp grupa za brza pitanja, kratak video pregled napretka, 30 dana besplatnog ispravljanja grešaka.",
    locale: "sr",
    category: "process",
  },
  // --- O NAMA ---
  {
    content:
      "Solvera je AI-first studio iz Novog Sada, Srbija. Fokusirana na AI rešenja: chatbot-ovi, voice agenti, interni asistenti, AI integracije po meri. Web razvoj je sekundarna usluga. Trenutno Solveru vodi 1 inženjer-osnivač: Milan Julinac (full-stack + AI inženjer, 7+ godina iskustva — OpenAI, Claude, LangChain, pgvector, ElevenLabs, Twilio/LiveKit, Next.js, React, TypeScript, Node.js, PostgreSQL, Supabase, AWS, Docker). Po potrebi se uključuju proverene spoljne saradnike. Vrednosti: moderna tehnologija, transparentnost, vaš kod i vaši podaci.",
    locale: "sr",
    category: "about",
  },
  // --- KONTAKT ---
  {
    content:
      "Kontakt informacije Solvera: Primarni način kontakta je email info@solveradev.rs i WhatsApp +381 63 838 4196. Adresa: Novi Sad, Srbija. Ne primam telefonske pozive — preferiram pisanu komunikaciju (email/WhatsApp) i video pozive (Google Meet, Zoom) za sastanke. Razlog: pisana komunikacija ostaje zapisana, lakša je za praćenje i ne prekida fokusiran rad. Besplatna konsultacija se zakazuje preko emaila ili WhatsApp-a, traje 30-60 minuta i obavlja se kao video poziv. Odgovaram u roku od 24 sata, obično isti dan.",
    locale: "sr",
    category: "contact",
  },
  // --- FAQ ---
  {
    content:
      "Česta pitanja — Sajtovi: Koliko traje izrada sajta? Landing page 2-5 dana, e-commerce 1-2 nedelje, web aplikacija 2-4 nedelje. Ko je vlasnik koda? Vi, kompletno — kod, domen, hosting su vaši od prvog dana. Da li mogu sam da menjam sadržaj? Da, svaki sajt dolazi sa CMS-om. Šta ako mi treba nešto specifično? Javite nam se za besplatnu konsultaciju.",
    locale: "sr",
    category: "faq",
  },
  {
    content:
      "Česta pitanja — Poslovni sistemi: Koliko traje razvoj? MVP 1-3 nedelje, kompletniji sistem 4-8 nedelja. Da li može integracija sa postojećim alatima? Da, integriše se sa bilo kojim sistemom koji ima API. Šta kad sistem treba proširiti? Arhitektura je čista i dokumentovana, proširivanje je jednostavno. Ko održava posle isporuke? Imate kompletan kod i dokumentaciju, nudim opcionalnu podršku.",
    locale: "sr",
    category: "faq",
  },
  {
    content:
      "Česta pitanja — AI: Da li su podaci bezbedni? Apsolutno, možemo hostovati AI na vašim serverima. Koliko je chatbot tačan? RAG chatbot-ovi odgovaraju na osnovu vaših dokumenata, tačnost 90%+. Na kojim jezicima radi? Srpski, engleski i svi veliki jezici. Koliko brzo mogu početi? Prototip za par dana, kompletno rešenje 1-3 nedelje.",
    locale: "sr",
    category: "faq",
  },
  {
    content:
      "Česta pitanja — AI Voice: Zvuči li robotski? Ne, koristim ElevenLabs ili OpenAI Realtime — prirodno, sa pauzama i intonacijom. Mogu klonirati i vaš glas. Šta ako AI ne razume? Ima fallback 'prebacujem kolegi' i poziv ide vama sa kontekstom. Koliko košta? Setup 1500–5000 EUR + 0.10–0.30 EUR/min Twilio + AI model. Koliko traje setup? 2–4 nedelje (skript, glas, integracija sa kalendarom/CRM, testiranje).",
    locale: "sr",
    category: "faq",
  },
  // --- TRANSPARENTNOST: novi tim ---
  {
    content:
      "Solvera je nov, fokusiran AI studio — još uvek ne objavljujem javno portfolio jer je većina projekata pod NDA-om ili u fazi razvoja. Ne izmišljam studije slučaja niti lažne testimonijale. Transparentan sam: ako pitate šta smo konkretno radili, iskreno ću reći. Iskustvo: 7+ godina u modernim tehnologijama (Next.js, AI/LLM, voice AI) — Solvera je moj fokusiran konsalting brand. Bot ne sme da izmišlja imena klijenata, kompanija niti specifične brojke o projektima.",
    locale: "sr",
    category: "about",
  },
  // --- ZAŠTO SOLVERA ---
  {
    content:
      "Zašto izabrati Solvera: 1) AI-first fokus — gradim chatbot-ove, voice agente i interne asistente, ne opšti web shop. 2) Inženjeri, ne prodavci — radite direktno sa developerom. 3) Sve je vaše — kod, dizajn, dokumentacija, bez zaključavanja. 4) Moderan stack — OpenAI, Claude, LangChain, Next.js, Supabase. 5) Direktna komunikacija — odgovor u roku 24h.",
    locale: "sr",
    category: "about",
  },

  // ============================================================
  // DODATNI CHUNK-OVI — detaljnija pokrivenost
  // ============================================================

  // --- CENE: Detaljnije ---
  {
    content:
      "Detaljne cene sajtova: Jednostavan landing page (1-3 strane, kontakt forma, responsivan dizajn) — od 150 EUR. Poslovni sajt sa više strana (5-10 strana, blog, galerija, SEO) — od 300 EUR. E-commerce prodavnica (katalog, korpa, plaćanje, korisničko iskustvo) — od 600 EUR. Custom web aplikacija (korisnički nalozi, dashboard, admin panel, API) — od 800 EUR. Cena zavisi od broja strana, funkcionalnosti i kompleksnosti dizajna. Svaki projekat dobija detaljnu ponudu pre početka rada.",
    locale: "sr",
    category: "pricing",
  },
  {
    content:
      "Detaljne cene poslovnih sistema: MVP (minimalni proizvod) za testiranje tržišta — od 1200 EUR, rok 1-3 nedelje. Kompletna SaaS platforma sa svim funkcionalnostima — od 2000 EUR, rok 4-8 nedelja. CRM ili ERP prilagođen vašem procesu — od 1500 EUR. Integracija sa postojećim sistemima (API povezivanje) — od 400 EUR. Održavanje i podrška posle isporuke — opciono, od 80 EUR mesečno.",
    locale: "sr",
    category: "pricing",
  },
  {
    content:
      "Detaljne cene AI rešenja: Jednostavan chatbot za FAQ i korisničku podršku — od 500 EUR. RAG chatbot obučen na vašoj dokumentaciji sa naprednom pretragom — od 1000 EUR. Interni AI asistent za zaposlene — od 800 EUR. Automatska obrada dokumenata (fakture, ugovori, prijave) — od 1200 EUR. Mesečno održavanje AI sistema — od 60 EUR. OpenAI troškovi su odvojeni i zavise od količine upita (obično 10-50 EUR mesečno za manje firme).",
    locale: "sr",
    category: "pricing",
  },
  {
    content:
      "Detaljne cene AI Voice usluga: AI recepcionar (jednostavan, kalendar + FAQ) — od 1500 EUR setup. AI agent sa CRM integracijom i kvalifikacijom leadova — od 3000 EUR. Outbound agent (zove klijente za potvrde/povratne informacije) — od 4000 EUR. Po pozivu: 0.10–0.30 EUR/minut (Twilio + AI). Setup mesečnog monitoring i fine-tuninga skripta — od 80 EUR/mes. Setup traje 2–4 nedelje.",
    locale: "sr",
    category: "pricing",
  },
  {
    content:
      "Načini plaćanja: Standardno plaćamo u dve rate — 50% pre početka rada (depozit), 50% po isporuci. Za veće projekte moguće je plaćanje u više rata vezano za milestone-ove. Plaćanje putem fakture sa rokom od 7 dana. Prihvatamo bankarski transfer. Sve cene su u eurima (EUR). PDV se ne obračunava za domaće klijente (paušalno oporezivanje).",
    locale: "sr",
    category: "pricing",
  },

  // --- TEHNOLOGIJE: Detaljnije ---
  {
    content:
      "Next.js je React framework za pravljenje modernih web aplikacija. Prednosti: server-side rendering za bolji SEO, automatska optimizacija slika, brzo učitavanje strana, statički i dinamički sadržaj. Solvera koristi Next.js za sve sajtove jer pruža najbolje performanse i SEO od svih dostupnih framework-ova. Vercel je platforma za hosting Next.js aplikacija sa automatskim deploy-om, CDN-om i SSL sertifikatima.",
    locale: "sr",
    category: "services",
  },
  {
    content:
      "React je najpopularnija JavaScript biblioteka za pravljenje korisničkih interfejsa. Koristi se za izgradnju interaktivnih web aplikacija. TypeScript dodaje tipove JavaScript-u što smanjuje greške i poboljšava kvalitet koda. Tailwind CSS je utility-first CSS framework za brzo stilizovanje bez pisanja custom CSS-a. Ove tehnologije zajedno omogućavaju brz razvoj kvalitetnih aplikacija.",
    locale: "sr",
    category: "services",
  },
  {
    content:
      "Backend tehnologije koje Solvera koristi: Node.js za skalabilne serverske aplikacije i API-je. PostgreSQL za pouzdane relacione baze podataka. MongoDB za fleksibilne NoSQL baze. Redis za keširanje i brze operacije. Docker za kontejnerizaciju i lako deploy-ovanje. AWS za cloud infrastrukturu — EC2, S3, RDS, Lambda. Sve ove tehnologije su industry standard i koriste ih najveće svetske kompanije.",
    locale: "sr",
    category: "services",
  },

  // --- PODRŠKA POSLE PROJEKTA ---
  {
    content:
      "Podrška posle isporuke projekta: Po završetku projekta dobijate kompletan izvorni kod, dokumentaciju i pristup svim servisima. Nudimo opcionalnu mesečnu podršku koja uključuje: ispravke bagova, manje izmene sadržaja, monitoring performansi, bezbednosna ažuriranja i tehničku podršku putem emaila ili WhatsApp-a. Niste obavezni da koristite našu podršku — možete angažovati bilo kog drugog developera jer je kod vaš.",
    locale: "sr",
    category: "services",
  },
  {
    content:
      "Garancije Solvera: Svaki projekat dolazi sa 30 dana besplatne garancije posle isporuke. U tom periodu ispravljamo sve bagove bez dodatne naplate. Redovna komunikacija tokom projekta — nedeljni update-ovi sa napretkom. Ako niste zadovoljni, vraćamo depozit pre početka kodiranja. Transparentni rokovi — pre početka dobijate jasan vremenski plan sa milestone-ovima.",
    locale: "sr",
    category: "services",
  },

  // --- UPOREDBE SA KONKURENCIJOM ---
  {
    content:
      "Solvera vs. velika agencija: Velike agencije naplaćuju 5-10x više jer imaju skupe kancelarije, account menadžere, PM-ove i marketing timove. Kod Solvere radite direktno sa inženjerom — nema posrednika, nema nepotrebnih troškova. Isti kvalitet, brža isporuka, znatno niža cena. Primer: agencija naplaćuje 5000-15000 EUR za sajt, pravim isti kvalitet od 150-800 EUR.",
    locale: "sr",
    category: "about",
  },
  {
    content:
      "Solvera vs. freelancer: Za razliku od ad-hoc freelancera, Solvera radi po strukturisanom procesu — pisana specifikacija, fiksna cena unapred, code review pre puštanja u rad, profesionalna dokumentacija, vlasništvo nad kodom od prvog dana. Komunikacija ide kroz jasan kanal (WhatsApp grupa + nedeljni demo), a ne 'kad stigne'. Nema rizika da nestanete bez koda i pristupa — sve je vaše od starta. Cilj: kvalitet i poverenje agencije, brzina i cena freelancera.",
    locale: "sr",
    category: "about",
  },
  {
    content:
      "Solvera vs. WordPress/Wix/Squarespace: Gotova rešenja poput WordPress-a imaju ograničenja u performansama, bezbednosti i prilagodljivosti. Solvera pravi custom sajtove u Next.js koji su 3-5x brži, bolje rankirani na Google-u, potpuno prilagodljivi vašim potrebama i bez mesečnih pretplata za pluginove. Vi ste vlasnik koda, ne zavisite od platforme.",
    locale: "sr",
    category: "about",
  },

  // --- SEO I MARKETING ---
  {
    content:
      "SEO optimizacija sajtova: Svaki sajt koji Solvera napravi dolazi sa ugrađenom SEO optimizacijom. To uključuje: pravilnu strukturu HTML-a (headings, meta tagovi), optimizovane slike (WebP format, lazy loading), brzo učitavanje (Core Web Vitals), mobile-first dizajn, XML sitemap, robots.txt, Open Graph tagove za društvene mreže, i strukturirane podatke (schema.org). Rezultat: bolje pozicioniranje na Google-u bez dodatnih troškova.",
    locale: "sr",
    category: "services",
  },
  {
    content:
      "Analitika i praćenje: Integrišemo Google Analytics, Google Search Console i druge alate za praćenje poseta, konverzija i ponašanja korisnika na vašem sajtu. Dashboard za praćenje ključnih metrika u realnom vremenu. Postavljamo konverzione ciljeve i praćenje događaja (klikovi na dugmad, popunjeni formulari, pozivi). Sve ovo pomaže da razumete šta radi a šta ne na vašem sajtu.",
    locale: "sr",
    category: "services",
  },

  // --- SPECIFIČNI SCENARIJI ---
  {
    content:
      "Rešenje za restorane i kafiće: Solvera pravi sajtove za ugostiteljske objekte sa online menijem, rezervacijom stolova, radnim vremenom, galerijom fotografija i integracijom sa Google Maps. Opciono: online naručivanje hrane, integracija sa servisima za dostavu, QR kod za digitalni meni. Cena od 250 EUR za kompletno rešenje.",
    locale: "sr",
    category: "services",
  },
  {
    content:
      "Rešenje za lekare, stomatologe i ordinacije: Profesionalan sajt sa opisom usluga, timom lekara, online zakazivanjem termina, kontakt formom i mapom lokacije. GDPR/ZZPL usklađen za zaštitu podataka pacijenata. Opciono: integracija sa kalendarom za automatsko zakazivanje, SMS/email podsetnci za pacijente. Cena od 300 EUR.",
    locale: "sr",
    category: "services",
  },
  {
    content:
      "Rešenje za advokate i advokatske kancelarije: Profesionalan sajt sa oblastima prava, biografijama advokata, kontakt formom za konsultacije, blog za pravne savete i FAQ sekcijom. SEO optimizovan za lokalne pretrage (npr. 'advokat Novi Sad'). Cena od 250 EUR.",
    locale: "sr",
    category: "services",
  },
  {
    content:
      "Rešenje za online kurseve i edukaciju: Platforma za e-learning sa video lekcijama, kvizovima, sertifikatima, korisničkim nalozima i praćenjem napretka. Integracija sa platnim sistemima za naplatu kurseva. Opciono: live streaming predavanja, forum za diskusije, affiliate program. Cena od 500 EUR.",
    locale: "sr",
    category: "services",
  },
  {
    content:
      "Rešenje za nekretnine i agencije za nekretnine: Sajt sa katalogom nekretnina, naprednom pretragom (lokacija, cena, tip), galerijom fotografija, mapom i kontakt formom za svaku nekretninu. Admin panel za dodavanje i uređivanje nekretnina. Opciono: integracija sa portalima za nekretnine. Cena od 500 EUR.",
    locale: "sr",
    category: "services",
  },
  {
    content:
      "Rešenje za fitnes centre i teretane: Sajt sa rasporedom treninga, opisom programa, cenama članarina, online prijavom i integracijom sa društvenim mrežama. Opciono: sistem za rezervaciju termina, praćenje napretka članova, mobilna aplikacija. Cena od 300 EUR.",
    locale: "sr",
    category: "services",
  },

  // --- BEZBEDNOST ---
  {
    content:
      "Bezbednost sajtova i aplikacija: Solvera primenjuje best practices za web bezbednost. SSL sertifikati (HTTPS) su uključeni besplatno. Zaštita od XSS, CSRF i SQL injection napada. Redovna ažuriranja dependencija. Bezbedna autentifikacija korisnika (hashing lozinki, JWT tokeni). Za poslovne sisteme: role-based access control, audit logovi, enkripcija podataka. ZZPL (Zakon o zaštiti podataka o ličnosti) usklađenost.",
    locale: "sr",
    category: "services",
  },

  // --- HOSTING I INFRASTRUKTURA ---
  {
    content:
      "Hosting opcije: Vercel — idealan za Next.js sajtove, besplatan za manje projekte, automatski deploy sa Git-a, globalni CDN. AWS — za kompleksnije aplikacije koje zahtevaju više kontrole. DigitalOcean — dobar balans cene i performansi za srednje projekte. Supabase — za baze podataka i autentifikaciju. Sve ove platforme imaju servere u Evropi za brže učitavanje u Srbiji. Prosečan mesečni trošak hostinga: 0-20 EUR za sajtove, 20-100 EUR za kompleksnije aplikacije.",
    locale: "sr",
    category: "services",
  },

  // --- MOBILNE APLIKACIJE ---
  {
    content:
      "Mobilne aplikacije: Solvera primarno pravi web aplikacije koje izgledaju i rade kao native mobilne aplikacije (PWA — Progressive Web App). PWA se instalira direktno sa sajta, radi offline, šalje push notifikacije i koristi sve mogućnosti telefona. Prednost: jedan kod za web i mobilni, bez troškova objavljivanja na App Store/Google Play, brže ažuriranje. Za projekte koji zahtevaju native funkcionalnosti (kamera, GPS, senzori), radim sa React Native.",
    locale: "sr",
    category: "services",
  },

  // --- MIGRACIJA ---
  {
    content:
      "Migracija sa starog sajta: Ako imate postojeći sajt na WordPress-u, Wix-u ili drugoj platformi, Solvera može da ga prebaci na moderan Next.js stack. Proces: 1) Analiza postojećeg sajta i sadržaja. 2) Dizajn i razvoj novog sajta sa svim postojećim sadržajem. 3) Redirekcije starih URL-ova za očuvanje SEO-a. 4) Testiranje i lansiranje. Ceo proces traje 1-3 nedelje zavisno od veličine sajta. SEO se obično poboljša nakon migracije zahvaljujući bržem učitavanju.",
    locale: "sr",
    category: "services",
  },

  // --- ČESTA PITANJA: DODATNA ---
  {
    content:
      "Da li radite redizajn postojećih sajtova? Da, radim kompletne redizajne. Analiziram vaš postojeći sajt, identifikujem probleme (sporo učitavanje, loš SEO, zastareo dizajn) i pravim potpuno nov sajt sa modernim dizajnom i tehnologijom. Sav postojeći sadržaj se prebacuje. Cena redizajna je ista kao izrada novog sajta.",
    locale: "sr",
    category: "faq",
  },
  {
    content:
      "Da li radite samo sa firmama iz Srbije? Primarno radim sa firmama iz Srbije i regiona (Bosna, Crna Gora, Hrvatska), ali prihvatam i klijente iz inostranstva. Komunikacija je na srpskom ili engleskom. Svi sastanci su online (Google Meet ili Zoom), tako da lokacija nije bitna.",
    locale: "sr",
    category: "faq",
  },
  {
    content:
      "Kako izgleda komunikacija tokom projekta? Komuniciramo direktno sa vama putem WhatsApp-a, emaila ili video poziva — šta vam više odgovara. Nedeljni update-ovi sa napretkom, demo verzija sajta dostupna od prvog dana da pratite kako se razvija. Prosečno vreme odgovora na poruke: manje od 24 sata, obično unutar par sati tokom radnog vremena.",
    locale: "sr",
    category: "faq",
  },
  {
    content:
      "Šta se dešava ako nisam zadovoljan rezultatom? Radimo iterativno — vidite napredak svake nedelje i dajete feedback. Ako na kraju niste zadovoljni, možete tražiti izmene dok ne bude po vašoj želji (u okviru dogovorenog obima). Nikada nećete platiti za nešto čime niste zadovoljni. Pre početka kodiranja možete odustati i dobiti depozit nazad.",
    locale: "sr",
    category: "faq",
  },
  {
    content:
      "Da li mogu da dodam nove funkcionalnosti posle lansiranja? Naravno! Sajt se može proširivati i nadograđivati u bilo kom trenutku. Pošto koristimo modernu arhitekturu, dodavanje novih strana, funkcionalnosti ili integracija je jednostavno. Možete to uraditi sami (ako imate developera) ili nas angažovati za nadogradnju.",
    locale: "sr",
    category: "faq",
  },
  {
    content:
      "Da li nudite obuku za korišćenje sajta/sistema? Da, svaki projekat uključuje besplatnu obuku za korišćenje CMS-a ili admin panela. Obuka je obično 30-60 minuta video poziva gde vam pokazujemo kako da ažurirate sadržaj, dodajete proizvode, menjate slike i slično. Ostavljamo i pisanu dokumentaciju sa korak-po-korak uputstvima.",
    locale: "sr",
    category: "faq",
  },
  {
    content:
      "Koliko košta domen i hosting? Domen (.rs, .com, .co.rs) košta 10-15 EUR godišnje. Hosting na Vercel-u je besplatan za manje sajtove (do 100GB bandwidth mesečno). Za veće projekte, hosting na AWS-u ili DigitalOcean-u košta 5-20 EUR mesečno. Ukupni mesečni troškovi za standardan poslovni sajt: 0-5 EUR. Pomažem vam sa registracijom domena i postavljanjem hostinga.",
    locale: "sr",
    category: "faq",
  },
  {
    content:
      "Da li mogu da koristim svoj postojeći domen? Da, apsolutno. Ako već imate registrovan domen, samo ga preusmerimo na novi sajt. Proces traje 5-15 minuta i potpuno je besplatan. Ako nemate domen, pomažem vam da izaberete i registrujete odgovarajući domen.",
    locale: "sr",
    category: "faq",
  },

  // --- INDUSTRIJE I NIŠE ---
  {
    content:
      "Industrije sa kojima Solvera ima iskustvo: E-commerce i online prodavnice. Ugostiteljstvo (restorani, kafići, hoteli). Zdravstvo (ordinacije, klinike). Profesionalne usluge (advokati, računovođe, konsultanti). Fitnes i wellness. Nekretnine. Edukacija i online kursevi. Startapi i SaaS. Proizvodnja i distribucija. Svaka industrija ima specifične potrebe i mi prilagođavamo rešenja tome.",
    locale: "sr",
    category: "about",
  },

  // --- RADNO VREME I DOSTUPNOST ---
  {
    content:
      "Radno vreme i dostupnost Solvera: Radimo ponedeljak-petak, 9:00-18:00 (CET). Odgovaramo na poruke i van radnog vremena kad je moguće. Za hitne situacije (sajt pao, bezbednosni problem) dostupni smo 24/7. Prvi sastanak/konsultacija je uvek besplatan i traje 30-60 minuta. Zakazivanje je moguće putem emaila, WhatsApp-a ili kontakt forme na sajtu.",
    locale: "sr",
    category: "contact",
  },

  // --- VELIČINA TIMA ---
  {
    content:
      "Solvera je solo founder operacija. Bez 20 ili 50 zaposlenih — i to je prednost. Direktna komunikacija bez posrednika, niži troškovi (nema account menadžera, HR-a, kancelarija), brže donošenje odluka i veća posvećenost svakom projektu. Bez zapošljavanja radi imitacije veličine — fokus je na kvalitetu, ne na kvantitetu.",
    locale: "sr",
    category: "about",
  },

  // --- KOMPLETAN TECH STACK ---
  {
    content:
      "Kompletan spisak tehnologija sa kojima Solvera radi: AI / LLM — OpenAI (GPT-4/5), Anthropic Claude, LangChain, pgvector, Whisper, ElevenLabs, OpenAI Realtime. Voice / telefonija — Twilio, LiveKit. Frontend — Next.js, React, TypeScript, Tailwind CSS, Framer Motion. Backend — Node.js, Express, REST API. Baze podataka — PostgreSQL, Supabase, pgvector, Redis. Cloud i infrastruktura — AWS (EC2, S3, RDS, Lambda, Bedrock), Vercel, Docker. Sve ostale tehnologije koje nisu na ovom spisku NE koristim. NE radim u: PHP, WordPress, Angular, Vue.js, Java, C#, .NET, Ruby, Django, Laravel, n8n, Zapier.",
    locale: "sr",
    category: "services",
  },

  // --- TEHNOLOGIJE KOJE NE KORISTIMO ---
  {
    content:
      "Tehnologije koje Solvera NE koristi: Ne radim u PHP-u, WordPress-u, Joomla-u, Drupal-u niti drugim zastarelim tehnologijama. Ne koristim jQuery, Angular, Vue.js niti Java za web razvoj. Stack je isključivo: Next.js, React, TypeScript, Tailwind CSS, Node.js, PostgreSQL, MongoDB, Docker, AWS. Ovo nisu nasumični izbori — ove tehnologije pružaju najbolje performanse, bezbednost i skalabilnost za moderne web aplikacije.",
    locale: "sr",
    category: "services",
  },
  {
    content:
      "Zašto Solvera ne koristi PHP i WordPress? WordPress je star 20+ godina i ima ozbiljne probleme sa performansama, bezbednošću i održavanjem. PHP sajtovi su obično 3-5x sporiji od Next.js sajtova. WordPress zahteva stalne plugin ažuriranja i podložan je hakerskim napadima. Mi koristimo Next.js jer pruža server-side rendering, automatsku optimizaciju, bolji SEO i potpunu kontrolu nad kodom bez zavisnosti od pluginova.",
    locale: "sr",
    category: "faq",
  },

  // --- PROCES PO TIPU PROJEKTA: DETALJNIJE (sa /proces stranice) ---
  {
    content:
      "Proces za SAJT (4 koraka): 1) Upoznavanje i skica — sat vremena razgovora, pregled konkurencije, planiranje stranica. Isporuka: pisani dokument sa strukturom sajta, skica rasporeda za računar i telefon, konačan spisak funkcionalnosti. 2) Dizajn — izgled na osnovu skica, jedna runda većih izmena uključena. Isporuka: vizuelni predlog svih glavnih stranica, predlog boja/slova, interaktivan klik-prototip. 3) Izrada — pravljenje prema odobrenom dizajnu, svakodnevni napredak, probni sajt dostupan od prvog dana. Isporuka: probni sajt koji se ažurira u realnom vremenu, sistem za samostalan unos sadržaja (CMS) ako je potreban, prilagođeno svim uređajima. 4) Provera i puštanje u rad — provera u svim pretraživačima, merenje brzine, SEO osnove, prebacivanje na vaš domen. Isporuka: sajt uživo, Google Analytics, video uputstvo za samostalno menjanje sadržaja. Komunikacija: WhatsApp grupa + kratak video pregled napretka svakog petka. Posle puštanja: 30 dana besplatnog ispravljanja grešaka. Mesečno održavanje 50€ pokriva server, rezervne kopije i sitne izmene.",
    locale: "sr",
    category: "process",
  },
  {
    content:
      "Proces za POSLOVNI SISTEM (CRM, SaaS, interni alat, portal — 4 koraka): 1) Upoznavanje i planiranje — radionica sa ljudima iz vaše firme, popis konkretnih scenarija, izbor tehnologija. Isporuka: spisak scenarija po prioritetu, plan baze podataka u dijagramu, vizuelni prikaz ključnih ekrana, dokument o tehnologijama. 2) Prva radna verzija (MVP) — prijavljivanje sa različitim ulogama, prvi glavni tok posla, probna verzija dostupna sa nedeljnim petkovskim prikazom. Isporuka: prijavljivanje sa pravima po ulogama, prvi kompletan tok, probno okruženje sa test podacima. 3) Dodavanje funkcionalnosti — kratki ciklusi, vi testirate čim je spremno, mi ugrađujemo povratne informacije. Isporuka: nove funkcionalnosti na probnom okruženju, automatske provere, kratak osvrt na svaki ciklus. 4) Završna priprema i puštanje u rad — testiranje pri opterećenju, provera bezbednosti, prebacivanje postojećih podataka, sistem za praćenje grešaka. Isporuka: produkcija, automatsko praćenje grešaka, admin panel + priručnik, obuka tima. Komunikacija: deljena grupa za poruke, kratak nedeljni sastanak (~30min), pristup kodu sa pregledom svih izmena. Posle puštanja: garantovan odgovor na prijavljene greške u roku od 48h. Nove funkcionalnosti po fiksnoj ceni ili mesečni paket od 10/20/40 sati.",
    locale: "sr",
    category: "process",
  },
  {
    content:
      "Proces za AI / VEŠTAČKU INTELIGENCIJU (chatbot, RAG, AI alat — 4 koraka): 1) Pregled podataka i plan — pregled vaših izvora podataka, izbor AI modela, postavljanje merila uspeha (tačnost, brzina, mesečni trošak). Isporuka: dokument o izvorima podataka i njihovoj pripremi, izbor AI modela uz obrazloženje, procena mesečnog troška. 2) Proba i merenje kvaliteta — prva radna verzija sa proverom kroz stvarna pitanja iz vašeg poslovanja. Isporuka: radna proba (jednostavan prikaz), tabela sa test pitanjima i ocenama, spisak uputstava za AI sa istorijom izmena. 3) Povezivanje i korisnički izgled — ugrađivanje u sajt kao asistent u uglu, povezivanje sa vašim sistemom ili poseban alat. Isporuka: korisnički deo spreman za rad, zaštita od zloupotrebe, postepeno prikazivanje odgovora. 4) Praćenje i predaja — sistem za praćenje razgovora, troškova i rezervnih odgovora kad AI ne zna. Isporuka: pregledna tabla (razgovori, trošak, uspešnost), prebacivanje na živog operatera kad treba, pisano uputstvo za izmene u AI odgovorima. Komunikacija: deljena tabela sa pravim primerima odgovora + nedeljni prikaz napretka. Posle puštanja: mesečno doterivanje AI uputstava (uključeno prva tri meseca), prelazak na bolji ili jeftiniji model po fiksnoj ceni kad se pojavi.",
    locale: "sr",
    category: "process",
  },
  {
    content:
      "Proces za AI VOICE (4 koraka): 1) Skript i tok poziva — definišemo tipove poziva, šta AI sme sam, kad prebacuje vama. Isporuka: dijagram toka, primeri dijaloga, lista akcija (rezervacija/prebacivanje/SMS). 2) Izbor glasa i tehnička postavka — testiranje glasova (ElevenLabs/OpenAI Realtime), Twilio broj, integracija sa kalendarom/CRM. Isporuka: izabran glas, aktivan AI broj u test okruženju. 3) Pilot i fine-tuning — AI prima realne pozive u kontrolisanom režimu, slušamo transkripte, doteramo skript. Isporuka: dashboard sa transkriptima, doteran skript posle 50–100 poziva. 4) Puštanje — prebacivanje pravog broja na AI, monitoring, obuka tima. Komunikacija: deljen dashboard + nedeljni pregled metrika.",
    locale: "sr",
    category: "process",
  },

  // ============================================================
  // SALES & KONVERZIJA — chunk-ovi za bolje ubеđivanje
  // ============================================================

  // --- OBJECTION HANDLING ---
  {
    content:
      "Kada klijent kaže 'preskupo je': Razmislite koliko vas košta da NEMATE sajt. Istraživanja pokazuju da 80% kupaca u Srbiji pretražuje firmu online pre nego što pozove ili dođe. Bez sajta, gubite te ljude — oni odu kod konkurencije koja ima online prisustvo. Sajt od 150 EUR se isplati već sa 2-3 nova klijenta koje dobijete preko njega. Plus, sajt radi za vas 24/7 — to je najjeftiniji 'zaposleni' kojeg ćete ikada imati.",
    locale: "sr",
    category: "sales",
  },
  {
    content:
      "Kada klijent kaže 'imam već sajt': Ako vam sajt učitava duže od 3 sekunde, 53% posetilaca ga napušta pre nego što vidi sadržaj. Google aktivno penalizuje spore sajtove — gurate se na drugu ili treću stranu rezultata. Stari WordPress sajt sa 15 pluginova je bezbednosni rizik i troši vam novac na održavanje. Besplatna konsultacija uključuje analizu vašeg trenutnog sajta — pokazaćemo vam tačno šta gubite i kako da popravite.",
    locale: "sr",
    category: "sales",
  },
  {
    content:
      "Kada klijent kaže 'nemam vremena za to sad': Razumemo, posao je na prvom mestu. Zato smo napravili proces koji zahteva minimalno vašeg vremena — bukvalno 2-3 kratka video poziva od po 30 minuta plus poruke u WhatsApp grupi. Mi vodimo sve: dizajn, razvoj, sadržaj, lansiranje. Vi samo odobrite i dajete feedback. Većina klijenata je iznenađena koliko je lako kad tim preuzme sve.",
    locale: "sr",
    category: "sales",
  },
  {
    content:
      "Kada klijent kaže 'pokušaću sam sa Wix ili WordPress': Wix i WordPress izgledaju jeftino na početku, ali skriveni troškovi brzo rastu. Premium template: 50-100 EUR. Pluginovi za SEO, kontakt forme, backup: 100-300 EUR godišnje. Sporo učitavanje jer WordPress koristi PHP iz 2004. Bezbednosni rizici — WordPress je meta #1 za hakere (43% svih hakovanih sajtova su WordPress). Na kraju potrošite više vremena i novca nego da ste odmah uzeli profesionalan sajt.",
    locale: "sr",
    category: "sales",
  },
  {
    content:
      "Kada klijent kaže 'treba mi samo jednostavan sajt': Čak i najjednostavniji sajt treba da radi posao — da privuče posetioce, da ih ubedi i da ih pretvori u klijente. Sajt koji samo postoji ali ne konvertuje je bačen novac. Pravim sajtove koji su optimizovani za konverziju: jasan poziv na akciju, brzo učitavanje, SEO od prvog dana, kontakt forma koja radi. Landing page od 150 EUR koji vam donese 5 novih klijenata mesečno — to je investicija, ne trošak.",
    locale: "sr",
    category: "sales",
  },

  // --- ROI I BUSINESS CASE ---
  {
    content:
      "Koliko košta firma BEZ sajta ili sa lošim sajtom: 93% kupovnih odluka počinje pretragom na internetu. Firma bez sajta je nevidljiva za te ljude. U Srbiji, e-commerce raste 20-30% godišnje. Firme sa profesionalnim sajtom prijavljuju 40-60% više upita nego firme bez online prisustva. Svaka sekunda sporijeg učitavanja sajta smanjuje konverziju za 7%. Sajt od 150-300 EUR koji vam donese samo 3-4 nova klijenta mesečno se isplati višestruko.",
    locale: "sr",
    category: "sales",
  },
  {
    content:
      "Tipični ROI scenariji (orijentaciono — nisu garancija): AI chatbot na sajtu uslužne firme — automatizuje 60–80% inicijalnih upita, lead capture noću dok ekipa spava. AI Voice recepcionar za salon/kliniku — nijedan poziv ne ostane neodgovoren, manje 'no-show' termina zbog automatskih podsetnika. Interni AI asistent — tim štedi 3–10 sati nedeljno po osobi (manje pretrage Drive-a). AI obrada faktura — 5–15 sati ručnog rada nedeljno se eliminiše. Konkretne brojke zavise od projekta i klijenta.",
    locale: "sr",
    category: "sales",
  },
  {
    content:
      "Besplatna konsultacija — šta dobijate: 30-60 minuta razgovora sa inženjerom (ne sa prodavcem). Analiza vašeg trenutnog IT setup-a. Konkretne preporuke šta možete poboljšati. Procena troškova i rokova za vaš projekat. Bez ikakvih obaveza — ako odlučite da ne radite sa nama, i dalje dobijate korisne savete. Zakažite poziv na info@solveradev.rs ili WhatsApp +381 63 838 4196.",
    locale: "sr",
    category: "sales",
  },

  // --- URGENCY ---
  {
    content:
      "Zašto ne čekati sa izradom sajta: Svaki dan bez sajta je dan u kojem vaša konkurencija privlači klijente koje vi propuštate. Kapacitet je ograničen — radim sa ograničenim brojem klijenata istovremeno da bih održao kvalitet. Trenutno mogu da primim nove projekte, ali slobodni termini se popunjavaju brzo. Što pre počnemo, pre ćete imati sajt koji radi za vas. Prva konsultacija je besplatna i bez obaveza.",
    locale: "sr",
    category: "sales",
  },

  {
    content:
      "Kada klijent kaže 'našao sam jeftinije' ili 'konkurencija nudi za manje': Ne pričaj loše o konkurenciji. Naglasi vrednost ali budi fleksibilan sa cenom: 'Razumem — uvek je pametno uporediti ponude. Naše cene na sajtu su startne — konkretna cena uvek zavisi od obima projekta i možemo je prilagoditi vašem budžetu. Ono što dobijate kod nas: moderan Next.js stack (3-5x brži od WordPress-a), kompletno vlasništvo nad kodom, SEO ugrađen od prvog dana i 30 dana besplatne garancije. Hajde da zakažemo kratak besplatan poziv od 15 minuta — razgovaramo o tome šta vam treba i dajem vam ponudu koja ima smisla za vaš budžet. Bez ikakvih obaveza.' GLAVNI CILJ: zakazati besplatnu konsultaciju. Lead ne sme da ode bez ponuđenog poziva.",
    locale: "sr",
    category: "sales",
  },
  {
    content:
      "Kada klijent okleva ili nije siguran da li da nastavi: Ne pritiskaj, ali ne odustaj. Ponudi nešto bez rizika: 'Potpuno vas razumem — važno je doneti pravu odluku. Evo šta predlažem: zakažimo besplatan poziv od 15-20 minuta gde ćemo analizirati vaše potrebe i dati vam konkretnu ponudu. Bez ikakvih obaveza — ako vam se ne svidi, dobili ste besplatan savet. Možete nas kontaktirati na WhatsApp +381 63 838 4196 ili email info@solveradev.rs.' Uvek ostavi vrata otvorena i daj konkretan sledeći korak.",
    locale: "sr",
    category: "sales",
  },

  // --- CONVERSATION STARTERS ---
  {
    content:
      "Kada posetilac pita 'šta radite' ili 'čime se bavite': Solvera je AI-first studio iz Novog Sada. Primarno gradim 4 AI proizvoda — chatbot za sajt, voice agent koji prima pozive, interni AI asistent za vaš tim, i AI integracije po meri. Web razvoj i poslovni sistemi rade se sekundarno. Šta vas konkretno zanima — chatbot, voice agent, interni asistent ili nešto drugo?",
    locale: "sr",
    category: "sales",
  },
  {
    content:
      "Kada posetilac pošalje pozdrav ('zdravo', 'ćao', 'hej', 'dobar dan'): Odgovori prijateljski i pitaj čime možeš da pomogneš. Primer odgovora: 'Zdravo! 👋 Dobrodošli na Solvera sajt. Kako vam mogu pomoći? Možete me pitati o našim uslugama, cenama, procesu rada — ili mi recite šta vam treba pa ću vam dati konkretnu preporuku.'",
    locale: "sr",
    category: "sales",
  },

  // --- SOCIAL PROOF: pošteno bez izmišljotina ---
  {
    content:
      "Solvera je nov tim koji izlazi na tržište. Nemamo javan portfolio sa logotipima klijenata jer su projekti ili pod NDA-om ili u razvoju. Ne pričamo izmišljene priče o klijentima koji su uštedeli 'X evra mesečno' — to rade druge firme koje pune sajt lažima. Naša priča: dva inženjera koji su radili u različitim okruženjima i odlučili da naprave fer ponudu za srpsko tržište. Fer cene, jasan obim posla, kompletno vlasništvo nad kodom — to su stvari za koje garantujemo, jer ih kontrolišemo. Specifične brojke o klijentima ne izmišljamo.",
    locale: "sr",
    category: "about",
  },

  // --- UPSELL I CROSS-SELL ---
  {
    content:
      "Bundle ponude: Sajt + AI Chatbot paket — sajt sa ugrađenim RAG botom koji odgovara 24/7 i hvata leadove. Chatbot + Voice paket — pokrivate i web posetioce i pozivaoce sa istim brand-om i tonom. AI Chatbot + Interni Asistent — isti AI sloj radi za klijente (eksterno) i za vaš tim (interno) iz iste baze znanja. Bundle cene su uvek povoljnije nego pojedinačno.",
    locale: "sr",
    category: "sales",
  },
  {
    content:
      "Predlozi za upsell: Ako pravite sajt — dodajte AI Chatbot koji hvata leadove dok ne radite. Ako imate chatbot — dodajte AI Voice agent na telefonu (isti brand, isti ton, ista baza znanja). Ako vam tim gubi vreme tražeći info — interni AI asistent štedi 3–10 sati nedeljno po osobi. Ako imate konkretan ručni tok koji se ponavlja — AI integracija po meri može da ga automatizuje.",
    locale: "sr",
    category: "sales",
  },

  // ============================================================
  // NOVO — sa redizajniranog sajta (proces, problemi, kalkulator)
  // ============================================================

  // --- KALKULATOR / FORMULAR ZA POČETAK PROJEKTA ---
  {
    content:
      "Kako započeti projekat sa Solverom: Na sajtu postoji formular 'Započnite projekat' (kalkulator) gde u 5 koraka opisujete svoj projekat — tip projekta, obim, rok i kontakt. Na osnovu unetih informacija vam stiže okvirna procena cene i rok, plus zakazujemo besplatnu konsultaciju. Link na sajtu: dugme 'Započnite projekat' u glavnom meniju i u CTA sekcijama. Alternativno, možete direktno poslati email na info@solveradev.rs ili WhatsApp poruku na +381 63 838 4196 sa kratkim opisom šta vam treba.",
    locale: "sr",
    category: "contact",
  },

  // --- PROBLEMI KOJE REŠAVAMO (sa ProblemSection) ---
  {
    content:
      "Problemi koje srpske firme imaju sa standardnim IT agencijama (i kako Solvera rešava): 1) Mesecima čekate — prosečan projekat 4+ meseca. Solvera radi efikasno, AI prototip za par dana. 2) Komunikacija kroz 5 slojeva. Solvera: direktan razgovor sa inženjerom. 3) Zastarela tehnologija — agencije nude WordPress dok konkurencija već koristi AI agente. Solvera je AI-first: OpenAI, Claude, LangChain, Voice AI. 4) Nemate kod — 50%+ klijenata ne dobije source. Solvera: kod i podaci su vaši od prvog dana.",
    locale: "sr",
    category: "about",
  },

  // --- PRINCIPI KOJI VAŽE ZA SVAKI PROJEKAT ---
  {
    content:
      "4 principa koji važe za svaki Solvera projekat: 1) Sve vam je dostupno od prvog dana — od starta dobijate probni sajt, vizuelni predlog i pristup kodu. Gledate kako projekat napreduje iz dana u dan, ne čekate veliko otkrivanje na kraju. 2) Bez posrednika — razgovarate direktno sa osobom koja radi vaš projekat. Pitanje ujutru, odgovor istog dana. 3) Fiksna cena i jasan obim posla — pre početka potpisujemo dokument sa listom poslova i cenom. Sve izmene idu kroz zahtev za izmenu, pregledno i uz vašu saglasnost. 4) Sve je na vaše ime — kod, server i baza podataka, sve je vaše. U bilo kom trenutku možete nastaviti sami ili sa drugim timom, bez uslovljavanja.",
    locale: "sr",
    category: "process",
  },

  // --- FIKSNA CENA + CHANGE REQUEST ---
  {
    content:
      "Kako funkcioniše fiksna cena u Solveri: Pre početka rada potpisujem dokument sa tačnom listom poslova i fiksnom cenom — nema iznenađenja u toku projekta. Ako se u toku projekta ispostavi da vam treba nešto van prvobitnog dogovora, ide kroz formalan 'zahtev za izmenu' (change request) — procenjujem dodatne sate i cenu, vi odobravate ili odbijate, pa nastavljamo. Ovo štiti i mene i vas: vi znate tačno šta plaćate, ja znam tačno šta isporučujem. Bez 'oh, to nismo računali pa je sad duplo skuplje' iznenađenja na kraju.",
    locale: "sr",
    category: "process",
  },

  // --- VLASNIŠTVO NAD KODOM (detaljnije) ---
  {
    content:
      "Šta tačno znači 'sve je na vaše ime' u Solveri: Od prvog dana kod ide u GitHub repozitorijum koji je registrovan na vaše ime (ili na ime vaše firme). Server (Vercel, AWS, DigitalOcean) je takođe na vaš nalog, plaćanje ide direktno sa vaše kartice. Domen je registrovan na vaše ime. Baza podataka je vaša. Imam pristup samo dok radim, posle predaje pristup mi možete oduzeti u 5 sekundi. Možete u bilo kom trenutku angažovati drugog developera da nastavi rad — bez 'ali oni koriste neki specijalan framework koji niko drugi ne razume' priče. Stack je standardan industry-grade.",
    locale: "sr",
    category: "process",
  },

  // --- COMMUNICATION & WHATSAPP GRUPA ---
  {
    content:
      "Kako izgleda komunikacija tokom projekta u Solveri: Za svaki projekat se otvara WhatsApp grupa u kojoj ste vi, inženjer koji radi i opciono članovi vašeg tima. Tu idu brza pitanja, deljenje screenshota, kratke odluke. Za veće stvari (demo, pregled napretka, planiranje sledećih koraka) zakazujemo kratak video poziv jednom nedeljno, obično petkom — traje 15-30 minuta. Probno okruženje (preview link) imate od prvog dana, vidite kako sajt/sistem napreduje u realnom vremenu. Email koristimo za formalne stvari (ponuda, faktura, change request).",
    locale: "sr",
    category: "process",
  },

  // --- ODRŽAVANJE PO TIPU PROJEKTA ---
  {
    content:
      "Mesečno održavanje po tipu projekta u Solveri: Sajtovi — 50€/mesec pokriva server, rezervne kopije, sitne tekstualne i sadržajne izmene, tehnički monitoring. 30 dana posle puštanja u rad bilo koje ispravljanje grešaka je besplatno. Poslovni sistemi — garantovan odgovor na prijavljene greške u roku od 48h. Nove funkcionalnosti naplaćuju se po fiksnoj ceni ili kroz mesečni paket sati: 10 sati, 20 sati ili 40 sati mesečno (po dogovorenoj satnici). AI rešenja — prva tri meseca uključuju mesečno doterivanje AI uputstava (prompts) bez dodatne naknade. Kasnije po fiksnoj ceni. Automatizacija — manje održavanje obično, optimizacija po potrebi.",
    locale: "sr",
    category: "pricing",
  },

  // --- HERO PORUKA / POZICIONIRANJE ---
  {
    content:
      "Glavna poruka i pozicioniranje Solvere: 'Vi vodite biznis, ja brinem o tehnologiji.' Ideja: vlasnik biznisa ne treba da uči Next.js, dizajn ili automatizaciju — treba da se bavi onim što ga čini boljim u svom poslu. Moj zadatak je da uklonim IT trenje. Dok druge agencije mesecima razvlače rokove, ja isporučujem brzo i kvalitetno. Direktan pristup inženjeru koji gradi vaš proizvod — bez posrednika, bez čekanja, bez kompromisa. Brza isporuka, direktna komunikacija, kvalitet bez kompromisa.",
    locale: "sr",
    category: "about",
  },

  // --- ŠTA NUDIMO (sažetak za quick reference) ---
  {
    content:
      "Šta Solvera nudi — PRIMARNO 4 AI PROIZVODA: 1) AI CHATBOT za sajt — RAG asistent obučen na vašoj bazi znanja, 24/7, lead capture. Od 600€. 2) AI VOICE — agent koji prima pozive umesto vas, srpski glas, rezervacije, kvalifikacija. Setup od 1500€. 3) AI ASISTENT za interni tim — privatan asistent za vaše zaposlene, pretražuje vašu dokumentaciju. Od 2000€. 4) AI INTEGRACIJE po meri — obrada dokumenata, triage mejlova, sumarizacija, agentski tokovi. Od 800€. SEKUNDARNO: web razvoj (sajt od 300€) i poslovni sistemi (od 2000€). Solvera NE radi n8n / Zapier opštu automatizaciju — samo AI-native rešenja.",
    locale: "sr",
    category: "services",
  },

  // --- BOT GUARDRAILS — šta NE sme da kaže ---
  {
    content:
      "Stroga pravila za AI asistenta na Solvera sajtu: NIKAD ne izmišlji imena klijenata, kompanija ili specifične brojke o uspehu. NIKAD ne tvrdi 'imamo X+ projekata' ako nisi siguran — Solvera je nov tim. Solvera ima JEDNOG osnivača: Milan Julinac. NIKAD ne pominji druge osobe po imenu kao Solvera zaposlene. NIKAD ne reci da klijenti mogu da nas pozovu telefonom — preferiramo email i WhatsApp. NIKAD ne tvrdi tehnologiju koju Solvera ne koristi (npr. PHP, WordPress, Java, .NET, n8n, Zapier) kao da je deo stack-a. Ako ne znaš odgovor, iskreno reci 'to morate da pitate inženjera direktno — javite se na info@solveradev.rs ili WhatsApp +381 63 838 4196.'",
    locale: "sr",
    category: "faq",
  },
];

// English chunks removed — currently targeting Serbian market only

// ============================================================
// SEED SCRIPT
// ============================================================

async function seed() {
  console.log("Connected to Supabase");

  // Clear existing data
  const { error: deleteError } = await supabase
    .from("knowledge_chunks")
    .delete()
    .neq("id", 0); // delete all rows

  if (deleteError) {
    console.error("Failed to clear existing data:", deleteError.message);
    console.log("Make sure you ran the SQL setup first (see scripts/setup-db.ts)");
    return;
  }
  console.log("Cleared existing knowledge chunks");

  const allChunks = [...SR_CHUNKS];
  console.log(`Seeding ${allChunks.length} chunks...`);

  for (let i = 0; i < allChunks.length; i++) {
    const chunk = allChunks[i];
    console.log(
      `  [${i + 1}/${allChunks.length}] ${chunk.locale}/${chunk.category}: ${chunk.content.slice(0, 60)}...`
    );

    const embedding = await getEmbedding(chunk.content);

    const { error } = await supabase.from("knowledge_chunks").insert({
      content: chunk.content,
      locale: chunk.locale,
      category: chunk.category,
      embedding: JSON.stringify(embedding),
    });

    if (error) {
      console.error(`  ERROR: ${error.message}`);
    }

    // Small delay to avoid rate limiting
    await new Promise((r) => setTimeout(r, 200));
  }

  const { count } = await supabase
    .from("knowledge_chunks")
    .select("*", { count: "exact", head: true });
  console.log(`\nDone! ${count} chunks in database.`);
}

seed().catch(console.error);
