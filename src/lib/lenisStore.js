// Shared reference to the single Lenis smooth-scroll instance created in
// SmoothScroll.jsx. Lenis lives above <BrowserRouter> in main.jsx (so it
// persists across route changes), but nothing exposed it to the rest of the
// app. Components like Header need it to scroll to sections/anchors using
// the same smooth-scroll engine as the rest of the site, instead of calling
// native scrollIntoView (which fights Lenis's own scroll handling).
const lenisStore = { current: null };

export default lenisStore;
