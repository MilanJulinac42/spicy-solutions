# Spiko Edu — platforma za onlajn učenje jezika

Popis funkcionalnosti, snimljen pregledom koda (`../spiko-edu-kurs`), radi korišćenja
kao referenca na sajtu. Sve navedeno je provereno u kodu, ne po sećanju.

## Šta je

Platforma na kojoj škola jezika drži cele kurseve onlajn: nastavnik pravi lekcije i
vežbe, polaznik uči i vežba, a časovi uživo se zakazuju kroz sistem i automatski
dobijaju Zoom link i termin u nastavnikovom kalendaru.

Nije sajt sa video snimcima — to je **sistem sa svojom bazom, nalozima, plaćanjem i
povezivanjem sa spoljnim servisima**.

## Arhitektura

Monorepo sa tri odvojene aplikacije:

| Deo | Šta je | Tehnologije |
|---|---|---|
| `apps/web` | Aplikacija za polaznike + prodajne stranice | Next.js 15 (App Router), Tailwind v4, SWR |
| `apps/admin` | Panel za nastavnika/administratora | Next.js 15, dnd-kit, TipTap |
| `apps/api` | Server | Bun, Elysia, Drizzle ORM |
| `packages/shared` | Deljeni tipovi | TypeScript |

**Baza:** Supabase Postgres, **22 tabele** · **Prijava:** Supabase Auth (JWT)
**Video:** Bunny Stream (otpremanje velikih fajlova, isporuka u više rezolucija)
**AI:** Anthropic Claude

## Šta polaznik vidi

- **Pregledna tabla** — gde je stao, šta je sledeće
- **Kursevi** — podeljeni na module i lekcije, sa video sadržajem
- **Vežbe** — više tipova: višestruki izbor, popuni prazninu, spajanje pojmova, redosled, prevod
- **Ponavljanje** — gradivo se vraća u razmacima radi pamćenja, ne uči se jednom pa zaboravi
- **Napredak** — praćenje pređenog gradiva i rezultata
- **Zakazivanje časa** — bira slobodan termin kod nastavnika
- **Beleške i obeleženi pojmovi** — sopstveni rečnik
- **AI tutor** — objašnjava gradivo i greške, razgovor se pamti
- **Komentari i ocene** uz lekcije
- **Pretraga** kroz sadržaj

Uz to: registracija, prijava, zaboravljena lozinka, podešavanja naloga, i prodajne
stranice (cenovnik, o nama, kontakt, plaćanje, uslovi, privatnost).

## Šta administrator može

- **Praviti kurseve** — kursevi → moduli → lekcije, sa prevlačenjem za redosled i
  uređivačem teksta
- **Praviti vežbe** — kroz šablone, bez diranja koda
- **Otpremati video** — sa čišćenjem fajlova koji su ostali bez lekcije
- **Voditi polaznike** — spisak naloga i pristupa
- **Definisati radno vreme** — pravila dostupnosti iz kojih se generišu slobodni termini
- **Pregledati zakazane časove**
- **Videti statistiku**
- **Povezati Google nalog** — jednim klikom, za kalendar

## Integracije

| Integracija | Šta radi | Status |
|---|---|---|
| **Zoom** | Sam pravi sastanak za zakazan čas i šalje link | ✅ Radi |
| **Google Calendar** | Upisuje čas u kalendar i **čita zauzetost** da ne ponudi termin kad nastavnik ne može | ✅ Radi |
| **Bunny Stream** | Otpremanje i isporuka video lekcija | ✅ Radi |
| **Anthropic Claude** | AI tutor, objašnjenje grešaka | ✅ Radi |
| **Raiffeisen naplata** | Plaćanje karticom, preusmerenje na banku sa potpisanom potvrdom | ⏳ Napisano, čeka odobrenje banke |
| **Supabase Auth** | Nalozi, prijava, reset lozinke | ✅ Radi |

Namerno **bez Stripe-a** — naplata ide preko domaće banke, kako srpski trgovac i mora.

## Detalji koji pokazuju da je rađeno ozbiljno

**Provera zauzetosti pre nuđenja termina.** Sistem ne nudi termin pa da se ispostavi
da nastavnik ne može — čita zauzetost iz Google kalendara i prikazuje samo ono što je
stvarno slobodno.

**Zoom preko naloga firme**, ne preko ličnog. Sastanci se prave automatski u ime škole,
sa keširanjem pristupnog tokena da se ne traži novi pri svakom zakazivanju.

**Kontrola pristupa sadržaju** — poseban sloj proverava da li polaznik ima pravo na
lekciju koju je otvorio.

**Ograničenje broja zahteva** — zaštita od zloupotrebe.

**Podsetnici** — zakazani posao koji šalje obaveštenja.

**Rodno neutralan jezik kroz ceo sajt.** Ne pita se pol korisnika, pa nigde ne piše
„završila si" ni „završio si" — nego „lekcija završena". Pravilo važi i za AI tutora.
Sitnica koju skoro niko ne uradi.

**Podaci o trgovcu na jednom mestu** — pun poslovni naziv, PIB, matični broj, u skladu
sa Zakonom o zaštiti potrošača i zahtevima banke.

## Kako ovo koristiti kao referencu

Spiko Edu landing (spikoedu.rs) pokazuje da umeš da napraviš **sajt**.
Ova platforma pokazuje nešto drugo — da umeš da napraviš **sistem**:

- više aplikacija koje rade zajedno
- svoja baza sa 22 tabele
- nalozi, prava pristupa, plaćanje
- povezivanje sa tri spoljna servisa (Zoom, Google, Bunny)
- panel u kom klijent sam vodi sadržaj, bez tebe

To je tačno ono što piše na `/usluge/enterprise` — samo sa dokazom umesto opisa.

## Napomena o dokumentaciji u tom repou

`CLAUDE.md` u projektu pod „Out of scope" i dalje navodi Zoom, Google Calendar i
Raiffeisen kao **buduće faze** — a sve troje je u međuvremenu napisano. Vredi to
ispraviti da AI sesije u tom repou ne rade po zastarelom opisu.
