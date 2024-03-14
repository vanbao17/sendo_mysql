import ShopPage from '../ShopPage';
import classNames from 'classnames/bind';
import styles from './ShopCollection.module.scss';

import Products from '../../../Products/Products';
import { proSale } from '../../../../Assets/images/sale';
import { useState } from 'react';
import Pagination from '../../../Pagination/Pagination';
const cx = classNames.bind(styles);
const dataSidebar = [
    {
        idCollection: 'coll1',
        title: 'Hàng mới về',
    },
    {
        idCollection: 'coll2',
        title: 'Khuyến mãi',
    },
    {
        idCollection: 'coll3',
        title: 'Tân trang nhà cửa',
    },
    {
        idCollection: 'coll4',
        title: 'Thiết bị âm thanh',
    },
    {
        idCollection: 'coll5',
        title: 'Laptop máy tính và thiết bị văn phòng',
    },
    {
        idCollection: 'coll6',
        title: 'Máy ảnh, máy quay phim',
    },
    {
        idCollection: 'coll7',
        title: 'Nhà cửa',
    },
    {
        idCollection: 'coll8',
        title: 'Thiết bị y tế',
    },
    {
        idCollection: 'coll9',
        title: 'Đồ điện gia dụng',
    },
    {
        idCollection: 'coll10',
        title: 'Ôto xe máy',
    },
    {
        idCollection: 'coll11',
        title: 'Phụ kiện công nghệ',
    },
    {
        idCollection: 'coll12',
        title: 'Sách và văn phòng phẩm',
    },
    {
        idCollection: 'coll13',
        title: 'Giày dép',
    },
    {
        idCollection: 'coll14',
        title: 'Bách hóa tổng hợp',
    },
    {
        idCollection: 'coll15',
        title: 'Thể thao dã ngoại và giải trí',
    },
    {
        idCollection: 'coll16',
        title: 'Mẹ và bé',
    },
    {
        idCollection: 'coll17',
        title: 'Sức khỏe và làm đẹp',
    },
    {
        idCollection: 'coll18',
        title: 'Phụ kiện thời trang ',
    },
    {
        idCollection: 'coll19',
        title: 'Đời sống',
    },
];
function ShopCollection() {
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
            <div className={cx('containerShopColl')}>
                <div className={cx('sidebarCollection')}>
                    <h3>Bộ sưu tập</h3>
                    <ul className={cx('cates')}>
                        <li>
                            <a className={cx('itemcate', 'title')}>Bán chạy</a>
                        </li>
                        {dataSidebar.map((item, index) => {
                            return (
                                <li>
                                    <a className={cx('itemcate')} key={item.idCollection}>
                                        {item.title}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className={cx('contentCollection')}>
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
                    <Pagination
                        pageCount={Math.ceil(dataProds.length / itemsPerPage)}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </ShopPage>
    );
}

export default ShopCollection;
