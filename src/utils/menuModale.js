export function setupMenu(overlayRef, setOverlayRef) {
  function toggleMenu(isMenuOpen) {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      overlayRef.value?.classList.add("animated-gradient-bg", "visible");
      setOverlayRef.value?.classList.add("set-overlay");
    } else {
      document.body.style.overflow = "auto";
      overlayRef.value?.classList.remove("visible");
      setOverlayRef.value?.classList.remove("set-overlay");

      setTimeout(() => {
        overlayRef.value?.classList.remove("animated-gradient-bg");
      }, 500);
    }
  }

  return { toggleMenu };
}
