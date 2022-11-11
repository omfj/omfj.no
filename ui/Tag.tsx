'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Props {
  to: string;
  color: string;
  children: React.ReactNode;
}

const Tag = ({ to, color, children }: Props) => {
  const [hover, setHover] = useState(false);
  const colorOffest = hover ? '33' : '11';

  return (
    <Link
      href={to}
      className="inline-block rounded-lg px-2 py-1 font-mono text-sm transition-colors"
      style={{
        backgroundColor: color + colorOffest,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </Link>
  );
};

export default Tag;
