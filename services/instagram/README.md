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

Kopiraj `.env.example` u `.env` i popuni. `IG_VERIFY_TOKEN` biraš sam — bilo koji
niz znakova, samo isti upiši i kod Mete u koraku 4.

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
