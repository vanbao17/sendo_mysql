import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { LogoSendo } from '../../../IconSvg/IconSvg';
import Search from '../../../Search/Search';
import Buttons from '../../../Buttons/Buttons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useContext } from 'react';
import PopupLogin from '../PopupLogin/PopupLogin';
import { Context } from '../../../store/Context';
import { important } from '../../../../Assets/images/image/image';
import TippyHeadless from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import { useNavigate, NavLink } from 'react-router-dom';
import Navigates from './Navigates';
import { googleLogout } from '@react-oauth/google';
const cx = classNames.bind(styles);
function Header({ nav }) {
    const { dis, setdis, user, menufix, usergg, setusergg, setuserfb, setuser } = useContext(Context);
    const storedUser = sessionStorage.getItem('user');
    const userSession = storedUser ? JSON.parse(storedUser) : null;
    const OptionUser = [
        {
            label: 'Thông tin tài khoản',
            path: '/thong-tin-tai-khoan',
        },
        {
            label: 'Ưu đãi của tôi',
            path: '/thong-tin-tai-khoan',
        },
        {
            label: 'Sản phẩm yêu thích',
            path: '/thong-tin-tai-khoan',
        },
        {
            label: 'Shop yêu thích',
            path: '/thong-tin-tai-khoan',
        },
        {
            label: 'Theo dõi đơn hàng',
            path: '/don-hang',
        },
        {
            label: 'Đơn hàng dịch vụ tiện ích',
            path: '/thong-tin-tai-khoan',
        },
    ];
    const navigate = useNavigate();
    function setCookie(name, value) {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + 30 * 24 * 60 * 60 * 1000);
        const cookieValue = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
        document.cookie = cookieValue;
    }
    function handleUser() {
        try {
            usergg == true ? setusergg(false) : setuserfb(false);

            googleLogout();
            sessionStorage.clear();
            localStorage.clear();
            navigate('/');
        } catch (error) {
            alert('Không ổn rồi fen ơi :))');
        }
    }
    function renderOptionUser() {
        return (
            <div className={cx('options')}>
                {OptionUser.map((item, index) => {
                    return (
                        <a key={index} className={cx('item')} href={item.path}>
                            {item.label}
                        </a>
                    );
                })}
                <span
                    className={cx('item', 'exit')}
                    onClick={() => {
                        handleUser();
                    }}
                >
                    Thoát
                </span>
            </div>
        );
    }
    function HandleCart() {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user == null) {
            setdis(true);
        } else {
            navigate('/gio-hang', { state: { data: user } });
        }
    }
    return (
        <div className={cx('wrapper')}>
            <section>
                <div className={cx('slide-bar')}>
                    <Popup
                        trigger={
                            <div className={cx('item-sildebar')}>
                                <span>Tải ứng dụng</span>
                            </div>
                        }
                        position="bottom center"
                    >
                        <div className={cx('item-sidebar', 'img-scan')}>
                            <div>
                                <img src="https://media3.scdn.vn/img2/2018/5_23/R842FO.png" alt=""></img>
                            </div>
                            <p>Quét để tải ứng dụng</p>
                        </div>
                    </Popup>
                    <Popup
                        trigger={
                            <div className={cx('item-sildebar')}>
                                <span>Chăm sóc khách hàng</span>
                            </div>
                        }
                        position="bottom center"
                    >
                        <ul className={cx('suport')}>
                            <li>Trung tâm hỗ trợ</li>
                            <li>Trả hàng hoàn tiền</li>
                        </ul>
                    </Popup>
                    <Popup
                        className={cx('popup-check')}
                        style={{ width: '236px' }}
                        trigger={
                            <div className={cx('item-sildebar')}>
                                <span>Kiểm tra đơn hàng</span>
                            </div>
                        }
                        position="bottom center"
                    >
                        <form action="post" className={cx('check')}>
                            <input
                                type="text"
                                placeholder="Nhập mã đơn hàng"
                                name="madh"
                                className={cx('madh')}
                            ></input>
                            <input
                                type="text"
                                placeholder="Email / Số điện thoại"
                                name="infor"
                                className={cx('infor')}
                            ></input>
                            <button className={cx('btn-check')}>Kiểm tra</button>
                        </form>
                    </Popup>
                </div>
            </section>
            <nav className={cx('nav', menufix ? 'fixed' : '')}>
                <header>
                    <Link to="/" className={cx('logo')}>
                        <LogoSendo width="5.6rem" height="3rem"></LogoSendo>
                    </Link>
                    <Search></Search>
                    <div className={cx('action-user')}>
                        <div
                            className={cx('cart-icon')}
                            onClick={() => {
                                HandleCart();
                            }}
                        >
                            <FontAwesomeIcon
                                className={cx('cart')}
                                icon={faCartShopping}
                                style={{ width: '24px', height: '24px', color: '#fff' }}
                            ></FontAwesomeIcon>
                        </div>
                        {userSession == null ? (
                            <Buttons
                                normal
                                className={cx('btn-login')}
                                onClick={() => {
                                    setdis(!dis);
                                }}
                            >
                                Đăng nhập
                            </Buttons>
                        ) : (
                            <TippyHeadless
                                interactive
                                offset={[-40, 3]}
                                delay={[100, 10]}
                                placement="bottom"
                                render={renderOptionUser}
                            >
                                <div className={cx('inf-user')}>
                                    <div className={cx('image-user')}>
                                        <img
                                            src={
                                                userSession.imageUser != null
                                                    ? userSession.imageUser
                                                    : 'https://s3v2.interdata.vn:9000/s3-586-15343-storage/dienthoaigiakho/wp-content/uploads/2024/01/16101022/trend-avatar-vo-danh-1.jpg'
                                            }
                                        />
                                    </div>
                                    <span>{userSession.nameUser != null ? userSession.nameUser : 'Chưa có tên'}</span>
                                </div>
                            </TippyHeadless>
                        )}
                    </div>
                </header>
                {nav && <Navigates />}
            </nav>
            {dis ? <PopupLogin style={{ position: 'fixed', top: '0' }} /> : <div></div>}
        </div>
    );
}
export default Header;
