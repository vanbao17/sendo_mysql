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
import { useEffect, useRef, useState } from 'react';
import { json, useLocation, useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
const cx = classNames.bind(styles);
function CheckOut() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [statePayment, setStatePayment] = useState(1);
    const [transformCate, settransformCate] = useState([]);
    const [shop, setShop] = useState([]);
    const [product, setProduct] = useState([]);
    const [total, settotal] = useState(0);
    const [addressUser, setAddressUser] = useState([]);
    const [trasnformMethod, setTrasnformMethod] = useState([]);
    const [trasnformMethodOption, settrasnformMethodOption] = useState([]);
    const [attributeVl, setattributeVl] = useState([]);
    const [catePayment, setcatePayment] = useState([]);
    const [PaymentOptions, setPaymentOptions] = useState([]);
    const [indexTransformOptions, setindexTransformOptions] = useState();
    const [indexPaymentOptions, setindexPaymentOptions] = useState();
    const [indexTransformMethod, setindexTransformMethod] = useState();
    const nav = useNavigate();
    const refStatus = useRef();

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
    useEffect(() => {
        if (product.length !== 0) {
            fetch(`https://sdvanbao17.id.vn/api/v1/getAttrVaulueProduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idProduct: product[product.length - 1].idProduct }),
            })
                .then((respone) => respone.json())
                .then((data) => {
                    setattributeVl(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [product]);
    useEffect(() => {
        fetch('https://sdvanbao17.id.vn/api/v1/inforShop/' + idShopArray[0].idShop)
            .then((rs) => rs.json())
            .then((dt) => setShop(dt[0]))
            .catch((err) => {
                if (err) {
                    console.log(err);
                }
            });
        fetch('https://sdvanbao17.id.vn/api/v1/getCatePayment')
            .then((rs) => rs.json())
            .then((dt) => {
                if (dt.length != 0) {
                    setcatePayment(dt);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        async function fetchData() {
            try {
                const promises = idShopArray.map(async (item) => {
                    const idProduct = item.idProduct;
                    const idCustomer = user.idCustomers;
                    const productsCartResponse = await fetch(`https://sdvanbao17.id.vn/api/v1/check-prods-select`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ idProduct, idCustomer }),
                    });
                    const productsCart = await productsCartResponse.json();

                    const dataResponse = await fetch(`https://sdvanbao17.id.vn/api/v1/detail/${item.idProduct}`);
                    const data = await dataResponse.json();

                    return { ...data[0], ...productsCart[0] };
                });

                const newData = await Promise.all(promises);
                setProduct([...product, ...newData]);
            } catch (error) {
                console.log(error);
            }
            const getTransformCateResponse = await fetch(`https://sdvanbao17.id.vn/api/v1/getTransformCate`);
            const getTransformCate = await getTransformCateResponse.json();
            settransformCate(getTransformCate);
            fetch(`https://sdvanbao17.id.vn/api/v1/getAddressCustomer/` + user.idCustomers)
                .then((respone) => respone.json())
                .then((data) => {
                    setAddressUser(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        fetchData();
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
    useEffect(() => {
        if (transformCate.length != 0) {
            transformCate.filter((cate) => {
                const check = attributeVl.some((item) => item.attribute_value_id === cate.id);
                if (check == true) {
                    setTrasnformMethod(cate);
                    const delivery_method_id = cate.id;
                    fetch('https://sdvanbao17.id.vn/api/v1/getTransformOptions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ delivery_method_id }),
                    })
                        .then((rs) => rs.json())
                        .then((dt) => {
                            settrasnformMethodOption(dt);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            });
        }
    }, [transformCate, attributeVl]);
    useEffect(() => {
        const category_id = statePayment;
        fetch('https://sdvanbao17.id.vn/api/v1/getPaymentWithCate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ category_id }),
        })
            .then((rs) => rs.json())
            .then((dt) => {
                setPaymentOptions(dt);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [statePayment]);
    const handleOrderProduct = async () => {
        const idCustomers = user.idCustomers;
        const total_price = (total - (trasnformMethod.percent * total) / 10).toLocaleString('vi-VN');
        const status = refStatus.current.value;
        const payment_method_id = indexPaymentOptions;
        const address_id = addressUser[0].id;
        const transform_method_id = trasnformMethod.id;
        const transform_option_id = indexTransformOptions;
        const order_item = [];
        await product.forEach((pd) => {
            order_item.push({ idProduct: pd.idProduct, quantity: pd.quanlityCart, price: pd.priceSale });
        });
        const idShop = product[0].idShop;
        fetch('https://sdvanbao17.id.vn/api/v1/addOderProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idCustomers,
                total_price,
                status,
                payment_method_id,
                address_id,
                transform_method_id,
                transform_option_id,
                idShop,
                order_item,
            }),
        })
            .then((rs) => rs.json())
            .then((dt) => {
                const encryptedIdShop = CryptoJS.AES.encrypt(JSON.stringify(dt), secretKey).toString();
                window.location.href = `/thanh-toan-thanh-cong?order=${encodeURIComponent(encryptedIdShop)}`;
            })
            .catch((err) => {
                console.log(err);
            });
    };
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
                                    <span>{user.nameCustomers}</span>|<p>{user.phoneNumber}</p>
                                </div>
                                <div className={cx('address')}>
                                    <span> {addressUser.loaidiachi == 0 ? 'Nhà riêng' : 'Cơ quan'}</span>
                                    {addressUser.length !== 0
                                        ? addressUser[0].address +
                                          ', ' +
                                          addressUser[0].px +
                                          ', ' +
                                          addressUser[0].qh +
                                          ', ' +
                                          addressUser[0].tt
                                        : ''}
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
                                    title={trasnformMethod.method_name}
                                    image={trasnformMethod.image}
                                    desc={trasnformMethod.description + ' ' + trasnformMethod.estimated_delivery_time}
                                    titleRight={
                                        <>
                                            <span>
                                                {((trasnformMethod.percent * total) / 10).toLocaleString('vi-VN')}đ
                                            </span>
                                            <InforIcon width="16px" height="16px" className={cx('icon_infor')} />
                                        </>
                                    }
                                />
                                <div className={cx('list_chose_method')}>
                                    {trasnformMethodOption.map((it, index) => {
                                        return (
                                            <ItemTranformMethod
                                                key={index}
                                                idTransform={it.id}
                                                checked={indexTransformOptions == it.id ? true : false}
                                                title={it.option_name}
                                                desc={it.description}
                                                handleIndex={(data) => {
                                                    setindexTransformOptions(data.data);
                                                }}
                                            />
                                        );
                                    })}
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
                                    {catePayment.length !== 0
                                        ? catePayment.map((item) => {
                                              return (
                                                  <span
                                                      key={item.id}
                                                      className={cx(statePayment == item.id ? 'active' : '')}
                                                      onClick={() => {
                                                          setStatePayment(item.id);
                                                      }}
                                                  >
                                                      {item.category_name}
                                                  </span>
                                              );
                                          })
                                        : ''}
                                </div>
                                <div className={cx('checkout_container')}>
                                    <div className={cx('list_method_pay')}>
                                        {PaymentOptions.map((item, index) => {
                                            return (
                                                <ItemTranformMethod
                                                    key={index}
                                                    classNames={[
                                                        'payment',
                                                        'method_pay',
                                                        item.state == 0 ? 'point' : '',
                                                    ]}
                                                    checked={indexPaymentOptions == item.id ? true : false}
                                                    title={item.method_name}
                                                    desc={item.description}
                                                    titleRight={
                                                        <img
                                                            style={{ width: '24px', height: '24px' }}
                                                            src={item.image}
                                                        ></img>
                                                    }
                                                    idTransform={item.id}
                                                    handleIndex={(data) => {
                                                        setindexPaymentOptions(data.data);
                                                    }}
                                                />
                                            );
                                        })}
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
                                {product.map((prod, index) => {
                                    return (
                                        <div key={index} className={cx('infor_product')}>
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
                                            ref={refStatus}
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
                                    <strong>{total.toLocaleString('vi-VN')}đ</strong>
                                </div>
                                <div className={cx('total_price_ship')}>
                                    <span>Phí giao hàng</span>
                                    <strong>{((trasnformMethod.percent * total) / 10).toLocaleString('vi-VN')}đ</strong>
                                </div>
                                <div className={cx('line_through')}></div>
                                <div className={cx('total_cost')}>
                                    <span>Tổng thanh toán</span>
                                    <span className={cx('total')}>
                                        {(total - (trasnformMethod.percent * total) / 10).toLocaleString('vi-VN')}đ
                                    </span>
                                </div>
                                <button
                                    onClick={() => {
                                        handleOrderProduct();
                                    }}
                                >
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
