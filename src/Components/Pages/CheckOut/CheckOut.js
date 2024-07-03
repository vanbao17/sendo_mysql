import classNames from 'classnames/bind';
import styles from './CheckOut.module.scss';
import ItemContainerCheckOut from './ItemContainerCheckOut';
import {
    InforIcon,
    InforProductIcon,
    LocationIcon,
    SaleIcon,
    ShipperIcon,
    VoucherIcon,
    WalletIcon,
} from '../../IconSvg/IconSvg';
import ItemTranformMethod from './ItemTranformMethod';
import { useEffect, useState } from 'react';
import { json, useLocation } from 'react-router-dom';
import CryptoJS from 'crypto-js';
const cx = classNames.bind(styles);
function CheckOut() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [statePayment, setStatePayment] = useState(false);
    const [shop, setShop] = useState([]);
    const [product, setProduct] = useState([]);
    const [total, settotal] = useState(0);
    const [addressUser, setAddressUser] = useState([]);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const secretKey = 'Phamvanbao_0123';
    const encryptedIdShop = searchParams.get('product');
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
    console.log(idShopArray);
    useEffect(() => {
        fetch('https://sdvanbao17.id.vn/api/v1/inforShop/' + idShopArray[0].idShop)
            .then((rs) => rs.json())
            .then((dt) => setShop(dt[0]))
            .catch((err) => {
                if (err) {
                    console.log(err);
                }
            });
        idShopArray.forEach((item) => {
            fetch(`https://sdvanbao17.id.vn/api/v1/check-prods-select/${item.idProduct}`)
                .then((rs) => rs.json())
                .then((productsCart) => {
                    fetch(`https://sdvanbao17.id.vn/api/v1/detail/${item.idProduct}`)
                        .then((respone) => respone.json())
                        .then((data) => setProduct([...product, { ...data[0], ...productsCart[0] }]))
                        .catch((error) => {
                            console.log(error);
                        });
                });
        });

        fetch(`https://sdvanbao17.id.vn/api/v1/getAddressCustomer/` + user.idCustomers)
            .then((respone) => respone.json())
            .then((data) => {
                setAddressUser(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        let total = 0;
        if (product.length != 0) {
            product.forEach((item) => {
                if (item.priceSale) {
                    total = total + item.priceSale * item.quanlityCart;
                } else {
                    total = total + item.priceDefault * item.quanlityCart;
                }
            });
            settotal(total);
        } else {
            settotal(0);
        }
    }, [product]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title')}>
                    <span>XÁC NHẬN - THANH TOÁN</span>
                </div>

                <div className={cx('content')}>
                    <div className={cx('content_left')}>
                        <ItemContainerCheckOut
                            titleLeft={
                                <>
                                    <LocationIcon className={cx('icon')} width="18px" height="18px" />
                                    <span>Địa chỉ nhận hàng</span>
                                </>
                            }
                            titleRight={
                                <>
                                    <span>Thay đổi</span>
                                    <div className={cx('tamgiac')}></div>
                                </>
                            }
                        >
                            <div className={cx('container_item')}>
                                <div className={cx('infor')}>
                                    <span>Phạm Văn Bảo</span>|<p>0904973022</p>
                                </div>
                                <div className={cx('address')}>
                                    <span>Nhà riêng</span>
                                    tổ 4 kp xuyên đông na phước duy xuyên quảng nam, Thị trấn Nam Phước, Huyện Duy
                                    Xuyên, Quảng Nam
                                </div>
                            </div>
                        </ItemContainerCheckOut>
                        <ItemContainerCheckOut
                            titleLeft={
                                <>
                                    <ShipperIcon className={cx('icon')} width="18px" height="18px" />
                                    <span>Phương thức giao hàng</span>
                                </>
                            }
                            titleRight={<></>}
                        >
                            <div className={cx('container_item')}>
                                <ItemTranformMethod
                                    checked={true}
                                    title={'Giao Tiêu chuẩn'}
                                    image={'https://media3.scdn.vn/img3/2019/8_12/hrrOd1.png'}
                                    desc={'Dự kiến thứ 2, 1/7'}
                                    titleRight={
                                        <>
                                            <span>26.000đ</span>
                                            <InforIcon width="16px" height="16px" className={cx('icon_infor')} />
                                        </>
                                    }
                                />
                                <div className={cx('list_chose_method')}>
                                    <ItemTranformMethod
                                        title={'Từ thứ 2 - thứ 6 (8-18h)'}
                                        desc={'Phù hợp với địa chỉ văn phòng/cơ quan. '}
                                    />
                                    <ItemTranformMethod
                                        checked={true}
                                        title={'Cả tuần (trừ CN & ngày lễ)'}
                                        desc={
                                            'Phù hợp với địa chỉ nhà riêng, luôn có người nhận. Giao hàng từ 8:00 - 18:00'
                                        }
                                    />
                                </div>
                            </div>
                        </ItemContainerCheckOut>
                        <ItemContainerCheckOut
                            titleLeft={
                                <>
                                    <WalletIcon className={cx('icon')} width="18px" height="18px" />
                                    <span>Phương thức thanh toán</span>
                                </>
                            }
                            titleRight={<></>}
                        >
                            <div className={cx('container_item')}>
                                <div className={cx('nav_checkout_container')}>
                                    <span
                                        className={cx(statePayment == false ? 'active' : '')}
                                        onClick={() => {
                                            setStatePayment(!statePayment);
                                        }}
                                    >
                                        Sendo gợi ý
                                    </span>
                                    <span
                                        onClick={() => {
                                            setStatePayment(!statePayment);
                                        }}
                                        className={cx(statePayment == true ? 'active' : '')}
                                    >
                                        Mua trước trả sau{' '}
                                    </span>
                                </div>
                                <div className={cx('checkout_container')}>
                                    <div className={cx('list_method_pay')}>
                                        {statePayment == false ? (
                                            <>
                                                <ItemTranformMethod
                                                    classNames={['payment', 'method_pay']}
                                                    title={'Ví MoMo'}
                                                    desc={'Nhớ kiểm tra số dư trước khi thanh toán bạn nhé.'}
                                                    titleRight={
                                                        <img
                                                            style={{ width: '24px', height: '24px' }}
                                                            src="https://media3.scdn.vn/img4/2021/06_08/TgFdj5SXwtFP3STJ6mfk.png"
                                                        ></img>
                                                    }
                                                />
                                                <ItemTranformMethod
                                                    classNames={['payment', 'method_pay']}
                                                    title={'Tiền mặt (COD)'}
                                                    desc={'Phí thu hộ: Miễn Phí'}
                                                    titleRight={
                                                        <img
                                                            style={{ width: '24px', height: '24px' }}
                                                            src="https://media3.scdn.vn/img4/2021/03_31/fMfdU81WB18wSe2LKOWW.png"
                                                        ></img>
                                                    }
                                                />
                                                <ItemTranformMethod
                                                    classNames={['payment', 'method_pay', 'point']}
                                                    title={'Ví SenPay'}
                                                    desc={'Số dư: 0đ'}
                                                    titleRight={
                                                        <img
                                                            style={{ width: '24px', height: '24px' }}
                                                            src="https://media3.scdn.vn/img4/2021/05_14/oposINBx6SyQhflKKhUX.png"
                                                        ></img>
                                                    }
                                                />
                                                <ItemTranformMethod
                                                    classNames={['payment', 'method_pay', 'point']}
                                                    title={'Thanh toán kết hợp'}
                                                    desc={'Số dư trong Ví SenPay phải có ít nhất 1.000đ để thanh toán.'}
                                                    titleRight={
                                                        <img
                                                            style={{ width: '24px', height: '24px' }}
                                                            src="https://media3.scdn.vn/img4/2021/05_17/3TrUQZxPPqe9RqgEJ0D4.png"
                                                        ></img>
                                                    }
                                                />
                                                <div className={cx('button_add_method')}>
                                                    <button>
                                                        <span>Thêm phương thức khác</span>
                                                    </button>
                                                </div>
                                                <div className={cx('list_image_bank')}>
                                                    <img src="https://media3.scdn.vn/img4/2021/08_09/qIIWONXoKSmIyMqi1x0p.png"></img>
                                                    <img src="https://media3.scdn.vn/img4/2021/08_09/ZLcKkkyD3cfygVcrfI9R.png"></img>
                                                    <img src="https://media3.scdn.vn/img4/2021/08_09/ZLcKkkyD3cfygVcrfI9R.png"></img>
                                                    <img src="https://media3.scdn.vn/img4/2021/08_09/b1FgApo9krOeImlPAHJq.png"></img>
                                                    <img src="https://media3.scdn.vn/img4/2021/08_09/ACZZo7BchIz2wW3mYiBq.png"></img>
                                                    <img src="https://media3.scdn.vn/img4/2021/08_09/gt2XsOs28xo0GXzi8xYG.png"></img>
                                                    <img src="https://media3.scdn.vn/img4/2021/08_09/8ZTe1mKibhY4nT4VCC5F.png"></img>
                                                    <img src="https://media3.scdn.vn/img4/2021/11_01/9h9J2A887ybJNDVdMI5y.png"></img>
                                                    <img src="https://media3.scdn.vn/img4/2022/05_23/Bi78sj9Rf960TB34S6wE.png"></img>
                                                    <img src="https://media3.scdn.vn/img4/2023/08_28/CTuWw5fcgedY3zdIcVPT.png"></img>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <ItemTranformMethod
                                                    classNames={['payment', 'method_pay', 'point']}
                                                    title={'Muadee'}
                                                    desc={'Áp dụng cho tổng thanh toán từ 200.000đ trở lên.'}
                                                    image={
                                                        'https://media3.scdn.vn/img4/2022/12_23/KwKYYua9Mcu9cCakmLwI.png'
                                                    }
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </ItemContainerCheckOut>
                    </div>
                    <div className={cx('content_right')}>
                        <ItemContainerCheckOut
                            titleLeft={
                                <>
                                    <SaleIcon className={cx('icon')} width="18px" height="18px" />
                                    <span>Mã ưu đãi Sendo (8)</span>
                                </>
                            }
                            titleRight={<></>}
                        >
                            <div className={cx('add_voucher')}>Chọn / Nhập mã</div>
                        </ItemContainerCheckOut>
                        <ItemContainerCheckOut
                            titleLeft={
                                <>
                                    <InforProductIcon className={cx('icon')} width="18px" height="18px" />
                                    <span>Thông tin đơn hàng</span>
                                </>
                            }
                            titleRight={<></>}
                        >
                            <div className={cx('container_item')}>
                                <div className={cx('infor_shop')}>
                                    <span>
                                        Bán bởi shop: <strong>{shop.tenshop}</strong>
                                    </span>
                                    <img
                                        style={{ width: '44px' }}
                                        src="https://media3.scdn.vn/img4/2020/07_30/h6fJaiL5WkEbDU2eQRZb.png"
                                    ></img>
                                </div>
                                {product.map((prod) => {
                                    return (
                                        <div className={cx('infor_product')}>
                                            <img src={prod.imageProduct}></img>
                                            <div className={cx('detail_product')}>
                                                <p>{prod.nameProduct}</p>
                                                <div className={cx('price_product')}>
                                                    <span>
                                                        {prod.priceSale != undefined
                                                            ? prod.priceSale.toLocaleString('vi-VN')
                                                            : prod.priceSale}
                                                        đ
                                                    </span>
                                                    <span>
                                                        {prod.priceDefault != undefined
                                                            ? prod.priceDefault.toLocaleString('vi-VN')
                                                            : prod.priceDefault}
                                                        đ
                                                    </span>
                                                </div>
                                            </div>
                                            <span>x{prod.quanlityCart}</span>
                                        </div>
                                    );
                                })}

                                <div className={cx('line_through')}></div>
                                <div className={cx('voucher_shop')}>
                                    <div className={cx('title_voucher_shop')}>
                                        <div className={cx('left_voucher_shop')}>
                                            <SaleIcon className={cx('icon')} width="18px" height="18px" />
                                            <span>Mã giảm giá của Shop</span>
                                        </div>
                                        <div className={cx('right_voucher_shop')}>
                                            <span>Chọn/nhập mã</span>
                                        </div>
                                    </div>
                                    <div className={cx('line_through')}></div>
                                    <div className={cx('text_voucher_shop')}>
                                        <textarea
                                            placeholder="Ghi chú cho shop"
                                            className={cx('textare_voucher')}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </ItemContainerCheckOut>
                        <div className={cx('totle_cost')}>
                            <div className={cx('container_total')}>
                                <div className={cx('total_price_product')}>
                                    <span>Tiền hàng</span>
                                    <strong>4.000đ</strong>
                                </div>
                                <div className={cx('total_price_ship')}>
                                    <span>Phí giao hàng</span>
                                    <strong>4.000đ</strong>
                                </div>
                                <div className={cx('line_through')}></div>
                                <div className={cx('total_cost')}>
                                    <span>Tổng thanh toán</span>
                                    <span className={cx('total')}>{total.toLocaleString('vi-VN')}đ</span>
                                </div>
                                <button>
                                    <span>Thanh Toán</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckOut;
