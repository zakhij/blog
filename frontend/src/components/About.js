import React from 'react';
import profileImage from '../assets/me.png';
import PageLayout from './PageLayout';
import Markdown from 'markdown-to-jsx';

// Logic for About Me page.

const aboutMeContent = `
## Who Are You?
I'm Zak, a software engineer based in California. 

## Why'd You Start This Blog?
I like to write small essays about whatever I'm thinking on, as it helps organize my thoughts. 
I figured I might as well share my writing pieces with the world: give readers something to think about
and get feedback.

## What Do You Write About?
My essays are usually sparked by something I've experienced in my life or read about. So really,
whatever interests me :)


## How Can I Contact You?
Feel free to write me an email at zakhijaouy@gmail.com.

`;

function About() {
    return (
      <PageLayout>
        <div className="flex flex-col items-center">
          <img
            src={profileImage}
            alt="ME"
            className="w-56 h-56 rounded-full center"
          />
        </div>
        <Markdown>{aboutMeContent}</Markdown>
      </PageLayout>
    );
  }

export default About;
