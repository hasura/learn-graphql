import React from 'react';
import '../styles/styles.scss';

const HasuraTutorials = () => {
  const logo = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/logo-lamda.svg'
  const waterMark = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/logo-fade.svg'
  const expandBlue = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/expand-blue.svg'
  const arrowBlue = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/arrow-blue.svg'
  const expandRed = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/expand-red.svg'
  const arrowRed = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/arrow-red.svg'
  return (
    <section id="hasura-tutorials" className='commonSectionWrapper'>
      <div className='container noPadd'>
        <div className='frontendTutorialWrapper'>
          <div className='col-md-12 noPadd'>
            <h1 className='pageHeader'>
              Hasura Tutorials
            </h1>
            <div className='sectionDescriptionTitle wd50'>
              These are tutorials put together by our team to help new users get familiar with Hasura by building a fully functional realtime backend with Hasura.
            </div>
            <div className='hasuraListWrapper'>
              <div className='col-md-6 col-sm-6 col-xs-12 introList'>
                <img className='brandPos' src={logo} alt={'Logo'}/>
                <div className='tag'>INTRO TO HASURA</div>
                <div className='blueLineSeperator'></div>
                <h2><span>Hasura</span> Basics</h2>
                <ul className='sectionDescription'>
                  <li><img src={expandBlue} alt='Expand'/>Hasura Basics</li>
                  <li><img src={expandBlue} alt='Expand'/>Postgres Data modelling</li>
                  <li><img src={expandBlue} alt='Expand'/>Authorization</li>
                  <li><img src={expandBlue} alt='Expand'/>Authentication</li>
                  <li><img src={expandBlue} alt='Expand'/>Custom business logic</li>
                  <li><img src={expandBlue} alt='Expand'/>Remote Schemas, Event triggers</li>
                </ul>
                <div className='arrowLink'>
                  <a href="/learn/graphql/hasura/introduction/" target='_blank' rel="noopener noreferrer">
                    START HASURA BASICS<img src={arrowBlue} alt='Arrow'/>
                  </a>
                </div>
                <img className='waterMarkImg' src={waterMark} alt={'Water mark logo'}/>
              </div>
              <div className='col-md-6 col-sm-6 col-xs-12 authList'>
                <div className='tag'>AUTHENTICATION WITH HASURA</div>
                <div className='greenLineSeperator'></div>
                <h2><span>Hasura</span> Auth with Slack model</h2>
                <ul className='sectionDescription'>
                  <li><img src={expandRed} alt='Expand'/>Roles</li>
                  <li><img src={expandRed} alt='Expand'/>Access Control</li>
                  <li><img src={expandRed} alt='Expand'/>Authorization Modes</li>
                  <li><img src={expandRed} alt='Expand'/>Authentication</li>
                  <li><img src={expandRed} alt='Expand'/>Auth with external services</li>
                  <li><img src={expandRed} alt='Expand'/>Allow Lists</li>
                </ul>
                <div className='arrowLink'>
                  <a href="/learn/graphql/hasura-auth-slack/introduction/" target='_blank' rel="noopener noreferrer">
                    START AUTHENTICATION WITH HASURA<img src={arrowRed} alt='Arrow'/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HasuraTutorials;
