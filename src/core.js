/**
 * Maps a non-negative integer to its CLDR plural category.
 *
 * The actual production rule tables run to thousands of lines across hundreds of
 * locales, so we implement a hand-rolled English cardinal/ordinal selector instead
 * of shipping a data pack. That keeps the dependency surface at zero and the API
 * synchronous, at the cost of non-English locales — a trade-off documented in the README.
 *
 * Negative inputs are outside the scope of CLDR cardinal pluralisation for display
 * purposes; we reject them explicitly rather than silently coercing them.
 */
export function selectPlural(n, style = 'cardinal') {
  if (!Number.isInteger(n)) {
    throw new TypeError(`Expected an integer, got ${typeof n} (${String(n)})`);
  }
  if (n < 0) {
    throw new RangeError(`Expected a non-negative integer, got ${n}`);
  }
  if (style === 'cardinal') {
    return cardinalCategory(n);
  }
  if (style === 'ordinal') {
    return ordinalCategory(n);
  }
  throw new RangeError(`Unknown style "${style}", expected "cardinal" or "ordinal"`);
}

/**
 * English cardinal rules per the CLDR specification.
 *
 * zero  — unused by English
 * one   — n = 1
 * two   — unused by English
 * few   — unused by English
 * many  — unused by English
 * other — everything else
 */
function cardinalCategory(n) {
  if (n === 1) return 'one';
  return 'other';
}

/**
 * English ordinal rules, where the suffix has a distinct plural form.
 *
 * one  — 1st, 21st, 31st, ...  (n mod 10 = 1 and n mod 100 != 11)
 * two  — 2nd, 22nd, 32nd, ...  (n mod 10 = 2 and n mod 100 != 12)
 * few  — 3rd, 23rd, 33rd, ...  (n mod 10 = 3 and n mod 100 != 13)
 * other — 11th, 12th, 13th, and any integer not covered above
 */
function ordinalCategory(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'one';
  if (mod10 === 2 && mod100 !== 12) return 'two';
  if (mod10 === 3 && mod100 !== 13) return 'few';
  return 'other';
}
