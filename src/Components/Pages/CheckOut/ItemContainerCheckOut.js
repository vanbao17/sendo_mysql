import classNames from 'classnames/bind';
import styles from './CheckOut.module.scss';
const cx = classNames.bind(styles);
function ItemContainerCheckOut({ titleRight, titleLeft, children }) {
    return (
        <div className={cx('wrapper_item')}>
            <div className={cx('item_title')}>
                <div className={cx('item_title_left')}>{titleLeft}</div>
                <div className={cx('item_title_right')}>{titleRight}</div>
            </div>
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default ItemContainerCheckOut;
