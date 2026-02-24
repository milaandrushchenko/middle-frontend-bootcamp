const openPopup = (trigger, popupSelector, activeClass) => {
  const popup = document.querySelector(popupSelector);
  trigger.addEventListener("click", () => {
    popup?.classList.add(activeClass);
  });
};

const closePopup = (trigger, popupSelector, activeClass) => {
  const popup = document.querySelector(popupSelector);
  trigger.addEventListener("click", () => {
    popup?.classList.remove(activeClass);
  });

  document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (key === "Escape") {
      popup?.classList.remove(activeClass);
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup?.classList.remove(activeClass);
    }
  });
};

// в наведеному коді повторювальний код для відкриття та закриття попапу
// також тут є проблема з обробкою подій, що при повторному виклику функції, це призведе до множення обробників

const initPopup = (popupSelector, activeClass, triggerOpen, triggerClose) => {
  const popup = document.querySelector(popupSelector);

  const onKeyDown = (e) => {
    if (e.key === "Escape") close();
  };

  const onOverlayClick = (e) => {
    if (e.target === popup) close();
  };

  const open = () => {
    popup.classList.add(activeClass);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onOverlayClick);
  };

  const close = () => {
    popup.classList.remove(activeClass);
    document.removeEventListener("keydown", onKeyDown);
    document.removeEventListener("click", onOverlayClick);
  };

  triggerOpen.addEventListener("click", open);
  triggerClose.addEventListener("click", close);
};
