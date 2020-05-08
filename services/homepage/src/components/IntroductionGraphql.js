import React from 'react';
import '../styles/styles.scss';

const IntroductionGraphql = () => {
  const graphql = require('../images/graphql-blue.svg');
  const newTag = require('../images/new.svg');
  const expandGreen = require('../images/expand-green.svg');
  const arrowGreen = require('../images/arrow-forward-green.svg');


  return (
    <section id="frontend-tutorials" className='commonSectionWrapper'>
      <div className='container noPadd'>
        <div className='introductionGraphqlWrapper'>
          <div className='col-md-12 noPadd'>
            <h1 className='pageHeader'>
              Introduction to GraphQL
              <img src={newTag} alt='New tag' />
            </h1>
            <div className='sectionDescriptionTitle'>
              We will explore the fundamentals of GraphQL and how its realtime capabilities and community tooling makes it suitable for modern applications.
            </div>
          </div>
          <div className='introductionGraphqlWrapper introductionGraphqlWrapperBg wd100'>
            <div className='col-md-8 col-sm-8 col-xs-12 noPadd'>
              <div className='introductionTag'>GRAPHQL BASICS</div>
              <div className='grayLineSeperator'></div>
              <h2>Introduction to GraphQL</h2>
              <div className='col-md-6 col-sm-6 col-12 noPadd'>
                <ul className='sectionDescription'>
                  <li><img src={expandGreen} alt='Expand'/>Introduction to GraphQL</li>
                  <li><img src={expandGreen} alt='Expand'/>Core Concepts</li>
                  <li><img src={expandGreen} alt='Expand'/>GraphQL vs REST, a comparison</li>
                  <li><img src={expandGreen} alt='Expand'/>Queries</li>
                </ul>
              </div>
              <div className='col-md-6 col-sm-6 col-12 noPadd'>
                <ul className='sectionDescription'>
                  <li><img src={expandGreen} alt='Expand'/>Mutations</li>
                  <li><img src={expandGreen} alt='Expand'/>Subscriptions</li>
                  <li><img src={expandGreen} alt='Expand'/>GraphQL Server & Architecture</li>
                  <li><img src={expandGreen} alt='Expand'/>GraphQL Clients</li>
                </ul>
              </div>
              <div className='arrowLink'>
                <a href="/learn/graphql/intro-graphql/introduction/" target='_blank' rel="noopener noreferrer">
                  START GRAPHQL BASICS<img src={arrowGreen} alt='Arrow'/>
                </a>
              </div>
            </div>
            <div className='col-md-4 col-sm-4 col-xs-12 noPadd hidden-xs'>
              <div className='graphqlImg'>
                <img src={graphql} alt='GraphQL logo'/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IntroductionGraphql;
