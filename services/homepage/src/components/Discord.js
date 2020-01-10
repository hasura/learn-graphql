import React from 'react';
import '../styles/styles.scss';
const discordWhite = require('../images/discord-brands-white.svg');
const hasuraIcon = require('../images/hasura-icon.svg');
const Discord = () => {
  return (
    <section id="discord" className='commonSectionWrapper discordWrapper greenGradientDiscordBg positionImg'>
        <div className='container noPadd'>
          <div className='clearBoth alignCenter'>
            <div className='col-md-8 col-sm-8 col-xs-12 noPadd'>
              <h2>
                <img src={discordWhite} alt={'Discord logo'}/>
                Hasura Discord Community
              </h2>
              <p className='pSmall'>If you need any help with developing on Hasura, the 4000 member strong Hasura Discord is here to help. Our community members include some very experienced engineers from some of the world’s most exciting companies, and many of them have been using Hasura in Production for a long time.</p>
              <div className='buttonWrapper'>
                <a href={'https://discordapp.com/invite/hasura'} target={'_blank'} rel="noopener noreferrer"aria-label="Join the discord">
                  <button className='commonBtn whiteTransparentBtn'>JOIN DISCORD</button>
                </a>
              </div>
            </div>
            <div className='col-md-4 col-sm-4 col-xs-12 noPadd'>
              <div className='starsWrapper'>
                <div className='star'>
                  <h1>4300+</h1>
                  <h5>DISCORD MEMBERS</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='fixedImg'>
          <img className={'img-responsive'} src={hasuraIcon} alt={'Hasura icon'}/>
        </div>
      </section>
  );
}

export default Discord;
