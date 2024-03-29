import ShopPage from '../ShopPage';
import classNames from 'classnames/bind';
import styles from './ShopProds.module.scss';
import Pagination from '../../../Pagination/Pagination';
import Products from '../../../Products/Products';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../../store/Context';
const cx = classNames.bind(styles);
function ShopProds() {
    const [currentPage, setCurrentPage] = useState(0);
    const [dataProds, setdataProds] = useState(JSON.parse(localStorage.getItem('dataProdsShop')));
    const { idShop, setidShop } = useContext(Context);
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };
    const itemsPerPage = 24; // Số lượng mục trên mỗi trang
    const startIndex = currentPage * itemsPerPage;
    const slicedData = dataProds.length > 0 ? dataProds.slice(startIndex, startIndex + itemsPerPage) : [];
    return (
        <ShopPage>
            <div className={cx('filterProds')}>
                <div>
                    <button className={cx('active')}>
                        <span>Bán chạy</span>
                    </button>
                </div>
                <div>
                    <button>
                        <span>Mới nhất</span>
                    </button>
                </div>
                <div className={cx('sortPrice')}>
                    <button>
                        <span>Giá</span>
                        <img src="https://web-static.scdn.vn/shop-products/5cf6d28-web/media/sort-icon.3e3c6f9fb9b3eabd9f1a7ad89adf6b57.svg"></img>
                    </button>
                </div>
            </div>
            <Products data={slicedData} notbutton />
            <Pagination pageCount={Math.ceil(dataProds.length / itemsPerPage)} onPageChange={handlePageChange} />
        </ShopPage>
    );
}

export default ShopProds;
