import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faChevronRight,
    faChevronUp,
    faCircleInfo,
    faHeart,
    faMessage,
    faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import TippyHeadless from '@tippyjs/react/headless';
import TippyUpdate from './UpdateCart/TippyUpdate';
import Count from '../../Count/Count';
const cx = classNames.bind(styles);

function CartItem({ update, data, handleDeleteCart, handleSendData }) {
    const [showTippy, setshowTippy] = useState(false);
    const [color, setcolor] = useState();
    const [size, setsize] = useState();
    const [quanlity, setquanlity] = useState(1);
    // const [listbuys, setlistbuys] = useState([]);
    function renderSizeColor() {
        return <TippyUpdate data={data} idProduct={data.idProduct} colorItem={color} sizeItem={size} />;
    }
    const handleQuanlity = (dt) => {
        setquanlity(dt);
    };
    useEffect(() => {
        if (data.length != 0) {
            fetch(`https://sdvanbao17.id.vn/api/v1/getColorSize/` + data.color)
                .then((response) => response.json())
                .then((dt) => setcolor(dt[0]))
                .catch((err) => {
                    console.log(err);
                });
            fetch(`https://sdvanbao17.id.vn/api/v1/getColorSize/` + data.size)
                .then((response) => response.json())
                .then((dt) => setsize(dt[0]))
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [data]);
    return (
        <div className={cx('item')}>
            <div className={cx('infor-shop')}>
                <div className={cx('image-shop')}>
                    <div className={cx('img')}>
                        {!update && <input type={'checkbox'} className={cx('checkbox')} />}

                        <img src={data.imageShop} alt=""></img>
                    </div>
                    <span>{data.tenshop}</span>
                </div>
                {update && (
                    <div className={cx('chat-shop')}>
                        <FontAwesomeIcon icon={faMessage} />
                        <span> Chat với shop</span>
                    </div>
                )}
            </div>
            <div className={cx('infor-product')}>
                <div className={cx('left')}>
                    <input
                        type={'checkbox'}
                        onChange={(e) => {
                            handleSendData({ state: e.target.checked, data });
                        }}
                        className="checkbox"
                    />
                    <div className={cx('img-name')}>
                        <img src={data.imageProduct} alt=""></img>

                        <div className={cx('name')}>
                            <div className={cx('tag')}>
                                <span>Mua trước trả sau</span>
                            </div>
                            <span className={cx('name-product')}>{data.nameProduct}</span>
                            <TippyHeadless
                                interactive
                                appendTo={() => document.body}
                                visible={showTippy}
                                offset={[0, 10]}
                                delay={[0, 200]}
                                placement="bottom-end"
                                render={renderSizeColor}
                            >
                                <div
                                    className={cx('update-product', showTippy && 'active')}
                                    onClick={() => {
                                        setshowTippy(!showTippy);
                                    }}
                                >
                                    <span className={cx('sizeColor')}>
                                        {color != undefined ? color.value : ''} | {size != undefined ? size.value : ''}
                                    </span>
                                    <FontAwesomeIcon icon={showTippy ? faChevronDown : faChevronUp} />
                                </div>
                            </TippyHeadless>
                        </div>
                    </div>
                </div>
                <div className={cx('right')}>
                    <div className={cx('price')}>
                        <strong>{data.priceSale !== null ? data.priceSale.toLocaleString('vi-VN') : ''}đ</strong>
                        <span>{data.priceDefault !== null ? data.priceDefault.toLocaleString('vi-VN') : ''}đ</span>
                    </div>
                    <Count
                        quanlity={data.quanlityCart ?? quanlity}
                        update={update}
                        index={data.quanlityCart}
                        quanlityFunc={handleQuanlity}
                    />

                    <div className={cx('action-cart')}>
                        {update && (
                            <Tippy content="Thích">
                                <FontAwesomeIcon icon={faHeart} className={cx('icon')} />
                            </Tippy>
                        )}
                        {update && (
                            <Tippy content="Xóa">
                                <FontAwesomeIcon
                                    onClick={() => {
                                        handleDeleteCart(data.idProduct);
                                    }}
                                    icon={faTrashCan}
                                    className={cx('icon')}
                                />
                            </Tippy>
                        )}
                    </div>
                </div>
            </div>
            {update && (
                <div className={cx('vocherShop')}>
                    <span>Mã giảm giá của Shop (4)</span>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
            )}
            {update && <hr />}
            {update && (
                <div className={cx('freeship')}>
                    <span>Miễn phí giao hàng tới 5.000đ</span>
                    <FontAwesomeIcon icon={faCircleInfo} className={cx('icon')} />
                </div>
            )}
        </div>
    );
}

export default CartItem;
