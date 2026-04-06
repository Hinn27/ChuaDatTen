const DEFAULT_HEADER_OFFSET = 92;

export function smoothScrollToId(targetId, options = {}) {
    if (!targetId || typeof window === "undefined" || typeof document === "undefined") {
        return false;
    }

    const target = document.getElementById(targetId);
    if (!target) {
        return false;
    }

    const { offset = DEFAULT_HEADER_OFFSET } = options;
    const prefersReducedMotion =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const top = Math.max(
        0,
        target.getBoundingClientRect().top + window.scrollY - offset,
    );

    window.scrollTo({
        top,
        behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    return true;
}
