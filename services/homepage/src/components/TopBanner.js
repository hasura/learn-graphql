import React from 'react';
import BannerStripe from './BannerStripe'
import '../styles/styles.scss';

const TopBanner = () => {
  const hasuraDumbledore = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/hasura-dumbledore-new.png';
  const learnLogo = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/learn-logo.svg';
  const logo = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/logo.svg';
  const discordBrandsBlock = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/discord-brands-block.svg'
  const twitterBrandsBlock = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/twitter-brands-block.svg'
  const arrowGreen = require('../images/arrow-forward-green.svg');
  return (
    <div>
      <BannerStripe/>
      <section className='blueBgColor positionRel'>
        <div className='container noPadd'>
          <div className='topBannerWrapper col-md-12 noPadd'>
            <div className='col-md-7 col-sm-12 col-xs-12 noPadd'>
              <header className='headerWrapper'>
                <div className='logoWrapper'>
                  <a className="brand" href="https://hasura.io/" target="_blank" rel="noopener noreferrer"><img className='img-responsive' src={logo} alt='Hasura logo' /></a>
                  <a className="learnBrand" href="/" target="_blank" rel="noopener noreferrer"><img className='img-responsive' src={learnLogo} alt='Hasura logo' /></a>
                  <a className="discordBtn" href="https://discordapp.com/invite/hasura" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                    <img src={discordBrandsBlock} alt={'Discord'}/>
                  </a>
                  <a className="twitterBtn" href="https://twitter.com/hasurahq" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <img src={twitterBrandsBlock} alt={'Discord'}/>
                  </a>
                  <div className="gitHubBtn">
                    <iframe src="https://ghbtns.com/github-btn.html?user=hasura&repo=graphql-engine&type=star&count=true" frameBorder="0" scrolling="0" width="100px" height="20px" title="github button"></iframe>
                  </div>
                </div>
              </header>
              <h1 className='pageHeader'>
                The real world GraphQL tutorial for developers with deadlines!
              </h1>
              <div className='sectionDescription'>
                {/* With these <a href="https://github.com/hasura/learn-graphql">open-source</a> community maintained tutorials, you will move from the basics of GraphQL to building a real-time application in 2 hours.*/}
                You will move from GraphQL basics to production-ready concepts with our hands-on tutorial for frontend and backend developers.
              </div>
              <div className='arrowLink'>
                <a href="/learn/graphql/nextjs-fullstack-serverless/introduction/" target='_blank' rel="noopener noreferrer">
                  Check out our latest full stack course with Next.js & Hasura<img src={arrowGreen} alt='Arrow'/>
                </a>
              </div>
            </div>
            <div className='col-md-5 col-sm-12 col-xs-12'>
              <div className='topBannerImg'>
                <img className='img-responsive' src={hasuraDumbledore} alt='Hasura dumbledore' />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TopBanner;
