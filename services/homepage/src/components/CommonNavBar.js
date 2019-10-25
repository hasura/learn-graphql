import PropTypes from 'prop-types';
import React from 'react';
import '../styles/styles.scss';

const CommonNavBar = ({ id, navTitle, title, description, commonTutorial}) => {
  const dropPath = 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/dropdown-path.svg';
  return (
    <li className="dropdown">
      <div className='upArrow'>
      </div>
      {/* eslint-disable-next-line */}
      <button type="button" id={id} className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{navTitle}</button>
      <div aria-labelledby="frontend" className="dropdown-menu dropdownMenu">
        <div className='dropdownMenuBgImg'>
          <img className='img-responsive' src={dropPath} alt='dropPath' />
        </div>
        <div className='col-md-6 col-sm-6 col-xs-12'>
          <div className='menuTitle'>
            {title}
          </div>
          <div className='purpleLineSeperator'>
          </div>
          <div className='sectionDescription'>
            {description}
          </div>
        </div>
        <div className='col-md-6 col-sm-6 col-xs-12'>
          <ul className='dropdownUl'>
            {commonTutorial.map((item, key) => {
              if(!item.comingSoon) {
                return (
                  <a href={item.url} target='_blank' rel="noopener noreferrer">
                    <li key={item.url} className={item.bgClassName}>
                        {item.name}
                    </li>
                  </a>
                );
              } else {
                return (
                  <li key={item.url} className={item.disableBgClassName + ' displayFlex comingSoonHover'}>
                    {item.name} <div className='circle'></div> <span>Coming soon</span>
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

CommonNavBar.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  navTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  commonTutorial: PropTypes.array.isRequired,
}

export default CommonNavBar;
