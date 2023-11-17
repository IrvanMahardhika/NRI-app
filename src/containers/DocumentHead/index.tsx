import React from 'react';
import { Helmet } from 'react-helmet';

const DocumentHead = () => {
  return (
    <Helmet>
      <meta name="description" content={`NRI App`} />
      <title>{`NRI App`}</title>
    </Helmet>
  );
};

export default DocumentHead;
