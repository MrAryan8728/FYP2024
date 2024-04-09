'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const Providers = ({ children }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="7px"
        color="#3437eb"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default Providers;