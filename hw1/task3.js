// винесла durations, а також  “спільні” параметри в константи,
// створила функції-обгортки animateTo та animateFrom, щоб не повторювати код,
// прибрала повторні querySelector в init,
// зробила більш читабельну розгалужену логіку через switch

const ANIMATION_DURATION = { FAST: 0.3, NORMAL: 0.4 };

const COMMON_INITIAL_CONFIG = {
  repeat: 0,
  ease: "none",
};

const animateTo = (target, vars) =>
  gsap.to(target, { ...COMMON_INITIAL_CONFIG, ...vars });
const animateFrom = (target, vars) =>
  gsap.from(target, { ...COMMON_INITIAL_CONFIG, ...vars });

export const clearXPosition = (target) =>
  animateTo(target, { xPercent: 0, duration: ANIMATION_DURATION.NORMAL });

export const clearYPosition = (target) =>
  animateTo(target, { yPercent: 0, duration: ANIMATION_DURATION.NORMAL });

export const moveLeft = (target) =>
  animateTo(target, { xPercent: -120, duration: ANIMATION_DURATION.FAST });

export const moveRight = (target) =>
  animateTo(target, { xPercent: 120, duration: ANIMATION_DURATION.FAST });

export const moveTop = (target) =>
  animateTo(target, { yPercent: -120, duration: ANIMATION_DURATION.FAST });

export const moveFromLeft = (target) =>
  animateFrom(target, { xPercent: 120, duration: ANIMATION_DURATION.FAST });

export const moveFromRight200 = (target) =>
  animateFrom(target, { xPercent: -200, duration: ANIMATION_DURATION.NORMAL });

// ===============================================

function init(origin, destination, direction, trigger) {
  const isDesktopMedia = window.matchMedia("(min-width: 1200px)").matches;
  const ctaSelector = document.querySelector(".cta");
  const imgSelector = document.querySelector(".img");
  const blockSelector = document.querySelector(".block");
  const gridSelector = document.querySelector(".grid");
  const containerSelector = document.querySelector(".container");
  const mobileTextSelector = document.querySelector(".mobile-text");

  if (direction === "down") {
    switch (origin.index) {
      case 0:
        moveLeft(ctaSelector);
        moveRight(document.querySelector(".mg"));
        if (isDesktopMedia) {
          moveTop(blockSelector);
          destination.item.classList.add("bg");
        }

        break;
      case 1:
        moveRight(gridSelector);
        break;
      case 2:
        moveRight(containerSelector);
        moveRight(mobileTextSelector);
        break;
      default:
        break;
    }
  } else if (direction === "up") {
    switch (origin.index) {
      case 0:
        if (isDesktopMedia) {
          clearXPosition(ctaSelector);

          clearXPosition(imgSelector);

          clearYPosition(blockSelector);

          clearXPosition(gridSelector);
        }
        break;
      case 1:
        clearXPosition(ctaSelector);

        clearXPosition(imgSelector);
        if (isDesktopMedia) {
          clearYPosition(blockSelector);
          origin.item.classList.remove("bg");
        }
        break;
      case 2:
        clearXPosition(gridSelector);
        if (isDesktopMedia) {
          destination.item.classList.add("bg");
        }
        break;
      case 3:
        clearXPosition(containerSelector);
        clearXPosition(mobileTextSelector);
        break;
      default:
        break;
    }
  }
}
