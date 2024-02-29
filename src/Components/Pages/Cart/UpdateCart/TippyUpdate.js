import classNames from 'classnames/bind';
import styles from './TippyUpdate.module.scss';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
const cx = classNames.bind(styles);

function TippyUpdate({ size = 38, color = 'hehe', data }) {
    const dt = {
        size: [38, 39, 40, 41, 42, 43],
        img: [
            'https://media3.scdn.vn/img4/2021/10_02/hGEdcm2CoPwpLTbEkUXg_simg_02d57e_50x50_maxb.jpg',
            'https://media3.scdn.vn/img4/2021/10_02/hGEdcm2CoPwpLTbEkUXg_simg_02d57e_50x50_maxb.jpg',
            'https://media3.scdn.vn/img4/2021/10_02/hGEdcm2CoPwpLTbEkUXg_simg_02d57e_50x50_maxb.jpg',
            'https://media3.scdn.vn/img4/2021/10_02/hGEdcm2CoPwpLTbEkUXg_simg_02d57e_50x50_maxb.jpg',
        ],
    };
    const [dtupdate, setdtupdate] = useState({ size: size, color: color });
    const [active, setactive] = useState(null);
    const [active1, setactive1] = useState(null);
    function handleClickBtn(index, item) {}
    return (
        <div className={cx('container-update')}>
            <div className={cx('size')}>
                <span className={cx('title')}>
                    Chọn kích thước:<strong>42</strong>
                </span>
                <div className={cx('list-sizes')}>
                    {dt.size.map((item, index) => {
                        return (
                            <button
                                key={index}
                                className={cx('item', active == index ? 'active' : '')}
                                onClick={() => {
                                    setactive(index);
                                    setdtupdate({ size: item, color: dtupdate.color });
                                }}
                            >
                                {item}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className={cx('color')}>
                <span className={cx('title')}>
                    Chọn màu sắc:<strong>A01 Đen</strong>
                </span>
                <div className={cx('list-colors')}>
                    {dt.img.map((item, index) => {
                        return (
                            <button
                                key={index}
                                className={cx('item-img', active1 == index ? 'active' : '')}
                                onClick={() => {
                                    setactive1(index);
                                    setdtupdate({ size: dtupdate.size, color: item });
                                }}
                            >
                                <img src={item} alt="img"></img>
                            </button>
                        );
                    })}
                </div>
            </div>
            <span className={cx('price')}>
                Đơn giá :<strong>23.000đ</strong>
            </span>
            <button
                className={cx('btn-update')}
                onClick={() => {
                    console.log(dtupdate);
                }}
            >
                <span>Cập nhật</span>
            </button>
        </div>
    );
}

export default TippyUpdate;
