import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class IconHover extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isMouseOver: false };
  }
  onMouseOver(e) {
    e.preventDefault();
    this.setState({isMouseOver: true});
  }

  onMouseOut(e) {
    e.preventDefault();
    this.setState({isMouseOver: false});
  }
  render() {
    const styles = require('../LandingPage/Styles.scss');
    const {baseImgSrc, hoverImgSrc, socialLink, altText} = this.props;
    const { isMouseOver } = this.state;
    const imageSrc = isMouseOver ? hoverImgSrc : baseImgSrc;

    return (
      <div className={styles.socialBrands}>
      {
        (baseImgSrc === 'mail') ? (
          <a href={socialLink} rel="noopener noreferrer" aria-label={altText}>
              <img
                onMouseOver={this.onMouseOver.bind(this)}
                onMouseOut={this.onMouseOut.bind(this)} src={imageSrc} alt={altText}/>
          </a>
        ) : (
          <a href={socialLink} target={'_blank'} rel="noopener noreferrer" aria-label={altText}>
              <img
                onMouseOver={this.onMouseOver.bind(this)}
                onMouseOut={this.onMouseOut.bind(this)} src={imageSrc} alt={altText}/>
          </a>
        )
      }
      </div>
    );
  }
}
IconHover.propTypes = {
  baseImgSrc: PropTypes.string.isRequired,
  hoverImgSrc: PropTypes.string.isRequired,
  socialLink: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};
export default connect()(IconHover);
