import classNames from 'classnames/bind';
import styles from './ItemFilter.module.scss';
import ItemFilter from './ItemFilter';
import { useEffect, useState } from 'react';
import { faAdd, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from './Dropdown';
const cx = classNames.bind(styles);
function ListItemFilter({ madm1 }) {
    const [dataFilters, setdataFilters] = useState([]);
    const [dropDownState, setdropDownState] = useState(true);
    const [filter1State, setfilter1State] = useState(true);
    const [filter2State, setfilter2State] = useState(false);
    const [dm1, setdm1] = useState([]);
    // useEffect(()=>{
    //     fetch('')
    // },[attributeId])
    const handleItemFilter = () => {
        setdropDownState(!dropDownState);
    };
    const handleItem1Filter = () => {
        setfilter1State(!filter1State);
    };
    // const handleItem2Filter = () => {
    //     setfilter2State(!filter2State);
    // };
    useEffect(() => {
        fetch(`https://sdvanbao17.id.vn/api/v1/tim-kiem/${madm1}`)
            .then((response) => response.json())
            .then((data) => setdataFilters(data))
            .catch((err) => {
                if (err) throw err;
            });
    }, []);
    const danhmuc1 = JSON.parse(localStorage.getItem('danhmuc1'));
    const listdanhmuc2 = JSON.parse(localStorage.getItem('danhmuc2'));
    return (
        <div className={cx('listItem')}>
            <div className={cx('wrapperItem')}>
                <div className={cx('item')}>
                    <span>Danh mục</span>
                    <span className={cx('icon')} onClick={handleItemFilter}>
                        <FontAwesomeIcon icon={dropDownState == true ? faChevronUp : faChevronDown} />
                    </span>
                </div>
                <hr></hr>

                {dropDownState == true ? (
                    <div className={cx('dropdown')}>
                        <a href="#">Về tất cả các danh mục</a>
                        <div className={cx('filter1')}>
                            <div className={cx('titleFilter')}>
                                <FontAwesomeIcon
                                    onClick={handleItem1Filter}
                                    className={cx('filterIcon')}
                                    icon={filter1State == false ? faChevronDown : faChevronUp}
                                />
                                {danhmuc1.map((item, index) => {
                                    if (item.madm1 == madm1) {
                                        return <span key={index}>{item.tendm1}</span>;
                                    }
                                })}
                            </div>
                            {filter1State == true ? (
                                <div className={cx('filter2')}>
                                    {listdanhmuc2.map((itemdm2, index) => {
                                        if (itemdm2.madm1 == madm1) {
                                            return <Dropdown itemdm2={itemdm2} dm1Id={madm1} />;
                                        }
                                    })}
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>

            {dataFilters.map((itemFilter, index) => {
                return (
                    <ItemFilter
                        key={index}
                        attributeId={itemFilter.attribute_id}
                        title={itemFilter.attribute_name}
                        attribute={itemFilter.type_name}
                    ></ItemFilter>
                );
            })}
            {/* {dataFake.map((item, index) => {
                return <ItemFilter key={index} title={item.name} attribute={item.attribute}></ItemFilter>;
            })} */}
        </div>
    );
}

export default ListItemFilter;
