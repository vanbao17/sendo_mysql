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
                setOrderDetail(dt[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [paramValue]);
    const st = lis_nav.filter((it) => it.index == orderDetail.state)[0];
    console.log(orderDetail);
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
                        <p>Đặt hàng: {formatDate(orderDetail != undefined ? orderDetail.created_at : '')}</p>
                    </div>
                    <div className={cx('state_right')}>
                        <div className={cx('item_state')}>
                            <div>
                                <Choxacnhan className={cx(orderDetail.state_payment >= 1 ? 'active' : '', 'icon')} />
                            </div>
                            <span className={cx(orderDetail.state_payment >= 1 ? 'active' : '')}>Chờ xác nhận</span>
                        </div>
                        <div className={cx('item_state')}>
                            <div>
                                <Daxacnhan className={cx(orderDetail.state_payment >= 2 ? 'active' : '', 'icon')} />
                            </div>
                            <span className={cx(orderDetail.state_payment >= 2 ? 'active' : '')}>Đã xác nhận</span>
                        </div>
                        <div className={cx('item_state')}>
                            <div>
                                <Dangvanchuyen className={cx(orderDetail.state_payment >= 3 ? 'active' : '', 'icon')} />
                            </div>
                            <span className={cx(orderDetail.state_payment >= 3 ? 'active' : '')}>Đang vận chuyển</span>
                        </div>
                        <div className={cx('item_state')}>
                            <Dagiaohang className={cx(orderDetail.state_payment >= 4 ? 'active' : '', 'icon')} />
                            <span className={cx(orderDetail.state_payment >= 4 ? 'active' : '')}>Đã giao hàng</span>
                        </div>
                    </div>
                </div>
                <div className={cx('state_transform_getorder')}>
                    <div className={cx('state_transform')}>
                        <div className={cx('title_state')}>
                            <h3>TÌNH TRẠNG VẬN CHUYỂN</h3>
                            <span>
                                Nhà vận chuyển: <strong>{orderDetail.method_name}</strong>
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
                            <strong>{user.nameUser}</strong> - {user.phoneNumber}
                        </span>
                        <span>
                            {orderDetail.address}- {orderDetail.px} - {orderDetail.qh} -{orderDetail.tt}
                        </span>
                    </div>
                </div>
                <div className={cx('infor_detail')}>
                    <div className={cx('detail_title')}>
                        <div>
                            Shop: <span className={cx('blue_text')}>{orderDetail.tenshop}</span>
                        </div>
                        |
                        <div>
                            Hình thức thanh toán:
                            <strong>
                                <img src={orderDetail.payment_image}></img> {orderDetail.payment_method_name}
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
                        <div className={cx('product')}>
                            <div>
                                <img style={{ objectFit: 'cover' }} src={orderDetail.imageProduct}></img>
                                <strong>{orderDetail.nameProduct}</strong>
                            </div>
                            <div>
                                <span>{orderDetail.priceSale}</span>
                            </div>
                            <div>
                                <strong>{orderDetail.quantity}</strong>
                            </div>
                            <div>
                                <strong>
                                    {(orderDetail.priceSale * orderDetail.quantity).toLocaleString('vi-VN')}đ
                                </strong>
                            </div>
                        </div>
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
                                    <span>
                                        {(orderDetail.priceSale * orderDetail.quantity).toLocaleString('vi-VN')}
                                    </span>
                                </div>
                                <div className={cx('cost_transform')}>
                                    <span>Phí vận chuyển:</span>
                                    <span>
                                        {(
                                            orderDetail.priceSale *
                                            orderDetail.quantity *
                                            orderDetail.percent
                                        ).toLocaleString('vi-VN')}
                                        đ
                                    </span>
                                </div>
                                <div className={cx('total')}>
                                    <strong>Tổng thanh toán:</strong>
                                    <strong className={cx('red_text')}>
                                        {(
                                            orderDetail.priceSale * orderDetail.quantity -
                                            orderDetail.priceSale * orderDetail.quantity * orderDetail.percent
                                        ).toLocaleString('vi-VN')}
                                        đ
                                    </strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
