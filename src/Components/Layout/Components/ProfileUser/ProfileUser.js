import classNames from 'classnames/bind';
import styles from './ProfileUser.module.scss';
import SideBarProfileUser from '../SideBarProfileUser/SideBarProfileUser';
const cx = classNames.bind(styles);
function ProfileUser({ children }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('nav_history')}>Sendo.vn / Thông tin tài khoản</div>
                <div className={cx('content')}>
                    <SideBarProfileUser />
                    {children}
                </div>
            </div>
        </div>
    );
}

export default ProfileUser;
