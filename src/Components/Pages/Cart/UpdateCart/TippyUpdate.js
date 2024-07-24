import classNames from 'classnames/bind';
import styles from './TippyUpdate.module.scss';
import { useEffect, useState } from 'react';
import ColorsBtn from '../../../ColorsBtn/ColorsBtn';
import SizesBtn from '../../../SizesBtn/SizesBtn';
const cx = classNames.bind(styles);

function TippyUpdate({ data, colorItem, sizeItem, idProduct }) {
    const [colors, setcolors] = useState([]);
    const [sizes, setsizes] = useState([]);
    const [cl, setcolor] = useState();
    const [s, setsize] = useState();
    const handleUpdateCart = () => {
        const id = data.idCart;
        fetch(`https://sdvanbao17.id.vn/api/v1/updateCartColorSize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ s, cl, id }),
        })
            .then((respone) => {
                if (respone.status == 200) {
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getDataSize = (dt) => {
        setsize(dt.attribute_value_id);
    };
    const getDataColor = (dt) => {
        setcolor(dt.attribute_value_id);
    };
    return (
        <div className={cx('container-update')}>
            <div className={cx('size')}>
                <span className={cx('title')}>
                    Chọn kích thước:<strong>{sizeItem != undefined ? sizeItem.value : ''}</strong>
                </span>
                <div className={cx('list-sizes')}>
                    <SizesBtn
                        handleSendData={getDataSize}
                        idProduct={idProduct}
                        data={sizeItem != undefined ? sizeItem : null}
                        title={true}
                    />
                    {/* {sizes.map((item, index) => {
                        return (
                            <button
                                key={index}
                                className={cx(
                                    'item',
                                    sizeItem !== undefined
                                        ? sizeItem.attribute_value_id == item.attribute_value_id
                                            ? 'active'
                                            : ''
                                        : '',
                                )}
                                onClick={() => {
                                    setactive(index);
                                    setdtupdate({ size: item, color: dtupdate.color });
                                }}
                            >
                                {item.value}
                            </button>
                        );
                    })} */}
                </div>
            </div>
            <div className={cx('color')}>
                <span className={cx('title')}>
                    Chọn màu sắc:<strong>{colorItem != undefined ? colorItem.value : ''}</strong>
                </span>
                <div className={cx('list-colors')}>
                    <ColorsBtn
                        data={colorItem != undefined ? colorItem : null}
                        handleSendData={getDataColor}
                        idProduct={idProduct}
                        dataColor={true}
                        title={true}
                    />
                </div>
            </div>
            {/* <span className={cx('price')}>
                Đơn giá :<strong>23.000đ</strong>
            </span> */}
            <button className={cx('btn-update')} onClick={handleUpdateCart}>
                <span>Cập nhật</span>
            </button>
        </div>
    );
}

export default TippyUpdate;
