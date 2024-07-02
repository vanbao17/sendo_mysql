import { faAdd, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './ItemFilter.module.scss';
import { useEffect, useState } from 'react';
import ItemFilterClick from './ItemFilterClick';
import ItemColor from './ItemColor';
const cx = classNames.bind(styles);
function ItemFilter({ attributeId, title, attribute }) {
    const [stateButton, setstateButton] = useState(false);
    const [dropDownState, setdropDownState] = useState(true);
    const [dataItemFilters, setdataItemFilters] = useState([]);
    const [indexSliceData, setindexSliceData] = useState(5);
    const handleItemFilter = () => {
        setdropDownState(!dropDownState);
    };
    useEffect(() => {
        fetch('https://sdvanbao17.id.vn/api/v1/getAttributeValues/' + attributeId)
            .then((response) => response.json())
            .then((data) => setdataItemFilters(data))
            .catch((err) => {
                if (err) throw err;
            });
    }, [attributeId]);
    const sliceData = dataItemFilters.slice(0, indexSliceData);

    return (
        <div className={cx('wrapperItem')}>
            <div className={cx('item')}>
                <span>{title}</span>
                <span className={cx('icon')} onClick={handleItemFilter}>
                    <FontAwesomeIcon icon={dropDownState == true ? faChevronUp : faChevronDown} />
                </span>
            </div>
            <hr></hr>

            {dropDownState == true && attribute == 'checkBox' ? (
                <>
                    {sliceData.map((item, index) => {
                        return (
                            <div className={cx('containerCheckbox')}>
                                <div className={cx('checkBox')}>
                                    <div className={cx('filter1')}>
                                        <div className={cx('titleFilter')}>
                                            <input type="checkbox" />
                                            <span>{item.value}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    {dataItemFilters.length >= 5 ? (
                        <button
                            className={cx('seeMore')}
                            onClick={() => {
                                setstateButton(!stateButton);
                                if (stateButton == false) {
                                    setindexSliceData(dataItemFilters.length);
                                } else {
                                    setindexSliceData(5);
                                }
                            }}
                        >
                            <span>
                                <FontAwesomeIcon icon={faAdd} />
                                Xem thêm
                            </span>
                        </button>
                    ) : (
                        <></>
                    )}
                </>
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
                        {sliceData.map((item, index) => {
                            return <ItemFilterClick key={index} value={item.value} />;
                        })}
                    </div>
                    {dataItemFilters.length >= 5 ? (
                        <button
                            className={cx('seeMore')}
                            onClick={() => {
                                setstateButton(!stateButton);
                                if (stateButton == false) {
                                    setindexSliceData(dataItemFilters.length);
                                } else {
                                    setindexSliceData(5);
                                }
                            }}
                        >
                            <span>
                                <FontAwesomeIcon icon={faAdd} />
                                Xem thêm
                            </span>
                        </button>
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                <></>
            )}
            {dropDownState == true && attribute == 'filterColor' ? (
                <div className={cx('containerInput')}>
                    <div className={cx('list_Item_Color')}>
                        {sliceData.map((item, index) => {
                            return <ItemColor color={item.value} />;
                        })}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default ItemFilter;
