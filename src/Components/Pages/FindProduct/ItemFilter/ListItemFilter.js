import classNames from 'classnames/bind';
import styles from './ItemFilter.module.scss';
import ItemFilter from './ItemFilter';
const cx = classNames.bind(styles);
function ListItemFilter() {
    const dataFake = [
        { name: 'Danh mục', attribute: 'dropDown' },
        { name: 'Địa điểm', attribute: 'checkBox' },
        { name: 'Phương thức vận chuyển', attribute: 'checkBox' },
        { name: 'Loại shop', attribute: 'checkBox' },
        { name: 'ưu đãi', attribute: 'checkBox' },
        { name: 'Khoảng giá', attribute: 'inputFilter' },
        { name: 'Đánh giá', attribute: 'inputFilter' },
        { name: 'Màu sắc', attribute: 'filterColor' },
        { name: 'Phong cách', attribute: 'checkBox' },
        { name: 'Họa tiết', attribute: 'checkBox' },
        { name: 'Chất liệu vải', attribute: 'checkBox' },
        { name: 'Chiều dài áo', attribute: 'checkBox' },
        { name: 'Chiều dài tay áo', attribute: 'checkBox' },
        { name: 'Chiều dài váy', attribute: 'checkBox' },
        { name: 'Kích thước áo', attribute: 'checkBox' },
        { name: 'Kiểu cổ áo', attribute: 'checkBox' },
    ];
    return (
        <div className={cx('listItem')}>
            {dataFake.map((item, index) => {
                return <ItemFilter key={index} title={item.name} attribute={item.attribute}></ItemFilter>;
            })}
        </div>
    );
}

export default ListItemFilter;
