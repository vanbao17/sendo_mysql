import classNames from 'classnames/bind';
import styles from './ProfileSendo.module.scss';
import SideBarProfile from '../SideBarProfile/SideBarProfile';
import FooterProfile from '../FooterProfile/FooterProfile';
const cx = classNames.bind(styles);

function ProfileSendo({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('address_nav')}>SENDO.VNĐƠN HÀNG</div>
            </div>
            <div className={cx('container_content')}>
                <div className={cx('content')}>
                    <SideBarProfile />
                    {children}
                </div>
                <FooterProfile />
            </div>
        </div>
    );
}

export default ProfileSendo;
