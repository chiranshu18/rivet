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
//
// Current files are stand-ins (the Figma file couldn't be exported): photos +
// avatars from Unsplash (Unsplash License), 3D objects from Microsoft Fluent
// Emoji (MIT). Sources per file: IMPLEMENTATION.md → "Assets".

import heroTopLeft from './images/hero-top-left.webp';
import heroTopRight from './images/hero-top-right.webp';
import heroBottomLeft from './images/hero-bottom-left.webp';
import heroBottomRight from './images/hero-bottom-right.webp';
import updateMan from './images/update-man.webp';
import updateWoman from './images/update-woman.webp';
import step1Profile from './images/step1-profile.webp';
import step2Couple from './images/step2-couple.webp';
import step3Him from './images/step3-him.webp';
import step3Her from './images/step3-her.webp';
import ctaFriends from './images/cta-friends.webp';
import ctaParty from './images/cta-party.webp';
import ctaCouple from './images/cta-couple.webp';
import ctaDancing from './images/cta-dancing.webp';
import avatar1 from './images/avatar-1.webp';
import avatar2 from './images/avatar-2.webp';
import avatar3 from './images/avatar-3.webp';
import avatar4 from './images/avatar-4.webp';
import avatar5 from './images/avatar-5.webp';
import avatar6 from './images/avatar-6.webp';
import avatar7 from './images/avatar-7.webp';
import avatar8 from './images/avatar-8.webp';
import avatar9 from './images/avatar-9.webp';
import heartPink from './images/heart-pink.png';
import heartGrey from './images/heart-grey.png';
import crossGrey from './images/cross-grey.png';

export const ASSETS = {
  // Global
  logoWordmark: null, // Rivet wordmark (header). Text fallback is used when null.
  splashLogo: null, // glossy 3D pink "Rivet" logo on the splash

  // Hero – "Better introductions"
  heroPhotoTopLeft: heroTopLeft,
  heroPhotoTopRight: heroTopRight,
  heroPhotoBottomLeft: heroBottomLeft,
  heroPhotoBottomRight: heroBottomRight,

  // Update – "Dating just got an major update!"
  updatePhotoMan: updateMan,
  updatePhotoWoman: updateWoman,
  updateAvatarTop: avatar2,
  updateAvatarBottom: avatar3,

  // Story – "Every love story used to have witnesses"
  storyHeartBalloon: heartPink,
  storyAvatarA: avatar5,
  storyAvatarB: avatar4,

  // Step 1 – "Make a profile that feels like you"
  step1Photo: step1Profile,

  // Step 2 – "Let people spot the chemistry"
  step2Photo: step2Couple,
  step2AvatarTop: avatar7,
  step2AvatarRight: avatar9,
  step2HeartBalloon: heartPink,
  step2CrossBalloon: crossGrey,

  // Step 3 – "Promising pairs become introductions"
  step3PhotoLeft: step3Him,
  step3PhotoRight: step3Her,
  step3HeartLeft: heartPink,
  step3HeartSmall: heartPink,
  step3HeartRight: heartGrey,
  step3HeartBottom: heartPink,

  // Testimonials
  testimonialAvatar: avatar8,

  // FAQ
  faqHeartBalloon: heartPink,
  faqCrossBalloon: crossGrey,

  // Final CTA + footer
  ctaPhotoTopLeft: ctaFriends,
  ctaPhotoTopRight: ctaParty,
  ctaPhotoMidLeft: ctaCouple,
  ctaPhotoMidRight: ctaDancing,
  footerAvatar1: avatar1,
  footerAvatar2: avatar2,
  footerAvatar3: avatar3,
  footerAvatar4: avatar4,
  footerAvatar5: avatar5,
  footerAvatar6: avatar6,
  footerAvatar7: avatar7,
};
