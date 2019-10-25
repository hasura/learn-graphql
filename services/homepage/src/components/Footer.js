import React from 'react';
import SubscribeFrom from 'react-mailchimp-subscribe';
import '../styles/styles.scss';

const formProps = {
  action: '//hasura.us13.list-manage.com/subscribe/post?u=9b63e92a98ecdc99732456b0e&amp;id=f5c4f66bcf',
  messages: {
    inputPlaceholder: 'Your E-mail Address',
    btnLabel: 'SUBSCRIBE',
    sending: 'Subscribing...',
    success: 'Thank you for subscribing!',
    error: 'Invalid email or you have already subscribed for the newsletter'
  },
  styles: {
    sending: {
      fontSize: '15px',
      paddingTop: '10px',
      color: '#ccc'
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

const FooterLinks = ({ href, text }) => (
  <div className='footer_links'>
    <a href={href} target="_blank" rel="noopener noreferrer">{text}</a>
  </div>
);

const SocialIcons = ({ href, label, icon }) => (
  <div className='social_icons'>
    <a href={href} target='_blank' rel="noopener noreferrer" aria-label={label}>
      <i className={icon} aria-hidden="true"/>
    </a>
  </div>
)

const Footer = () => {
  const blueLamda = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/Hasura.svg';
  return (
    <footer id="footer" ref="footer" className='darkGrayBgColor commonSectionWrapper wd100'>
        <div className='container noPadd'>
          <div className='footer_wrapper'>
            <div className='col-md-2  col-sm-12 col-xs-12'>
              <div className='logo_icon'>
                <img className='img-responsive' src={blueLamda} alt='Lamda Icon' />
              </div>
            </div>
            <div className='col-md-2  col-sm-12 col-xs-12'>
              <div className='footer_section'>
                <div className='footer_header'>
                  RESOURCES
                </div>
                <FooterLinks href="https://blog.hasura.io/" text="Blog" />
                <FooterLinks href="https://learn.hasura.io/" text="GraphQL Tutorials" />
                <FooterLinks href="https://hasura.io/community" text="Community & Events" />
                <FooterLinks href="https://3factor.app/" text="3factor apps" />
                <FooterLinks href="https://hasura.io/diy-graphql-baas/" text="DIY GraphQL BaaS" />
                <FooterLinks href="https://firebase2graphql.com/" text="Firebase to GraphQL" />
                <FooterLinks href="https://hasura.io/sample-apps/" text="Sample Apps" />
                <FooterLinks href="https://hasura.io/3factor-radio/" text="3factor Radio" />
                <FooterLinks href="https://hasura.io/vue-graphql" text="Vue GraphQL" />
                <FooterLinks href="https://hasura.io/react-graphql/" text="React GraphQL" />
                <FooterLinks href="https://www.graphql-asia.org/" text="GraphQL Asia" />
              </div>
            </div>
            <div className='col-md-2  col-sm-12 col-xs-12'>
              <div className='footer_section'>
                <div className='footer_header'>
                  INFO
                </div>
                <FooterLinks href="https://hasura.io/about/" text="About Us" />
                <FooterLinks href="https://hasura.io/careers/" text="Careers" />
                <FooterLinks href="https://hasura.io/getintouch/" text="Get In Touch" />
                <FooterLinks href="https://hasura.io/legal/" text="Legal Stuff" />
                <FooterLinks href="https://github.com/hasura/graphql-engine/blob/master/assets/brand/" text="Brand Assets" />
                <FooterLinks href="https://hasura.io/enterprise/" text="Enterprise" />
              </div>
            </div>
            <div className='col-md-5  col-sm-12 col-xs-12 noPadd'>
              <div className='footer_section'>
                <div className='footer_header'>
                  FOLLOW US
                </div>
                <div className='footer_social_wrapper'>
                  <SocialIcons href="https://www.facebook.com/HasuraHQ/" label="Follow us on Facebook" icon="fab fa-facebook"/>
                  <SocialIcons href="https://twitter.com/hasurahq/" label="Follow us on Twitter" icon="fab fa-twitter"/>
                  <SocialIcons href="https://www.instagram.com/hasurahq/" label="Follow us on Instagram" icon="fab fa-instagram"/>
                  <SocialIcons href="https://discord.gg/hasura/" label="Chat with us on Discord" icon="fab fa-discord"/>
                  <SocialIcons href="https://github.com/hasura/graphql-engine/" label="Follow us on GitHub" icon="fab fa-github"/>
                  <SocialIcons href="https://www.twitch.tv/hasuraHQ/" label="Follow us on Twitch" icon="fab fa-twitch"/>
                  <SocialIcons href="https://www.youtube.com/channel/UCZo1ciR8pZvdD3Wxp9aSNhQ" label="Follow us on Youtube" icon="fab fa-youtube"/>
                </div>
                <div className='footer_header'>
                  Join Our Mailing List
                </div>
                <div className='footer_email'>
                  <SubscribeFrom className="subscribe_form subscribe_form3" {...formProps}/>
                </div>
              </div>
            </div>
          </div>
          <div className='copy_text'>
            © 2019 Hasura Inc. All rights reserved
          </div>
        </div>
      </footer>
  );
}

export default Footer;
