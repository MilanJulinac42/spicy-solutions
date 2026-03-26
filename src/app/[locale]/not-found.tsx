"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Home } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { fadeInUp } from "@/lib/animations";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center">
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center max-w-lg mx-auto"
        >
          {/* Big 404 */}
          <div className="text-[120px] md:text-[180px] font-bold leading-none gradient-text select-none">
            404
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-foreground mt-2 mb-4">
            Stranica nije pronađena
          </h1>
          <p className="text-foreground-muted mb-8">
            Stranica koju tražite ne postoji ili je premeštena. Proverite URL ili
            se vratite na početnu.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-spicy-400 text-white rounded-lg font-semibold hover:bg-spicy-500 transition-colors shadow-lg shadow-spicy-400/25"
            >
              <Home className="w-4 h-4" />
              Početna
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface-secondary border border-border-default text-foreground rounded-lg font-semibold hover:border-spicy-400/30 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kontakt
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
