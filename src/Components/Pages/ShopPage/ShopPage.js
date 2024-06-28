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
                        <img src={data.imageBannerShop == null ? '' : ''}></img>
                    </div>
                    <div className={cx('inforBasicShop')}>
                        <div className={cx('left')}>
                            <div className={cx('nameShop')}>
                                <div className={cx('imageShop')}>
                                    <img
                                        src={
                                            data.imageShop == null
                                                ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB7CAIAAADbpWgoAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZBQzQ3OUZBRUI3QjExRTdCNzI4Qjk1MTVGMjEwNjE1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZBQzQ3OUZCRUI3QjExRTdCNzI4Qjk1MTVGMjEwNjE1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkFDNDc5RjhFQjdCMTFFN0I3MjhCOTUxNUYyMTA2MTUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkFDNDc5RjlFQjdCMTFFN0I3MjhCOTUxNUYyMTA2MTUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7mYmvlAAAJyUlEQVR42uyd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'
                                                : ''
                                        }
                                    ></img>
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
