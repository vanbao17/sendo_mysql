import classNames from 'classnames/bind';
import styles from './SideBarProfile.module.scss';
import { useState } from 'react';
const cx = classNames.bind(styles);
function SideBarProfile() {
    const [active, setactive] = useState(0);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const navigates = [
        {
            index: 0,
            name: 'Đơn hàng',
            path: '/don-hang',
        },
        {
            index: 1,
            name: 'Bảo hiểm của tôi',
            path: '/don-hang',
        },
        {
            index: 2,
            name: 'Đơn hàng dịch vụ tiện ích',
            path: '/don-hang',
        },
        {
            index: 3,
            name: 'Tài khoản senpay',
            path: '/don-hang',
        },
        {
            index: 4,
            name: 'Địa chỉ nhận hàng',
            path: '/don-hang',
        },
        {
            index: 5,
            name: 'Sản phẩm yêu thích',
            path: '/don-hang',
        },
        {
            index: 6,
            name: 'Thông tin tài khoản',
            path: '/don-hang',
        },
        {
            index: 7,
            name: 'Shop yêu thích',
            path: '/don-hang',
        },
        {
            index: 8,
            name: 'Ưu đãi của tôi',
            path: '/don-hang',
        },
        {
            index: 9,
            name: 'Hỏi đáp',
            path: '/don-hang',
        },
        {
            index: 10,
            name: 'Liên kết mạng xã hội',
            path: '/don-hang',
        },
    ];
    const firstNav = navigates.slice(0, 5);
    const secondNav = navigates.slice(6, navigates.length - 1);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('infor_account')}>
                <div className={cx('image_infor')}>
                    <img src={user.imageUser}></img>
                </div>
                <div className={cx('name')}>
                    <span>{user.nameCustomers}</span>
                    <span>Chỉnh sửa tài khoản</span>
                </div>
            </div>
            <div className={cx('list_nav')}>
                <p className={cx('nav_title')}>Quản lý giao dịch</p>
                <ul>
                    {firstNav.map((item, index) => {
                        return (
                            <li
                                key={index}
                                onClick={() => {
                                    setactive(item.index);
                                }}
                            >
                                <a className={cx(active == item.index ? 'active' : '')}>{item.name}</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className={cx('list_nav')}>
                <p className={cx('nav_title')}>Quản lý tài khoản</p>
                <ul>
                    {secondNav.map((item, index) => {
                        return (
                            <li
                                key={index}
                                onClick={() => {
                                    setactive(item.index);
                                }}
                            >
                                <a className={cx(active == item.index ? 'active' : '')}>{item.name}</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className={cx('footer_sidebar')}>
                <span>
                    Cài đặt <strong>Siêu ứng dụng Sendo</strong> trên smartphone để{' '}
                    <strong>“NHẬN THÔNG BÁO TRẠNG THÁI ĐƠN HÀNG”</strong> mọi lúc mọi nơi
                </span>
                <div className={cx('image_footer_sidebar')}>
                    <a href="#"></a>
                    <a href="#"></a>
                </div>
            </div>
        </div>
    );
}

export default SideBarProfile;
