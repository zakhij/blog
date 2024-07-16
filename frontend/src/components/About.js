import React from 'react';
import profileImage from '../assets/me.png';
import PageLayout from './PageLayout';
import Markdown from 'markdown-to-jsx';

const aboutMeContent = `
## Who Are You?
I'm Zak, a software engineer...

## Why'd You Start The Blog?
I wanted to share...

## What Do You Write About?
Whatever interests me...
`;

function About() {
    return (
      <PageLayout>
        <div className="flex flex-col items-center">
          <img
            src={profileImage}
            alt="ME"
            className="w-48 h-48 rounded-full center"
          />
        </div>
        <Markdown>{aboutMeContent}</Markdown>
      </PageLayout>
    );
  }

export default About;
