import classNames from 'classnames/bind';
import styles from './SideBarProfileUser.module.scss';

import ItemNavProfile from './ItemNavProfile';
const cx = classNames.bind(styles);
function SideBarProfileUser() {
    const list_nav = [
        {
            title: 'Tài khoản',
            list_nav_childrens: [
                { name: 'Thong tin tài khoản', path: '/thong-tin-tai-khoan' },
                { name: 'Địa chỉ nhận hàng', path: '/thong-tin-tai-khoan' },
                { name: 'Ưu đãi của tôi', path: '/thong-tin-tai-khoan' },
                { name: 'Tài khoản senpay', path: '/thong-tin-tai-khoan' },
                { name: 'Shop theo dõi', path: '/thong-tin-tai-khoan' },
                { name: 'Bảo hiểm của tôi', path: '/thong-tin-tai-khoan' },
                { name: 'Sản phẩm yêu thích', path: '/thong-tin-tai-khoan' },
            ],
        },
        {
            title: 'Đơn hàng',
            list_nav_childrens: [
                { name: 'Sản phẩm', path: '/thong-tin-tai-khoan' },
                { name: 'Đơn hàng dịch vụ tiện ích', path: '/thong-tin-tai-khoan' },
            ],
        },
        {
            title: 'Hỏi đáp',
            list_nav_childrens: [
                { name: 'Hỏi đáp ', path: '/thong-tin-tai-khoan' },
                { name: 'Liên kết mạng xã hội', path: '/thong-tin-tai-khoan' },
            ],
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('thumb_user')}>
                    <img src="https://media3.scdn.vn/img4/2024/06_20/zgTqeGo7jMnn4iWBNdoz.jpg"></img>
                    <strong>Phạm Văn Bảo</strong>
                </div>
                <div className={cx('navigates')}>
                    {list_nav.map((nav, index) => {
                        return <ItemNavProfile key={index} title={nav.title} list_nav={nav.list_nav_childrens} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default SideBarProfileUser;
