import { useLocation, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Detail.module.scss';
import Slide from '../../Layout/Components/Slides/Slide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faHeart, faShare, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import Count from '../../Count/Count';
import ColorsBtn from '../../ColorsBtn/ColorsBtn';
import SizesBtn from '../../SizesBtn/SizesBtn';
import { important } from '../../../Assets/images/image/image';
import InforShop from '../../InforShop/InforShop';
import InforProRight from './InforProRight/InforProRight';
import Products from '../../Products/Products';
import { BinIcon, ChatIcon, ShopIcon } from '../../IconSvg';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../store/Context';
const cx = classNames.bind(styles);
function Detai() {
    const { idProduct } = useParams();
    const { showGototop, setshowGototop } = useContext(Context);
    const [datadetail, setdatadetail] = useState([]);
    const [quanlity, setquanlity] = useState(1);
    const [favoriteProds, setfavoriteProds] = useState([]);
    const [color, setcolor] = useState();
    const [size, setsize] = useState();
    const location = useLocation();
    const dataIdProduct = location.state?.dt;
    const route = useNavigate();
    const nav = useNavigate();
    const { dis, setdis } = useContext(Context);
    useEffect(() => {
        fetch(`http://localhost:3001/api/v1/detail/${idProduct}`)
            .then((respone) => respone.json())
            .then((data) => setdatadetail(data[0]))
            .catch((error) => {
                console.log(error);
            });
    }, [dataIdProduct]);
    const imgData = [
        { img: 'https://media3.scdn.vn/img4/2022/06_09/rq7VyH7ppkx2SINYOqyb_simg_02d57e_100x100_maxb.jpg', name: '' },
        { img: 'https://media3.scdn.vn/img4/2022/06_09/rq7VyH7ppkx2SINYOqyb_simg_02d57e_100x100_maxb.jpg', name: '' },
        { img: 'https://media3.scdn.vn/img4/2022/06_09/rq7VyH7ppkx2SINYOqyb_simg_02d57e_100x100_maxb.jpg', name: '' },
        { img: 'https://media3.scdn.vn/img4/2022/06_09/rq7VyH7ppkx2SINYOqyb_simg_02d57e_100x100_maxb.jpg', name: '' },
        { img: 'https://media3.scdn.vn/img4/2022/06_09/rq7VyH7ppkx2SINYOqyb_simg_02d57e_100x100_maxb.jpg', name: '' },
        { img: 'https://media3.scdn.vn/img4/2022/06_09/rq7VyH7ppkx2SINYOqyb_simg_02d57e_100x100_maxb.jpg', name: '' },
        { img: 'https://media3.scdn.vn/img4/2022/06_09/rq7VyH7ppkx2SINYOqyb_simg_02d57e_100x100_maxb.jpg', name: '' },
    ];
    useEffect(() => {
        let idCate = datadetail.madm1 + '' + datadetail.madm2;
        fetch(`http://localhost:3001/api/v1/favoriteProdShop/${idCate}`)
            .then((respone) => respone.json())
            .then((data) => setfavoriteProds(data))
            .catch((error) => {
                console.log(error);
            });
    }, [datadetail]);
    const handleAddToCart = (event) => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            const dataPost = {
                idUser: user.idCustomers,
                idProd: idProduct,
                quanlity: quanlity,
                size: size,
                color: color,
            };

            const optionsAdd = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataPost),
            };
            fetch(`http://localhost:3001/api/v1/check-prods-select/${idProduct}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.length == 1) {
                        let dataUpdate = {
                            idUser: 1,
                            idProduct: idProduct,
                            quanlity: quanlity,
                            oldQuanlity: data[0].quanlityCart,
                            size: size,
                            color: color,
                        };
                        const options = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(dataUpdate),
                        };
                        fetch(`http://localhost:3001/api/v1/update-cart`, options)
                            .then((response) => {
                                console.log(response);
                                if (!response.ok) {
                                    throw new Error('Failed to update item from cart');
                                }
                                return response.text();
                            })
                            .then((data) => {
                                route('/gio-hang', { state: { dt: 1 } });
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    } else {
                        fetch(`http://localhost:3001/api/v1/addtocart`, optionsAdd)
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                                return response.text();
                            })
                            .then((data) => {
                                route('/gio-hang', { state: { dt: 1 } });
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setdis(!dis);
        }
        event.preventDefault();
    };
    const handleSetQuanlity = (q) => {
        setquanlity(q);
    };
    const getDataSize = (data) => {
        setsize(data);
    };
    const getDataColor = (data) => {
        setcolor(data);
    };
    const handleCheckOut = () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const idCustomer = user.idCustomers;
        fetch('http://localhost:3001/api/v1/checkAddressCustomer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idCustomer }),
        })
            .then((rs) => {
                if (rs.status == 200) {
                    const encodedIdProduct = encodeURIComponent(idProduct);
                    const idShop = encodeURIComponent(datadetail.idShop);
                    window.location.href = `https://senvb.vercel.app/thanh-toan?idProduct=${encodedIdProduct}&idShop=${idShop}`;
                } else {
                    nav('/them-dia-chi');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('historyPath')}>
                    <span className={cx('his')}>
                        Sendo.vn / {datadetail.tendm1} / {datadetail.tendm2} / {datadetail.tendm3}
                    </span>
                </div>
                <div className={cx('infor-product')}>
                    <div className={cx('infor-img')}>
                        <div className={cx('img-main')}>
                            <img
                                className={cx('bgr-img')}
                                src="https://media3.scdn.vn/img4/2022/02_16/sz4EeQTY9v3EHfkPa3Uv.png"
                            ></img>

                            <img
                                style={{ height: '500px' }}
                                src={`${datadetail.imageProduct}`}
                                alt={`${datadetail.nameProduct}`}
                            />

                            <div className={cx('action')}>
                                <span className={cx('count-img')}>1/9</span>
                                <div className={cx('icons')}>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faShareNodes} />
                                    </span>
                                    <span className={cx('icon')}>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Slide data={imgData} normal={true} ovr={6} size={72} />
                    </div>
                    <div className={cx('infor-main')}>
                        <div className={cx('deal')}></div>
                        <div className={cx('name')}>
                            <img src={important.shop}></img>
                            <h1>{datadetail.nameProduct}</h1>
                            <span className={cx('reduce-percent ', 'redtext')}>
                                Giảm {Math.round((datadetail.priceSale / datadetail.priceDefault) * 100)}%
                            </span>
                        </div>
                        <div className={cx('trademark')}>
                            <span>Thương hiệu:</span>
                            <span>{datadetail.trademark}</span>
                        </div>
                        <div className={cx('price', 'redtext')}>
                            {/* {datadetail.priceSale.toLocaleString('vi-VN')}đ */}
                            {datadetail.priceSale}đ
                        </div>
                        <div className={cx('reduce')}>
                            <span className={cx('reduce-price')}>
                                {datadetail.priceDefault}đ{/* {datadetail.priceDefault.toLocaleString('vi-VN')}đ */}
                            </span>
                        </div>
                        <div className={cx('code-reduce')}>
                            {/* <span>
                                Áp mã còn:<span className={cx('redtext')}>38.000đ</span>
                            </span>
                            <span>Chi tiết </span> */}
                        </div>
                        <div className={cx('ovr')}>
                            <div className={cx('rate')}></div>
                            <div className={cx('count-rate')}>
                                <span>{datadetail.QuanlityExists} Lượt Đánh giá</span>
                            </div>
                            <div className={cx('count-buy')}>
                                <BinIcon />
                                <span>{datadetail.slmua} Lượt mua</span>
                            </div>
                        </div>
                        <hr className={cx('main-hr')}></hr>
                        <ColorsBtn handleSendData={getDataColor} idProduct={idProduct} dataColor={true} />
                        <SizesBtn handleSendData={getDataSize} idProduct={idProduct} />
                        <div className={cx('chose-quantity')}>
                            <span>Chọn số lượng</span>
                            <Count quanlity={quanlity} update quanlityFunc={handleSetQuanlity} />
                        </div>
                        <div className={cx('btn', 'list-btn')}>
                            <button onClick={handleAddToCart} className={cx('addtocart')}>
                                <span>Thêm vào giỏ</span>
                            </button>
                            {/* <button className={cx('installment')}>
                                <p>Trả góp 0%</p>
                                <span>đơn từ 3.000.000đ</span>
                            </button> */}
                            <button className={cx('btn', 'buynow')} onClick={handleCheckOut}>
                                <span>Mua ngay</span>
                            </button>
                        </div>
                        <div className={cx('interest', 'foryou')}>
                            <div className={cx('title')}>
                                <span>Ưu đãi dành cho bạn</span>
                                <FontAwesomeIcon icon={faCircleInfo} />
                            </div>
                            <div className={cx('content')}>
                                <div className={cx('item')}>
                                    <img src="https://media3.scdn.vn/img4/2022/12_19/k4fhvv3i925lb0CUgGn4.png"></img>
                                    <p>Trả góp Kredivo</p>
                                </div>
                                <div className={cx('item')}>
                                    <img src="https://media3.scdn.vn/img4/2020/02_22/09A417Le8f9vmJ0aWEu6.png"></img>
                                    <p>Miễn phí vận chuyển</p>
                                </div>
                            </div>
                        </div>
                        <div className={cx('interest', 'customer')}>
                            <div className={cx('title')}>
                                <span>Quyền lợi khách hàng & Bảo hành</span>
                                <FontAwesomeIcon icon={faCircleInfo} />
                            </div>
                            <div className={cx('content')}>
                                <div className={cx('item')}>
                                    <img src="https://media3.scdn.vn/img4/2022/12_19/k4fhvv3i925lb0CUgGn4.png"></img>
                                    <p>Trả góp Kredivo</p>
                                </div>
                                <div className={cx('item')}>
                                    <img src="https://media3.scdn.vn/img4/2020/02_22/09A417Le8f9vmJ0aWEu6.png"></img>
                                    <p>Miễn phí vận chuyển</p>
                                </div>
                                <div className={cx('item')}>
                                    <img src="https://media3.scdn.vn/img4/2020/02_22/09A417Le8f9vmJ0aWEu6.png"></img>
                                    <p>Bảo hành theo chính sách từ Nhà bán hàng</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('infor-other')}>
                    <InforShop Shopinfor={datadetail} />
                    <div id="infor-other">
                        <InforProRight id="rate" idQuestion="question" dataText={datadetail.descriptionDetail} />
                    </div>
                </div>
                <div className={cx('productyourlike')} id="productyourlike">
                    <span>Ở đây có sản phẩm bạn thích</span>
                    <Products data={favoriteProds}></Products>
                </div>
            </div>
            <div className={cx('containerFixed', showGototop == true ? 'show' : '')}>
                <div className={cx('container')}>
                    <div className={cx('left')}>
                        <div className={cx('imageProd')}>
                            <img src={datadetail.imageProduct}></img>
                        </div>
                        <div className={cx('inforProd')}>
                            <div className={cx('nameProd')}>
                                <p>{datadetail.nameProduct}</p>
                                <span>Tạm tính</span>
                            </div>
                            <div className={cx('priceProd')}>
                                <p>Mặc định | x1</p>
                                <span>{datadetail.priceSale}đ</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('list-button')}>
                            <button>
                                <ShopIcon className={cx('icon')} />
                            </button>
                            <button>
                                <ChatIcon className={cx('icon')} />
                            </button>
                            <button className={cx('addCart')}>
                                <span>Thêm vào giỏ</span>
                            </button>
                            <button className={cx('buyNow')}>
                                <span>Mua ngay</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('containerNavFixed', showGototop == true ? 'show' : 'hide')}>
                <div className={cx('container')}>
                    <a href="#infor-other">
                        <span>Tổng quan</span>
                    </a>
                    <a href="#rate">
                        <span>Đánh giá</span>
                    </a>
                    <a href="#question">
                        <span>Hỏi đáp</span>
                    </a>
                    <a href="#productyourlike">
                        <span>Dành cho bạn</span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Detai;
