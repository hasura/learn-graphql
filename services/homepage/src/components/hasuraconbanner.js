import React from "react"
// import PropTypes from "prop-types"
import { trackGAEvents } from "./trackGA";
import '../styles/styles.scss';
const bannerHasCon = require('../images/banner-hasura-con.svg');
const bannerFrame = require('../images/banner-frame.svg');
const HasuraConBanner = ({trackEvent}) => {
  return (
    <section className="commonSectionWrapper hasuraConBannerBgColor topBannerWrapperHasuraConRel">
      <div className="container noPadd">
        <div className='topBannerWrapperHasuraCon'>
          <div className='col-md-6 col-sm-7 col-xs-12 noPadd'>
            <div className='frameCon'>
              <img src={bannerHasCon} alt='Hasuracon20'/>
            </div>
            <h2 className='pageHeader'>We’re hosting our first user conference!</h2>
            <div className='sectionDescription removePaddTop'>Join us for a week of online talks, live workshops & Q&As as we push the boundaries of GraphQL forward!</div>
            <div className='buttonWrapper'>
              <a onClick={()=>trackGAEvents("Learn Homepage", "Button Click", "Hasura Con Learn More")} href="https://hasura.io/events/hasura-con-2020/"><button className='commonBtn hasuraConRegBtn'>Register</button></a>
            </div>
          </div>
        </div>
      </div>
      <div className='bannerFrameImg'>
        <img src={bannerFrame} alt='Pattern'/>
      </div>
    </section>
  )
}

export default HasuraConBanner
