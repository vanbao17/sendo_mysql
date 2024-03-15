import classNames from 'classnames/bind';
import styles from './ItemFilter.module.scss';
import { useState } from 'react';
const cx = classNames.bind(styles);
function ItemFillterClick({ data }) {
    const [stateItem, setstateItem] = useState(false);
    return (
        <div
            onClick={() => {
                setstateItem(!stateItem);
            }}
            className={cx('item', stateItem == true ? 'active' : '')}
        >
            <p>Dưới 70k</p>
        </div>
    );
}

export default ItemFillterClick;
