import classNames from 'classnames/bind';
import styles from './ItemFilter.module.scss';
import ItemFilter from './ItemFilter';
import { useEffect, useState } from 'react';
import { faAdd, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from './Dropdown';
const cx = classNames.bind(styles);
function ListItemFilter({ madm1 = null, danhmuc = null }) {
    console.log(danhmuc);
    const [dataFilters, setdataFilters] = useState([]);
    const [dropDownState, setdropDownState] = useState(true);
    const [filter1State, setfilter1State] = useState(true);
    const [filter2State, setfilter2State] = useState(false);
    const [indexSliceData, setindexSliceData] = useState(5);
    const [stateButton, setstateButton] = useState(false);
    const [dm2, setdm2] = useState([]);
    const [dm1, setdm1] = useState([]);
    const [attrs, setAttrs] = useState([]);
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
        fetch(`https://sdvanbao17.id.vn/api/v1/getAllAttribute`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data !== undefined) {
                    setAttrs(data);
                }
            })
            .catch((rejected) => {
                console.log(rejected);
            });
        fetch(`https://sdvanbao17.id.vn/api/v1/danhmuc1`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data !== undefined) {
                    setdm1(data);
                }
            })
            .catch((rejected) => {
                console.log(rejected);
            });
        fetch('https://sdvanbao17.id.vn/api/v1/danhmuc2')
            .then((res) => res.json())
            .then((data) => setdm2(data))
            .catch((rejected) => {
                console.log(rejected);
            });
    }, []);
    useEffect(() => {
        if (danhmuc != null) {
            //định dạng lại cate
            const cate = danhmuc[0];
            if (cate.string_attributes != undefined) {
                const list_dm = cate.string_attributes.split('/');
                const list_dm_filter = list_dm.filter((dm) => dm != '');
                const list_dm_int = list_dm_filter.map((dm) => parseInt(dm));
                //lọc attribute
                const filter_attr = attrs.filter((attr) => list_dm_int.includes(attr.attribute_id));
                setAttrs(filter_attr);
                fetch(`https://sdvanbao17.id.vn/api/v1/tim-kiem/${danhmuc[0].madm1}`)
                    .then((response) => response.json())
                    .then((data) => setdataFilters(data))
                    .catch((err) => {
                        if (err) throw err;
                    });
            }
        }
    }, [danhmuc]);
    const danhmuc1 = JSON.parse(localStorage.getItem('danhmuc1'));
    const list_dm2 = dm2.filter((item) => {
        if (danhmuc != null) {
            return item.madm1 === danhmuc[0].madm1;
        }
    });

    const sliceData = dm2.slice(0, indexSliceData);
    console.log(danhmuc);
    return (
        <div className={cx('listItem')}>
            <div className={cx('wrapperItem')}>
                {danhmuc != null ? (
                    <div className={cx('item')}>
                        <span>Danh mục</span>
                        <span className={cx('icon')} onClick={handleItemFilter}>
                            <FontAwesomeIcon icon={dropDownState == true ? faChevronUp : faChevronDown} />
                        </span>
                    </div>
                ) : (
                    <></>
                )}

                <hr></hr>

                {dropDownState == true && danhmuc != null ? (
                    <div className={cx('dropdown')}>
                        <a href="/site-map">Về tất cả các danh mục</a>
                        <div className={cx('filter1')}>
                            <div className={cx('titleFilter')}>
                                <FontAwesomeIcon
                                    onClick={handleItem1Filter}
                                    className={cx('filterIcon')}
                                    icon={filter1State == false ? faChevronDown : faChevronUp}
                                />
                                {danhmuc1.map((item, index) => {
                                    if (item.madm1 == danhmuc[0].madm1) {
                                        return <span key={index}>{item.tendm1}</span>;
                                    }
                                })}
                            </div>
                            {filter1State == true ? (
                                <div className={cx('filter2')}>
                                    {sliceData.length != 0 ? (
                                        sliceData.map((itemdm2, index) => {
                                            if (itemdm2.madm1 == danhmuc[0].madm1) {
                                                return <Dropdown itemdm2={itemdm2} dm1Id={danhmuc[0].madm1} />;
                                            }
                                        })
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            ) : (
                                <></>
                            )}
                            {dm2.length >= 5 ? (
                                <button
                                    className={cx('seeMore')}
                                    onClick={() => {
                                        setstateButton(!stateButton);
                                        if (stateButton == false) {
                                            setindexSliceData(dm2.length);
                                        } else {
                                            setindexSliceData(5);
                                        }
                                    }}
                                >
                                    <span style={{ fontSize: '13px', padding: '0px', gap: '2px' }}>
                                        <FontAwesomeIcon icon={faAdd} />
                                        Xem thêm
                                    </span>
                                </button>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>

            {attrs.map((itemFilter, index) => {
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
