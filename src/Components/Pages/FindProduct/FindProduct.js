import classNames from 'classnames/bind';
import styles from './FindProduct.module.scss';
import ListItemFilter from './ItemFilter/ListItemFilter';
const cx = classNames.bind(styles);
function FindProduct() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('titlePage')}>
                <div className={cx('pathWeb')}>
                    <span>
                        <a href="#"> Sendo.vn</a> / Giày dép
                    </span>
                </div>
                <div className={cx('titleResult')}>
                    <span className={cx('title')}>Giày dép</span>
                    <span className={cx('result')}>Tìm thấy hơn 10.000 sản phẩm</span>
                </div>
            </div>
            <div className={cx('contentPage')}>
                <div className={cx('contentLeft')}>
                    <ListItemFilter />
                </div>
                <div className={cx('contentRight')}></div>
            </div>
        </div>
    );
}

export default FindProduct;
