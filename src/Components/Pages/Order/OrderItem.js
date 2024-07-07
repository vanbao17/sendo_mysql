import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import { Choxacnhan, Dagiaohang, Dangvanchuyen, Daxacnhan, PhoneIcon, ShopIcon } from '../../IconSvg';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);
function OrderItem({ data }) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [orderItem, setOrderItem] = useState([]);
    const [orderItemFilter, setorderItemFilter] = useState([]);
    useEffect(() => {
        const order_id = data.id;
        fetch('https://sdvanbao17.id.vn/api/v1/getOrderIdOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ order_id }),
        })
            .then((rs) => rs.json())
            .then((dt) => {
                setOrderItem(dt);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [data]);
    console.log(orderItem);
    useEffect(() => {
        const filterData = orderItem.filter((odi) => odi.idCustomers == user.idCustomers);
        setorderItemFilter(filterData);
    }, [orderItem]);

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
    const handleDeleteOrder = () => {
        const order_id = data.id;
        fetch('https://sdvanbao17.id.vn/api/v1/deleteOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ order_id }),
        })
            .then((rs) => {
                if (rs.status == 200) {
                    window.location.href = '/don-hang';
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className={cx('list_order')}>
            <div className={cx('infor_order')}>
                <div className={cx('infor_product')}>
                    <div>
                        <span>Mã đơn hàng: </span>
                        <a href={`/chi-tiet-don-hang/${data != undefined ? data.id : ''}`} className={cx('blue_text')}>
                            {' '}
                            #{data != undefined ? data.id : ''} | Chi tiết
                        </a>
                    </div>
                    <div>
                        <span>Đặt ngày: {orderItem.length > 0 ? formatDate(orderItem[0].created_at) : ''}</span>
                    </div>
                </div>
                <div className={cx('infor_customer')}>
                    <span>Người nhận:</span>
                    <span>{user.nameCustomers}</span>
                </div>
                <div className={cx('price_product')}>
                    <span>Tổng tiền:</span>
                    <span>{(data.total_price * 1000000).toLocaleString('vi-VN')}đ</span>
                </div>
            </div>
            <div className={cx('state_order')}>
                <div className={cx('state_left')}>
                    {orderItemFilter != undefined ? (
                        orderItemFilter.map((it) => {
                            return (
                                <div className={cx('item_product')}>
                                    <img style={{ objectFit: 'cover' }} src={it.imageProduct}></img>
                                    <div className={cx('infor_product')}>
                                        <span className={cx('nameProduct')}>{it.nameProduct}</span>
                                        <span className={cx('shop')}>
                                            Shop:
                                            <a href="#" className={cx('blue_text')}>
                                                {it.tenshop}
                                            </a>
                                        </span>
                                        <span className={cx('state')}>
                                            {it.state == 1
                                                ? 'Đang chờ shop xác nhận'
                                                : it.state == 5
                                                ? 'Đã hủy - Không muốn mua nữa'
                                                : 'Ngày giao dự kiên - ' + addDays(formatDate(it.created_at), 6)}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <></>
                    )}
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
                    <a href={orderItem.length > 0 ? `/shop/${orderItem[0].idShop}` : '#'} className={cx('href_shop')}>
                        <ShopIcon width="20px" />
                        <span>Vào shop</span>
                    </a>
                    <a href="#" className={cx('href_phone')}>
                        <PhoneIcon width="20px" />
                        <span>{orderItem.length > 0 ? formatPhoneNumber(orderItem[0].phone) : ''}</span>
                    </a>
                </div>
                <div className={cx('follow_order')}>
                    {data.state == 1 ? (
                        <a onClick={handleDeleteOrder}>
                            <button>
                                <span>Hủy</span>
                            </button>
                        </a>
                    ) : (
                        <></>
                    )}

                    <a href={`/chi-tiet-don-hang/${orderItem.length > 0 ? orderItem[0].order_id : ''}`}>
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
