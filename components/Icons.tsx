// Inline SVG icons used by the header, footer and product page.
export const MenuIcon = () => (
  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 50 50">
    <path d="M0 7.5v5h50v-5zm0 15v5h50v-5zm0 15v5h50v-5z" />
  </svg>
);

export const ChevronDown = ({ className }: { className?: string }) => (
  <svg aria-hidden="true" className={className} viewBox="0 0 13.4 8.1" width="11" height="7">
    <path d="M6.8 8.1L0 1.75 1.36.3l5.38 5L11.97 0l1.42 1.4-6.6 6.7z" />
  </svg>
);

export const SearchIcon = () => (
  <svg aria-hidden="true" fill="currentColor" viewBox="3.9 3.8 22.2 22.4" width="20" height="20">
    <path d="M26.1 24.7l-5.9-5.9c1.3-1.6 2-3.6 2-5.8 0-5.1-4.1-9.2-9.2-9.2S3.9 8 3.9 13.1s4.1 9.2 9.2 9.2c2.2 0 4.2-.8 5.8-2l5.9 5.9 1.3-1.5zM5.9 13.1c0-4 3.2-7.2 7.2-7.2s7.2 3.2 7.2 7.2-3.2 7.2-7.2 7.2-7.2-3.2-7.2-7.2z" />
  </svg>
);

export const CartIcon = () => (
  <svg aria-hidden="true" fill="currentColor" viewBox="0 0 30 30" width="22" height="22">
    <path d="M22.7 8c-.9-3.4-4-6-7.7-6S8.2 4.6 7.3 8H2l3 20h20l3-20h-5.3zM15 4c2.6 0 4.8 1.7 5.6 4H9.3c.9-2.3 3.1-4 5.7-4zm8.3 22H6.7L4.3 10H7v3h2v-3h12v3h2v-3h2.7l-2.4 16z" />
  </svg>
);

export const CloseIcon = () => (
  <svg aria-hidden="true" fill="currentColor" viewBox="0 0 17 17" width="15" height="15">
    <path d="M10.6 8.5l5.9-5.9L14.4.5 8.5 6.4 2.6.5.5 2.6l5.9 5.9-5.9 5.9 2.1 2.1 5.9-5.9 5.9 5.9 2.1-2.1z" />
  </svg>
);

export const BreadcrumbArrow = () => (
  <svg className="breadcrumb__arrow" aria-hidden="true" fill="currentColor" viewBox="0.23 0.77 7.51 13.5" width="5" height="9">
    <path d="M1.29 14.27L.23 13.21l5.6-5.6-5.6-5.78L1.3.77l6.44 6.84z" />
  </svg>
);

export const ArrowLeft = () => (
  <svg aria-hidden="true" fill="currentColor" viewBox="0 0 15 7.6" width="15" height="8" style={{ transform: "rotate(90deg)" }}>
    <path d="M7.5 7.6L0 1.4 1.2 0l6.3 5.2L13.8 0 15 1.4z" />
  </svg>
);

export const ArrowRight = () => (
  <svg aria-hidden="true" fill="currentColor" viewBox="0 0 15 7.6" width="15" height="8" style={{ transform: "rotate(-90deg)" }}>
    <path d="M7.5 7.6L0 1.4 1.2 0l6.3 5.2L13.8 0 15 1.4z" />
  </svg>
);

const social: Record<string, React.ReactNode> = {
  Instagram: (
    <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 448 512" width="20" height="20">
      <path fill="currentColor" d="M224 141c-63.6 0-114.9 51.3-114.9 114.9S160.4 370.8 224 370.8 338.9 319.5 338.9 255.9 287.6 141 224 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </svg>
  ),
  Facebook: (
    <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 320 512" width="20" height="20">
      <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
    </svg>
  ),
  YouTube: (
    <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 576 512" width="20" height="20">
      <path fill="currentColor" d="M550 124c-7-24-25-42-49-49-42-11-213-11-213-11S117 64 75 76c-24 6-42 24-49 48-11 43-11 132-11 132s0 90 11 133c7 23 25 41 49 47 42 12 213 12 213 12s171 0 213-11c24-7 42-25 49-48 11-43 11-133 11-133s0-89-11-132zM232 338V175l143 81-143 82z" />
    </svg>
  ),
};

export const SocialIcon = ({ name }: { name: string }) => social[name] ?? null;
