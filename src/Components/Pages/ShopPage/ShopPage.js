import classNames from 'classnames/bind';
import styles from './ShopPage.module.scss';
import { BoxIcon, ChatIcon, OclockIcon, ShopIcon } from '../../IconSvg';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ig } from '../../../Assets/images';
import Rate from '../../Rate/Rate';
import Products from '../../Products/Products';
import { proSale } from '../../../Assets/images/sale';
import Footer from '../../Layout/Components/Footer/Footer';
import Header from '../../Layout/Components/Header/Header';
import { useState, useEffect, useContext } from 'react';
import { Context } from '../../store/Context';
const cx = classNames.bind(styles);

function ShopPage({ children }) {
    // const location = useLocation();
    //const { idShop, setidShop } = useContext(Context);
    const [data, setdata] = useState(JSON.parse(localStorage.getItem('dataShop')));
    const dataCates = [
        {
            name: 'Trang chủ',
            path: '/shop/cong-nghe',
        },
        {
            name: 'Sản Phẩm',
            path: '/shop/cong-nghe/san-pham',
        },
        {
            name: 'Bộ sưu tập ',
            path: '/shop/cong-nghe/bo-suu-tap',
        },
        {
            name: 'Gía tốt hôm nay',
            path: '/shop/cong-nghe/gia-tot-hom-nay',
        },
        {
            name: 'Thông tin shop',
            path: '/shop/thong-tin-shop',
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('infor')}>
                    <div className={cx('bgImageInfor')}>
                        <img src={data.imageBannerShop}></img>
                    </div>
                    <div className={cx('inforBasicShop')}>
                        <div className={cx('left')}>
                            <div className={cx('nameShop')}>
                                <div className={cx('imageShop')}>
                                    <img src={data.imageShop}></img>
                                </div>
                                <div className={cx('name')}>
                                    <p>
                                        {data.tenshop} <img className={cx('tag')} src={ig.shoptag}></img>
                                    </p>
                                    <div className={cx('rateAndFollow')}>
                                        <span className={cx('rate')}>4.9/5</span>|
                                        <span className={cx('follow')}>{data.userFollow} người theo dõi</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('btnShop')}>
                                <button>
                                    <ShopIcon width="20px" height="20px" className={cx('btnIcon')} />
                                </button>
                                <button>
                                    <ChatIcon width="20px" height="20px" className={cx('btnIcon')} />
                                </button>
                            </div>
                        </div>
                        <div className={cx('right')}>
                            <div className={cx('righitem')}>
                                <span>
                                    <ShopIcon className={cx('icon')} />
                                    Thời gian bán hàng
                                </span>
                                <p>5 năm 9 tháng</p>
                            </div>
                            <div className={cx('righitem')}>
                                <span>
                                    <BoxIcon className={cx('icon')} />
                                    Sản phẩm
                                </span>
                                <p>292</p>
                            </div>
                            <div className={cx('righitem')}>
                                <span>
                                    <OclockIcon className={cx('icon')} />
                                    Thời gian chuẩn bị hàng
                                </span>
                                <p>8 giờ</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('navShop')}>
                        {dataCates.map((cateItem, index) => {
                            return (
                                <NavLink
                                    key={index}
                                    to={cateItem.path}
                                    className={(nav) => cx('item', { active: nav.isActive })}
                                >
                                    {cateItem.name}
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default ShopPage;
