import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { gsap, useGSAP } from "../lib/gsap";

/**
 * macOS-style window that "opens" from an origin element (genie-scale),
 * renders a PDF with pdf.js (lazy-loaded), and closes back into the origin.
 *
 * Props:
 *  - open: mount when true
 *  - onClose: called after the exit animation finishes
 *  - originRef: ref of the element the window flies from/to
 */
const PdfWindow = ({ open, onClose, originRef, fileUrl = "/resume.pdf", title = "Resume — M. Zahran" }) => {
  const backdropRef = useRef(null);
  const winRef = useRef(null);
  const closeBtnRef = useRef(null);
  const pagesRef = useRef(null);
  const expandedRef = useRef(false);
  const closingRef = useRef(false);
  const [phase, setPhase] = useState("opening"); // opening | open | closing
  const [loadState, setLoadState] = useState("loading"); // loading | ready | error
  const lenis = useLenis();
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Lock page scroll while open
  useEffect(() => {
    lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [lenis]);

  // Rect helpers -----------------------------------------------------------
  const targetRect = (expanded) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    if (expanded) {
      return { left: 24, top: 24, width: vw - 48, height: vh - 48 };
    }
    const mobile = vw < 640;
    const width = mobile ? vw - 24 : Math.min(920, vw - 96);
    const height = mobile ? vh - 88 : Math.min(vh - 96, 900);
    return {
      left: (vw - width) / 2,
      top: (vh - height) / 2,
      width,
      height,
    };
  };

  const applyRect = (r) => {
    gsap.set(winRef.current, {
      left: r.left,
      top: r.top,
      width: r.width,
      height: r.height,
    });
  };

  const originRect = () => {
    const el = originRef?.current;
    if (!el) {
      return { left: window.innerWidth / 2 - 60, top: window.innerHeight / 2 - 80, width: 120, height: 160 };
    }
    return el.getBoundingClientRect();
  };

  // Close with genie back into the origin (or dock for minimize)
  const close = useCallback((mode = "origin") => {
    if (closingRef.current) return;
    closingRef.current = true;
    setPhase("closing");
    const win = winRef.current;
    const backdrop = backdropRef.current;
    const dur = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.42;

    let r;
    if (mode === "minimize") {
      r = { left: window.innerWidth / 2 - 40, top: window.innerHeight - 20, width: 80, height: 12 };
    } else {
      const o = originRect();
      r = { left: o.left, top: o.top, width: o.width, height: o.height };
    }
    const from = win.getBoundingClientRect();
    const scale = r.width / from.width;
    const dx = r.left + r.width / 2 - (from.left + from.width / 2);
    const dy = r.top + r.height / 2 - (from.top + from.height / 2);

    gsap.to(backdrop, { opacity: 0, duration: dur });
    gsap.to(win, {
      x: dx,
      y: dy,
      scaleX: scale,
      scaleY: mode === "minimize" ? scale : scale + 0.02,
      opacity: mode === "minimize" ? 0 : 0.4,
      borderRadius: 28,
      duration: dur,
      ease: "power3.in",
      onComplete: () => onCloseRef.current(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Toggle between default and expanded rect (green light)
  const toggleExpand = () => {
    expandedRef.current = !expandedRef.current;
    const win = winRef.current;
    const from = win.getBoundingClientRect();
    const r = targetRect(expandedRef.current);
    gsap.to(win, {
      x: r.left + r.width / 2 - (from.left + from.width / 2),
      y: r.top + r.height / 2 - (from.top + from.height / 2),
      scaleX: r.width / from.width,
      scaleY: r.height / from.height,
      duration: 0.45,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(win, {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          left: r.left,
          top: r.top,
          width: r.width,
          height: r.height,
        });
      },
    });
  };

  // Open animation: genie-scale from the origin card
  useGSAP(
    (context, contextSafe) => {
      if (phase !== "opening") return;
      const win = winRef.current;
      const backdrop = backdropRef.current;
      if (!win || !backdrop) return;

      applyRect(targetRect(false));
      const o = originRect();
      const t = targetRect(false);
      const dur = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.55;
      gsap.fromTo(
        win,
        {
          x: o.left + o.width / 2 - (t.left + t.width / 2),
          y: o.top + o.height / 2 - (t.top + t.height / 2),
          scaleX: o.width / t.width,
          scaleY: o.height / t.height,
          opacity: 0.3,
        },
        {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          opacity: 1,
          duration: dur,
          ease: "back.out(1.15)",
          onComplete: () => setPhase("open"),
        }
      );
      gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: dur * 0.9 });
      closeBtnRef.current?.focus({ preventScroll: true });

      const onKey = contextSafe((e) => {
        if (e.key === "Escape") close("origin");
      });
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    },
    { dependencies: [phase, close] }
  );

  // Load + render the PDF with pdf.js (lazy chunk)
  const renderTaskRef = useRef(null);
  const loadingTaskRef = useRef(null);
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [pdfjs, worker] = await Promise.all([
          import("pdfjs-dist"),
          import("pdfjs-dist/build/pdf.worker.min.mjs?url"),
        ]);
        if (cancelled) return;
        pdfjs.GlobalWorkerOptions.workerSrc = worker.default;

        // v6 note: destroy() lives on the loading task, not the doc proxy
        const loadingTask = pdfjs.getDocument({ url: fileUrl });
        loadingTaskRef.current = loadingTask;
        const doc = await loadingTask.promise;
        if (cancelled) return;
        setLoadState("ready");

        const host = pagesRef.current;
        const fit = Math.min(2, window.devicePixelRatio || 1);
        for (let i = 1; i <= doc.numPages; i++) {
          if (cancelled) return;
          const page = await doc.getPage(i);
          const base = page.getViewport({ scale: 1 });
          const cssWidth = Math.min(host.clientWidth - 48, 780);
          const viewport = page.getViewport({ scale: (cssWidth / base.width) * fit });

          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.className = "mx-auto block rounded-sm shadow-[0_8px_40px_rgba(0,0,0,0.45)]";
          canvas.style.width = `${cssWidth}px`;
          canvas.style.height = "auto";
          host.appendChild(canvas);

          const renderTask = page.render({ canvasContext: canvas.getContext("2d"), viewport });
          renderTaskRef.current = renderTask;
          await renderTask.promise;
          renderTaskRef.current = null;
        }
      } catch (err) {
        // Unmount destroys the loading task, which aborts in-flight renders — not an error.
        if (cancelled) return;
        console.error("PDF preview failed:", err);
        setLoadState("error");
      }
    })();
    return () => {
      cancelled = true;
      renderTaskRef.current?.cancel();
      renderTaskRef.current = null;
      // loadingTask.destroy() tears down the doc + worker
      loadingTaskRef.current?.destroy?.();
      loadingTaskRef.current = null;
    };
  }, [fileUrl]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90]">
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-[6px]"
        onClick={() => close("origin")}
        aria-hidden
      />
      <div
        ref={winRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="fixed flex flex-col overflow-hidden rounded-xl bg-[#1c1c1e] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/15 will-change-transform"
      >
        {/* Title bar */}
        <div className="relative flex h-11 shrink-0 items-center border-b border-white/10 bg-[#2a2a2c] px-4">
          <div className="flex items-center gap-2">
            <button
              ref={closeBtnRef}
              onClick={() => close("origin")}
              aria-label="Close viewer"
              className="group grid h-3 w-3 place-items-center rounded-full bg-[#ff5f57] outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <Icon icon="lucide:x" className="h-2 w-2 text-black/60 opacity-0 group-hover:opacity-100" />
            </button>
            <button
              onClick={() => close("minimize")}
              aria-label="Minimize viewer"
              className="grid h-3 w-3 place-items-center rounded-full bg-[#febc2e] outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <Icon icon="lucide:minus" className="h-2 w-2 text-black/60 opacity-0 group-hover:opacity-100" />
            </button>
            <button
              onClick={toggleExpand}
              aria-label="Toggle expand"
              className="grid h-3 w-3 place-items-center rounded-full bg-[#28c840] outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <Icon icon="lucide:expand" className="h-2 w-2 text-black/60 opacity-0 group-hover:opacity-100" />
            </button>
          </div>
          <p className="absolute left-1/2 hidden -translate-x-1/2 truncate text-xs text-white/70 sm:block">
            {title}
          </p>
          <a
            href={fileUrl}
            download="Mohamed-Zahran-Resume.pdf"
            className="ml-auto flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Icon icon="lucide:download" className="h-3 w-3" />
            PDF
          </a>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain bg-[#454749] p-6">
          {loadState === "loading" && (
            <div className="flex h-full min-h-[320px] items-center justify-center gap-3 text-white/60">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
              <span className="text-xs uppercase tracking-[0.25em]">Loading resume</span>
            </div>
          )}
          {loadState === "error" && (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 text-center text-white/70">
              <Icon icon="lucide:file-warning" className="h-8 w-8" />
              <p className="text-sm">Couldn&apos;t load the preview.</p>
              <a
                href={fileUrl}
                download="Mohamed-Zahran-Resume.pdf"
                className="rounded-full bg-white px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] text-black"
              >
                Download instead
              </a>
            </div>
          )}
          <div ref={pagesRef} className="flex flex-col items-center gap-6" />
        </div>
      </div>
    </div>
  );
};

export default PdfWindow;
