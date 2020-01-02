import React from 'react';
import '../styles/styles.scss';
import Header from '../components/Header';
import TopBanner from '../components/TopBanner';
import Featured from '../components/Featured';
import FrontendTutorials from '../components/FrontendTutorials';
import HasuraTutorials from '../components/HasuraTutorials';
// import WillLearn from '../components/WillLearn';
// import SubscribeNewsletter from '../components/SubscribeNewsletter';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
class Index extends React.Component {
  render() {
    return (
      <div className="wd100">
        <Header/>
        <TopBanner/>
        <FrontendTutorials/>
        <HasuraTutorials/>
        <Testimonials/>
        <Featured/>
        <Footer/>
      </div>
    );
  }
}


export default Index;
