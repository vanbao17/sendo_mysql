import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { important } from '../../../Assets/images/image/image';
import CartItem from './CartItem';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);
function Cart() {
    const location = useLocation();
    const idUser = location.state?.dt;
    const [update, setupdate] = useState(true);
    const [selectAll, setselectAll] = useState(false);
    const [dataCarts, setdataCarts] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3001/api/v1/gio-hang/1`)
            .then((response) => response.json())
            .then((data) => setdataCarts(data))
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const handleDeleteCart = (data) => {
        console.log(data);
        const dataToDelete = {
            idUser: 1,
            idProduct: data,
        };
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToDelete),
        };
        fetch('http://localhost:3001/api/v1/delete-cart', options)
            .then((response) => {
                console.log(response.status);
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
                                        <h3>0đ</h3>
                                    </div>
                                    <div className={cx('btn-buynow')}>
                                        <button>
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
