import styles from './SizesBtn.js.module.scss';
import classNames from 'classnames/bind';
import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);
function SizesBtn({ data }) {
    const [active, setactive] = useState(null);
    const arr = [1, 2, 3, 4, 5];
    function handle(index) {
        setactive(index);
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('displaySize')}>
                <p>Chọn Size</p>
                <p></p>
            </div>
            {arr.map((item, index) => {
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

export default SizesBtn;
