"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/features/TestimonialCard";
import { testimonials } from "@/data/testimonials";
import { staggerContainer, fadeInUp } from "@/lib/animations";

export function Testimonials() {
  const t = useTranslations();

  return (
    <section className="py-20 md:py-28 bg-surface-secondary">
      <Container>
        <SectionHeading
          title={t("Testimonials.title")}
          subtitle={t("Testimonials.subtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={fadeInUp}>
              <TestimonialCard
                quote={t(testimonial.quoteKey)}
                name={t(testimonial.nameKey)}
                role={t(testimonial.roleKey)}
                company={t(testimonial.companyKey)}
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
