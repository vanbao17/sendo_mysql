import classNames from 'classnames/bind';
import styles from './AddAddressUser.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const nav = useNavigate();
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
        const tt = idtinh;
        const qh = idquan;
        const px = idxa;
        const loaidiachi = type;
        const address = refAddress.current.value;
        const idCustomers = user.idCustomers;
        fetch('http://localhost:3001/api/v1/addAddressCustomers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tt, qh, px, loaidiachi, address, idCustomers }),
        })
            .then((rs) => {
                if (rs.status == 200) {
                    nav('/thanh-toan');
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
                                    <option key={index} value={item.name}>
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
                                        <option key={index} value={item.name}>
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
                                        <option key={index} value={item.name}>
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
