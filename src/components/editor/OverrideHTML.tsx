import React, { HTMLProps } from 'react';
import { MarkdownToJSX } from 'markdown-to-jsx';
import { FieldValues } from 'react-hook-form';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight as LightMode } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { dark as DarkMode } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { useTheme } from '@mui/material/styles';

// const h1 = ({ children, id }: HTMLProps<HTMLHeadingElement>) => {
//   return (
//     <h2 id={id} className="heading lg:!text-[230%] !mb-0">
//       {children}
//     </h2>
//   );
// };

const CodeBlock = ({ className, children }: HTMLProps<HTMLElement>) => {
  let lang = 'text'; // default monospaced text
  if (className && className.startsWith('lang-')) {
    lang = className.replace('lang-', '');
  }

  const theme = useTheme();

  return (
    <SyntaxHighlighter language={lang} style={theme.palette.mode === 'dark' ? DarkMode : LightMode}>
      {children as string}
    </SyntaxHighlighter>
  );
};

// markdown-to-jsx uses <pre><code/></pre> for code blocks.
const pre = ({ children, ...rest }: HTMLProps<HTMLPreElement>) => {
  const child = children as unknown as FieldValues;

  if ('type' in child && child['type'] === 'code') {
    return CodeBlock(child['props']);
  }
  return <pre {...rest}>{children}</pre>;
};

const img = ({ alt, src, title }: HTMLProps<HTMLImageElement>) => {
  return (
    <figure className="mx-auto">
      <img src={src} alt={alt} title={title} />
      <figcaption>{alt}</figcaption>
    </figure>
  );
};

const Link = ({ children, href, title }: HTMLProps<HTMLLinkElement>): JSX.Element => {
  const theme = useTheme();

  if (href) {
    return title ? (
      <a href={href} title={title} className={`hover:underline ${theme.palette.mode === 'dark' && 'text-[#00AB55]'}`}>
        {children}
      </a>
    ) : (
      <a href={href} title={href} className={`hover:underline ${theme.palette.mode === 'dark' && 'text-[#00AB55]'}`}>
        {children}
      </a>
    );
  }

  return <span>{children}</span>;
};

const p = ({ children, title }: HTMLProps<HTMLHeadingElement>) => {
  return (
    <div title={title} className="p">
      {children}
    </div>
  );
};

const UnderLine = ({ children, title }: HTMLProps<HTMLHeadingElement>) => {
  const theme = useTheme();

  return (
    <u
      style={{
        ...(theme.palette.mode === 'dark' && {
          background: 'linear-gradient(transparent 60%, #ffd57499 60%)',
        }),
      }}
      title={title}
    >
      {children}
    </u>
  );
};

const components: MarkdownToJSX.Overrides = { pre, img, a: Link, p, u: UnderLine };

export default components;
