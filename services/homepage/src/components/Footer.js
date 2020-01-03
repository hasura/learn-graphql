import React from 'react';
import SubscribeFrom from 'react-mailchimp-subscribe';
import '../styles/styles.scss';
import { socialItems } from './AllState.js';
const subscribeArrow = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/arrow_forward-white.svg';
const formProps = {
  action: '//hasura.us13.list-manage.com/subscribe/post?u=9b63e92a98ecdc99732456b0e&amp;id=f5c4f66bcf',
  messages: {
    inputPlaceholder: 'Your E-mail Address',
    btnLabel: (<img src={subscribeArrow} alt={'Arrow'} />),
    sending: 'Subscribing...',
    success: 'Thank you for subscribing!',
    error: 'Invalid email or you have already subscribed for the newsletter'
  },
  styles: {
    sending: {
      fontSize: '15px',
      paddingTop: '10px',
      color: '#fff'
    },
    success: {
      fontSize: '15px',
      paddingTop: '10px',
      color: '#FFCA27'
    },
    error: {
      fontSize: '15px',
      paddingTop: '10px',
      color: 'red'
    }
  }
};

const Footer = () => {
  const hasuraLogoWhite = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/logo-footer.svg'
  const copyrightRegular = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/copyright-regular.svg'
  const socialWrapper = socialItems.map((items, index) => {
      return (
        <div key={index} className='socialBrands'>
          <a href={items.socialLink} rel="noopener noreferrer" aria-label={items.altText}>
              <img src={items.imageSrc} alt={items.altText}/>
          </a>
        </div>
      );
    });
  return (
    <footer id="footer" ref="footer" className='footerWrapper blueBgGradientColor wd100 removePaddBottom'>
      <section className='footerWrapperBg commonSectionWrapper removePaddBottom'>
        <div className='container noPadd'>
          <div className='col-md-8 col-sm-8 col-xs-12 noPadd'>
            <div className='clearBoth'>
              <div className='col-md-4 col-sm-4 col-xs-12'>
                <div className='footerLinks'>
                  <h4>Product</h4>
                  <p className='pSmall'><a href="/all-features">All Features</a></p>
                  <p className='pSmall'><a href="https://github.com/hasura" target="_blank" rel="noopener noreferrer" aria-label="Open source">Opensource</a></p>
                  <p className='pSmall'><a href="/event-triggers" target="_blank" rel="noopener noreferrer">Event Triggers</a></p>
                  <p className='pSmall'><a href="https://blog.hasura.io/remote-joins-a-graphql-api-to-join-database-and-other-data-sources/" target={'_blank'} rel="noopener noreferrer" aria-label="Remote joins">Remote Joins</a></p>
                  <p className='pSmall'><a href="/pricing" target="_blank" rel="noopener noreferrer">Pricing</a></p>
                  <p className='pSmall'><a href="https://github.com/hasura/graphql-engine/releases" target="_blank" rel="noopener noreferrer" aria-label="Changelog">Changelog</a></p>
                </div>
              </div>
              <div className='col-md-4 col-sm-4 col-xs-12'>
                <div className='footerLinks'>
                  <h4>Resources</h4>
                  <p className='pSmall'><a href="https://blog.hasura.io/" target="_blank" rel="noopener noreferrer" aria-label="Blog">Blog</a></p>
                  <p className='pSmall'><a href="/user-stories">User Stories</a></p>
                  <p className='pSmall'><a href="https://3factor.app/" target="_blank" rel="noopener noreferrer" aria-label="3Factor app">3Factor Apps</a></p>
                  <p className='pSmall'><a href="/react-graphql" >React Resources</a></p>
                  <p className='pSmall'><a href="/vue-graphql" >Vue Resources</a></p>
                  <p className='pSmall'><a href="/diy-graphql-baas" >DIY GraphQL BaaS</a></p>
                </div>
              </div>
              <div className='col-md-4 col-sm-4 col-xs-12'>
                <div className='footerLinks'>
                  <h4>Community</h4>
                  <p className='pSmall'><a href="/community">Community Resources</a></p>
                  <p className='pSmall'><a href="https://learn.hasura.io/" target="_blank" rel="noopener noreferrer" aria-label="GraphQL tutorials">GraphQL Tutorials</a></p>
                  <p className='pSmall'><a href="https://github.com/hasura/graphql-engine/wiki" target="_blank" rel="noopener noreferrer" aria-label="Community wiki">Community Wiki</a></p>
                  <p className='pSmall'><a href="/sample-apps" >Sample Apps</a></p>
                  <p className='pSmall'><a href="https://graphql.asia/" target="_blank" rel="noopener noreferrer" aria-label="GraphQL asia">GraphQL Asia</a></p>
                </div>
              </div>
            </div>
            <div className='clearBoth'>
              <div className='col-md-4 col-sm-4 col-xs-12'>
                <div className='footerLinks'>
                  <h4>Hasura</h4>
                  <p className='pSmall'><a href="/about" >About Us</a></p>
                  <p className='pSmall'><a href="/careers" >Careers</a></p>
                  <p className='pSmall'><a href="https://github.com/hasura/graphql-engine/tree/master/assets/brand" target="_blank" rel="noopener noreferrer" aria-label="Brand assets">Brand Assets</a></p>
                  <p className='pSmall'><a href="/getintouch" >Contact Us</a></p>
                  <p className='pSmall'><a href="/legal" >Legal Stuff</a></p>
                </div>
              </div>
              <div className='col-md-4 col-sm-4 col-xs-12'>
                <div className='footerLinks'>
                  <h4>Support</h4>
                  <p className='pSmall'><a href="https://docs.hasura.io" target="_blank" rel="noopener noreferrer" aria-label="Documentation">Documentation</a></p>
                  <p className='pSmall'><a href="https://discordapp.com/invite/hasura" target="_blank" rel="noopener noreferrer" aria-label="Community forum" >Community Forum</a></p>
                  <p className='pSmall'><a href="https://github.com/hasura/" target="_blank" rel="noopener noreferrer" aria-label="Github">Github</a></p>
                </div>
              </div>
              <div className='col-md-4 col-sm-4 col-xs-12'>
                <div className='footerLinks'>
                  <h4>Tools</h4>
                  <p className='pSmall'><a href="https://github.com/hasura/graphqurl" target="_blank" rel="noopener noreferrer" aria-label="Graphqurl">Graphqurl</a></p>
                  <p className='pSmall'><a href="https://github.com/hasura/firebase2graphql" target="_blank" rel="noopener noreferrer" aria-label="Firebase2GraphQL">Firebase2GraphQL</a></p>
                  <p className='pSmall'><a href="https://github.com/hasura/json2graphql" target="_blank" rel="noopener noreferrer" aria-label="JSON2GraphQL">JSON2GraphQL</a></p>
                  <p className='pSmall'><a href="https://github.com/hasura/graphql2chartjs" target="_blank" rel="noopener noreferrer" aria-label="GraphQL2ChartJS">GraphQL2ChartJS</a></p>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-4 col-sm-4 col-xs-12'>
            <div className='subscribeFormWrapper'>
              <h4>Join our mailing list</h4>
              <SubscribeFrom className='subscribeForm' {...formProps}/>
            </div>
            <div className='footerLogo'>
              <a href="/"><img src={hasuraLogoWhite} alt={'Hasura logo'}/></a>
            </div>
          </div>
        </div>
        <div className='container noPadd'>
            <div className='copyWriteWrapper'>
              <div className='copyWrite'>
                <img src={copyrightRegular} alt={'Copy write icon'}/>
                <h4>2020 Hasura Inc. All rights reserved</h4>
              </div>
              <div className='footerSocialIconsWrapper'>
                {socialWrapper}
              </div>
            </div>
          </div>
        </section>
      </footer>
  );
}

export default Footer;
