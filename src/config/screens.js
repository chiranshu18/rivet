import Hero from 'screens/Hero/Hero';
import Update from 'screens/Update/Update';
import Story from 'screens/Story/Story';
import StepProfile from 'screens/StepProfile/StepProfile';
import StepChemistry from 'screens/StepChemistry/StepChemistry';
import StepIntro from 'screens/StepIntro/StepIntro';
import Testimonials from 'screens/Testimonials/Testimonials';
import Faq from 'screens/Faq/Faq';
import FinalCta from 'screens/FinalCta/FinalCta';
import { stageVariants } from 'animation/choreo';

/**
 * Ordered scroll flow. One entry = one screen component.
 *
 * steps: one object per scroll step inside the screen (most screens have 1).
 *   logo: 'dark' | 'light'                       → header wordmark color
 *   hint: 'light' | 'dark' | 'outline' | 'rose' | null → "Scroll for more" pill style (null = hidden)
 *
 * variants (optional): Framer Motion variants for the screen layer, overriding
 * the default whole-layer enter/exit (src/config/transitions.js). Choreographed
 * screens use `stageVariants` and animate their own elements (src/animation/).
 *
 * figma: reference screenshot name, for traceability.
 */
export const SCREENS = [
  { id: 'hero', figma: 'HERO2', Component: Hero, variants: stageVariants, steps: [{ logo: 'dark', hint: null }] },
  { id: 'update', figma: 'Menu_Mobile', Component: Update, variants: stageVariants, steps: [{ logo: 'dark', hint: 'rose' }] },
  { id: 'story', figma: 'Menu_Mobile-1', Component: Story, variants: stageVariants, steps: [{ logo: 'dark', hint: 'dark' }] },
  { id: 'step-profile', figma: 'Menu_Mobile-2', Component: StepProfile, variants: stageVariants, steps: [{ logo: 'dark', hint: 'light' }] },
  { id: 'step-chemistry', figma: 'Menu_Mobile-3', Component: StepChemistry, variants: stageVariants, steps: [{ logo: 'dark', hint: 'light' }] },
  { id: 'step-intro', figma: 'Menu_Mobile-4', Component: StepIntro, variants: stageVariants, steps: [{ logo: 'light', hint: 'outline' }] },
  { id: 'testimonials', figma: 'Menu_Mobile-5', Component: Testimonials, variants: stageVariants, steps: [{ logo: 'light', hint: 'light' }] },
  { id: 'faq', figma: 'Menu_Mobile-6', Component: Faq, variants: stageVariants, steps: [{ logo: 'dark', hint: 'light' }] },
  {
    id: 'final-cta',
    figma: 'Menu_Mobile-7 / Menu_Mobile-8',
    Component: FinalCta,
    variants: stageVariants,
    steps: [
      { logo: 'dark', hint: 'light' },
      { logo: 'dark', hint: null },
    ],
  },
];

/** Flattened list of every scroll step: { screenIndex, subStep, logo, hint }. */
export const STEPS = SCREENS.flatMap((screen, screenIndex) =>
  screen.steps.map((theme, subStep) => ({ screenIndex, subStep, ...theme }))
);
