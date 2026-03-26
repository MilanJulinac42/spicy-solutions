"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import type { TeamMember } from "@/data/team";

interface TeamMemberCardProps {
  member: TeamMember;
  onClick: () => void;
}

export function TeamMemberCard({ member, onClick }: TeamMemberCardProps) {
  const t = useTranslations();

  return (
    <motion.div variants={fadeInUp}>
      <motion.div
        onClick={onClick}
        className="group relative text-center p-8 rounded-2xl bg-surface-secondary border border-border-default hover:border-spicy-400/30 hover:shadow-lg hover:shadow-spicy-400/5 transition-all duration-300 cursor-pointer"
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Photo with spinning gradient border */}
        <div className="w-28 h-28 mx-auto mb-5 relative flex items-center justify-center">
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-spicy-400 via-spicy-500 to-spicy-400 animate-spin"
            style={{ animationDuration: "8s" }}
          />
          <motion.div
            className="w-24 h-24 rounded-full overflow-hidden relative z-10 ring-2 ring-surface"
          >
            <Image
              src={member.photo}
              alt={t(`About.team.${member.id}.name`)}
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* Name & Role */}
        <h4 className="text-lg font-semibold text-foreground">
          {t(`About.team.${member.id}.name`)}
        </h4>
        <p className="text-sm text-spicy-400 font-medium mb-2">
          {t(`About.team.${member.id}.role`)}
        </p>
        <p className="text-sm text-foreground-muted mb-4">
          {t(`About.team.${member.id}.bio`)}
        </p>

        {/* View Profile hint */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-foreground-muted/0 group-hover:text-spicy-400 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <span>{t("About.team.viewProfile")}</span>
          <ArrowRight className="w-3 h-3" />
        </div>
      </motion.div>
    </motion.div>
  );
}
