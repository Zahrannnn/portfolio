/**
 * Lightweight spinner while the hero GLB / Three scene loads.
 */
export default function ModelSpinner() {
  return (
    <div
      className="flex flex-col items-center gap-3"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading 3D model"
    >
      <span
        className="model-spinner block h-9 w-9 rounded-full border-2 border-[#1d3557]/20 border-t-[#06d6a0]"
        aria-hidden
      />
      <span className="font-amiamie-round text-[10px] uppercase tracking-[0.28em] text-[#637581]">
        Loading model
      </span>
      <style>{`
        @keyframes model-spin {
          to { transform: rotate(360deg); }
        }
        .model-spinner {
          animation: model-spin 0.7s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .model-spinner {
            animation: none;
            border-color: #06d6a0;
          }
        }
      `}</style>
    </div>
  );
}
