import classNames from 'classnames/bind';
import styles from './OrderSuccess.module.scss';
import CryptoJS from 'crypto-js';
import { json, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);
function OrderSuccess() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const secretKey = 'Phamvanbao_0123';

    const [order, setOrder] = useState(null);
    const [methodPayment, setmethodPayment] = useState(null);

    const encryptedIdShop = searchParams.get('order');

    // Giải mã chuỗi
    const bytes = CryptoJS.AES.decrypt(encryptedIdShop, secretKey);
    const idShopString = bytes.toString(CryptoJS.enc.Utf8);

    // Kiểm tra nếu giải mã thành công
    let idShopArray = [];
    try {
        idShopArray = JSON.parse(idShopString);
    } catch (error) {
        console.error('Failed to parse decrypted data:', error);
    }
    useEffect(() => {
        const id = idShopArray;
        fetch('https://sdvanbao17.id.vn/api/v1/getOrderCustomer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })
            .then((rs) => rs.json())
            .then((dt) => {
                setOrder(dt[0]);
                const payment_method_id = dt[0].payment_method_id;
                fetch('https://sdvanbao17.id.vn/api/v1/getPaymentWithId', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ payment_method_id }),
                })
                    .then((rs) => rs.json())
                    .then((d) => {
                        setmethodPayment(d[0]);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [idShopArray]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('container_left')}></div>
                <div className={cx('container_right')}>
                    <span className={cx('title')}>Đặt hàng thành công</span>
                    <span className={cx('thank')}>Cảm ơn bạn đã mua hàng tại sendo</span>
                    <div className={cx('code_order')}>
                        <span>Mã đơn hàng</span>
                        <span>{order != undefined ? order.id : ''}</span>
                    </div>
                    <div className={cx('method_payment_order')}>
                        <span>Phương thức thanh toán</span>
                        {methodPayment != null ? (
                            <span>
                                <img src={methodPayment.image}></img>
                                {methodPayment.method_name}
                            </span>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className={cx('total_order')}>
                        <span>Tổng thanh toán</span>
                        <span>{order != undefined ? (order.total_price * 1000).toLocaleString('vi-VN') : ''}đ</span>
                    </div>
                    <hr></hr>
                    <div className={cx('actions')}>
                        <a href="/">
                            <span>Tiếp tục mua sắm</span>
                        </a>
                        <a href="/">
                            <span>Xem chi tiết đơn hàng</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderSuccess;
