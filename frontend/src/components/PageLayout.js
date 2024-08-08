import React from 'react';

// Provides the default layout, including styling, for all non-home pages.
function PageLayout({ children }) {
  return (
    <div className="container mx-auto px-6 max-w-screen-lg">
      <div className="prose prose-lg max-w-none">
        <style jsx>{`
          .prose h1 {
            margin-top: 0.5em;
            margin-bottom: 0.25em;
          }
          .prose h2 {
            margin-top: 0.25em;
            margin-bottom: 0.25em;
          }
          .prose h3 {
            margin-top: 0.5em;
            margin-bottom: 0.25em;
          }
          .prose p {
            margin-top: 0.25em;
            margin-bottom: 1em;
          }
          .prose li {
            margin-top: 0.25em;
            margin-bottom: 0.25em;
          }
        `}</style>
        {children}
      </div>
    </div>
  );
}


export default PageLayout;
