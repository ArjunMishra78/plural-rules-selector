# plural-rules-selector

Returns the Unicode CLDR plural category (`zero`, `one`, `two`, `few`, `many`, `other`) for a non-negative integer, for both cardinal and ordinal styles.

```js
import { selectPlural } from 'plural-rules-selector';

selectPlural(1);               // 'one'  (cardinal)
selectPlural(2);               // 'other'
selectPlural(1, 'ordinal');    // 'one'  (1st)
selectPlural(11, 'ordinal');    // 'other' (11th — teens exception)
selectPlural(23, 'ordinal');    // 'few'  (23rd)
```

## Why this exists

Correct CLDR pluralisation normally requires a locale data pack: thousands of rule fragments covering every supported language. Pulling in `Intl.PluralRules` sidesteps the data, but it is not available in every runtime environment this library needs to target, and its results vary by engine build. `plural-rules-selector` ships a hand-rolled implementation of English cardinal and ordinal rules with zero dependencies, giving a small, predictable, synchronous API where the results match the CLDR spec exactly.

## The awkward edge

Only English rules are implemented. Non-English locales and full fractional numbers are out of scope. Negative integers are rejected with a `RangeError` because CLDR cardinal pluralisation is defined for display quantities; if you need negative handling, map the value to its magnitude before calling. Passing a non-integer (including numeric strings) throws a `TypeError`.
