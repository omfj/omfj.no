'use client';

import Main from '@/ui/Main';

const Error = () => (
  <Main>
    <div className="flex flex-col gap-5 text-center">
      <h1 className="text-5xl">Project not found</h1>
      <p className="text-xl">Sorry, this project does not exist.</p>
    </div>
  </Main>
);

export default Error;
