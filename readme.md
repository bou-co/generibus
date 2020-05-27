# Generibus

**Work in progress**

A tool for parsing styles from CMS. Generates vanilla CSS that can handle media queries, CSS variables and basic properties.

NPM package available at [@bou-co/generibus](https://www.npmjs.com/package/@bou-co/generibus)

```bash
npm install @bou-co/generibus
```

## Basic example

```
import React from 'react';
import { parseStyles } from '@bou-co/generibus';

interface StylesProps {
  styles: string[];
  className: string;
  uid: string; // uid should always be unique!
  children: any;
}

export const WithCss = ({ styles, className, uid, children }: StylesProps) => {
  const rootClass = `_${uid}`;
  const css = parseStyles(styles, rootClass, {});
  return (
    <React.Fragment>
      {css && <style data-style-uid={rootClass}>{css}</style>}
      <div className={`${className} ${rootClass}`}>{children}</div>
    </React.Fragment>
  );
};

export const YourComponent = () => {

  const styles = [
    '@all(h1/color:green;transition:250ms;)',
    '@all(h1:hover/color:red;cursor:pointer;)',
    '@mobile(h1:hover/color:blue;)',
  ];

  const uid = 'hag8w7hagwhawghaiw';
  return (
    <WithCss className="container" styles={styles} uid={uid}>
      <h1>Hello world</h1>
      <p>Lorem ipsum</p>
    </WithCss>
  );
};
```

///

Made by [Bou](https://bou.co)
