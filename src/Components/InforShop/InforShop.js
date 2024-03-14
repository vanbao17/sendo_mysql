import classNames from 'classnames/bind';
import styles from './InforShop.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPhoneVolume, faShop } from '@fortawesome/free-solid-svg-icons';
import Slide from '../Layout/Components/Slides/Slide';
import { important } from '../../Assets/images/image/image';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { Context } from '../store/Context';
const cx = classNames.bind(styles);
function InforShop({ Shopinfor }) {
    const newData = 'cong-nghe';
    const route = useNavigate();
    const [proSale, setproSale] = useState([]);
    const { idShop, setidShop } = useContext(Context);
    useEffect(() => {
        fetch(`http://localhost:3001/api/v1/prodShop/${Shopinfor.idShop}`)
            .then((respone) => respone.json())
            .then((data) => setproSale(data))
            .catch((error) => {
                console.log(error);
            });
    }, [Shopinfor]);
    const handleShopInfor = () => {
        route(`/shop/${newData}?`, { state: { dt: Shopinfor } });
    };
    // useEffect(() => {
    //     setidShop(Shopinfor);
    // });
    localStorage.setItem('dataShop', JSON.stringify(Shopinfor));
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <span>Thông tin nhà cung cấp</span>
            </div>

            <a href={`/shop/${newData}`}>
                <div className={cx('infor')} onClick={handleShopInfor}>
                    <div className={cx('image')}>
                        <img className={cx('imageShop')} src={Shopinfor.imageShop}></img>
                        <div className={cx('active')}></div>
                    </div>
                    <div className={cx('infor-shop')}>
                        <span className={cx('shopname')}>{Shopinfor.tenshop}</span>
                        <div className={cx('tags')}>
                            <img src={important.shop}></img>
                            <img src={important.shop}></img>
                        </div>
                        <div className={cx('addressAndRate')}>
                            <span className={cx('address')}>{Shopinfor.diachi} </span>
                            <span className={cx('rate')}>
                                | 4.5 <span className={cx('rateStar')}> ★</span>
                            </span>
                        </div>
                    </div>
                </div>
            </a>

            <div className={cx('infor-others')}>
                <div className={cx('item-infor')}>
                    <span className={cx('important')}>7 năm</span>
                    <span className={cx('descrip')}>Bán ở Sendo</span>
                </div>
            </div>
            <div className={cx('btntoshop')}>
                <button className={cx('followShop', 'large')}>
                    <FontAwesomeIcon icon={faHeart} className={cx('icon')} />
                    <span>Theo dõi</span>
                </button>
                <button className={cx('toShop', 'large')}>
                    <FontAwesomeIcon icon={faShop} className={cx('icon')} />
                    <span>Vào shop</span>
                </button>
                <button className={cx('callShop')}>
                    <FontAwesomeIcon icon={faPhoneVolume} className={cx('icon')} />
                </button>
            </div>
            <hr></hr>
            <div className={cx('suggestFromShop')}>
                <span>Gợi ý thêm từ Shop</span>
                <Slide ovr={3} prod size={128} data={proSale} width={'128px'} height={'230px'} />
            </div>
        </div>
    );
}

export default InforShop;
