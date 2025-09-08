import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import HeroSection from "~/components/_home/hero-section";
import FeaturedArticles from "~/components/_home/featured-articles";
import NewsletterSignup from "~/components/_home/newsletter-signup";
import MainLayout from "~/components/_layouts/main";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "African Stack" },
    { 'og:title': 'African Stack' },
    { 'og:description': 'Welcome to African Stack!' },
    { name: "description", content: "Welcome to African Stack!" },
    { name: "keywords", content: "African Stack, Data, Infrastructure, Intelligence,AI,Artificial Intelligence" }
  ];
}

export default function Home() {
  return (
    <MainLayout>

    <main>
      <HeroSection />
      <FeaturedArticles />
      <NewsletterSignup />
    </main>
    </MainLayout>
  );
}
