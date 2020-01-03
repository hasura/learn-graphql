import PropTypes from 'prop-types';
import React from 'react';
import '../styles/styles.scss';

class CommonNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isMouseOver: false, currentHoverElement: null };
  }
  onMouseOver(name, e) {
    console.log("Name: " + name);
    console.log(e);
    e.preventDefault();
    this.setState({ isMouseOver: true, currentHoverElement: name });
  }

  onMouseOut(e) {
    e.preventDefault();
    this.setState({ isMouseOver: false, currentHoverElement: null });
  }
  render() {
    const {id, navTitle, title, description, commonTutorial} = this.props;
    return (
      <li className="dropdown">
        <div className='upArrow'>
        </div>
        {/* eslint-disable-next-line */}
        <button type="button" id={id} className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{navTitle}</button>
        <div aria-labelledby="frontend" className="dropdown-menu dropdownMenu">
          <div className='col-md-6 col-sm-6 col-xs-12 noPadd'>
            <div className='menuTitle'>
              {title}
            </div>
            <div className='greenLineSeperatorlight'>
            </div>
            <div className='sectionDescription'>
              {description}
            </div>
          </div>
          <div className='col-md-6 col-sm-6 col-xs-12 noPadd'>
            <ul className='dropdownUl'>
              {commonTutorial.map((item, key) => {
                if(!item.comingSoon) {
                  return (
                    <a key={item.url} href={item.url} target='_blank' rel="noopener noreferrer">
                      <li
                        onMouseOver={this.onMouseOver.bind(this, item.name)}
                        onMouseOut={this.onMouseOut.bind(this)}
                        className={((this.state.isMouseOver && this.state.currentHoverElement === item.name) ? 'hoverLi' : '')}
                        >
                          <img
                            src={((this.state.isMouseOver && this.state.currentHoverElement === item.name) ? item.hoverImgSrc : item.baseImgSrc)}alt={item.name}
                          />{item.name}
                      </li>
                    </a>
                  );
                } else {
                  return (
                    <li key={item.url} className={'displayFlex comingSoonHover'}>
                    <img
                      src={item.baseImgSrc}alt={item.name}
                    />{item.name} <div className='circle'></div> <span>Coming soon</span>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      </li>
    );
  }
}

CommonNavBar.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  navTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  commonTutorial: PropTypes.array.isRequired,
}

export default CommonNavBar;
