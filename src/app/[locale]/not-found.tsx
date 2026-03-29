"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Home, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { fadeInUp, scaleSpring } from "@/lib/animations";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-spicy-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-spicy-400/3 rounded-full blur-3xl" />
      </div>

      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center max-w-lg mx-auto relative"
        >
          {/* Big 404 */}
          <motion.div
            variants={scaleSpring}
            initial="hidden"
            animate="visible"
            className="text-[140px] md:text-[200px] font-bold leading-none animated-gradient-text select-none"
          >
            404
          </motion.div>

          <h1 className="text-2xl md:text-3xl font-bold text-foreground -mt-2 mb-4">
            Stranica nije pronađena
          </h1>
          <p className="text-foreground-muted mb-10 leading-relaxed">
            Stranica koju tražite ne postoji ili je premeštena.
            <br className="hidden sm:block" />
            Proverite URL ili se vratite na početnu.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-spicy-400 text-white rounded-xl font-semibold hover:bg-spicy-500 transition-colors shadow-lg shadow-spicy-400/25"
            >
              <Home className="w-4 h-4" />
              Početna stranica
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-surface-secondary border border-border-default text-foreground rounded-xl font-semibold hover:border-spicy-400/30 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Kontaktirajte nas
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
