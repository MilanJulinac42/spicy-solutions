import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="sr">
      <body className="bg-[#0a0a0a] text-white min-h-screen flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-6">
          <div className="text-[120px] md:text-[180px] font-bold leading-none bg-gradient-to-r from-[#FF6B35] to-[#E55A2B] bg-clip-text text-transparent select-none">
            404
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mt-2 mb-4">
            Stranica nije pronađena
          </h1>
          <p className="text-gray-400 mb-8">
            Stranica koju tražite ne postoji ili je premeštena.
          </p>
          <Link
            href="/sr"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A2B] transition-colors"
          >
            Početna
          </Link>
        </div>
      </body>
    </html>
  );
}
