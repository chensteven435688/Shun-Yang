"use client";

import { useEffect, useRef, useState } from "react";
import {
  getCriticalAssets,
  resolveCriticalSrc,
} from "@/lib/criticalAssets";
import { LOADER } from "@/lib/motion";
import { getPrefersReducedMotion } from "@/lib/reducedMotion";
import { useMotionPreference } from "@/components/providers/MotionProvider";

type Phase = "active" | "exiting" | "done";

function loadImage(src: string): Promise<"ok" | "error"> {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";

    const finish = (result: "ok" | "error") => {
      img.onload = null;
      img.onerror = null;
      resolve(result);
    };

    img.onload = () => {
      if (typeof img.decode === "function") {
        img
          .decode()
          .then(() => finish("ok"))
          .catch(() => finish("ok"));
      } else {
        finish("ok");
      }
    };
    img.onerror = () => finish("error");
    img.src = src;
  });
}

function shouldSkipLoader(): boolean {
  if (typeof document === "undefined") return false;
  if (document.documentElement.dataset.loader === "skip") return true;
  if (getPrefersReducedMotion()) return true;
  try {
    return sessionStorage.getItem(LOADER.storageKey) === "1";
  } catch {
    return false;
  }
}

function markLoaderSeen() {
  try {
    sessionStorage.setItem(LOADER.storageKey, "1");
  } catch {
    // private mode / blocked storage — ignore
  }
  document.documentElement.dataset.loader = "skip";
}

export function OpeningLoader() {
  const { reducedMotion } = useMotionPreference();
  const [phase, setPhase] = useState<Phase>("active");
  const [displayProgress, setDisplayProgress] = useState(0);
  const targetProgress = useRef(0);
  const displayRef = useRef(0);
  const completedRef = useRef(false);
  const startedAt = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    let stopRaf = false;
    const timeouts: number[] = [];

    const schedule = (fn: () => void, ms = 0) => {
      const id = window.setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timeouts.push(id);
    };

    // Defer skip path so SSR markup matches first paint; CSS already hides via data-loader.
    if (shouldSkipLoader() || reducedMotion) {
      schedule(() => {
        markLoaderSeen();
        setPhase("done");
        setDisplayProgress(100);
      });
      return () => {
        cancelled = true;
        timeouts.forEach((id) => window.clearTimeout(id));
      };
    }

    startedAt.current = performance.now();
    const assets = getCriticalAssets();
    const totalWeight = assets.reduce((sum, a) => sum + a.weight, 0);
    let loadedWeight = 0;

    const bump = (weight: number) => {
      loadedWeight += weight;
      targetProgress.current = Math.min(
        100,
        Math.round((loadedWeight / totalWeight) * 100)
      );
    };

    const finish = () => {
      if (cancelled || completedRef.current) return;
      completedRef.current = true;
      targetProgress.current = 100;

      const elapsed = performance.now() - startedAt.current;
      const wait = Math.max(0, LOADER.minMs - elapsed);

      schedule(() => {
        setPhase("exiting");
        markLoaderSeen();
        schedule(() => {
          stopRaf = true;
          cancelAnimationFrame(rafRef.current);
          setPhase("done");
        }, 700);
      }, wait);
    };

    const track = Promise.all(
      assets.map(async (asset) => {
        const result = await loadImage(resolveCriticalSrc(asset.src));
        if (!cancelled) bump(asset.weight);
        return result;
      })
    ).then(() => {
      if (!cancelled) finish();
    });

    const timeoutId = window.setTimeout(() => {
      finish();
    }, LOADER.maxMs);
    timeouts.push(timeoutId);

    const tick = () => {
      if (stopRaf || cancelled) return;
      const current = displayRef.current;
      const target = targetProgress.current;
      const next = current + (target - current) * LOADER.progressLerp;
      const rounded =
        target >= 100 && next > 99.2 ? 100 : Math.min(100, next);

      displayRef.current = rounded;
      setDisplayProgress(Math.round(rounded));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      stopRaf = true;
      timeouts.forEach((id) => window.clearTimeout(id));
      cancelAnimationFrame(rafRef.current);
      void track;
    };
  }, [reducedMotion]);

  if (phase === "done") return null;

  const pct = Math.min(100, Math.max(0, displayProgress));

  return (
    <div
      className={`opening-loader ${phase === "exiting" ? "is-exiting" : ""}`}
      role="progressbar"
      aria-label="Loading Shun Yang"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      aria-busy={phase === "active"}
    >
      <div className="opening-loader-grain" aria-hidden />

      <div className="opening-loader-inner">
        <div className="opening-loader-mark" aria-hidden>
          <svg
            className="opening-loader-lambda"
            viewBox="0 0 80 88"
            fill="none"
          >
            <path
              className="opening-loader-lambda-stroke"
              d="M12 78 L40 10 L68 78"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="opening-loader-lambda-bar"
              d="M24 52 H56"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <circle
              className="opening-loader-orbit"
              cx="40"
              cy="44"
              r="34"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="2 6"
            />
          </svg>
        </div>

        <p className="opening-loader-name">SHUN YANG</p>
        <p className="opening-loader-name-cn">陳舜揚</p>

        <div className="opening-loader-progress">
          <div className="opening-loader-track" aria-hidden>
            <div
              className="opening-loader-fill"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="opening-loader-percent">
            <span className="opening-loader-percent-num">
              {String(pct).padStart(3, "0")}
            </span>
            <span className="opening-loader-percent-suffix">%</span>
          </p>
        </div>

        <p className="opening-loader-meta">ΛTLΛST · SYSTEM INIT</p>
      </div>
    </div>
  );
}
