import classNames from 'classnames/bind';
import styles from './FindProduct.module.scss';
import ListItemFilter from './ItemFilter/ListItemFilter';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTicket } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Products from '../../Products/Products';
import { useLocation, useParams } from 'react-router-dom';
import slugify from 'slugify';
const cx = classNames.bind(styles);
function FindProduct() {
    const location = useLocation();
    const dataIdCate = location.state?.dt;
    const [prods, setprods] = useState([]);
    const [dm2, setdm2] = useState([]);
    const [dm, setdm] = useState([]);
    const [results, setResults] = useState([]);
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQuery();
    const { cateName } = useParams();
    const searchTerm = query.get('q');
    const convertToSlug = (text) => {
        return slugify(text, {
            lower: true, // Chuyển tất cả ký tự thành chữ thường
            remove: /[*+~.()'"!:@,]/g, // Loại bỏ các ký tự đặc biệt bao gồm dấu phẩy
            locale: 'vi', // Hỗ trợ ngôn ngữ tiếng Việt
        });
    };
    useEffect(() => {
        if (cateName != undefined) {
            fetch(`https://sdvanbao17.id.vn/api/v1/danhmuc1`)
                .then((response) => {
                    return response.json();
                })
                .then((listdm1) => {
                    if (listdm1 !== undefined) {
                        const filterDanhmuc1 = listdm1.filter((dm1) => convertToSlug(dm1.tendm1) === cateName);
                        if (filterDanhmuc1.length != 0) {
                            setdm(filterDanhmuc1);
                        } else {
                            fetch(`https://sdvanbao17.id.vn/api/v1/danhmuc2`)
                                .then((response) => {
                                    return response.json();
                                })
                                .then((listdm2) => {
                                    if (listdm2.length != 0) {
                                        const filterDanhmuc2 = listdm2.filter(
                                            (dm2) => convertToSlug(dm2.tendm2) == cateName,
                                        );
                                        if (filterDanhmuc2.length != 0) {
                                            setdm(filterDanhmuc2);
                                        } else {
                                            fetch(`https://sdvanbao17.id.vn/api/v1/danhmuc3`)
                                                .then((response) => {
                                                    return response.json();
                                                })
                                                .then((listdm3) => {
                                                    if (listdm3.length != 0) {
                                                        const filterDanhmuc3 = listdm3.filter(
                                                            (dm3) => convertToSlug(dm3.tendm3) == cateName,
                                                        );
                                                        setdm(filterDanhmuc3);
                                                    }
                                                })
                                                .catch((rejected) => {
                                                    console.log(rejected);
                                                });
                                        }
                                    }
                                })
                                .catch((rejected) => {
                                    console.log(rejected);
                                });
                        }
                    }
                })
                .catch((rejected) => {
                    console.log(rejected);
                });
        } else {
            fetch(`https://sdvanbao17.id.vn/api/v1/products`)
                .then((response) => {
                    return response.json();
                })
                .then(async (data) => {
                    if (data !== undefined) {
                        const filterdata = await data.filter((prod) => {
                            const product_name = prod.nameProduct.toLowerCase().trim().normalize('NFC').split(' ');
                            const search = searchTerm.toLowerCase().trim().normalize('NFC');
                            return product_name.includes(search);
                        });
                        setprods(filterdata);
                    }
                })
                .catch((rejected) => {
                    console.log(rejected);
                });
        }
    }, [cateName]);
    useEffect(() => {
        fetch(`https://sdvanbao17.id.vn/api/v1/danhmuc2`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data !== undefined) {
                    setdm2(data);
                }
            })
            .catch((rejected) => {
                console.log(rejected);
            });
    }, [searchTerm]);
    useEffect(() => {
        const danhmuc = dm[0];
        console.log(danhmuc);
        if (danhmuc != undefined) {
            if (danhmuc.madm1 != undefined && danhmuc.madm2 == undefined) {
                fetch(`https://sdvanbao17.id.vn/api/v1/productswithcate/` + danhmuc.madm1)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        if (data !== undefined) {
                            setprods(data);
                        }
                    })
                    .catch((rejected) => {
                        console.log(rejected);
                    });
            }
            if (danhmuc.madm1 != undefined && danhmuc.madm2 != undefined) {
                fetch(`https://sdvanbao17.id.vn/api/v1/getProductsCateDanhmuc2/` + danhmuc.madm2)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        if (data !== undefined) {
                            setprods(data);
                        }
                    })
                    .catch((rejected) => {
                        console.log(rejected);
                    });
            }
            if (danhmuc.madm1 != undefined && danhmuc.madm2 != undefined && danhmuc.madm3 != undefined) {
                fetch(`https://sdvanbao17.id.vn/api/v1/getProductsCateDanhmuc3/` + danhmuc.madm3)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        if (data !== undefined) {
                            setprods(data);
                        }
                    })
                    .catch((rejected) => {
                        console.log(rejected);
                    });
            }
        }
    }, [dm]);
    //const [dataProds, setdataProds] = useState(JSON.parse(localStorage.getItem('dataProdsShop')));
    console.log(prods);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('titlePage')}>
                <div className={cx('pathWeb')}>
                    <span>
                        <a href="#"> Sendo.vn</a> / {dataIdCate != undefined ? dataIdCate.tendm1 : 'Kết quả tìm kiếm'}
                    </span>
                </div>
                <div className={cx('titleResult')}>
                    <span className={cx('title')}>{searchTerm != undefined ? searchTerm : ''}</span>
                    <span className={cx('result')}>
                        {dataIdCate != undefined ? 'Tìm thấy hơn 10.000 sản phẩm' : ''}
                    </span>
                </div>
            </div>
            <div className={cx('contentPage')}>
                <div className={cx('contentLeft')}>
                    {dm.length != 0 ? <ListItemFilter danhmuc={dm} /> : <ListItemFilter />}
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
                    {prods.length != 0 ? (
                        <Products data={prods} find notbutton width={'18.748031% !important'} />
                    ) : (
                        <h1>Đcm đéo có hàng</h1>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FindProduct;
