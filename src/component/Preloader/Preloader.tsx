import React from 'react';

import preloader from '../../img/loading.gif';
import style from './Style/Preloader.module.scss';

const Preloader: React.FC = () => {
  return (
    <div className={style.container}>
      <img src={preloader} className={style.preloader} />
    </div>
  );
};
export default Preloader;
