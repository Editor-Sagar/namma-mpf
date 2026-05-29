type DownloadButtonProps = {
  href: string;
  filename: string;
  label?: string;
  className?: string;
};

/**
 * Triggers a download. For same-origin / CORS-friendly URLs the `download`
 * attribute on the anchor saves the file with the chosen filename. For
 * cross-origin links the browser will fall back to opening in a new tab.
 */
export function DownloadButton({
  href,
  filename,
  label = "Download",
  className = "",
}: DownloadButtonProps) {
  return (
    <a
      href={href}
      download={filename}
      target="_blank"
      rel="noreferrer"
      className={
        "inline-flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[oklch(0.20_0.09_16)] shadow-luxury transition-all hover:scale-[1.03] hover:gold-glow " +
        className
      }
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      {label}
    </a>
  );
}
