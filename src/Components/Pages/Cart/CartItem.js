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
import { useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import TippyHeadless from '@tippyjs/react/headless';
import TippyUpdate from './UpdateCart/TippyUpdate';
import Count from '../../Count/Count';
const cx = classNames.bind(styles);

function CartItem({ update }) {
    const [showTippy, setshowTippy] = useState(false);
    // const [listbuys, setlistbuys] = useState([]);
    function renderSizeColor() {
        return <TippyUpdate />;
    }
    return (
        <div className={cx('item')}>
            <div className={cx('infor-shop')}>
                <div className={cx('image-shop')}>
                    <div className={cx('img')}>
                        {!update && <input type={'checkbox'} className="checkbox" />}
                        <img src="https://media3.scdn.vn/images/ecom/shop_blank-logo-2.jpg" alt=""></img>
                    </div>
                    <span>Âu Cơ 369</span>
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
                    <input type={'checkbox'} className="checkbox" />
                    <div className={cx('img-name')}>
                        <img
                            src="https://media3.scdn.vn/img4/2023/04_04/u84a89WHW0iMtXgBWfMr_simg_de2fe0_500x500_maxb.png"
                            alt=""
                        ></img>

                        <div className={cx('name')}>
                            <div className={cx('tag')}>
                                <span>Mua trước trả sau</span>
                            </div>
                            <span className={cx('name-product')}>[Gia dụng] bộ vệ sinh máy tính</span>
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
                                    <span className={cx('sizeColor')}>Đen | XL</span>
                                    <FontAwesomeIcon icon={showTippy ? faChevronDown : faChevronUp} />
                                </div>
                            </TippyHeadless>
                        </div>
                    </div>
                </div>
                <div className={cx('right')}>
                    <div className={cx('price')}>
                        <strong>30.000đ</strong>
                        <span>10.000đ</span>
                    </div>
                    <Count update={update} />

                    <div className={cx('action-cart')}>
                        {update && (
                            <Tippy content="Thích">
                                <FontAwesomeIcon icon={faHeart} className={cx('icon')} />
                            </Tippy>
                        )}
                        {update && (
                            <Tippy content="Xóa">
                                <FontAwesomeIcon icon={faTrashCan} className={cx('icon')} />
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
