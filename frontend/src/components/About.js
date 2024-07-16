import React from 'react';
import profileImage from '../assets/me.png';
import Markdown from 'markdown-to-jsx';

const aboutMeContent = `
## Who Are You?
I'm Zakaria Hijaouy, a software engineer...

## Why'd You Start The Blog?
I wanted to share...

## What Do You Write About?
Whatever interests me...
`;

function AboutMe() {
    return (
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col items-center mb-8">
            <img
              src={profileImage}
              alt="Profile"
              className="w-48 h-48 rounded-full"
            />
          </div>
          <div className="prose prose-lg max-w-none">
            <Markdown>{aboutMeContent}</Markdown>
          </div>
        </div>
      );
}

export default AboutMe;
