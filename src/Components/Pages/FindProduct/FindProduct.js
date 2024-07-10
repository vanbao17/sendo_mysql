import classNames from 'classnames/bind';
import styles from './FindProduct.module.scss';
import ListItemFilter from './ItemFilter/ListItemFilter';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTicket } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Products from '../../Products/Products';
import { useLocation } from 'react-router-dom';
import Fuse from 'fuse.js';
const cx = classNames.bind(styles);
const optionsFuse = {
    keys: ['tendm2'], // Các trường để tìm kiếm
    includeScore: true,
    threshold: 0.4,
};
function FindProduct() {
    const location = useLocation();
    const dataIdCate = location.state?.dt;
    const [prods, setprods] = useState([]);
    const [dm2, setdm2] = useState([]);
    const [results, setResults] = useState([]);
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQuery();
    const searchTerm = query.get('q');
    useEffect(() => {
        if (dataIdCate != undefined) {
            fetch(`https://sdvanbao17.id.vn/api/v1/productswithcate/${dataIdCate.madm1}`)
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
        } else {
            fetch(`https://sdvanbao17.id.vn/api/v1/products`)
                .then((response) => {
                    return response.json();
                })
                .then(async (data) => {
                    if (data !== undefined) {
                        const filterdata = await data.filter((prod) =>
                            prod.nameProduct
                                .toLowerCase()
                                .trim()
                                .split(' ')
                                .includes(searchTerm.toLowerCase().trim().normalize('NFC')),
                        );
                        setprods(filterdata);
                    }
                })
                .catch((rejected) => {
                    console.log(rejected);
                });
        }
    }, [dataIdCate]);
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
    console.log(prods);
    //const [dataProds, setdataProds] = useState(JSON.parse(localStorage.getItem('dataProdsShop')));
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
                    {dataIdCate != undefined ? <ListItemFilter madm1={dataIdCate.madm1} /> : <ListItemFilter />}
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
                    <Products data={prods} find notbutton width={'18.748031% !important'} />
                </div>
            </div>
        </div>
    );
}

export default FindProduct;
