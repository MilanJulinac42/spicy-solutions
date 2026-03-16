"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/features/ProjectCard";
import { projects } from "@/data/projects";
import { staggerContainer } from "@/lib/animations";

export function ProjectsShowcase() {
  const t = useTranslations();

  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          title={t("Projects.title")}
          subtitle={t("Projects.subtitle")}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={t(project.titleKey)}
              description={t(project.descriptionKey)}
              technologies={project.technologies}
              category={project.category}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
