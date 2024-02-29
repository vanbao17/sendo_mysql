import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ColorsBtn.module.scss';
import { useState } from 'react';
const cx = classNames.bind(styles);
function ColorsBtn({ dataColor, imgs }) {
    const [active, setactive] = useState(null);
    const arr = ['A01 Đen', 'A01 Trắng', 'A01 Đỏ'];
    function handle(index) {
        setactive(index);
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('displaySize')}>
                <p>Chọn Màu</p>
                <p></p>
            </div>
            {dataColor &&
                arr.map((item, index) => {
                    return (
                        <button
                            key={index}
                            onClick={() => {
                                handle(index);
                            }}
                            className={cx(index == active ? 'active' : '')}
                        >
                            <span className={cx('choseSize')}>{item}</span>
                        </button>
                    );
                })}
        </div>
    );
}

export default ColorsBtn;
