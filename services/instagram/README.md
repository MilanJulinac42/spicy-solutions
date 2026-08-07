# Instagram DM asistent

Odgovara na Instagram poruke iz iste baze znanja koju koriste sajt i telefonski
asistent. Zasebno od sajta namerno — poruka ne sme da ostane bez odgovora zato
što se sajt u tom trenutku deploy-uje.

## Kako radi

```
Poruka na Instagramu
   → Meta šalje na POST /webhook
   → provera potpisa (App Secret)
   → odmah vraćamo 200, pa tek onda obrađujemo   (Meta ponavlja sve sporije od par sekundi)
   → pretraga baze znanja (Supabase + OpenAI)
   → odgovor nazad kroz Graph API
```

## Podešavanje

### 1. Meta aplikacija

1. [developers.facebook.com](https://developers.facebook.com) → **Create App** → tip **Business**
2. **Add Product → Instagram → API setup with Instagram Login**
   *(ne varijanta sa Facebook Login — ona traži FB stranicu)*
3. Poveži Instagram profesionalni nalog
4. Generiši token sa dozvolama `instagram_business_basic` i
   `instagram_business_manage_messages`

### 2. Promenljive okruženja

Kopiraj `.env.example` u `.env` i popuni. `IG_VERIFY_TOKEN` i `CONNECT_SECRET`
biraš sam — bilo koji niz znakova. `IG_VERIFY_TOKEN` mora isti da stoji i kod
Mete u koraku 4.

| Promenljiva | Šta je |
|---|---|
| `IG_APP_ID` | Instagram App ID iz Meta panela |
| `IG_APP_SECRET` | Instagram App Secret — potpisuje i webhook i `state` |
| `IG_VERIFY_TOKEN` | biraš sam, isti kao kod Mete |
| `PUBLIC_URL` | javna adresa servisa, bez kose crte na kraju |
| `CONNECT_SECRET` | biraš sam, štiti stranicu za povezivanje |
| `IG_ACCESS_TOKEN` | samo za prvi nalog; posle se ne koristi |

### 3. Railway

- New Project → Deploy from GitHub → ovaj repo
- **Root Directory:** `services/instagram`
- Start command se čita iz `package.json` (`npm start`)
- Dodaj sve promenljive iz `.env`
- Railway dodeli adresu tipa `https://xxx.up.railway.app`

### 4. Webhook kod Mete

- **Callback URL:** `https://xxx.up.railway.app/webhook`
- **Verify Token:** isti kao `IG_VERIFY_TOKEN`
- Pretplati se na polje **`messages`**

Meta odmah šalje GET zahtev za proveru; ako servis radi, verifikacija prolazi.

### 5. Provera

Pošalji poruku svom nalogu sa drugog profila. Odgovor stiže za par sekundi.

```bash
curl https://xxx.up.railway.app/health     # → ok
```

## Povezivanje klijenta

Jedan servis opslužuje sve klijente. Koji nalog je primio poruku odlučuje i čija
baza znanja odgovara i kojim tokenom se šalje odgovor — `entry[].id` iz webhook-a.

**Novi klijent:**

1. Dodaj red u `tenants` (`slug`, `name`, `kontakt_fallback`, po želji
   `system_prompt_extra`)
2. Pošalji mu link:
   `https://xxx.up.railway.app/connect?t=<slug>&k=<CONNECT_SECRET>`
3. Klikne dugme, prijavi se na Instagram, potvrdi pristup
4. Proveri `GET /status` — nalog mora da se pojavi

Link je zaštićen `CONNECT_SECRET`-om. Bez toga bi svako ko pogodi adresu mogao
da zakači svoj nalog i troši naš OpenAI budžet.

**Redirect URI** mora biti upisan i kod Mete, u podešavanjima Instagram
proizvoda: `https://xxx.up.railway.app/oauth/callback`

Povezivanje radi „redom": kod → kratkotrajni token → dugotrajni → upis u bazu →
**pretplata na `messages`**. Poslednji korak je onaj koji se zaboravlja: bez
njega sve izgleda uspešno, token stoji u bazi, klijent je video potvrdu — a
webhook nikad ne stigne i asistent ćuti bez ijedne greške u logu.

## Token

Metin token važi 60 dana i posle toga prosto prestane da radi — bez greške i bez
obaveštenja, samo poruke ostanu bez odgovora. Zato se osvežava sam, na 45. dan,
a provera ide na svakih 12 sati, za **svaki** povezani nalog.

Tokeni žive u tabeli `ig_accounts`, ne u promenljivama okruženja — Railway
promenljive se ne mogu menjati iz koda, pa bi se osveženi token izgubio pri
sledećem deploy-u.

Prvi put kad se servis pokrene sa praznom tabelom, token iz `IG_ACCESS_TOKEN`
se sam prepiše u bazu. Bez toga bi baš nalog zbog kog je servis i nastao bio
jedini koji se ne osvežava.

Ako baza nije dostupna, servis nastavlja sa tokenom iz okruženja — problem sa
čitanjem ne sme da obori dopisivanje.

```bash
curl https://xxx.up.railway.app/status
```

Ako osvežavanje padne, u logovima stoji `!!! OSVEŽAVANJE TOKENA NIJE USPELO`
sa imenom naloga. Rešenje je da klijent ponovo prođe kroz `/connect`.

## App Review

**Ne treba za sopstveni nalog** — radi odmah. Potreban je tek kada povezuješ
naloge klijenata, zajedno sa verifikacijom poslovnog naloga. To traje nedeljama,
pa prijavu pokreni pre nego što zatreba.

## Napomene

- **Istorija razgovora** se drži u memoriji, sat vremena po sagovorniku. Namerno
  se ne čuva — DM je razgovor, ne evidencija. Restart servisa je briše.
- **Odjeci** (`is_echo`) se preskaču; bez toga bi asistent odgovarao sam sebi u krug.
- **Kad baza ne radi**, servis ne pada — javi da ima tehnički problem i uputi na mejl.
- **Dužina odgovora** je namerno kratka (2–3 rečenice). Ovo je Instagram, ne mejl.
- **Slike** se opisuju jednim prolazom kroz model, pa se dalje radi sa tim
  opisom. Jeftinije je nego nositi sliku kroz svaki poziv, a opis je i ono što
  ima smisla čuvati kad zatreba katalog proizvoda.
- **Video i glasovne poruke** ne umemo da pročitamo, ali ne ćutimo — javimo to i
  zamolimo sagovornika da napiše pitanje. Ćutanje izgleda kao da je bot pukao.
