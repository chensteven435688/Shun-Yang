/**
 * Entry point for the 3D hero. Intentionally unmounted while the homepage is a
 * single lobby view (see SectionProgress) — kept for when the hero returns.
 */
import { HeroExperience } from "@/components/hero/HeroExperience";

export function Hero() {
  return <HeroExperience />;
}
