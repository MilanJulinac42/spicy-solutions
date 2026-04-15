"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CostCalculator } from "@/components/calculator/CostCalculator";

export default function CalculatorPage() {
  const t = useTranslations("Calculator");

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <Container>
        <SectionHeading title={t("title")} subtitle={t("subtitle")} centered />
        <div className="mt-12">
          <CostCalculator />
        </div>
      </Container>
    </section>
  );
}
