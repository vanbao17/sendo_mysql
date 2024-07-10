import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import ProductItem from '../ProductItem/ProductItem';
import Buttons from '../Buttons/Buttons';
import { useState } from 'react';
import Pagination from '../Pagination/Pagination';
import { useLocation } from 'react-router-dom';
const cx = classNames.bind(styles);

function Products({ data, notbutton, find }) {
    const [currentPage, setCurrentPage] = useState(0);
    const [countpage, setcountpage] = useState(24);
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };
    const slicedData = data.slice(0, countpage);
    const handleViewOther = () => {
        setcountpage(countpage + 24);
    };
    return (
        <div className={cx('wrapper')}>
            {slicedData.map((item, index) => {
                return (
                    <ProductItem
                        className={cx('prmain')}
                        cls={find && 'large'}
                        key={index}
                        pdmain
                        newProd={true}
                        data={item}
                    />
                );
            })}
            <div className={cx('seemore')}>
                <div className={cx('container')}>
                    {!notbutton && (
                        <Buttons className={cx('btn-seemore')} onClick={handleViewOther}>
                            Xem thêm
                        </Buttons>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Products;
