# Media queries

## Basic

There are few media queries available for use.

```json
{
  "@all": "@media (min-width: 0)",
  "@desktop": "@media (min-width: 1200px)",
  "@tablet": "@media (min-width: 600px) and (max-width: 1200px)",
  "@mobile": "@media (max-width: 600px), (orientation: portrait)",
  "@portrait": "@media (orientation: portrait)",
  "@landscape": "@media (orientation: landscape)"
}
```

## Your own

**Note:** When creating your own media queries you can also override existing ones!

```js
const myQueries = {
  '@myQuery': '@media (min-width: 420px)', // Your own
  '@mobile': '@media (max-width: 420px)', // Override
};
const styles = [
  '@all(h1/transition:250ms;)',
  '@myQuery(h1:hover/color:pink;)',
  '@mobile(h1:hover/color:red;)',
];
const rootClass = `_${new Date().getTime()}`;
const css = parseStyles(styles, rootClass, myQueries);
```
