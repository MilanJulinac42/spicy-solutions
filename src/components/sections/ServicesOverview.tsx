"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/features/ServiceCard";
import { services } from "@/data/services";
import { staggerContainer } from "@/lib/animations";

export function ServicesOverview() {
  const t = useTranslations();

  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          title={t("ServicesOverview.title")}
          subtitle={t("ServicesOverview.subtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              icon={service.icon}
              title={t(service.titleKey)}
              description={t(service.descriptionKey)}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
