import React from 'react';
import '../styles/styles.scss';
class Testimonials extends React.Component {
  render() {
    return (
      /* Use global styles normally */
      <section className='whiteBgColor commonSectionWrapper'>
        <div className='container noPadd'>
          <div className='testimoialsWrapper'>
            <div className='testimonialListWrapper'>
              <div className='wd75 testimonialListRight'>
                <div className='quotes'>
                  <img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/quote-new.svg' alt='Quote' />
                </div>
                <div className='quoteWrapper'>
                  <div className='sectionDescription'>
                    “This is one of the best tutorials I have seen for getting started with GraphQL and React. This is an incredible roadmap for learning these concepts in a linear and digestible way.
                  </div>
                  <div className='sectionDescriptionTitle'>
                    <a href="https://twitter.com/eveporcello" target='_blank' rel="noopener noreferrer">Eve Porcello</a>
                  </div>
                  <div className='designation'>
                    <span>Instructor <b>@egghead.io</b></span>
                  </div>
                </div>
                <div className='authorImg'>
                  <img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/Eve-Porcello.png' alt='Eve Porcello' />
                </div>
              </div>
              <div className='testimonialList wd75'>
                <div className='authorImg'>
                  <img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/Sibylle.png' alt='Sibylle' />
                </div>
                <div className='quoteWrapper'>
                  <div className='sectionDescription'>
                    “This is a really great tutorial for people keen to learn more about GraphQL <span role="img" aria-label="rocket emoji">🚀</span> I just went through the React one, but they have tutorials for Vue, iOS and RN too <span role="img" aria-label="heart emoji">💙</span> <a href="https://twitter.com/hashtag/2Hours2GraphQL?src=hash" target="_blank" rel="noopener noreferrer">#2Hours2GraphQL</a>.
                  </div>
                  <div className='sectionDescriptionTitle'>
                    <a href="https://twitter.com/s_ibylle/status/1138143802831585280" target='_blank' rel="noopener noreferrer">Sibylle</a>
                  </div>
                  <div className='designation'>
                    <span>Frontend Developer <b>@brandung</b></span>
                  </div>
                </div>
                <div className='quotes'>
                  <img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/quote-new.svg' alt='Quote' />
                </div>
              </div>
              <div className='wd75 testimonialListRight removePaddBottom'>
                <div className='quotes'>
                  <img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/quote-new.svg' alt='Quote' />
                </div>
                <div className='quoteWrapper'>
                  <div className='sectionDescription'>
                    Check out this GraphQL <a href="https://twitter.com/hashtag/ReasonML?src=hash" target="_blank" rel="noopener noreferrer">#ReasonML</a> course for Reason React developers by <a href="https://twitter.com/HasuraHQ" target="_blank" rel="noopener noreferrer">@HasuraHQ</a> <a href="https://learn.hasura.io/graphql/reason-react-apollo" target="_blank" rel="noopener noreferrer">https://learn.hasura.io/graphql/reason-react-apollo</a>... “Will this course teach ReasonReact concepts as well?” Hell yes. There are some programming patterns on display in this app that are different from what you see in generally.
                  </div>
                  <div className='sectionDescriptionTitle'>
                    <a href="https://twitter.com/_idkjs/status/1151765251991453696" target='_blank' rel="noopener noreferrer">Imani’s Father</a>
                  </div>
                  <div className='designation'>
                    <span>Freelance software developer</span>
                  </div>
                </div>
                <div className='authorImg'>
                  <img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/Imani.png' alt='Imani’s Father' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Testimonials;
