import React from 'react';
import '../styles/styles.scss';

const FrontendTutorials = () => {
  const icon1 = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/icon-1.svg'
  const icon2 = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/icon-2.svg'
  const icon3 = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/icon-3.svg'
  const icon4 = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/icon-4.svg'
  const icon5 = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/icon-5.svg'
  const icon6 = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/icon-6.svg'
  const icon7 = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/icon-7.svg'
  const icon8 = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/icon-8.svg'
  const icon9 = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/icon-9.svg'
  const icon10 = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/icon-10.svg'
  return (
    <section className='commonSectionWrapper'>
      <div className='container noPadd'>
        <div className='frontendTutorialWrapper'>
          <div className='col-md-12'>
            <div className='tag'>
              2 HOUR SERIES
            </div>
            <div className='greenLineSeperator'></div>
            <h1 className='pageHeader'>
              Frontend Tutorials
            </h1>
            <div className='col-md-7 col-sm-7 col-xs-12 noPadd'>
              <div className='sectionDescriptionTitle'>
                These open-source community maintained tutorials  will help you learn GraphQL by doing! These are backend agnostic tutorials where you will integrate GraphQL APIs into your favourite frontend framework and get productive with GraphQL in ~2 hours!
              </div>
              <h2>What you will learn</h2>
              <div className='col-md-6 col-sm-6 col-xs-12 noPadd'>
                <ul className='sectionDescription'>
                  <li><img src={icon1} alt="Icon" />GraphQL vs. REST</li>
                  <li><img src={icon2} alt="Icon" />Integrating GraphQL Mutations with Query Variables.</li>
                  <li><img src={icon3} alt="Icon" />Using Subscriptions.</li>
                  <li><img src={icon4} alt="Icon" />Setting up a GraphQL client with Apollo.</li>
                  <li><img src={icon5} alt="Icon" />Managing Local Cache after a GraphQL Mutation.</li>
                  <li><img src={icon6} alt="Icon" />Realtime feed with notifications.</li>
                </ul>
              </div>
              <div className='col-md-6 col-sm-6 col-xs-12'>
                <ul className='sectionDescription'>
                  <li><img src={icon7} alt="Icon" />GraphQL Queries, Mutations, Subscriptions.</li>
                  <li><img src={icon8} alt="Icon" />Integrating Mutations to update, delete and bulk delete.</li>
                  <li><img src={icon9} alt="Icon" />Integrating GraphQL queries in the app.</li>
                  <li><img src={icon10} alt="Icon" />Optimistic UI updates for responsive user experience.</li>
                </ul>
              </div>
            </div>
            <div className='col-md-5 col-sm-5 col-xs-12 noPadd'>
              <div className='boxWrapper'>
                <a href="https://learn.hasura.io/graphql/react" target='_blank' rel="noopener noreferrer">
                  <div className='box'>
                    <img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/react-original.svg" alt="React"/>
                    <div className='overlayWrapper'>
                      React
                    </div>
                  </div>
                </a>
                <a href="https://learn.hasura.io/graphql/angular-apollo" target='_blank' rel="noopener noreferrer">
                  <div className='box'>
                    <img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/angular-original.svg" alt="Angular"/>
                    <div className='overlayWrapper'>
                      Angular
                    </div>
                  </div>
                </a>
                <a href="https://learn.hasura.io/graphql/vue" target='_blank' rel="noopener noreferrer">
                  <div className='box'>
                    <img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/vue-original.svg" alt="Vue"/>
                    <div className='overlayWrapper'>
                      Vue
                    </div>
                  </div>
                </a>
              </div>
              <div className='boxWrapper'>
                <a href="https://learn.hasura.io/graphql/elm-graphql" target='_blank' rel="noopener noreferrer">
                  <div className='box'>
                    <img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/elm-original.jpg" alt="Elm"/>
                    <div className='overlayWrapper'>
                      Elm
                    </div>
                  </div>
                </a>
                <a href="https://learn.hasura.io/graphql/typescript-react-apollo" target='_blank' rel="noopener noreferrer">
                  <div className='box'>
                    <img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/typescript-original.png" alt="Typescript"/>
                    <div className='overlayWrapper'>
                      Typescript
                    </div>
                  </div>
                </a>
                <a href="https://learn.hasura.io/graphql/react-native/introduction" target='_blank' rel="noopener noreferrer">
                  <div className='box'>
                    <img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/react-original.svg" alt="React native"/>
                    <div className='overlayWrapper'>
                      React Native
                    </div>
                  </div>
                </a>
              </div>
              <div className='boxWrapper'>
                <a href="https://learn.hasura.io/graphql/reason-react-apollo" target='_blank' rel="noopener noreferrer">
                  <div className='box'>
                    <img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/reasonml-original.svg" alt="ReasonML"/>
                    <div className='overlayWrapper'>
                      ReasonML
                    </div>
                  </div>
                </a>
                <a href="https://learn.hasura.io/graphql/flutter-graphql" target='_blank' rel="noopener noreferrer">
                  <div className='box'>
                    <img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/flutter-original.svg" alt="Flutter"/>
                    <div className='overlayWrapper'>
                      Flutter
                    </div>
                  </div>
                </a>
                <a href="https://learn.hasura.io/graphql/ios" target='_blank' rel="noopener noreferrer">
                  <div className='box'>
                    <img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/ios-original.png" alt="IOS"/>
                    <div className='overlayWrapper'>
                      IOS
                    </div>
                  </div>
                </a>
              </div>
              <div className='boxWrapper'>
                <a href="https://learn.hasura.io/graphql/android" target='_blank' rel="noopener noreferrer">
                  <div className='box'>
                    <img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/android-original.svg" alt="Android"/>
                    <div className='overlayWrapper'>
                      Android
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FrontendTutorials;
