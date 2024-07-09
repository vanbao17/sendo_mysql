import classNames from 'classnames/bind';
import styles from './ContainerCateSiteMap.module.scss';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function ItemSiteMap({ data }) {
    const [state, setState] = useState(null);
    const [danhmuc3, setDanhmuc3] = useState([]);

    useEffect(() => {
        if (state !== null) {
            fetch(`https://sdvanbao17.id.vn/api/v1/danhmuc3withdm2/${state}`)
                .then((rs) => rs.json())
                .then((dt) => setDanhmuc3(dt))
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [state]);

    return (
        <div className={cx('wrapper_item')}>
            <div className={cx('list_item')}>
                {data.length !== 0 ? (
                    data.map((it) => (
                        <div
                            key={it.madm2}
                            className={cx('item_cate')}
                            onClick={() => {
                                setState(it.madm2);
                            }}
                        >
                            <div className={cx('title')}>{it.tendm2}</div>
                        </div>
                    ))
                ) : (
                    <></>
                )}
            </div>
            <ul className={cx(danhmuc3.length !== 0 ? 'drop_box' : '')}>
                {danhmuc3.length !== 0 ? (
                    danhmuc3.map((it) => (
                        <li key={it.madm3}>
                            {' '}
                            {/* Thêm key cho các phần tử lặp lại */}
                            <a href="#"> {it.tendm3}</a>
                        </li>
                    ))
                ) : (
                    <></>
                )}
            </ul>
        </div>
    );
}

export default ItemSiteMap;
