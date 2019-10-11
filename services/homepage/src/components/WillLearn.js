import React from 'react';
import '../styles/styles.scss';
import { learnBackend, learnFrontend } from './AllState.js';
const tick = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/tick.svg';

const WillLearn = () => {
  const frontend = learnFrontend.map((list, key) => {
    return (
      <div key={key} className='col-md-6 col-sm-6 col-xs-12'>
        <div className='listWrapper'>
          <div className='tick'>
            <img src={tick} alt='tick' />
          </div>
          <div className='sectionDescription'>
            {list.list}
          </div>
        </div>
      </div>
    )
  })
  const backend = learnBackend.map((list, key) => {
    return (
      <div key={key} className='col-md-12 col-sm-12 col-xs-12'>
        <div className='listWrapper'>
          <div className='tick'>
            <img src={tick} alt='tick' />
          </div>
          <div className='sectionDescription'>
            {list.list}
          </div>
        </div>
      </div>
    )
  })
  return (
    <section className='lightGrayBgColor commonSectionWrapper'>
      <div className='container noPadd'>
        <div className='willLearnWrapper'>
          <div className='col-md-12'>
            <h1 className='sectionHeader' tabIndex={0}>
              What you will learn
            </h1>
            <div className='purpleLineSeperator'>
            </div>
            <div className='sectionDescription'>
              2 hour GraphQL Tutorial Series to teach you what GraphQL is and how to integrate GraphQL APIs with your favorite web/mobile framework.
            </div>
          </div>
          <div className='willLearnTutorial wd100 flexBoxWrapper'>
            <div className='col-md-8 col-sm-12 col-xs-12 flexContainer'>
              <div className='flexList'>
                <div className='willLearnList wd100 flexAlign'>
                  <div className='willLearnHeader'>
                    Frontend Tutorials <span> (Mobile & Web)</span>
                  </div>
                  {frontend}
                </div>
              </div>
            </div>
            <div className='col-md-4 col-sm-12 col-xs-12 flexContainer'>
              <div className='flexList'>
                <div className='willLearnList wd100 flexAlign'>
                  <div className='willLearnHeader'>
                    Backend Tutorials
                  </div>
                  {backend}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WillLearn;
