'use client';

import NextNProgress from 'nextjs-progressbar';

const ProgressBar = () => (
  <NextNProgress
    color="#eee"
    startPosition={0.15}
    stopDelayMs={200}
    height={4}
    options={{ showSpinner: false }}
  />
);

export default ProgressBar;
