import React from 'react';
import MailchimpSubscribe from "react-mailchimp-subscribe"
import '../styles/styles.scss';
import { socialItems } from './AllState.js';
import MailchimpForm from './MailchimpForm';
const url = "//hasura.us13.list-manage.com/subscribe/post?u=9b63e92a98ecdc99732456b0e&amp;id=f5c4f66bcf";

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
    <footer id="footer" className='footerWrapper blueBgGradientColor wd100 removePaddBottom'>
      <section className='commonSectionWrapper removePaddBottom'>
        <div className='container noPadd'>
          <div className='col-md-8 col-sm-8 col-xs-12 noPadd'>
            <div className='clearBoth'>
              <div className='col-md-4 col-sm-4 col-xs-12'>
                <div className='footerLinks'>
                  <h4>Product</h4>
                  <p className='pSmall'><a href="https://hasura.io/all-features/" target="_blank" rel="noopener noreferrer">All Features</a></p>
                  <p className='pSmall'><a href="https://github.com/hasura" target="_blank" rel="noopener noreferrer" aria-label="Open source">Opensource</a></p>
                  <p className='pSmall'><a href="https://hasura.io/enterprise/" target="_blank" rel="noopener noreferrer" aria-label="Enterprise">Enterprise</a></p>
                  <p className='pSmall'><a href="https://hasura.io/hasura-pro/" target="_blank" rel="noopener noreferrer" aria-label="Hasura Pro">Hasura Pro</a></p>
                  <p className='pSmall'><a href="https://hasura.io/event-triggers/" target="_blank" rel="noopener noreferrer">Event Triggers</a></p>
                  <p className='pSmall'><a href="https://hasura.io/blog/remote-joins-a-graphql-api-to-join-database-and-other-data-sources/" target={'_blank'} rel="noopener noreferrer" aria-label="Remote joins">Remote Joins</a></p>
                  <p className='pSmall'><a href="https://hasura.io/pricing/" target="_blank" rel="noopener noreferrer">Pricing</a></p>
                  <p className='pSmall'><a href="https://github.com/hasura/graphql-engine/releases" target="_blank" rel="noopener noreferrer" aria-label="Changelog">Changelog</a></p>
                </div>
              </div>
              <div className='col-md-4 col-sm-4 col-xs-12'>
                <div className='footerLinks'>
                  <h4>Resources</h4>
                  <p className='pSmall'><a href="https://hasura.io/blog/" target="_blank" rel="noopener noreferrer" aria-label="Blog">Blog</a></p>
                  <p className='pSmall'><a href="https://hasura.io/user-stories/" target="_blank" rel="noopener noreferrer">User Stories</a></p>
                  <p className='pSmall'><a href="https://3factor.app/" target="_blank" rel="noopener noreferrer" aria-label="3Factor app">3Factor Apps</a></p>
                  <p className='pSmall'><a href="https://hasura.io/react-graphql/" target="_blank" rel="noopener noreferrer">React GraphQL</a></p>
                  <p className='pSmall'><a href="https://hasura.io/vue-graphql/" target="_blank" rel="noopener noreferrer">Vue GraphQL</a></p>
                  <p className='pSmall'><a href="https://hasura.io/diy-graphql-baas/" target="_blank" rel="noopener noreferrer">DIY GraphQL BaaS</a></p>
                </div>
              </div>
              <div className='col-md-4 col-sm-4 col-xs-12'>
                <div className='footerLinks'>
                  <h4>Community</h4>
                  <p className='pSmall'><a href="https://hasura.io/community/">Community Resources</a></p>
                  <p className='pSmall'><a href="https://hasura.io/learn/" target="_blank" rel="noopener noreferrer" aria-label="GraphQL Tutorial">GraphQL Tutorial</a></p>
                  <p className='pSmall'><a href="https://github.com/hasura/graphql-engine/wiki" target="_blank" rel="noopener noreferrer" aria-label="Community wiki">Community Wiki</a></p>
                  <p className='pSmall'><a href="https://hasura.io/sample-apps/" target="_blank" rel="noopener noreferrer">Sample Apps</a></p>
                  <p className='pSmall'><a href="https://graphql.asia/" target="_blank" rel="noopener noreferrer" aria-label="GraphQL asia">GraphQL Asia</a></p>
                </div>
              </div>
            </div>
            <div className='clearBoth'>
              <div className='col-md-4 col-sm-4 col-xs-12'>
                <div className='footerLinks'>
                  <h4>Hasura</h4>
                  <p className='pSmall'><a href="https://hasura.io/about/" target="_blank" rel="noopener noreferrer">About Us</a></p>
                  <p className='pSmall'><a href="https://hasura.io/careers/" target="_blank" rel="noopener noreferrer">Careers</a></p>
                  <p className='pSmall'><a href="https://github.com/hasura/graphql-engine/tree/master/assets/brand" target="_blank" rel="noopener noreferrer" aria-label="Brand assets">Brand Assets</a></p>
                  <p className='pSmall'><a href="https://hasura.io/getintouch/" target="_blank" rel="noopener noreferrer">Contact Us</a></p>
                  <p className='pSmall'><a href="https://hasura.io/legal/" target="_blank" rel="noopener noreferrer">Legal Stuff</a></p>
                </div>
              </div>
              <div className='col-md-4 col-sm-4 col-xs-12'>
                <div className='footerLinks'>
                  <h4>Support</h4>
                  <p className='pSmall'><a href="https://hasura.io/docs/" target="_blank" rel="noopener noreferrer" aria-label="Documentation">Documentation</a></p>
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
              <MailchimpSubscribe
                url={url}
                render={({ subscribe, status }) => (
                  <MailchimpForm onSubmitted={formData => subscribe(formData)}
                  status = {status}
                  />
                )}
              />
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
