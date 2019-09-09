import React from 'react';

import './Ads.scss';

import rekl1 from './rekl-1-left.png';
import rekl2 from './rekl-2.png';
import rekl3 from './rekl-3.png';
import rekl4 from './rekl-4.gif';

export const AdLeftCol = () => (
  <div className="rekl-left rekl-wrapper">
    <img src={rekl1} alt="reklama" width={150} />
    <img src={rekl2} alt="reklama" width={150} />
  </div>
);

export const AdRightCol = () => (
  <div className="rekl-right rekl-wrapper">
    <img src={rekl3} alt="reklama" width={150} />
    <img src={rekl4} alt="reklama" width={150} />
  </div>
);
