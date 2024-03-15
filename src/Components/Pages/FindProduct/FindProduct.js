import classNames from 'classnames/bind';
import styles from './FindProduct.module.scss';
import ListItemFilter from './ItemFilter/ListItemFilter';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTicket } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Products from '../../Products/Products';
const cx = classNames.bind(styles);
function FindProduct() {
    const [dataProds, setdataProds] = useState(JSON.parse(localStorage.getItem('dataProdsShop')));
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
                <div className={cx('contentRight')}>
                    <div className={cx('sort')}>
                        <span>Sắp xếp theo:</span>
                        <Popup
                            trigger={
                                <div className={cx('inputSort')}>
                                    <span>
                                        Đề cử
                                        <FontAwesomeIcon className={cx('icon')} icon={faChevronDown} />
                                    </span>
                                </div>
                            }
                            position="bottom center"
                        >
                            <div className={cx('drop_down_input_sort')}>
                                <div className={cx('listSort')}>
                                    <span className={cx('item', 'active')}>
                                        Đề cử <FontAwesomeIcon icon={faTicket} />
                                    </span>
                                    <span className={cx('item')}>Bán chạy</span>
                                    <span className={cx('item')}>Khuyến mãi</span>
                                    <span className={cx('item')}>Đánh giá tốt</span>
                                </div>
                            </div>
                        </Popup>
                    </div>
                    <Products data={dataProds} notbutton />
                </div>
            </div>
        </div>
    );
}

export default FindProduct;
