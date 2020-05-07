import React from 'react';
import '../styles/styles.scss';

const FrontendTutorials = () => {
  const expandRed = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/expand-red.svg'
  return (
    <section id="frontend-tutorials" className='commonSectionWrapper removePaddBottom'>
      <div className='container noPadd'>
        <div className='frontendTutorialWrapper'>
          <div className='col-md-12 noPadd'>
            <div className='tag'>
              2 HOUR SERIES
            </div>
            <div className='greenLineSeperator'></div>
            <h2 className='pageHeader'>
              Frontend GraphQL Tutorial
            </h2>
            <div className='sectionDescriptionTitle'>
              These open-source community maintained tutorials will help you learn GraphQL by doing! These are backend agnostic tutorials where you will integrate GraphQL APIs into your favourite frontend framework and get productive with GraphQL in ~2 hours!
            </div>
          </div>
        </div>
      </div>
      <div className='commonSectionWrapper lightGrayBgColor'>
        <div className='container noPadd frontendTutorialWrapper'>
          <div className='col-md-7 col-sm-7 col-xs-12 noPadd'>
            <h3>What you will learn</h3>
            <div className='col-md-6 col-sm-6 col-xs-12 noPadd'>
              <ul className='sectionDescription'>
                <li><img src={expandRed} alt="Expand" />GraphQL vs. REST</li>
                <li><img src={expandRed} alt="Expand" />Integrating GraphQL Mutations with Query Variables.</li>
                <li><img src={expandRed} alt="Expand" />Using Subscriptions.</li>
                <li><img src={expandRed} alt="Expand" />Setting up a GraphQL client with Apollo.</li>
                <li><img src={expandRed} alt="Expand" />Managing Local Cache after a GraphQL Mutation.</li>
                <li><img src={expandRed} alt="Expand" />Realtime feed with notifications.</li>
              </ul>
            </div>
            <div className='col-md-6 col-sm-6 col-xs-12 noPadd'>
              <ul className='sectionDescription'>
                <li><img src={expandRed} alt="Expand" />GraphQL Queries, Mutations, Subscriptions.</li>
                <li><img src={expandRed} alt="Expand" />Integrating Mutations to update, delete and bulk delete.</li>
                <li><img src={expandRed} alt="Expand" />Integrating GraphQL queries in the app.</li>
                <li><img src={expandRed} alt="Expand" />Optimistic UI updates for responsive user experience.</li>
              </ul>
            </div>
          </div>
          <div className='col-md-5 col-sm-5 col-xs-12 noPadd'>
            <div className='boxWrapper'>
              <a href="https://hasura.io/learn/graphql/react/introduction/" target='_blank' rel="noopener noreferrer">
                <div className='box'>
                  <img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/react-original.svg" alt="React Apollo GraphQL Tutorial"/>
                  <div className='overlayWrapper'>
                    React + Apollo
                    <div className="downArrow"></div>
                  </div>
                </div>
              </a>
              <a href="https://hasura.io/learn/graphql/angular-apollo/introduction/" target='_blank' rel="noopener noreferrer">
                <div className='box'>
                  <img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/angular-original.svg" alt="Angular Apollo GraphQL Tutorial"/>
                  <div className='overlayWrapper'>
                    Angular + Apollo
                    <div className="downArrow"></div>
                  </div>
                </div>
              </a>
              <a href="https://hasura.io/learn/graphql/vue/introduction/" target='_blank' rel="noopener noreferrer">
                <div className='box'>
                  <img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/vue-original.svg" alt="Vue Apollo GraphQL Tutorial"/>
                  <div className='overlayWrapper'>
                    Vue + Apollo
                    <div className="downArrow"></div>
                  </div>
                </div>
              </a>
              <a href="https://hasura.io/learn/graphql/elm-graphql/introduction/" target='_blank' rel="noopener noreferrer">
                <div className='box'>
                  <img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/elm-original.jpg" alt="Elm GraphQL Tutorial"/>
                  <div className='overlayWrapper'>
                    Elm + GraphQL
                    <div className="downArrow"></div>
                  </div>
                </div>
              </a>
              <a href="https://hasura.io/learn/graphql/typescript-react-apollo/introduction/" target='_blank' rel="noopener noreferrer">
                <div className='box'>
                  <img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/typescript-original.png" alt="Typescript React Apollo GraphQL Tutorial"/>
                  <div className='overlayWrapper'>
                    Typescript + Apollo
                    <div className="downArrow"></div>
                  </div>
                </div>
              </a>
              <a href="https://hasura.io/learn/graphql/react-native/introduction/" target='_blank' rel="noopener noreferrer">
                <div className='box'>
                  <img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/react-original.svg" alt="React Native Apollo GraphQL Tutorial"/>
                  <div className='overlayWrapper'>
                    React Native + Apollo
                    <div className="downArrow"></div>
                  </div>
                </div>
              </a>
              <a href="https://hasura.io/learn/graphql/reason-react-apollo/introduction/" target='_blank' rel="noopener noreferrer">
                <div className='box'>
                  <img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/reasonml-original.svg" alt="ReasonML React Apollo Tutorial"/>
                  <div className='overlayWrapper'>
                    ReasonML + Apollo
                    <div className="downArrow"></div>
                  </div>
                </div>
              </a>
              <a href="https://hasura.io/learn/graphql/flutter-graphql/introduction/" target='_blank' rel="noopener noreferrer">
                <div className='box'>
                  <img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/flutter-original.svg" alt="Flutter GraphQL Tutorial"/>
                  <div className='overlayWrapper'>
                    Flutter + GraphQL
                    <div className="downArrow"></div>
                  </div>
                </div>
              </a>
              <a href="https://hasura.io/learn/graphql/ios/introduction/" target='_blank' rel="noopener noreferrer">
                <div className='box'>
                  <img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/ios-original.png" alt="iOS Apollo GraphQL Tutorial"/>
                  <div className='overlayWrapper'>
                    iOS + Apollo
                    <div className="downArrow"></div>
                  </div>
                </div>
              </a>
              <a href="https://hasura.io/learn/graphql/android/introduction/" target='_blank' rel="noopener noreferrer">
                <div className='box'>
                  <img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/android-original.svg" alt="Android Apollo GraphQL Tutorial"/>
                  <div className='overlayWrapper'>
                    Android + Apollo
                    <div className="downArrow"></div>
                  </div>
                </div>
              </a>
              <a href="https://hasura.io/learn/graphql/unity/introduction/" target='_blank' rel="noopener noreferrer">
                <div className='box'>
                  <img src="https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/unity-original.svg" alt="Unity GraphQL Tutorial"/>
                  <div className='overlayWrapper'>
                    Unity + GraphQL
                    <div className="downArrow"></div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FrontendTutorials;
