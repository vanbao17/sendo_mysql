import { faAdd, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './ItemFilter.module.scss';
import { useState } from 'react';
import ItemFilterClick from './ItemFilterClick';
import ItemColor from './ItemColor';
const cx = classNames.bind(styles);
function ItemFilter({ title, attribute }) {
    const [dropDownState, setdropDownState] = useState(true);
    const [filter1State, setfilter1State] = useState(false);
    const [filter2State, setfilter2State] = useState(false);
    const handleItemFilter = () => {
        setdropDownState(!dropDownState);
    };
    const handleItem1Filter = () => {
        setfilter1State(!filter1State);
    };
    const handleItem2Filter = () => {
        setfilter2State(!filter2State);
    };
    return (
        <div className={cx('wrapperItem')}>
            <div className={cx('item')}>
                <span>{title}</span>
                <span className={cx('icon')} onClick={handleItemFilter}>
                    <FontAwesomeIcon icon={dropDownState == true ? faChevronUp : faChevronDown} />
                </span>
            </div>
            <hr></hr>
            {dropDownState == true && attribute == 'dropDown' ? (
                <div className={cx('dropdown')}>
                    <a href="#">Về tất cả các danh mục</a>
                    <div className={cx('filter1')}>
                        <div className={cx('titleFilter')}>
                            <FontAwesomeIcon
                                onClick={handleItem1Filter}
                                className={cx('filterIcon')}
                                icon={filter1State == false ? faChevronDown : faChevronUp}
                            />
                            <span>Điện thoại máy tính</span>
                        </div>
                        {filter1State == true ? (
                            <div className={cx('filter2')}>
                                <div className={cx('titleFilter2')}>
                                    <FontAwesomeIcon
                                        onClick={handleItem2Filter}
                                        className={cx('filterIcon')}
                                        icon={filter2State == false ? faChevronDown : faChevronUp}
                                    />
                                    <span>Điện thoại máy tính</span>
                                </div>
                                {filter2State == true ? (
                                    <div className={cx('filter3')}>
                                        <span>Điện thoại máy tính</span>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            ) : (
                <></>
            )}
            {dropDownState == true && attribute == 'checkBox' ? (
                <div className={cx('containerCheckbox')}>
                    <div className={cx('checkBox')}>
                        <div className={cx('filter1')}>
                            <div className={cx('titleFilter')}>
                                <input type="checkbox" />
                                <span>Điện thoại máy tính</span>
                            </div>
                        </div>
                    </div>
                    <button className={cx('seeMore')}>
                        <span>
                            <FontAwesomeIcon icon={faAdd} />
                            Xem thêm
                        </span>
                    </button>
                </div>
            ) : (
                <></>
            )}
            {dropDownState == true && attribute == 'inputFilter' ? (
                <div className={cx('containerInput')}>
                    <form className={cx('input_Form_Price')}>
                        <div className={cx('container')}>
                            <div className={cx('container_smallest')}>
                                <label for="price_Smallest">Thấp nhất</label>
                                <input
                                    type="text"
                                    id="price_Smallest"
                                    name="price_Smallest"
                                    className={cx('price_Smallest')}
                                ></input>
                            </div>
                            <div className={cx('container_largest')}>
                                <label for="price_Lagest">Cao nhất</label>
                                <input
                                    type="text"
                                    id="price_Lagest"
                                    name="price_Lagest"
                                    className={cx('price_Lagest')}
                                ></input>
                            </div>
                        </div>
                        <button type="submit" className={cx('input_submit')}>
                            <span>Áp dụng</span>
                        </button>
                    </form>
                    <div className={cx('list_filter')}>
                        <ItemFilterClick />
                    </div>

                    <button className={cx('seeMore')}>
                        <span>
                            <FontAwesomeIcon icon={faAdd} />
                            Xem thêm
                        </span>
                    </button>
                </div>
            ) : (
                <></>
            )}
            {dropDownState == true && attribute == 'filterColor' ? (
                <div className={cx('containerInput')}>
                    <div className={cx('list_Item_Color')}>
                        <ItemColor />
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default ItemFilter;
