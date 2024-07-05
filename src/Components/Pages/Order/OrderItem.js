import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import { Choxacnhan, Dagiaohang, Dangvanchuyen, Daxacnhan, PhoneIcon, ShopIcon } from '../../IconSvg';
const cx = classNames.bind(styles);
function OrderItem({ data }) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const formatPhoneNumber = (phoneNumber) => {
        if (phoneNumber.startsWith('+84')) {
            return phoneNumber.slice(3);
        }
        return phoneNumber;
    };
    const addDays = (dateString, days) => {
        const [day, month, year] = dateString.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        date.setDate(date.getDate() + days);

        const newDay = String(date.getDate()).padStart(2, '0');
        const newMonth = String(date.getMonth() + 1).padStart(2, '0');
        const newYear = date.getFullYear();

        return `${newDay}/${newMonth}/${newYear}`;
    };
    return (
        <div className={cx('list_order')}>
            <div className={cx('infor_order')}>
                <div className={cx('infor_product')}>
                    <div>
                        <span>Mã đơn hàng: </span>
                        <a href={`/chi-tiet-don-hang/${data.order_id}`} className={cx('blue_text')}>
                            {' '}
                            #{data.order_id} | Chi tiết
                        </a>
                    </div>
                    <div>
                        <span>Đặt ngày: {formatDate(data.created_at)}</span>
                    </div>
                </div>
                <div className={cx('infor_customer')}>
                    <span>Người nhận:</span>
                    <span>{user.nameCustomers}</span>
                </div>
                <div className={cx('price_product')}>
                    <span>Tổng tiền:</span>
                    <span>{(data.total_price * 1000).toLocaleString('vi-VN')}đ</span>
                </div>
            </div>
            <div className={cx('state_order')}>
                <div className={cx('state_left')}>
                    <img style={{ objectFit: 'cover' }} src={data.imageProduct}></img>
                    <div className={cx('infor_product')}>
                        <span className={cx('nameProduct')}>{data.nameProduct}</span>
                        <span className={cx('shop')}>
                            Shop:
                            <a href="#" className={cx('blue_text')}>
                                {data.tenshop}
                            </a>
                        </span>
                        <span className={cx('state')}>
                            {data.state == 1
                                ? 'Đang chờ shop xác nhận'
                                : data.state == 5
                                ? 'Đã hủy - Không muốn mua nữa'
                                : 'Ngày giao dự kiên - ' + addDays(formatDate(data.created_at), 6)}
                        </span>
                    </div>
                </div>
                <div className={cx('state_right')}>
                    <div className={cx('item_state')}>
                        <div>
                            <Choxacnhan className={cx(data.state >= 1 ? 'active' : '', 'icon')} />
                        </div>
                        <span>Chờ xác nhận</span>
                    </div>
                    <div className={cx('item_state')}>
                        <div>
                            <Daxacnhan className={cx(data.state >= 2 ? 'active' : '', 'icon')} />
                        </div>
                        <span>Đã xác nhận</span>
                    </div>
                    <div className={cx('item_state')}>
                        <div>
                            <Dangvanchuyen className={cx(data.state >= 3 ? 'active' : '', 'icon')} />
                        </div>
                        <span>Đang vận chuyển</span>
                    </div>
                    <div className={cx('item_state')}>
                        <Dagiaohang className={cx(data.state >= 4 ? 'active' : '', 'icon')} />
                        <span>Đã giao hàng</span>
                    </div>
                </div>
            </div>
            <div className={cx('action_order')}>
                <div className={cx('infor_shop')}>
                    <a href="#" className={cx('href_shop')}>
                        <ShopIcon width="20px" />
                        <span>Vào shop</span>
                    </a>
                    <a href="#" className={cx('href_phone')}>
                        <PhoneIcon width="20px" />
                        <span>{formatPhoneNumber(data.phone)}</span>
                    </a>
                </div>
                <div className={cx('follow_order')}>
                    <a href={`/chi-tiet-don-hang/${data.order_id}`}>
                        <button>
                            <span>Theo dõi đơn hàng</span>
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default OrderItem;
