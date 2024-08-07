import classNames from 'classnames/bind';
import styles from './AddAddressUser.module.scss';
import { useEffect, useRef, useState } from 'react';
import CryptoJS from 'crypto-js';
import { useLocation, useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function AddAddressUser() {
    const [idtinh, setidtinh] = useState(null);
    const [idquan, setidquan] = useState(null);
    const [idxa, setidxa] = useState(null);
    const [tinh, settinh] = useState([]);
    const [huyen, sethuyen] = useState([]);
    const [xa, setxa] = useState([]);
    const [type, settype] = useState();
    const refAddress = useRef();
    const user = JSON.parse(sessionStorage.getItem('user'));
    const secretKey = 'Phamvanbao_0123';
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
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
        fetch('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then((rs) => rs.json())
            .then((dt) => settinh(dt.data))
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (tinh.length != 0) {
            fetch(`https://esgoo.net/api-tinhthanh/2/${idtinh}.htm`)
                .then((rs) => rs.json())
                .then((dt) => sethuyen(dt.data))
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [idtinh]);
    useEffect(() => {
        if (huyen.length != 0) {
            fetch(`https://esgoo.net/api-tinhthanh/3/${idquan}.htm`)
                .then((rs) => rs.json())
                .then((dt) => setxa(dt.data))
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [idquan]);
    const handleAddAddress = () => {
        const tt = tinh.filter((t) => t.id == idtinh)[0].name;
        const qh = huyen.filter((t) => t.id == idquan)[0].name;
        const px = xa.filter((t) => t.id == idxa)[0].name;
        const loaidiachi = type;
        const address = refAddress.current.value;
        const idCustomers = user.idCustomers;
        fetch('https://sdvanbao17.id.vn/api/v1/addAddressCustomers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tt, qh, px, loaidiachi, address, idCustomers }),
        })
            .then((rs) => {
                if (rs.status == 200) {
                    const test = JSON.stringify(idShopArray);
                    const a = CryptoJS.AES.encrypt(test, secretKey).toString();
                    window.location.href = `/thanh-toan?product=${encodeURIComponent(a)}`;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <span>Thêm địa chỉ</span>
                </div>
                <div className={cx('form')}>
                    <div className={cx('container_input')}>
                        <span>Tên khách hàng</span>
                        <input type="text" readOnly value={user.nameCustomers}></input>
                    </div>
                    <div className={cx('container_input')}>
                        <span>Số điện thoại</span>
                        <input type="text" readOnly value={user.phoneNumber}></input>
                    </div>
                    <div className={cx('container_input')}>
                        <span>Tỉnh thành</span>
                        <select
                            value={idtinh}
                            onChange={(e) => {
                                setidtinh(e.target.value);
                            }}
                        >
                            <option value="">--Vui lòng chọn tỉnh thành--</option>
                            {tinh.map((item, index) => {
                                return (
                                    <option key={index} value={item.id}>
                                        {item.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className={cx('container_input')}>
                        <span>Quận huyện</span>
                        <select
                            value={idquan}
                            onChange={(e) => {
                                setidquan(e.target.value);
                            }}
                        >
                            <option value="">--Vui lòng chọn quận huyện --</option>
                            {huyen != null ? (
                                huyen.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })
                            ) : (
                                <></>
                            )}
                        </select>
                    </div>
                    <div className={cx('container_input')}>
                        <span>Phường xã</span>
                        <select
                            value={idxa}
                            onChange={(e) => {
                                setidxa(e.target.value);
                            }}
                        >
                            <option value="">--Vui lòng chọn phường xã--</option>
                            {xa != null ? (
                                xa.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })
                            ) : (
                                <></>
                            )}
                        </select>
                    </div>

                    <div className={cx('container_input')}>
                        <span>Địa chỉ</span>
                        <input ref={refAddress} type="text"></input>
                    </div>
                    <div className={cx('container_input')}>
                        <span>Loại địa chỉ</span>
                        <div className={cx('checkboxs')}>
                            <div className={cx('item_checkbox')}>
                                <span>Nhà riêng</span>
                                <input
                                    onClick={() => {
                                        settype(0);
                                    }}
                                    checked={type == 0 ? true : false}
                                    type="checkbox"
                                ></input>
                            </div>
                            <div className={cx('item_checkbox')}>
                                <span>Công ty</span>
                                <input
                                    onClick={() => {
                                        settype(1);
                                    }}
                                    checked={type == 1 ? true : false}
                                    type="checkbox"
                                ></input>
                            </div>
                        </div>
                    </div>
                    <div className={cx('button')}>
                        <div></div>
                        <button onClick={handleAddAddress}>
                            <span>Cập nhật</span>
                        </button>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddAddressUser;
