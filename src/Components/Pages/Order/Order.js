import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import ProfileSendo from '../../Layout/Components/ProfileSendo/ProfileSendo';
import { useEffect, useState } from 'react';
import OrderItem from './OrderItem';

const cx = classNames.bind(styles);

function Order() {
    const [selectedOption, setSelectedOption] = useState('');
    const [active, setactive] = useState(1);
    const [orders, seOrders] = useState([]);
    const [addressCustomer, setAddressCustomer] = useState([]);
    const [productOrderItem, setProductOrderItem] = useState([]);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
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
            name: 'Đã hủy ',
        },
        {
            index: 5,
            name: 'Đã giao hàng',
        },
    ];
    useEffect(() => {
        const idCustomers = user.idCustomers;
        const state = active;
        fetch('https://sdvanbao17.id.vn/api/v1/getOrderIdCustomer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idCustomers }),
        })
            .then((rs) => rs.json())
            .then((dt) => {
                seOrders(dt);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [active]);
    useEffect(() => {
        if (orders.length > 0) {
            const idCustomer = orders[0].idCustomers;
            fetch('https://sdvanbao17.id.vn/api/v1/getAddressCustomer/' + idCustomer)
                .then((rs) => rs.json())
                .then((dt) => {
                    setAddressCustomer(dt[0]);
                })
                .catch((err) => {
                    console.log(err);
                });
            // fetch('https://sdvanbao17.id.vn/api/v1/inforShop/' + orders[0].idShop)
            //     .then((rs) => rs.json())
            //     .then((dt) => {
            //         setShop(dt[0]);
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
        }
    }, [orders]);
    return (
        <ProfileSendo>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('title')}>Quản lý đơn hàng</div>
                    <div className={cx('content')}>
                        <div className={cx('filter_container')}>
                            <div></div>
                            <div className={cx('filter')}>
                                <select id="combobox" value={selectedOption} onChange={handleChange}>
                                    <option value="">--Tất cả --</option>
                                    <option value={7}>Trong 7 ngày</option>
                                    <option value={30}>Trong 30 ngày</option>
                                    <option value={30 * 6}>Trong 6 tháng</option>
                                    <option value={365}>Trong 1 năm</option>
                                </select>
                            </div>
                        </div>
                        <div className={cx('list_nav_donhang')}>
                            {lis_nav.map((nav) => {
                                const check = orders.filter((it) => nav.index === it.state);
                                return (
                                    <span
                                        onClick={() => {
                                            setactive(nav.index);
                                        }}
                                        className={cx(nav.index == active ? 'active' : '')}
                                        key={nav.index}
                                    >
                                        {nav.name} {check.length > 0 ? '(' + check.length + ')' : ''}
                                    </span>
                                );
                            })}
                        </div>
                        <hr></hr>
                        {orders.map((item, index) => {
                            if (item.state == active) {
                                return <OrderItem Order={orders} data={item} key={index} />;
                            }
                        })}
                    </div>
                </div>
            </div>
        </ProfileSendo>
    );
}

export default Order;
