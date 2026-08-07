import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

/**
 * Onboarding za novog klijenta.
 *
 * Dodavanje klijenta je red u bazi i jedan link — ali oba se lako pogreše.
 * Slug sa velikim slovom ili razmakom prolazi kroz INSERT i pukne tek u
 * adresi, a link sklopljen napamet zaboravi ključ i vrati 403 koji izgleda
 * kao kvar servisa.
 *
 *   npx tsx scripts/klijent.ts lista
 *   npx tsx scripts/klijent.ts dodaj "Haljine Ana" haljine ana@primer.rs
 *   npx tsx scripts/klijent.ts link haljine
 */

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const SERVICE_URL =
  process.env.IG_SERVICE_URL?.trim().replace(/\/+$/, "") ??
  "https://spicy-solutions-production.up.railway.app";

const CONNECT_SECRET = process.env.CONNECT_SECRET?.trim();

/** Slug završi u adresi, u logovima i u ručnim upitima. Sve osim malih slova,
 *  cifara i crtice se negde usput polomi, pa se odbija odmah. */
function proveriSlug(slug: string) {
  if (!/^[a-z0-9-]{2,64}$/.test(slug)) {
    throw new Error(
      `Slug "${slug}" nije ispravan. Dozvoljena su mala slova, cifre i crtica (npr. "haljine-ana").`
    );
  }
}

function link(slug: string) {
  const kljuc = CONNECT_SECRET ?? "<CONNECT_SECRET>";
  return `${SERVICE_URL}/connect?t=${slug}&k=${kljuc}`;
}

function upozoriAkoNemaKljuca() {
  if (CONNECT_SECRET) return;
  console.log(
    "\n  Napomena: CONNECT_SECRET nije u .env.local, pa je u linku ostao\n" +
      "  rezervisani tekst. Dodaj ga (istu vrednost kao na Railway-u) da bi\n" +
      "  skripta ispisivala link koji možeš odmah da pošalješ."
  );
}

async function lista() {
  const { data: klijenti, error } = await supabase
    .from("tenants")
    .select("slug, name, kontakt_fallback, active")
    .order("slug");
  if (error) throw error;

  const { data: nalozi } = await supabase
    .from("ig_accounts")
    .select("tenant_id, username");

  const povezani = new Map((nalozi ?? []).map((n) => [n.tenant_id, n.username]));

  console.log(`\n${klijenti?.length ?? 0} klijenata:\n`);
  for (const k of klijenti ?? []) {
    const nalog = povezani.get(k.slug);
    const stanje = nalog ? `@${nalog}` : "nije povezan";
    const aktivan = k.active ? "" : "  [neaktivan]";
    console.log(`  ${k.slug.padEnd(20)} ${k.name}`);
    console.log(`  ${"".padEnd(20)} ${stanje}${aktivan}\n`);
  }
}

async function dodaj(naziv: string, slug: string, mejl?: string, prompt?: string) {
  proveriSlug(slug);

  const { data: postoji } = await supabase
    .from("tenants")
    .select("slug")
    .eq("slug", slug)
    .maybeSingle();

  if (postoji) {
    throw new Error(
      `Klijent "${slug}" već postoji. Za link pokreni:  npx tsx scripts/klijent.ts link ${slug}`
    );
  }

  const { error } = await supabase.from("tenants").insert({
    name: naziv,
    slug,
    kontakt_fallback: mejl ?? null,
    system_prompt_extra: prompt ?? null,
    active: true,
  });
  if (error) throw error;

  console.log(`\n  Klijent "${naziv}" dodat kao "${slug}".\n`);
  console.log(`  Link za povezivanje:\n\n    ${link(slug)}\n`);
  console.log("  Šta dalje:");
  console.log("    1. Dok App Review nije gotov — pozovi je kao Instagram testera");
  console.log("       i sačekaj da prihvati poziv iz svojih IG podešavanja");
  console.log("    2. Pošalji link odozgo");
  console.log(`    3. Proveri ${SERVICE_URL}/status — nalog mora da se pojavi`);
  console.log("    4. Napuni bazu znanja za tog klijenta\n");
  upozoriAkoNemaKljuca();
}

async function main() {
  const [naredba, ...args] = process.argv.slice(2);

  switch (naredba) {
    case "lista":
      await lista();
      break;

    case "dodaj": {
      const [naziv, slug, mejl, prompt] = args;
      if (!naziv || !slug) {
        throw new Error(
          'Fali naziv ili slug.\n  npx tsx scripts/klijent.ts dodaj "Haljine Ana" haljine ana@primer.rs'
        );
      }
      await dodaj(naziv, slug, mejl, prompt);
      break;
    }

    case "link": {
      const [slug] = args;
      if (!slug) throw new Error("Fali slug.  npx tsx scripts/klijent.ts link haljine");
      proveriSlug(slug);

      const { data } = await supabase
        .from("tenants")
        .select("slug")
        .eq("slug", slug)
        .maybeSingle();
      if (!data) throw new Error(`Klijent "${slug}" ne postoji. Vidi:  npx tsx scripts/klijent.ts lista`);

      console.log(`\n    ${link(slug)}\n`);
      upozoriAkoNemaKljuca();
      break;
    }

    default:
      console.log(`
  Upravljanje klijentima

    npx tsx scripts/klijent.ts lista
    npx tsx scripts/klijent.ts dodaj "<naziv>" <slug> [mejl] [prompt]
    npx tsx scripts/klijent.ts link <slug>

  Primer:
    npx tsx scripts/klijent.ts dodaj "Haljine Ana" haljine ana@primer.rs
`);
  }
}

main().catch((err) => {
  console.error(`\n  ${err.message}\n`);
  // Ne `process.exit()`: obara Node dok Supabase klijent još drži otvorene
  // ručke, pa se uredna poruka o grešci završi rušenjem i izlaznim kodom 127.
  process.exitCode = 1;
});
