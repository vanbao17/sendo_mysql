import classNames from 'classnames/bind';
import styles from './OrderDetail.module.scss';
import { useParams } from 'react-router-dom';
import ProfileSendo from '../../Layout/Components/ProfileSendo/ProfileSendo';
import { Choxacnhan, Dagiaohang, Dangvanchuyen, Daxacnhan, PhoneIcon, ShopIcon } from '../../IconSvg';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);
function OrderDetail() {
    const { paramValue } = useParams();
    const [orderDetail, setOrderDetail] = useState([]);
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
    const lis_nav = [
        {
            index: 1,
            name: 'Chờ xác nhận',
        },
        {
            index: 2,
            name: 'Đã xác nhận',
        },
        {
            index: 3,
            name: 'Đang vận chuyển',
        },
        {
            index: 4,
            name: 'Đã giao hàng',
        },
        {
            index: 5,
            name: 'Đã hủy ',
        },
    ];
    useEffect(() => {
        const order_id = paramValue;
        fetch('https://sdvanbao17.id.vn/api/v1/getOrderIdOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ order_id }),
        })
            .then((rs) => rs.json())
            .then((dt) => {
                const filterData = dt.filter((odi) => odi.idCustomers == user.idCustomers);
                console.log(filterData);
                setOrderDetail(filterData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [paramValue]);
    const st = lis_nav.filter((it) => it.index == orderDetail.state)[0];
    const totalValue = orderDetail.reduce((total, item) => total + item.priceSale * item.quantity, 0);
    const totalValueCoast = orderDetail.length != 0 ? orderDetail[0].percent * totalValue : 0;
    return (
        <ProfileSendo>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('title')}>Quản lý đơn hàng / Chi tiết đơn hàng</div>
                    <hr></hr>
                </div>
                <div className={cx('container_state_order')}>
                    <div className={cx('infor_order')}>
                        <p>
                            Mã đơn hàng: <span className={cx('blue_text')}>#{paramValue}</span>
                        </p>
                        <p>Đặt hàng: {formatDate(orderDetail.length != 0 ? orderDetail[0].created_at : '')}</p>
                    </div>
                    <div className={cx('state_right')}>
                        <div className={cx('item_state')}>
                            <div>
                                <Choxacnhan
                                    className={cx(
                                        orderDetail.length != 0
                                            ? orderDetail[0].state_payment >= 1
                                                ? 'active'
                                                : ''
                                            : '',
                                        'icon',
                                    )}
                                />
                            </div>
                            <span
                                className={cx(
                                    orderDetail.length != 0 ? (orderDetail[0].state_payment >= 1 ? 'active' : '') : '',
                                )}
                            >
                                Chờ xác nhận
                            </span>
                        </div>
                        <div className={cx('item_state')}>
                            <div>
                                <Daxacnhan
                                    className={cx(
                                        orderDetail.length != 0
                                            ? orderDetail[0].state_payment >= 2
                                                ? 'active'
                                                : ''
                                            : '',
                                        'icon',
                                    )}
                                />
                            </div>
                            <span
                                className={cx(
                                    orderDetail.length != 0 ? (orderDetail[0].state_payment >= 2 ? 'active' : '') : '',
                                )}
                            >
                                Đã xác nhận
                            </span>
                        </div>
                        <div className={cx('item_state')}>
                            <div>
                                <Dangvanchuyen
                                    className={cx(
                                        orderDetail.length != 0
                                            ? orderDetail[0].state_payment >= 3
                                                ? 'active'
                                                : ''
                                            : '',
                                        'icon',
                                    )}
                                />
                            </div>
                            <span
                                className={cx(
                                    orderDetail.length != 0 ? (orderDetail[0].state_payment >= 3 ? 'active' : '') : '',
                                )}
                            >
                                Đang vận chuyển
                            </span>
                        </div>
                        <div className={cx('item_state')}>
                            <Dagiaohang
                                className={cx(
                                    orderDetail.length != 0 ? (orderDetail[0].state_payment >= 4 ? 'active' : '') : '',
                                    'icon',
                                )}
                            />
                            <span
                                className={cx(
                                    orderDetail.length != 0 ? (orderDetail[0].state_payment >= 4 ? 'active' : '') : '',
                                )}
                            >
                                Đã giao hàng
                            </span>
                        </div>
                    </div>
                </div>
                <div className={cx('state_transform_getorder')}>
                    <div className={cx('state_transform')}>
                        <div className={cx('title_state')}>
                            <h3>TÌNH TRẠNG VẬN CHUYỂN</h3>
                            <span>
                                Nhà vận chuyển:{' '}
                                <strong>{orderDetail.length != 0 ? orderDetail[0].method_name : ''}</strong>
                            </span>
                            <span>
                                Tình trạng: <strong>{st != undefined ? st.name : ''}</strong>
                            </span>
                        </div>
                        <span className={cx('state')}>Đã hủy - Không muốn mua nữa</span>
                    </div>
                    <div className={cx('state_getOder')}>
                        <h3>THÔNG TIN NHẬN HÀNG</h3>
                        <span>
                            <strong>{user.nameCustomers}</strong> - {user.phoneNumber}
                        </span>
                        <span>
                            {orderDetail.length != 0 ? (
                                orderDetail[0].address +
                                '-' +
                                orderDetail[0].px +
                                '-' +
                                orderDetail[0].qh +
                                '-' +
                                orderDetail[0].tt
                            ) : (
                                <></>
                            )}
                        </span>
                    </div>
                </div>
                {orderDetail.length != 0 ? (
                    <div className={cx('infor_detail')}>
                        <div className={cx('detail_title')}>
                            <div>
                                Shop: <span className={cx('blue_text')}>{orderDetail[0].tenshop}</span>
                            </div>
                            |
                            <div>
                                Hình thức thanh toán:
                                <strong>
                                    <img src={orderDetail[0].payment_image}></img> {orderDetail[0].payment_method_name}
                                </strong>
                            </div>
                            |
                            <div>
                                <span>Trạng thái thanh toán:</span>
                                <span className={cx('black_text')}> Chưa thanh toán</span>
                            </div>
                        </div>
                        <div className={cx('detail_product')}>
                            <div className={cx('title_table')}>
                                <div>
                                    <strong>Sản phẩm</strong>
                                </div>
                                <div>
                                    <strong>Đơn giá</strong>
                                </div>
                                <div>
                                    <strong>Số lượng</strong>
                                </div>
                                <div>
                                    <strong>Thành tiền</strong>
                                </div>
                            </div>
                            {orderDetail.length != 0 ? (
                                orderDetail.map((item) => {
                                    return (
                                        <div className={cx('product')}>
                                            <div>
                                                <img style={{ objectFit: 'cover' }} src={item.imageProduct}></img>
                                                <strong>{item.nameProduct}</strong>
                                            </div>
                                            <div>
                                                <span>{item.priceSale}</span>
                                            </div>
                                            <div>
                                                <strong>{item.quantity}</strong>
                                            </div>
                                            <div>
                                                <strong>
                                                    {(item.priceSale * item.quantity).toLocaleString('vi-VN')}đ
                                                </strong>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <></>
                            )}

                            <div className={cx('action_price')}>
                                <div className={cx('action')}>
                                    <div className={cx('buttons')}>
                                        <a href={`/shop/${orderDetail.idShop}`} className={cx('button_shop')}>
                                            <button>
                                                <ShopIcon width="24px" />
                                                <span>Vào shop</span>
                                            </button>
                                        </a>
                                        <a className={cx('button_phone')}>
                                            <button>
                                                <PhoneIcon width="24px" />
                                                <span>
                                                    {orderDetail.phone != undefined
                                                        ? formatPhoneNumber(orderDetail.phone)
                                                        : ''}
                                                </span>
                                            </button>
                                        </a>
                                    </div>
                                </div>
                                <div className={cx('price')}>
                                    <div className={cx('total_price')}>
                                        <span>Tổng tiền:</span>
                                        <span>{totalValue.toLocaleString('vi-VN')}</span>
                                    </div>
                                    <div className={cx('cost_transform')}>
                                        <span>Phí vận chuyển:</span>
                                        <span>{(totalValueCoast / 10).toLocaleString('vi-VN')}đ</span>
                                    </div>
                                    <div className={cx('total')}>
                                        <strong>Tổng thanh toán:</strong>
                                        <strong className={cx('red_text')}>
                                            {(totalValue - totalValueCoast / 10).toLocaleString('vi-VN')}đ
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
                <div className={cx('turn_list_order')}>
                    <div>
                        <a href="/don-hang">
                            <button>
                                <span>QUAY LẠI DANH SÁCH ĐƠN HÀNG</span>
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </ProfileSendo>
    );
}

export default OrderDetail;
