'use client';

import { type RefObject, useEffect, useState } from 'react';

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

type NavigatorWithConnection = Navigator & {
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
};

interface DeferredVideoOptions {
  /** Start loading shortly before the video reaches the viewport. */
  rootMargin?: string;
  /** Keep a heavy hero video as a static poster on narrow screens. */
  desktopOnly?: boolean;
  /** Let critical content paint before starting decorative media. */
  delayMs?: number;
  /** Wait for a real user signal before fetching an optional background video. */
  requireInteraction?: boolean;
  /** Optional safety fallback when interaction never happens (0 disables it). */
  interactionFallbackMs?: number;
}

/**
 * Attach a decorative video's source only when it is useful.
 *
 * With no `src`, `preload="none"` causes no video transfer. Reduced-motion,
 * data-saver and very slow connections retain the optimized poster instead.
 */
export function useDeferredVideo(
  videoRef: RefObject<HTMLVideoElement | null>,
  {
    rootMargin = '320px 0px',
    desktopOnly = false,
    delayMs = 0,
    requireInteraction = false,
    interactionFallbackMs = 0,
  }: DeferredVideoOptions = {}
) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const networkNavigator = navigator as NavigatorWithConnection;
    const connection =
      networkNavigator.connection ??
      networkNavigator.mozConnection ??
      networkNavigator.webkitConnection;
    const slowConnection = ['slow-2g', '2g'].includes(
      connection?.effectiveType ?? ''
    );
    const narrowViewport = window.matchMedia('(max-width: 767px)').matches;

    if (
      reduceMotion ||
      connection?.saveData ||
      slowConnection ||
      (desktopOnly && narrowViewport)
    ) {
      return;
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    let interactionTimer: ReturnType<typeof setTimeout> | undefined;
    let observer: IntersectionObserver | undefined;
    let started = false;
    const interactionEvents = [
      'pointermove',
      'pointerdown',
      'keydown',
      'touchstart',
    ] as const;

    const activate = () => {
      if (delayMs > 0) {
        timer = setTimeout(() => setShouldLoad(true), delayMs);
      } else {
        setShouldLoad(true);
      }
    };

    const removeInteractionListeners = () => {
      interactionEvents.forEach((event) =>
        window.removeEventListener(event, beginObservation)
      );
    };

    const beginObservation = () => {
      if (started) return;
      started = true;
      removeInteractionListeners();
      clearTimeout(interactionTimer);

      if (!('IntersectionObserver' in window)) {
        activate();
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          observer?.disconnect();
          activate();
        },
        { rootMargin, threshold: 0.01 }
      );
      observer.observe(video);
    };

    if (requireInteraction) {
      interactionEvents.forEach((event) =>
        window.addEventListener(event, beginObservation, {
          once: true,
          passive: true,
        })
      );
      if (interactionFallbackMs > 0) {
        interactionTimer = setTimeout(beginObservation, interactionFallbackMs);
      }
    } else {
      beginObservation();
    }

    return () => {
      observer?.disconnect();
      removeInteractionListeners();
      clearTimeout(timer);
      clearTimeout(interactionTimer);
    };
  }, [
    delayMs,
    desktopOnly,
    interactionFallbackMs,
    requireInteraction,
    rootMargin,
    videoRef,
  ]);

  useEffect(() => {
    if (!shouldLoad) return;
    const video = videoRef.current;
    if (!video) return;

    void video.play().catch(() => {});

    const onVisibilityChange = () => {
      if (document.hidden) video.pause();
      else void video.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      video.pause();
    };
  }, [shouldLoad, videoRef]);

  return shouldLoad;
}
