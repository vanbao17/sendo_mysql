import classNames from 'classnames/bind';
import styles from './ItemFilter.module.scss';
import { useState } from 'react';
const cx = classNames.bind(styles);
function ItemColor() {
    const [stateItem, setstateItem] = useState(false);
    return (
        <div
            onClick={() => {
                setstateItem(!stateItem);
            }}
            className={cx('containerItem', stateItem == true ? 'active' : '')}
        >
            <div className={cx('itemColor')} style={{ backgroundColor: 'red' }}></div>
        </div>
    );
}

export default ItemColor;
