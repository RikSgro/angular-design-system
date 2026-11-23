export interface Token {
  name: string;
  declared: string;
}

function* styleRules(): Generator<CSSStyleRule> {
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      continue;
    }
    for (const rule of Array.from(rules)) {
      if (rule instanceof CSSStyleRule) yield rule;
    }
  }
}

/** Custom properties dichiarate su `selector` il cui nome inizia con `prefix`. */
export function readTokens(prefix: string, selector = ':root'): Token[] {
  const tokens: Token[] = [];
  for (const rule of styleRules()) {
    if (rule.selectorText !== selector) continue;
    for (const name of Array.from(rule.style)) {
      if (name.startsWith(prefix)) {
        tokens.push({ name, declared: rule.style.getPropertyValue(name).trim()});
      }
    }
  }
  return tokens;
}

/** Classi CSS il cui selettore inizia con `prefix` (es. `.sb-text-`), senza il punto iniziale. */
export function readClasses(prefix: string): string[] {
  const classes: string[] = [];
  for (const rule of styleRules()) {
    if (rule.selectorText.startsWith(prefix)) {
      classes.push(rule.selectorText.slice(1));
    }
  }
  return classes;
}
