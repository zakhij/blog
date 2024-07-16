import React from 'react';

function PageLayout({ children }) {
  return (
    <div className="container mx-auto px-6 py-4">
      <div className="prose prose-lg max-w-none">{children}</div>
    </div>
  );
}


export default PageLayout;
