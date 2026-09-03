function invert(hex) {
  // Remove # if present
  hex = hex.replace("#", "");

  // Parse RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Relative luminance (WCAG-ish formula)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Light background -> dark text, dark background -> light text
  return luminance > 0.5 ? "#111111" : "#f5f5f5";
}

export default invert;
