"use client";

import { useState } from "react";
import { PageBackground, BackgroundPresets } from "@/components/effects/PageBackground";
import { BuildPageHero } from "./components/BuildPageHero";
import { PopularStacksGrid } from "./components/PopularStacksGrid";
import { WhyStacksMatter } from "./components/WhyStacksMatter";
import { CTASection } from "./components/CTASection";
import { QuizInterface } from "./components/QuizInterface";
import { Container } from "@/components/primitives/Container";

export default function BuildPage() {
  const [showQuiz, setShowQuiz] = useState(false);

  const startQuiz = () => {
    setShowQuiz(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setShowQuiz(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showQuiz) {
    return (
      <PageBackground {...BackgroundPresets.content}>
        <QuizInterface onRestart={handleRestart} />
      </PageBackground>
    );
  }

  // Landing Page Content
  return (
    <PageBackground {...BackgroundPresets.content}>
      <Container size="default">
        <BuildPageHero onStartQuiz={startQuiz} />
        <PopularStacksGrid />
        <WhyStacksMatter />
        <CTASection onStartQuiz={startQuiz} />
      </Container>
    </PageBackground>
  );
}
