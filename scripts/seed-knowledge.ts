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
  // --- USLUGE: AI ---
  {
    content:
      "Solvera gradi AI integracije i RAG chatbot-ove. Pametni chatbot-ovi koji poznaju vaš biznis iznutra, automatizuju korisničku podršku i obrađuju upite 24/7. Tehnologije: OpenAI, LangChain, Python, PostgreSQL. Funkcionalnosti: RAG chatbot obučen na VAŠIM podacima, integracija sa postojećim alatima, baza znanja koja uči, 24/7 podrška, merljiv ROI prvog meseca.",
    locale: "sr",
    category: "services",
  },
  {
    content:
      "Primeri AI rešenja: RAG chatbot za korisničku podršku obučen na dokumentaciji i FAQ-u. Interni AI asistent za zaposlene — pita AI umesto pretrage dokumenata. Automatska obrada dokumenata (fakture, ugovori). Inteligentna pretraga podataka prirodnim jezikom. Tačnost RAG chatbot-ova je obično 90%+. Podržani jezici: srpski, engleski i svi veliki jezici.",
    locale: "sr",
    category: "services",
  },
  // --- USLUGE: Automatizacija ---
  {
    content:
      "Solvera koristi n8n za automatizaciju poslovnih procesa. n8n je open-source platforma koja povezuje vaše alate i automatizuje ponavljajuće zadatke. Tehnologije: n8n, REST APIs, Webhooks, Node.js. Funkcionalnosti: vizuelni workflow builder, 400+ integracija, automatska sinhronizacija podataka, zakazani zadaci 24/7, self-hosted (podaci ostaju na vašim serverima).",
    locale: "sr",
    category: "services",
  },
  {
    content:
      "Primeri automatizacije: sinhronizacija podataka (nova porudžbina → ERP → email kupcu → ažuriranje zaliha). Automatsko izveštavanje (dnevni/nedeljni izveštaji na email ili Slack). Lead management (novi kontakt → CRM → obaveštenje timu → welcome email). Automatizacija fakturisanja i praćenje plaćanja. n8n je besplatan softver, plaćate samo server (nekoliko evra mesečno).",
    locale: "sr",
    category: "services",
  },
  // --- CENE ---
  {
    content:
      "Cene Solvera usluga: Landing page sajt od 250 EUR, rok izrade 2-5 dana. E-commerce prodavnica i kompleksniji sajtovi od 750 EUR, rok 1-2 nedelje. Web aplikacija sa dashboard-om od 1000 EUR, rok 2-4 nedelje. Poslovni sistemi po meri (SaaS, CRM, ERP) od 1500 EUR, MVP 1-3 nedelje, kompletniji sistem 4-8 nedelja. AI integracija i RAG chatbot od 750 EUR, prototip za par dana, kompletno rešenje 1-3 nedelje. Automatizacija sa n8n od 250 EUR. Sve cene su u eurima i ne uključuju PDV.",
    locale: "sr",
    category: "pricing",
  },
  // --- PROCES RADA ---
  {
    content:
      "Proces rada Solvera: 1) Besplatna konsultacija — analiziramo vaš IT setup i identifikujemo gde gubite vreme. Bez obaveza. 2) Jasan plan — detaljan obim posla, jasni rokovi i cene. Tačno znate šta dobijate. 3) Razvoj i isporuka — gradimo brzo sa modernim alatima, redovna ažuriranja, direktan pristup developerima. 4) Predaja i sloboda — sve je vaše: kod, podaci, hosting. Nudimo opcionalnu podršku, ali nikada niste zaključani.",
    locale: "sr",
    category: "process",
  },
  // --- O NAMA ---
  {
    content:
      "Solvera je tim iz Novog Sada, Srbija, koji veruje da srpski biznisi zaslužuju brži, kvalitetniji IT. Tim: Milan Julinac (suosnivač, 5+ godina iskustva, 20+ projekata, ekspert za React, Next.js, TypeScript, Node.js, PostgreSQL, MongoDB, AWS, Docker) i Dragan Jelačić (suosnivač, pravi moderne web platforme i automatizuje poslovne procese). Vrednosti: moderna tehnologija, kvalitet bez kompromisa, radikalna transparentnost, vaš kod i vaši podaci.",
    locale: "sr",
    category: "about",
  },
  // --- KONTAKT ---
  {
    content:
      "Kontakt informacije Solvera: Email info@solveradev.rs, telefon +381 63 838 4196, adresa Novi Sad, Srbija. WhatsApp: +381 63 838 4196. Besplatna konsultacija — recite nam o vašem IT setup-u i pokazaćemo vam gde gubite vreme i efikasnost. Bez ikakvih obaveza. Odgovaramo u roku od 24 sata.",
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
      "Česta pitanja — Poslovni sistemi: Koliko traje razvoj? MVP 1-3 nedelje, kompletniji sistem 4-8 nedelja. Da li može integracija sa postojećim alatima? Da, integrišemo se sa bilo kojim sistemom koji ima API. Šta kad sistem treba proširiti? Arhitektura je čista i dokumentovana, proširivanje je jednostavno. Ko održava posle isporuke? Imate kompletan kod i dokumentaciju, nudimo opcionalnu podršku.",
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
      "Česta pitanja — Automatizacija: Šta je n8n? Open-source platforma za automatizaciju — kao LEGO za poslovne procese, vizuelno, bez kodiranja. Koje aplikacije mogu povezati? 400+ integracija: Gmail, Slack, Google Sheets, Notion, HubSpot, Stripe, PostgreSQL. Gde se čuvaju podaci? n8n je self-hosted, podaci nikada ne prolaze kroz treće strane. Koliko košta održavanje? n8n je besplatan, plaćate samo server (nekoliko evra mesečno).",
    locale: "sr",
    category: "faq",
  },
  // --- TESTIMONIALI ---
  {
    content:
      "Iskustva klijenata Solvera: Marko Petrović (CEO, TechVentures) — plaćali su velikoj agenciji 400 EUR mesečno samo za hosting, Solvera ih prebacio na bolji setup za jednokratnu naknadu. Ana Jovanović (CTO, DataFlow Inc.) — tražili im 12.000 EUR za chatbot, Solvera napravio bolje za četvrtinu te cene, ROI očigledan prvog meseca. Stefan Nikolić (Menadžer operacija, LogiPro) — Solvera podesio n8n automatizaciju za nedelju dana i uštedeo 1.500 EUR mesečno.",
    locale: "sr",
    category: "about",
  },
  // --- ZAŠTO SOLVERA ---
  {
    content:
      "Zašto izabrati Solvera: 1) Inženjeri, ne prodavci — radite direktno sa developerima, bez posrednika. 2) Sve je vaše — kod, dizajn, dokumentacija, bez zaključavanja. 3) Moderan stack i brza isporuka — Next.js, AI, n8n. 4) Direktna komunikacija — odgovaramo u roku od 24h, redovna ažuriranja. Brža isporuka, 100% vlasništvo nad kodom, 100% zadovoljstvo klijenata.",
    locale: "sr",
    category: "about",
  },

  // ============================================================
  // DODATNI CHUNK-OVI — detaljnija pokrivenost
  // ============================================================

  // --- CENE: Detaljnije ---
  {
    content:
      "Detaljne cene sajtova: Jednostavan landing page (1-3 strane, kontakt forma, responsivan dizajn) — od 250 EUR. Poslovni sajt sa više strana (5-10 strana, blog, galerija, SEO) — od 400 EUR. E-commerce prodavnica (katalog, korpa, plaćanje, korisničko iskustvo) — od 750 EUR. Custom web aplikacija (korisnički nalozi, dashboard, admin panel, API) — od 1000 EUR. Cena zavisi od broja strana, funkcionalnosti i kompleksnosti dizajna. Svaki projekat dobija detaljnu ponudu pre početka rada.",
    locale: "sr",
    category: "pricing",
  },
  {
    content:
      "Detaljne cene poslovnih sistema: MVP (minimalni proizvod) za testiranje tržišta — od 1500 EUR, rok 1-3 nedelje. Kompletna SaaS platforma sa svim funkcionalnostima — od 2500 EUR, rok 4-8 nedelja. CRM ili ERP prilagođen vašem procesu — od 2000 EUR. Integracija sa postojećim sistemima (API povezivanje) — od 500 EUR. Održavanje i podrška posle isporuke — opciono, od 100 EUR mesečno.",
    locale: "sr",
    category: "pricing",
  },
  {
    content:
      "Detaljne cene AI rešenja: Jednostavan chatbot za FAQ i korisničku podršku — od 750 EUR. RAG chatbot obučen na vašoj dokumentaciji sa naprednom pretragom — od 1250 EUR. Interni AI asistent za zaposlene — od 1000 EUR. Automatska obrada dokumenata (fakture, ugovori, prijave) — od 1500 EUR. Mesečno održavanje AI sistema — od 75 EUR. OpenAI troškovi su odvojeni i zavise od količine upita (obično 10-50 EUR mesečno za manje firme).",
    locale: "sr",
    category: "pricing",
  },
  {
    content:
      "Detaljne cene automatizacije: Osnovni n8n workflow (1-2 automatizacije, npr. email + CRM) — od 250 EUR. Kompleksan sistem automatizacije (5+ workflow-a, više integracija) — od 750 EUR. Setup n8n servera na vašoj infrastrukturi — od 150 EUR. Obuka vašeg tima za korišćenje n8n — od 100 EUR. Mesečna podrška i optimizacija — od 50 EUR mesečno.",
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
      "Solvera vs. velika agencija: Velike agencije naplaćuju 5-10x više jer imaju skupe kancelarije, account menadžere, PM-ove i marketing timove. Kod nas radite direktno sa inženjerima — nema posrednika, nema nepotrebnih troškova. Isti kvalitet, brža isporuka, znatno niža cena. Primer: agencija naplaćuje 5000-15000 EUR za sajt, mi pravimo isti kvalitet od 250-1000 EUR.",
    locale: "sr",
    category: "about",
  },
  {
    content:
      "Solvera vs. freelancer: Za razliku od pojedinačnih freelancera, Solvera je tim koji se međusobno dopunjuje. Prednosti: backup ako je jedan nedostupan, code review za bolji kvalitet, širi spektar tehnologija, profesionalna dokumentacija i strukturisan proces. Nema rizika da projekat stane ako freelancer nestane.",
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
      "Rešenje za restorane i kafiće: Solvera pravi sajtove za ugostiteljske objekte sa online menijem, rezervacijom stolova, radnim vremenom, galerijom fotografija i integracijom sa Google Maps. Opciono: online naručivanje hrane, integracija sa servisima za dostavu, QR kod za digitalni meni. Cena od 350 EUR za kompletno rešenje.",
    locale: "sr",
    category: "services",
  },
  {
    content:
      "Rešenje za lekare, stomatologe i ordinacije: Profesionalan sajt sa opisom usluga, timom lekara, online zakazivanjem termina, kontakt formom i mapom lokacije. GDPR/ZZPL usklađen za zaštitu podataka pacijenata. Opciono: integracija sa kalendarom za automatsko zakazivanje, SMS/email podsetnci za pacijente. Cena od 400 EUR.",
    locale: "sr",
    category: "services",
  },
  {
    content:
      "Rešenje za advokate i advokatske kancelarije: Profesionalan sajt sa oblastima prava, biografijama advokata, kontakt formom za konsultacije, blog za pravne savete i FAQ sekcijom. SEO optimizovan za lokalne pretrage (npr. 'advokat Novi Sad'). Cena od 350 EUR.",
    locale: "sr",
    category: "services",
  },
  {
    content:
      "Rešenje za online kurseve i edukaciju: Platforma za e-learning sa video lekcijama, kvizovima, sertifikatima, korisničkim nalozima i praćenjem napretka. Integracija sa platnim sistemima za naplatu kurseva. Opciono: live streaming predavanja, forum za diskusije, affiliate program. Cena od 750 EUR.",
    locale: "sr",
    category: "services",
  },
  {
    content:
      "Rešenje za nekretnine i agencije za nekretnine: Sajt sa katalogom nekretnina, naprednom pretragom (lokacija, cena, tip), galerijom fotografija, mapom i kontakt formom za svaku nekretninu. Admin panel za dodavanje i uređivanje nekretnina. Opciono: integracija sa portalima za nekretnine. Cena od 750 EUR.",
    locale: "sr",
    category: "services",
  },
  {
    content:
      "Rešenje za fitnes centre i teretane: Sajt sa rasporedom treninga, opisom programa, cenama članarina, online prijavom i integracijom sa društvenim mrežama. Opciono: sistem za rezervaciju termina, praćenje napretka članova, mobilna aplikacija. Cena od 400 EUR.",
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
      "Mobilne aplikacije: Solvera primarno pravi web aplikacije koje izgledaju i rade kao native mobilne aplikacije (PWA — Progressive Web App). PWA se instalira direktno sa sajta, radi offline, šalje push notifikacije i koristi sve mogućnosti telefona. Prednost: jedan kod za web i mobilni, bez troškova objavljivanja na App Store/Google Play, brže ažuriranje. Za projekte koji zahtevaju native funkcionalnosti (kamera, GPS, senzori), radimo sa React Native.",
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
      "Da li radite redizajn postojećih sajtova? Da, radimo kompletne redizajne. Analiziramo vaš postojeći sajt, identifikujemo probleme (sporo učitavanje, loš SEO, zastareo dizajn) i pravimo potpuno nov sajt sa modernim dizajnom i tehnologijom. Sav postojeći sadržaj se prebacuje. Cena redizajna je ista kao izrada novog sajta.",
    locale: "sr",
    category: "faq",
  },
  {
    content:
      "Da li radite samo sa firmama iz Srbije? Primarno radimo sa firmama iz Srbije i regiona (Bosna, Crna Gora, Hrvatska), ali prihvatamo i klijente iz inostranstva. Komunikacija je na srpskom ili engleskom. Svi sastanci su online (Google Meet ili Zoom), tako da lokacija nije bitna.",
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
      "Koliko košta domen i hosting? Domen (.rs, .com, .co.rs) košta 10-15 EUR godišnje. Hosting na Vercel-u je besplatan za manje sajtove (do 100GB bandwidth mesečno). Za veće projekte, hosting na AWS-u ili DigitalOcean-u košta 5-20 EUR mesečno. Ukupni mesečni troškovi za standardan poslovni sajt: 0-5 EUR. Mi vam pomažemo sa registracijom domena i postavljanjem hostinga.",
    locale: "sr",
    category: "faq",
  },
  {
    content:
      "Da li mogu da koristim svoj postojeći domen? Da, apsolutno. Ako već imate registrovan domen, samo ga preusmerimo na novi sajt. Proces traje 5-15 minuta i potpuno je besplatan. Ako nemate domen, pomažemo vam da izaberete i registrujete odgovarajući domen.",
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
      "Solvera je mali, fokusiran tim. Nemamo 20 ili 50 zaposlenih — i to je naša prednost. Mali tim znači: direktna komunikacija bez posrednika, niži troškovi (nema account menadžera, HR-a, kancelarija), brže donošenje odluka i veća posvećenost svakom projektu. Ne zapošljavamo ljude da bismo izgledali veće — fokusirani smo na kvalitet, ne na kvantitet.",
    locale: "sr",
    category: "about",
  },

  // --- KOMPLETAN TECH STACK ---
  {
    content:
      "Kompletan spisak tehnologija sa kojima Solvera radi: Frontend — Next.js, React, TypeScript, Tailwind CSS, Framer Motion. Backend — Node.js, Nest.js, Express, GraphQL, REST API. Baze podataka — PostgreSQL, MongoDB, Redis, Supabase. Cloud i infrastruktura — AWS (EC2, S3, RDS, Lambda), Vercel, DigitalOcean, Docker. AI i automatizacija — OpenAI, LangChain, Python, n8n. Mobilno — React Native, Progressive Web Apps (PWA). Sve ostale tehnologije koje nisu na ovom spisku NE koristimo. Ako nas neko pita za PHP, WordPress, Angular, Vue.js, Java, C#, .NET, Ruby, Django, Laravel — odgovor je da to nije naš stack i da ne radimo u tim tehnologijama.",
    locale: "sr",
    category: "services",
  },

  // --- TEHNOLOGIJE KOJE NE KORISTIMO ---
  {
    content:
      "Tehnologije koje Solvera NE koristi: Ne radimo u PHP-u, WordPress-u, Joomla-u, Drupal-u niti drugim zastarelim tehnologijama. Ne koristimo jQuery, Angular, Vue.js niti Java za web razvoj. Naš stack je isključivo: Next.js, React, TypeScript, Tailwind CSS, Node.js, PostgreSQL, MongoDB, Docker, AWS. Ovo nisu nasumični izbori — ove tehnologije pružaju najbolje performanse, bezbednost i skalabilnost za moderne web aplikacije.",
    locale: "sr",
    category: "services",
  },
  {
    content:
      "Zašto Solvera ne koristi PHP i WordPress? WordPress je star 20+ godina i ima ozbiljne probleme sa performansama, bezbednošću i održavanjem. PHP sajtovi su obično 3-5x sporiji od Next.js sajtova. WordPress zahteva stalne plugin ažuriranja i podložan je hakerskim napadima. Mi koristimo Next.js jer pruža server-side rendering, automatsku optimizaciju, bolji SEO i potpunu kontrolu nad kodom bez zavisnosti od pluginova.",
    locale: "sr",
    category: "faq",
  },

  // --- PROCES RADA: DETALJNIJE ---
  {
    content:
      "Detaljan proces rada za sajt: Dan 1-2: besplatna konsultacija, analiza potreba, ponuda sa tačnom cenom i rokom. Dan 3-5: dizajn — šaljemo wireframe i vizuelni koncept na odobrenje. Dan 6-14: razvoj — kodiranje, integracije, sadržaj. Dan 15: testiranje na svim uređajima, popravke, lansiranje. Dan 16-45: 30 dana besplatne garancije. Tokom celog procesa imate pristup preview verziji sajta.",
    locale: "sr",
    category: "process",
  },
  {
    content:
      "Detaljan proces rada za poslovne sisteme: Nedelja 1: discovery — razumevanje poslovnih procesa, mapiranje zahteva, tehnička specifikacija. Nedelja 2-3: MVP — osnovna funkcionalnost za testiranje. Nedelja 4-8: iterativni razvoj — dodavanje funkcionalnosti sprint po sprint, nedeljni demo sa feedbackom. Finalno: testiranje, deploy, obuka tima, dokumentacija, predaja koda.",
    locale: "sr",
    category: "process",
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
