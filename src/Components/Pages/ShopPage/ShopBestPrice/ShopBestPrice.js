import ShopPage from '../ShopPage';
import classNames from 'classnames/bind';
import { proSale } from '../../../../Assets/images/sale';
import Products from '../../../Products/Products';
import styles from './ShopBestPrice.module.scss';
import { useState } from 'react';
import Pagination from '../../../Pagination/Pagination';
const cx = classNames.bind(styles);
function ShopBestPrice() {
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const itemsPerPage = 24; // Số lượng mục trên mỗi trang

    const startIndex = currentPage * itemsPerPage;
    const slicedData = proSale.slice(startIndex, startIndex + itemsPerPage);
    return (
        <ShopPage>
            <div className={cx('listProds')}>
                <Products data={slicedData} notbutton />
                <Pagination pageCount={Math.ceil(proSale.length / itemsPerPage)} onPageChange={handlePageChange} />
            </div>
        </ShopPage>
    );
}

export default ShopBestPrice;
