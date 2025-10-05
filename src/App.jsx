import React, { useMemo, useState, useEffect } from "react";

/**
 * Feng Shui Nederland — Nine Star Ki (stabiele build)
 * - Logo via /public/logo.png (met cache-buster)
 * - Helpers 1x gedefinieerd
 * - Alle JSX en accolades correct gesloten
 */

// ====== BRAND SETTINGS ======
const DEFAULT_LOGO = "/logo.png?v=4"; // Zet je echte logo in /public/logo.png
const BRAND = {
  name: "Feng Shui Nederland",
  colors: {
    primary: "#ff6342", // vuur
    water:   "#84b9db", // water
    wood:    "#72955d", // hout
    earth:   "#bc8163", // aarde
    metal:   "#737373", // metaal
    base:    "#fbf2f0", // zachte achtergrond
  },
};

// ===== Kleur-helpers =====
function hexToRgb(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return { r: 0, g: 0, b: 0 };
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}
function contrastOn(hex) {
  const { r, g, b } = hexToRgb(hex);
  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return L > 160 ? "#0f172a" : "#ffffff";
}

// ===== Ingebouwde DATA (uit jouw Excel) =====
const DATA = {"year_to_star": {"1901":9,"1902":8,"1903":7,"1904":6,"1905":5,"1906":4,"1907":3,"1908":2,"1909":1,"1910":9,"1911":8,"1912":7,"1913":6,"1914":5,"1915":4,"1916":3,"1917":2,"1918":1,"1919":9,"1920":8,"1921":7,"1922":6,"1923":5,"1924":4,"1925"

