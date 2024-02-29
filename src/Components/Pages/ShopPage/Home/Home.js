import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Products from '../../../Products/Products';
import { proSale } from '../../../../Assets/images/sale';
import ShopPage from '../ShopPage';
import Slide from '../../../Layout/Components/Slides/Slide';
import { genuine } from '../../../../Assets/images/Genuine/Genuine';
import Pagination from '../../../Pagination/Pagination';
import { useState } from 'react';
const cx = classNames.bind(styles);
const newArray = proSale.splice(0, 9);
function Home() {
    const [currentPage, setCurrentPage] = useState(0);
    const handleChange = ({ selected }) => {
        setCurrentPage(selected);
    };
    const itemsPerPage = 24;
    const startindex = currentPage * itemsPerPage;
    const sliceData = proSale.splice(startindex, startindex + itemsPerPage);
    return (
        <ShopPage>
            <div className={cx('newProd')}>
                <h3>Hàng mới về</h3>
                <Slide prodNew={true} data={newArray} ovr={6} size={200} />
            </div>
            <div className={cx('newProd')}>
                <h3>Khuyến mãi</h3>
                <Slide prodNew={true} data={newArray} ovr={6} size={200} />
            </div>
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
            <div className={cx('listProds')}>
                <Products data={sliceData} notbutton />
                <Pagination
                    pageCount={Math.ceil(proSale.length / itemsPerPage)}
                    onPageChange={handleChange}
                ></Pagination>
            </div>
        </ShopPage>
    );
}

export default Home;
