import ShopPage from '../ShopPage';
import classNames from 'classnames/bind';
import styles from './InforS.module.scss';
import { BoxIcon, LocationIcon, OclockIcon, ShopIcon } from '../../../IconSvg';
import Rate from '../../../Rate/Rate';
const cx = classNames.bind(styles);
function InforS() {
    return (
        <ShopPage>
            <div className={cx('containInfor')}>
                <div className={cx('leftcontain')}>
                    <div className={cx('content')}>
                        <div className={cx('updateProgress')}>Đang cập nhật</div>
                        <div className={cx('line')}>
                            <hr />
                        </div>
                        <div className={cx('infor')}>
                            <span className={cx('title')}></span>
                            <ul>
                                <li>
                                    <ShopIcon className={cx('icon')} />
                                    <span>
                                        Thời gian bán hàng <strong>5 năm 1 tháng</strong>
                                    </span>
                                </li>
                                <li>
                                    <BoxIcon className={cx('icon')} />
                                    <span>
                                        Sản Phẩm <strong>1.276</strong>
                                    </span>
                                </li>
                                <li>
                                    <OclockIcon className={cx('icon')} />
                                    <span>
                                        Thời gian chuẩn bị hàng
                                        <strong>8 giờ</strong>
                                    </span>
                                </li>
                                <li>
                                    <LocationIcon className={cx('icon')} />
                                    <span>
                                        Vị trí
                                        <strong> Huyện Duy Xuyên, Quảng Nam</strong>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={cx('rightcontain')}>
                    <Rate normal={false}></Rate>
                </div>
            </div>
        </ShopPage>
    );
}

export default InforS;
