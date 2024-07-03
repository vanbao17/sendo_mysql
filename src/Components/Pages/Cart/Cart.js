import { Link, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { important } from '../../../Assets/images/image/image';
import CartItem from './CartItem';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../store/Context';
import CryptoJS from 'crypto-js';
const cx = classNames.bind(styles);
function Cart() {
    const [update, setupdate] = useState(true);
    const [selectAll, setselectAll] = useState(false);
    const [dataCarts, setdataCarts] = useState([]);
    const [total, settotal] = useState(null);
    const [totalPayment, setTotalPayment] = useState([]);
    const { idShop } = useContext(Context);
    const nav = useNavigate();
    const user = JSON.parse(sessionStorage.getItem('user'));
    useEffect(() => {
        fetch(`https://sdvanbao17.id.vn/api/v1/gio-hang/` + user.idCustomers)
            .then((response) => response.json())
            .then((data) => setdataCarts(data))
            .catch((err) => {
                console.log(err);
            });
    }, []);
    useEffect(() => {
        let total = 0;
        if (totalPayment.length != 0) {
            totalPayment.forEach((item) => {
                if (item.data.priceSale) {
                    total = total + item.data.priceSale * item.data.quanlityCart;
                } else {
                    total = total + item.data.priceDefault * item.data.quanlityCart;
                }
            });
            settotal(total);
        } else {
            settotal(0);
        }
    }, [totalPayment]);
    const handleDeleteCart = (data) => {
        const dataToDelete = {
            idUser: user.idCustomers,
            idProduct: data,
        };
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToDelete),
        };
        fetch('https://sdvanbao17.id.vn/api/v1/delete-cart', options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to delete item from cart');
                }
                return response.json();
            })
            .then((data) => setdataCarts(data))
            .catch((err) => {
                console.log(err);
            });
    };
    const handleBuyNow = () => {
        fetch('https://sdvanbao17.id.vn/api/v1/getAddressCustomer/' + user.idCustomers)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to delete item from cart');
                }
                return response.json();
            })
            .then((data) => {
                if (data.length == 0) {
                    nav('/them-dia-chi');
                } else {
                    const arr = totalPayment.map((item) => item.data);
                    const secretKey = 'Phamvanbao_0123';
                    const idShopString = JSON.stringify(arr);
                    const encryptedIdShop = CryptoJS.AES.encrypt(idShopString, secretKey).toString();
                    window.location.href = `/thanh-toan?product=${encodeURIComponent(encryptedIdShop)}`;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleSumProduct = (dt) => {
        if (dt.state == true) {
            setTotalPayment([...totalPayment, dt]);
        } else {
            const filterProduct = totalPayment.filter((item) => item.data.idCart !== dt.data.idCart);
            setTotalPayment(filterProduct);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {/* {location.state?.data.name}
                <div>Hello</div> */}
                {dataCarts.length == 0 ? (
                    <div className={cx('CartEmpty')}>
                        <img src={important.cartEmty} alt=""></img>
                        <h2>Giỏ hàng cảm thấy trống trải</h2>
                        <h3>Ai đó ơi, mua sắm để nhận khuyến mãi từ Sendo ngay!</h3>
                        <Link to="/" className={cx('btn-comehome')}>
                            Mua sắm ngay
                        </Link>
                    </div>
                ) : (
                    <div className={cx('your-cart')}>
                        <div className={cx('title')}>
                            <h3>Giỏ hàng của bạn ({dataCarts.length})</h3>
                            {update && (
                                <span
                                    className={cx('update')}
                                    onClick={() => {
                                        setupdate(false);
                                    }}
                                >
                                    Sửa
                                </span>
                            )}
                        </div>
                        <div className={cx('container-list')}>
                            <div className={cx('list-carts')}>
                                {dataCarts.map((item, index) => {
                                    return (
                                        <CartItem
                                            handleDeleteCart={handleDeleteCart}
                                            key={index}
                                            data={item}
                                            update={update}
                                            select={selectAll}
                                            handleSendData={handleSumProduct}
                                        />
                                    );
                                })}

                                {!update && (
                                    <div className={cx('item', 'action')}>
                                        <div className={cx('selectAll')}>
                                            <input
                                                type="checkbox"
                                                onClick={() => {
                                                    setselectAll(!selectAll);
                                                }}
                                            />
                                            <span>Tất cả</span>
                                        </div>
                                        <div className={cx('action-select')}>
                                            <button
                                                className={cx('btn-select', !selectAll && 'dis')}
                                                disabled={!selectAll ? true : false}
                                            >
                                                <span>Yêu thích</span>
                                            </button>
                                            <button
                                                className={cx('btn-select', !selectAll && 'dis')}
                                                disabled={!selectAll ? true : false}
                                            >
                                                <span>Xóa</span>
                                            </button>
                                            <button className={cx('btn-select')}>
                                                <span
                                                    onClick={() => {
                                                        setupdate(!update);
                                                    }}
                                                >
                                                    Xong
                                                </span>
                                            </button>
                                        </div>
                                        <div className={cx('background-sticky')}></div>
                                    </div>
                                )}
                            </div>
                            {update && (
                                <div className={cx('total')}>
                                    <div className={cx('voucherSendo')}>
                                        <span>Mã ưu đãi Sendo (15)</span>
                                        <span className={cx('enterCode')}>Chọn/nhập mã</span>
                                    </div>
                                    <hr></hr>
                                    <div className={cx('resultTotal')}>
                                        <span>Tạm tính: </span>
                                        <h3>{total != null ? total.toLocaleString('vi-VN') : 0}đ</h3>
                                    </div>
                                    <div className={cx('btn-buynow')}>
                                        <button onClick={handleBuyNow}>
                                            <span>Mua Ngay</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
