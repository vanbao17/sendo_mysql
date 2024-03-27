import classNames from 'classnames/bind';
import styles from './ItemFilter.module.scss';
import { useState } from 'react';
const cx = classNames.bind(styles);
function ItemFillterClick({ value }) {
    const [stateItem, setstateItem] = useState(false);
    return (
        <div
            onClick={() => {
                setstateItem(!stateItem);
            }}
            className={cx('item', stateItem == true ? 'active' : '')}
        >
            <p>{value}</p>
        </div>
    );
}

export default ItemFillterClick;
