import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './ItemFilter.module.scss';
const cx = classNames.bind(styles);
function ItemFilter() {
    return (
        <div className={cx('wrapperItem')}>
            <div className={cx('item')}>
                <span>item</span>
                <span className={cx('icon')}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </span>
            </div>
            <hr></hr>
            <div className={cx('dropdown')}></div>
        </div>
    );
}

export default ItemFilter;
