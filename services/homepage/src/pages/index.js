import React from 'react';
import '../styles/styles.scss';
// import Header from '../components/Header';
import TopBanner from '../components/TopBanner';
import IntroductionGraphql from '../components/IntroductionGraphql';
import FrontendTutorials from '../components/FrontendTutorials';
import HasuraTutorials from '../components/HasuraTutorials';
import HasuraConBanner from '../components/hasuraconbanner'
// import WillLearn from '../components/WillLearn';
// import SubscribeNewsletter from '../components/SubscribeNewsletter';
import Discord from '../components/Discord';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
class Index extends React.Component {
  render() {
    return (
      <div className="wd100">
        {/* <Header/> */}
        <TopBanner/>
        <IntroductionGraphql/>
        <HasuraTutorials/>
        <FrontendTutorials/>
        <Discord/>
        <Testimonials/>
        {/* <Featured/> */}
        <HasuraConBanner/>
        <Footer/>
      </div>
    );
  }
}


export default Index;
