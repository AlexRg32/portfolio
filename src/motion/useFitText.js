import { useEffect } from 'react';

/**
 * Sizes a hand-broken display block to fit comfortably within its frame.
 *
 * This is layout, not motion: it runs whatever the motion preference is. The
 * stylesheet already sets a sane clamp() size, so a line is never unreadable
 * before this runs, without JavaScript at all, or in the prerendered HTML.
 */
export default function useFitText(scope, key = '') {
  useEffect(() => {
    const root = scope.current;
    if (!root) return undefined;

    const boxes = [...root.querySelectorAll('[data-fit-box]')];
    if (!boxes.length) return undefined;

    const REFERENCE = 100;
    const FILL_RATIO = 0.9;

    const fit = () => {
      boxes.forEach((box) => {
        const lines = [...box.querySelectorAll('[data-fit-inner]')];
        if (!lines.length) return;

        // The frame is what has a size of its own; the box grows with its text,
        // so measuring the box for the available room would chase its own tail.
        const frame = box.closest('[data-fit-frame]') ?? box.parentElement;
        const width = frame?.clientWidth ?? 0;
        if (!width) return; // hidden at this breakpoint: leave it alone.
        const height = box.dataset.fitHeight === 'frame' ? frame.clientHeight : Infinity;

        // Size the whole block, not each line: the lines share one size, so the
        // strut and the glyphs scale together and the stack stays measurable.
        box.style.fontSize = `${REFERENCE}px`;
        const widest = Math.max(...lines.map((line) => line.getBoundingClientRect().width));
        const stack = box.getBoundingClientRect().height;
        if (!widest || !stack) return;

        const size = Math.min(width / widest, height / stack) * REFERENCE * FILL_RATIO;
        box.style.fontSize = `${size.toFixed(2)}px`;
      });
    };

    fit();

    const observer = new ResizeObserver(fit);
    observer.observe(root);
    // Re-fit once the real font metrics replace the fallback ones.
    document.fonts?.ready.then(fit).catch(() => {});

    return () => observer.disconnect();
  }, [scope, key]);
}
