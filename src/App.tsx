import React from 'react';
import { User } from './component/User/User';
import { Weather } from './component/Weather/Weather';
import { ToDo } from './component/ToDo/ToDo';
import { Clock } from './component/Clock/Clock';
import style from './style/App.module.scss';
import { BackgroundImage } from './component/BackgroundImage/BackgroundImage';

export const App: React.FC = () => {
    return (
        <div className={style.wrapper}>
            <BackgroundImage />
            <div className={style.dashboard + ' ' + 'container'}>
                <Weather />
                <div className={style.center__block}>
                    <Clock />
                    <User />
                </div>
                <ToDo />
            </div>
        </div>
    );
};


