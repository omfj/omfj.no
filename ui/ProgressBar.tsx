'use client';

import NextNProgress from 'nextjs-progressbar';

function ProgressBar() {
  return (
    <NextNProgress
      color="#eee"
      startPosition={0.15}
      stopDelayMs={200}
      height={4}
      options={{ showSpinner: false }}
    />
  );
}

export default ProgressBar;
