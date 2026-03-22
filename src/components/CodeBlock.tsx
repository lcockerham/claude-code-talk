import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Props {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'text' }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative group rounded-lg overflow-hidden border border-[#21262d] mt-2">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10 px-2 py-1 text-xs rounded bg-[#21262d] text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#30363d] transition-colors opacity-0 group-hover:opacity-100"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          background: '#161b22',
          fontSize: '13px',
          lineHeight: '1.6',
          padding: '1rem',
        }}
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
