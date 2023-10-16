import React, { HTMLProps } from 'react';
import { MarkdownToJSX } from 'markdown-to-jsx';
import { FieldValues } from 'react-hook-form';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight as CodeStyle } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
  return (
    <SyntaxHighlighter language={lang} style={CodeStyle}>
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

const a = ({ children, href, title }: HTMLProps<HTMLLinkElement>) => {
  if (href) {
    return title ? (
      <a href={href} title={title} className="hover:underline">
        {children}
      </a>
    ) : (
      <a href={href} title={href} className="hover:underline">
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

const components: MarkdownToJSX.Overrides = { pre, a, p, img };

export default components;
