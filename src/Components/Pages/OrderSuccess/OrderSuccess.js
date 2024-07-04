import classNames from 'classnames/bind';
import styles from './OrderSuccess.module.scss';
const cx = classNames.bind(styles);
function OrderSuccess() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>OrderSuccess</div>
        </div>
    );
}

export default OrderSuccess;
