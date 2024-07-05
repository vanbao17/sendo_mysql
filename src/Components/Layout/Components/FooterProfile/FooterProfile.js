import classNames from 'classnames/bind';
import styles from './FooterProfile.module.scss';
const cx = classNames.bind(styles);
function FooterProfile() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('box')}>
                    <a href="#">
                        <div className={cx('thumb_box')}>
                            <img src="https://pwa-profile.scdn.vn/static/media/benefit_1.d1c4f276.svg"></img>
                        </div>
                        <span className={cx('title')}>Siêu nhiều hàng tốt</span>
                        <span className={cx('desc')}>Cần gì cũng có 26 ngành hàng & 10 triệu sản phẩm</span>
                    </a>
                </div>
                <div className={cx('box')}>
                    <a href="#">
                        <div className={cx('thumb_box')}>
                            <img src="https://pwa-profile.scdn.vn/static/media/benefit_2.1b86fd66.svg"></img>
                        </div>
                        <span className={cx('title')}>Siêu yên tâm</span>
                        <span className={cx('desc')}>Miễn phí đổi trả 48h (*)</span>
                    </a>
                </div>
                <div className={cx('box')}>
                    <a href="#">
                        <div className={cx('thumb_box')}>
                            <img src="https://pwa-profile.scdn.vn/static/media/benefit_3.8c790757.svg"></img>
                        </div>
                        <span className={cx('title')}>Siêu tiện lợi</span>
                        <span className={cx('desc')}>Mạng lưới vận chuyển toàn quốc, mua gì cũng có</span>
                    </a>
                </div>
                <div className={cx('box')}>
                    <a href="#">
                        <div className={cx('thumb_box')}>
                            <img src="https://pwa-profile.scdn.vn/static/media/benefit_4.9504e1ef.svg"></img>
                        </div>
                        <span className={cx('title')}>Siêu tiết kiệm</span>
                        <span className={cx('desc')}>
                            Giá hợp lý, vừa túi tiền. Luôn có nhiều chương trình khuyến mãi
                        </span>
                    </a>
                </div>
                <div className={cx('box')}>
                    <a href="#">
                        <div style={{ width: '100%' }} className={cx('thumb_box')}>
                            <img src="https://pwa-profile.scdn.vn/static/media/benefit_5.85c0063d.png"></img>
                        </div>
                        <span className={cx('title')}>Tải ứng dụng SENDO</span>
                        <span className={cx('desc')}>Mang thế giới mua sắm của Sendo trong tầm tay bạn</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default FooterProfile;
