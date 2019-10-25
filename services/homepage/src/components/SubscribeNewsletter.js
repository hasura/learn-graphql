import React from 'react';
import SubscribeFrom from 'react-mailchimp-subscribe';
import '../styles/styles.scss';

// TODO: update list
const formProps = {
  action: '//hasura.us13.list-manage.com/subscribe/post?u=9b63e92a98ecdc99732456b0e&amp;id=f5c4f66bcf',
  messages: {
    inputPlaceholder: 'Your Email id here',
    btnLabel: 'SUBSCRIBE',
    sending: 'Subscribing...',
    success: 'Thank you for subscribing!',
    error: 'Invalid email or you have already subscribed for updates'
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
      color: '#fff'
    }
  }
};


const SubscribeNewsletter = () => {
  return (
    <section className='gradientBgColor commonSectionWrapper positionRel'>
      <div className='container noPadd'>
        <div className='topBannerWrapper col-md-12'>
          <div className='col-md-6 col-sm-12 col-xs-12 noPadd'>
            <h1 className='sectionHeader'>
              Subscribe to the Hasura newsletter
            </h1>
            <div className='sectionDescription'>
              Join the community mailing list to receive updates about the product, company and our OSS work.
            </div>
            {/*
            <div className='notifyWrapper'>
              <div className='sectionDescription notifyHeader'>
                Subscribe for updates
              </div>
              <SubscribeFrom className="notifyForm" {...formProps}/>
            </div>
            */}
          </div>
          <div className='col-md-6 col-sm-12 col-xs-12 noPadd'>
            <div className='notifyWrapper'>
              <SubscribeFrom className="notifyForm" {...formProps}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SubscribeNewsletter;
