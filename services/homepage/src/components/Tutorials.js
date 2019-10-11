import React from 'react';
import '../styles/styles.scss';
import { backendTutorial, frontendTutorial, mobileTutorial } from './AllState.js';
import CommonTutorialsList from './CommonTutorialsList';

const Tutorials = () => {
  return (
    <section className='lightGrayBgColor commonSectionWrapper'>
      <div className='container noPadd'>
        <div className='tutorialWrapper'>
          <div className='col-md-12'>
            <h1 className='sectionHeader' tabIndex={0}>
              Check out the tutorials
            </h1>
          </div>
          <CommonTutorialsList
            title="Frontend Tutorials"
            subText="(2-hour Series)"
            tutorial={frontendTutorial}
          />
          <CommonTutorialsList
            title="Mobile Tutorials"
            subText="(2-hour Series)"
            tutorial={mobileTutorial}
          />
          <CommonTutorialsList
            title="Backend Tutorials"
            subText=""
            tutorial={backendTutorial}
          />
        </div>
      </div>
    </section>
  );
}

export default Tutorials;
