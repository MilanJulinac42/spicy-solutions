import Image from "next/image";

/**
 * The S mark cropped out of /logo.png (a 500×500 canvas where the mark is
 * small and centred), toned to brushed champagne, next to a real text
 * wordmark. The baked-in "SOLVERA" in the PNG was ~8px tall on screen.
 */
export function Logo({ size = 36, wordmark = true }: { size?: number; wordmark?: boolean }) {
  // The mark spans roughly x 180–320, y 140–295 of the 500px source.
  const scale = size / 150;
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className="relative block overflow-hidden shrink-0"
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <Image
          src="/logo.png"
          alt=""
          width={500}
          height={500}
          priority
          className="absolute max-w-none"
          style={{
            width: 500 * scale,
            height: 500 * scale,
            left: -175 * scale,
            top: -142 * scale,
            filter: "grayscale(1) sepia(0.55) saturate(1.1) brightness(1.35) contrast(1.05)",
          }}
        />
      </span>
      {wordmark && (
        <span className="text-[1.15rem] font-semibold tracking-[0.18em] uppercase text-foreground">
          Solvera
        </span>
      )}
    </span>
  );
}
