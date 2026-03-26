"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  X,
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Rocket,
  Shield,
  Zap,
  Users,
  Globe,
  Brain,
  Code2,
  Briefcase,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import {
  slideInRight,
  slideUpFull,
  fadeIn,
  staggerContainerFast,
  fadeInUp,
  scaleSpring,
} from "@/lib/animations";
import type { TeamMember, Capability } from "@/data/team";

interface TeamMemberDetailProps {
  member: TeamMember;
  onClose: () => void;
}

const capabilityIcons: Record<Capability["icon"], React.ElementType> = {
  rocket: Rocket,
  shield: Shield,
  zap: Zap,
  users: Users,
  globe: Globe,
  brain: Brain,
};

export function TeamMemberDetail({ member, onClose }: TeamMemberDetailProps) {
  const t = useTranslations();
  const hasContent = member.capabilities.length > 0;

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      />

      {/* Desktop panel */}
      <motion.div
        className="fixed inset-y-0 right-0 w-full md:w-[60vw] lg:w-[50vw] bg-surface z-50 overflow-y-auto border-l border-border-default shadow-2xl hidden md:block"
        variants={slideInRight}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <PanelContent
          member={member}
          onClose={onClose}
          hasContent={hasContent}
        />
      </motion.div>

      {/* Mobile panel */}
      <motion.div
        className="fixed inset-0 bg-surface z-50 overflow-y-auto md:hidden"
        variants={slideUpFull}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <PanelContent
          member={member}
          onClose={onClose}
          hasContent={hasContent}
        />
      </motion.div>
    </>
  );
}

function PanelContent({
  member,
  onClose,
  hasContent,
}: {
  member: TeamMember;
  onClose: () => void;
  hasContent: boolean;
}) {
  const t = useTranslations();

  return (
    <div className="p-6 md:p-10">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 flex items-center justify-center rounded-full bg-surface-secondary border border-border-default hover:border-spicy-400/30 hover:bg-spicy-400/10 transition-all z-10 cursor-pointer"
        aria-label={t("About.team.closeProfile")}
      >
        <X className="w-5 h-5 text-foreground-muted" />
      </button>

      {/* Header */}
      <div className="flex flex-col items-center md:items-start md:flex-row gap-6 mb-10">
        <motion.div
          className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-spicy-400/30 flex-shrink-0"
        >
          <Image
            src={member.photo}
            alt={t(`About.team.${member.id}.name`)}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold gradient-text mb-1">
            {t(`About.team.${member.id}.name`)}
          </h2>
          <p className="text-spicy-400 font-medium mb-3">
            {t(`About.team.${member.id}.role`)}
          </p>
          <p className="text-sm text-foreground-muted max-w-md">
            {t(`About.team.${member.id}.bio`)}
          </p>

          {/* Social links */}
          <div className="flex gap-3 justify-center md:justify-start mt-4">
            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface-secondary border border-border-default hover:border-spicy-400/30 hover:text-spicy-400 text-foreground-muted transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface-secondary border border-border-default hover:border-spicy-400/30 hover:text-spicy-400 text-foreground-muted transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {member.instagram && (
              <a
                href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface-secondary border border-border-default hover:border-spicy-400/30 hover:text-spicy-400 text-foreground-muted transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {member.facebook && (
              <a
                href={member.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface-secondary border border-border-default hover:border-spicy-400/30 hover:text-spicy-400 text-foreground-muted transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {hasContent ? (
        <>
          {/* Stats */}
          {member.stats.length > 0 && (
            <motion.div
              variants={staggerContainerFast}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
            >
              {member.stats.map((stat) => (
                <motion.div
                  key={stat.key}
                  variants={scaleSpring}
                  className="text-center p-4 rounded-xl bg-surface-secondary border border-border-default"
                >
                  <div className="text-2xl font-bold text-spicy-400 mb-1">
                    {t(
                      `About.team.${member.id}.stats.${stat.key}.value`
                    )}
                  </div>
                  <div className="text-xs text-foreground-muted">
                    {t(
                      `About.team.${member.id}.stats.${stat.key}.label`
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Capabilities */}
          {member.capabilities.length > 0 && (
            <motion.div
              variants={staggerContainerFast}
              initial="hidden"
              animate="visible"
              className="mb-10"
            >
              <h3 className="text-lg font-semibold text-foreground mb-5">
                {t("About.team.capabilitiesTitle")}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {member.capabilities.map((cap) => {
                  const Icon = capabilityIcons[cap.icon];
                  return (
                    <motion.div
                      key={cap.key}
                      variants={fadeInUp}
                      className="p-4 rounded-xl bg-surface-secondary border border-border-default hover:border-spicy-400/20 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-spicy-400/10 text-spicy-400 flex-shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground text-sm mb-1">
                            {t(
                              `About.team.${member.id}.capabilities.${cap.key}.title`
                            )}
                          </h4>
                          <p className="text-xs text-foreground-muted leading-relaxed">
                            {t(
                              `About.team.${member.id}.capabilities.${cap.key}.description`
                            )}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Technologies */}
          {member.skillCategories.length > 0 && (
            <motion.div
              variants={staggerContainerFast}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center gap-2 mb-5">
                <Code2 className="w-5 h-5 text-spicy-400" />
                <h3 className="text-lg font-semibold text-foreground">
                  {t("About.team.techTitle")}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {member.skillCategories.flatMap((category) =>
                  category.skills.map((skill) => (
                    <motion.div
                      key={skill}
                      variants={scaleSpring}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge>{skill}</Badge>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-full max-w-sm p-8 rounded-2xl border-2 border-dashed border-border-default text-center">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-xl bg-spicy-400/10 text-spicy-400">
              <Briefcase className="w-6 h-6" />
            </div>
            <p className="text-foreground-muted">
              {t("About.team.comingSoon")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
