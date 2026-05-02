"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/features/TestimonialCard";
import { testimonials } from "@/data/testimonials";
import { staggerContainer, fadeInUp } from "@/lib/animations";

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export function Testimonials() {
  const t = useTranslations();
  const [[currentIndex, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = useCallback(
    (newDirection: number) => {
      const newIndex =
        (currentIndex + newDirection + testimonials.length) %
        testimonials.length;
      setPage([newIndex, newDirection]);
    },
    [currentIndex]
  );

  // Auto-advance every 5s
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, paginate]);

  const goToSlide = (index: number) => {
    const dir = index > currentIndex ? 1 : -1;
    setPage([index, dir]);
  };

  return (
    <section className="py-20 md:py-28 bg-surface-secondary">
      <Container>
        <SectionHeading
          title={t("Testimonials.title")}
          subtitle={t("Testimonials.subtitle")}
        />

        {/* Desktop: Grid (lg+) */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="hidden lg:grid grid-cols-3 gap-6"
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

        {/* Mobile/Tablet: Carousel (<lg) */}
        <div
          className="lg:hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(_, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="w-full"
              >
                <TestimonialCard
                  quote={t(testimonials[currentIndex].quoteKey)}
                  name={t(testimonials[currentIndex].nameKey)}
                  role={t(testimonials[currentIndex].roleKey)}
                  company={t(testimonials[currentIndex].companyKey)}
                  featured
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            {/* Left arrow */}
            <button
              onClick={() => paginate(-1)}
              className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full border border-border-default hover:border-spicy-400 hover:text-spicy-400 transition-colors cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentIndex
                      ? "w-8 h-2.5 bg-spicy-400"
                      : "w-2.5 h-2.5 bg-border-default hover:bg-foreground-muted"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Right arrow */}
            <button
              onClick={() => paginate(1)}
              className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full border border-border-default hover:border-spicy-400 hover:text-spicy-400 transition-colors cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
