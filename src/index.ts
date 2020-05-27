export interface StylesProps {
  styles: string[];
  className: string;
  uid: string;
  children: any;
}

type StyleTree = { [query: string]: string[] };

export interface MediaQueries {
  [queryName: string]: string;
}

const DEFAULT_MEDIA_QUERIES: MediaQueries = {
  '@all': '@media (min-width: 0)',
  '@desktop': '@media (min-width: 1200px)',
  '@tablet': '@media (min-width: 600px) and (max-width: 1200px)',
  '@mobile': '@media (max-width: 600px), (orientation: portrait)',
  '@portrait': '@media (orientation: portrait)',
  '@landscape': '@media (orientation: landscape)',
};

export function parseStyles(
  styles: string[],
  rootClass: string,
  customQueries?: MediaQueries,
): string {
  if (!styles || styles.length < 1) {
    return null;
  }
  const tree = contructStyleTree(styles);
  const css = combineToCss(tree, rootClass, customQueries);
  return css;
}

function contructStyleTree(styles: string[]): StyleTree {
  const styleTree = styles.reduce((tree, styleString) => {
    const [query] = styleString.match(/@([^\(])+(?=\()/g);
    const [selectors] = styleString.match(/(?<=\().+(?=\))/g);
    if (!query || !selectors) {
      return tree;
    }
    const selectorCssString = constructSelectorCssString(selectors);
    if (tree[query]) {
      return { ...tree, [query]: [...tree[query], selectorCssString] };
    }
    return { ...tree, [query]: [selectorCssString] };
  }, {});
  return styleTree;
}

function constructSelectorCssString(selectors: string): string {
  const splittedSelectors = selectors.split('/');
  // Check if there is selectors
  if (splittedSelectors.length === 1) {
    const _css = parseCssValue(selectors);
    return `{${_css.join(' ')}}`;
  }
  return splittedSelectors.reduceRight((tree, selector, i) => {
    if (splittedSelectors.length === i + 1) {
      const _css = parseCssValue(selector);
      return `{${_css.join(' ')}}`;
    }
    return `${selector} ${tree}`;
  }, '');
}

function parseCssValue(cssString: string): string[] {
  return cssString
    .split(';')
    .filter((item) => !!item)
    .map((item) => {
      const [property, value] = item.split(':');
      // Test if value is a variable
      if (RegExp(/\$.+/g).test(value)) {
        const variables = value.match(/\$[^\);,\s]+/g);
        const cleanedValue = variables.reduce((cleanedValue, variable) => {
          return cleanedValue.replace(
            `${variable}`,
            `var(--${variable.replace('$', '')})`,
          );
        }, value);
        return `${property}: ${cleanedValue};`;
      }
      return `${property}: ${value};`;
    });
}

function combineToCss(
  styleTree: StyleTree,
  rootClass: string,
  customQueries?: MediaQueries,
) {
  const mediaQueries = customQueries
    ? { ...DEFAULT_MEDIA_QUERIES, ...customQueries }
    : DEFAULT_MEDIA_QUERIES;
  const css = Object.keys(styleTree)
    .reduce((acc, queryName) => {
      const queryString = mediaQueries[queryName];
      if (!queryString) {
        return acc;
      }
      const selectorTree = styleTree[queryName];
      const cssString = `${queryString} { ${selectorTree
        .map((selector) => `.${rootClass} ${selector}`)
        .join(' ')} }`;
      return [...acc, cssString];
    }, [])
    .join('\n');
  return css;
}
