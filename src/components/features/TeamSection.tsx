"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TeamMemberCard } from "./TeamMemberCard";
import { TeamMemberDetail } from "./TeamMemberDetail";
import { teamMembers } from "@/data/team";
import { staggerContainer } from "@/lib/animations";

export function TeamSection() {
  const t = useTranslations();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedMember = teamMembers.find((m) => m.id === selectedId) ?? null;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading title={t("About.team.title")} />

        <LayoutGroup>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto"
          >
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                onClick={() => setSelectedId(member.id)}
              />
            ))}
          </motion.div>

          <AnimatePresence>
            {selectedMember && (
              <TeamMemberDetail
                member={selectedMember}
                onClose={() => setSelectedId(null)}
              />
            )}
          </AnimatePresence>
        </LayoutGroup>
      </Container>
    </section>
  );
}
