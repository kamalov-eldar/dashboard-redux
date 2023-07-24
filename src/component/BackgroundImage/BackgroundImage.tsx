import { FC, useEffect, useState } from 'react';
//import Skeleton from '@mui/material/Skeleton';
import style from './BackgroundImage.module.scss';

/* const BackgroundImage: React.FC = () => {
    return <div className={style.background} style={{ backgroundImage: `url(https://bing.ioliu.cn/v1/rand?w=1920&h=1920)` }}></div>;
}; */

export const BackgroundImage: FC = () => {
    const [url, setUrl] = useState('');
    console.log('url: ', url);
    useEffect(() => {
        fetch(`https://bing.ioliu.cn/v1/rand?w=1920&h=1920`)
            .then((response) => response.blob())
            .then((image) => {
                setUrl(URL.createObjectURL(image));
            });
    }, []);

    /*  if (!url) {
        return (
            <div style={{ paddingTop: '76.5%' }}>Skeleton</div>
        );
    } */

    return (
        <div className={style.background} /* style={{ backgroundImage: `url(${url}` }} */>
            <img src={url} />
        </div>
    );
    /*  <img src={url} />; */
};
