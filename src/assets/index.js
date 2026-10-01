// Central asset registry.
//
// Every visual asset in the UI is rendered through <Asset name="..." />.
// While a key maps to `null`, a labelled dashed placeholder is rendered at the
// exact size/position. To drop in a real asset:
//   1. put the file in src/assets/images/
//   2. import it here and replace `null` with the import, e.g.
//        import heroTopLeft from './images/hero-top-left.jpg';
//        heroTopLeft: heroTopLeft,
//
// Keys are grouped by screen (same order as the scroll flow).

export const ASSETS = {
  // Global
  logoWordmark: null, // Rivet wordmark (header). Text fallback is used when null.
  splashLogo: null, // glossy 3D pink "Rivet" logo on the splash

  // Hero – "Better introductions"
  heroPhotoTopLeft: null,
  heroPhotoTopRight: null,
  heroPhotoBottomLeft: null,
  heroPhotoBottomRight: null,

  // Update – "Dating just got an major update!"
  updatePhotoMan: null,
  updatePhotoWoman: null,
  updateAvatarTop: null,
  updateAvatarBottom: null,

  // Story – "Every love story used to have witnesses"
  storyHeartBalloon: null,
  storyAvatarA: null,
  storyAvatarB: null,

  // Step 1 – "Make a profile that feels like you"
  step1Photo: null,

  // Step 2 – "Let people spot the chemistry"
  step2Photo: null,
  step2AvatarTop: null,
  step2AvatarRight: null,
  step2HeartBalloon: null,
  step2CrossBalloon: null,

  // Step 3 – "Promising pairs become introductions"
  step3PhotoLeft: null,
  step3PhotoRight: null,
  step3HeartLeft: null,
  step3HeartSmall: null,
  step3HeartRight: null,
  step3HeartBottom: null,

  // Testimonials
  testimonialAvatar: null,

  // FAQ
  faqBalloons: null, // heart + cross balloons

  // Final CTA + footer
  ctaPhotoTopLeft: null,
  ctaPhotoTopRight: null,
  ctaPhotoMidLeft: null,
  ctaPhotoMidRight: null,
  footerAvatar1: null,
  footerAvatar2: null,
  footerAvatar3: null,
  footerAvatar4: null,
  footerAvatar5: null,
  footerAvatar6: null,
  footerAvatar7: null,
};
