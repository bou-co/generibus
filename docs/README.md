# Generibus

**Work in progress**

A tool for parsing styles from CMS. Generates vanilla CSS that can handle media queries, CSS variables and basic properties.

NPM package available at [@bou-co/generibus](https://www.npmjs.com/package/@bou-co/generibus).

Git repository at [github.com/bou-co/generibus](https://github.com/bou-co/generibus)

## Install

```npm
npm install --save @bou-co/generibus
```

```yarn
yarn add @bou-co/generibus
```

## Creating styles

All styles are formatted in a same way.

**Syntax:**

```
@MEDIA_QUERY(SELECTOR/PROPERTY:VALUE;PROPERTY:VALUE;)
```

**Example:**

```
@mobile(h1/font-size:28px;color:#444444;)
```

[List of available media queries](/mediaQueries)

## Basic usage

```js
const styles = ['@all(h1/transition:250ms;)', '@all(h1:hover/color:red;)'];
const rootClass = `_${new Date().getTime()}`;
const css = parseStyles(styles, rootClass);
// ... do something with generated css
```

## Live example & playground

Example code written in React + Typescript available at [Stackblitz](https://stackblitz.com/edit/bou-co-generibus-example)

///

Made by [Bou](https://bou.co)
