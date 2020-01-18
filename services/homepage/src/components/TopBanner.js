import React, { useState } from 'react';
import '../styles/styles.scss';

const TopBanner = () => {
  const hasuraDumbledore = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/hasura-dumbledore-new.png';
  const learnLogo = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/learn-logo.svg';
  const logo = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/logo.svg';
  const discordBrandsBlock = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/discord-brands-block.svg'
  const twitterBrandsBlock = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/twitter-brands-block.svg'
  const close = require('../images/close.svg');
  const graphqlLogo = require('../images/graphql-logo.svg');
  const arrowForwardPink = require('../images/arrow-forward-pink.svg');
  const [banner, setBanner] = useState(true);
  return (
    <div>
      {
        (banner) ? (
          <div className='bannerStripWrapper hidden-xs'>
            <a href="https://graphql.asia" target="_blank" rel="noopener noreferrer">
              <div className='bannerStrip'>
                <div className='container displayFlex noPadd'>
                  <div className='announceIcon'>
                    <img className={'img-responsive'} src={graphqlLogo} alt={'Graphql logo'} />
                  </div>
                  <div className='pExtraSmall'>
                    <span className='fontBold'>GraphQL Asia</span> is back in Bangalore from 20th-22nd February. <a href="https://graphql.asia/tickets" target="_blank" rel="noopener noreferrer">Get your tickets now<img className={'img-responsive'} src={arrowForwardPink} alt={'arrow'} /></a>
                  </div>
                </div>
              </div>
            </a>
            {/* eslint-disable-next-line */}
            <div className='closeBanner' onClick={() => setBanner(false)}>
              <img className={'img-responsive'} src={close} alt={'Close'} />
            </div>
          </div>
        ) : null
      }

      <section className='blueBgColor positionRel'>
        <div className='container noPadd'>
          <div className='topBannerWrapper col-md-12 noPadd'>
            <div className='col-md-6 col-sm-12 col-xs-12 noPadd'>
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
              <div className='pageHeader'>
                Real world GraphQL tutorials for developers with deadlines!
              </div>
              <div className='sectionDescription'>
                {/* With these <a href="https://github.com/hasura/learn-graphql">open-source</a> community maintained tutorials, you will move from the basics of GraphQL to building a real-time application in 2 hours.*/}
                You will move from GraphQL basics to production-ready concepts with our hands-on tutorials for frontend and backend developers.
              </div>
            </div>
            <div className='col-md-6 col-sm-12 col-xs-12'>
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
