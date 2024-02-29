import classNames from 'classnames/bind';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';
const cx = classNames.bind(styles);
function Pagination({ pageCount, onPageChange }) {
    return (
        <div className={cx('pagination-container')}>
            <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                onPageChange={onPageChange}
                containerClassName={cx('pagination')}
                activeClassName={cx('active')}
            />
        </div>
    );
}

export default Pagination;
