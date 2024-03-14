import ShopPage from '../ShopPage';
import classNames from 'classnames/bind';
import { proSale } from '../../../../Assets/images/sale';
import Products from '../../../Products/Products';
import styles from './ShopBestPrice.module.scss';
import { useContext, useEffect, useState } from 'react';
import Pagination from '../../../Pagination/Pagination';
import { Context } from '../../../store/Context';
const cx = classNames.bind(styles);
function ShopBestPrice() {
    const [currentPage, setCurrentPage] = useState(0);
    const [dataProds, setdataProds] = useState(JSON.parse(localStorage.getItem('dataProdsShop')));

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };
    const itemsPerPage = 24; // Số lượng mục trên mỗi trang

    const startIndex = currentPage * itemsPerPage;
    const slicedData = dataProds.slice(startIndex, startIndex + itemsPerPage);
    return (
        <ShopPage>
            <div className={cx('listProds')}>
                <Products data={slicedData} notbutton />
                <Pagination pageCount={Math.ceil(dataProds.length / itemsPerPage)} onPageChange={handlePageChange} />
            </div>
        </ShopPage>
    );
}

export default ShopBestPrice;
