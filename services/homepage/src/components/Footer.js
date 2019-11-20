import React from 'react';
import SubscribeFrom from 'react-mailchimp-subscribe';
import '../styles/styles.scss';
const subscribeArrow = 'https://storage.googleapis.com/graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/arrow-forward.svg';
const formProps = {
  action: '//hasura.us13.list-manage.com/subscribe/post?u=9b63e92a98ecdc99732456b0e&amp;id=f5c4f66bcf',
  messages: {
    inputPlaceholder: 'Your E-mail Address',
    // btnLabel: 'SUBSCRIBE',
    btnLabel: (<img src={subscribeArrow} alt={'Arrow'} />),
    sending: 'Subscribing...',
    success: 'Thank you for subscribing!',
    error: 'Invalid email or you have already subscribed for the newsletter'
  },
  styles: {
    sending: {
      fontSize: '15px',
      paddingTop: '10px',
      color: '#001934'
    },
    success: {
      fontSize: '15px',
      paddingTop: '10px',
      color: '#001934'
    },
    error: {
      fontSize: '15px',
      paddingTop: '10px',
      color: 'red'
    }
  }
};

const Footer = () => {
  const hasuraLogoWhite = 'https://storage.googleapis.com/graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/hasura-logo.svg';
  return (
    <section  id="footer" ref="footer" className="lightGrayBgColor footerWrapper">
      <div className="container noPadd">
        <div className="col-md-8 col-sm-8 col-xs-12 noPadd">
          <div className="clearBoth">
            <div className="col-md-4 col-sm-4 col-xs-12">
              <div className="footerLinks">
                <h4>Product</h4>
                <p className="pSmall"><a href="https://github.com/hasura" target="_blank" rel="noopener noreferrer">Opensource</a></p>
                <p className="pSmall"><a href="https://hasura.io/event-triggers" target="_blank" rel="noopener noreferrer">Event Triggers</a></p>
                <p className="pSmall"><a href="https://blog.hasura.io/remote-joins-a-graphql-api-to-join-database-and-other-data-sources/" target="_blank" rel="noopener noreferrer">Remote Joins</a></p>
                <p className="pSmall"><a href="https://hasura.io/all-features" target="_blank" rel="noopener noreferrer">All Features</a></p>
                {/* <p className="pSmall"><a href="https://hasura.io/pricing" target="_blank" rel="noopener noreferrer">Pricing</a></p> */}
                <p className="pSmall"><a href="https://github.com/hasura/graphql-engine/releases" target="_blank" rel="noopener noreferrer">Changelog</a></p>
              </div>
            </div>
            <div className={'col-md-4 col-sm-4 col-xs-12'}>
              <div className="footerLinks">
                <h4>Resources</h4>
                <p className="pSmall"><a href="https://blog.hasura.io/" target="_blank" rel="noopener noreferrer">Blog</a></p>
                <p className="pSmall"><a href="https://hasura.io/use-cases" target="_blank" rel="noopener noreferrer">User Stories</a></p>
                <p className="pSmall"><a href="https://3factor.app/" target="_blank" rel="noopener noreferrer">3Factor Apps</a></p>
                <p className="pSmall"><a href="https://hasura.io/react-graphql" target="_blank" rel="noopener noreferrer">React Resources</a></p>
                <p className="pSmall"><a href="https://hasura.io/vue-graphql" target="_blank" rel="noopener noreferrer">Vue Resources</a></p>
                <p className="pSmall"><a href="https://hasura.io/diy-graphql-baas" target="_blank" rel="noopener noreferrer">DIY GraphQL BaaS</a></p>
              </div>
            </div>
            <div className={'col-md-4 col-sm-4 col-xs-12'}>
              <div className="footerLinks">
                <h4>Community</h4>
                <p className="pSmall"><a href="https://hasura.io/community" target="_blank" rel="noopener noreferrer">Community Resources</a></p>
                <p className="pSmall"><a href="https://learn.hasura.io/" target="_blank" rel="noopener noreferrer">GraphQL Tutorials</a></p>
                <p className="pSmall"><a href="https://github.com/hasura/graphql-engine/wiki" target="_blank" rel="noopener noreferrer">Community Wiki</a></p>
                <p className="pSmall"><a href="https://hasura.io/sample-apps" target="_blank" rel="noopener noreferrer">Sample Apps</a></p>
                <p className="pSmall"><a href="https://graphql.asia/" target="_blank" rel="noopener noreferrer">GraphQL Asia</a></p>
              </div>
            </div>
          </div>
          <div className="clearBoth">
            <div className={'col-md-4 col-sm-4 col-xs-12'}>
              <div className="footerLinks removePaddBottom">
                <h4>Hasura</h4>
                <p className="pSmall"><a href="https://hasura.io/about" target="_blank" rel="noopener noreferrer">About Us</a></p>
                <p className="pSmall"><a href="https://hasura.io/careers" target="_blank" rel="noopener noreferrer">Careers</a></p>
                <p className="pSmall"><a href="https://github.com/hasura/graphql-engine/tree/master/assets/brand" target="_blank" rel="noopener noreferrer">Brand Assets</a></p>
                <p className="pSmall"><a href="https://hasura.io/getintouch" target="_blank" rel="noopener noreferrer">Contact Us</a></p>
                <p className="pSmall"><a href="https://hasura.io/legal" target="_blank" rel="noopener noreferrer">Legal Stuff</a></p>
              </div>
            </div>
            <div className={'col-md-4 col-sm-4 col-xs-12'}>
              <div className="footerLinks removePaddBottom">
                <h4>Support</h4>
                <p className="pSmall"><a href="https://docs.hasura.io" target="_blank" rel="noopener noreferrer">Documentation</a></p>
                {/* <p className="pSmall"><a href="https://hasura.io/pricing" target="_blank" rel="noopener noreferrer">Support Plans</a></p> */}
                <p className="pSmall"><a href="https://discordapp.com/invite/hasura" target="_blank" rel="noopener noreferrer">Community Forum</a></p>
                <p className="pSmall"><a href="https://github.com/hasura/" target="_blank" rel="noopener noreferrer">Github</a></p>
              </div>
            </div>
            <div className={'col-md-4 col-sm-4 col-xs-12'}>
              <div className="footerLinks removePaddBottom">
                <h4>Tools</h4>
                <p className="pSmall"><a href="https://github.com/hasura/graphqurl" target="_blank" rel="noopener noreferrer">Graphqurl</a></p>
                <p className="pSmall"><a href="https://github.com/hasura/firebase2graphql" target="_blank" rel="noopener noreferrer">Firebase2GraphQL</a></p>
                <p className="pSmall"><a href="https://github.com/hasura/json2graphql" target="_blank" rel="noopener noreferrer">JSON2GraphQL</a></p>
                <p className="pSmall"><a href="https://github.com/hasura/graphql2chartjs" target="_blank" rel="noopener noreferrer">GraphQL2ChartJS</a></p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-4 col-xs-12">
          <div className="subscribeFormWrapper">
            <h4>Join our mailing list</h4>
            <SubscribeFrom className="subscribeForm" {...formProps}/>
          </div>
          <div className="footerLogo">
            <a href="/"><img src={hasuraLogoWhite} alt={'Hasura logo'}/></a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
