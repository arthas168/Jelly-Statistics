import React from 'react';
import { NavLink } from 'react-router-dom';

import { FaAccessibleIcon, FaAccusoft, FaAddressBook, FaAdjust, FaAdobe } from 'react-icons/fa';

import './style.scss';
import { DEVICE_TYPES } from '../../constants';

const getContent = (deviceType) => {
  const isDesktop = deviceType === DEVICE_TYPES.DESKTOP;

  return {
    DASHBOARD: isDesktop ? 'Dashboard' : <FaAccessibleIcon />,
    LIQUIDITY: isDesktop ? 'Liquidity' : <FaAccusoft />,
    PROVIDERS: isDesktop ? 'Providers' : <FaAddressBook />,
    HISTORY: isDesktop ? 'History' : <FaAdjust />,
    REWARDS: isDesktop ? 'Rewards' : <FaAdobe />,
  };
};

export default ({ deviceType }) => {
  return (
    <div className='navbar'>
      <ul>
        <li>
          <NavLink activeClassName='selected' to='/' exact={true}>
            {getContent(deviceType).DASHBOARD}
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName='selected' to='/liquidity'>
            {getContent(deviceType).LIQUIDITY}
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName='selected' to='/providers'>
            {getContent(deviceType).PROVIDERS}
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName='selected' to='/history'>
            {getContent(deviceType).HISTORY}
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName='selected' to='/rewards'>
            {getContent(deviceType).REWARDS}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
