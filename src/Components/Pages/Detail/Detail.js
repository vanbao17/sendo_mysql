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
import CryptoJS from 'crypto-js';
import styled from 'styled-components';
const cx = classNames.bind(styles);
function Detai() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const { idProduct } = useParams();
    const { showGototop, setshowGototop } = useContext(Context);
    const { chatBox, setchatBox, loadding, setloadding } = useContext(Context);

    const [datadetail, setdatadetail] = useState([]);
    const [quanlity, setquanlity] = useState(1);
    const [favoriteProds, setfavoriteProds] = useState([]);
    const [imgData, setimgData] = useState([]);
    const [comments, setcomments] = useState([]);
    const [selled, setselled] = useState();
    const [color, setcolor] = useState();
    const [size, setsize] = useState();
    const [choseImage, setchoseImage] = useState();
    const [total, settotal] = useState(0);

    const route = useNavigate();
    const nav = useNavigate();
    const { dis, setdis } = useContext(Context);
    useEffect(() => {
        setloadding(true);
        fetch(`https://sdvanbao17.id.vn/api/v1/detail/${idProduct}`)
            .then((respone) => respone.json())
            .then((data) => setdatadetail(data[0]))
            .catch((error) => {
                console.log(error);
            });
        fetch(`https://sdvanbao17.id.vn/api/v1/getImageProduct/${idProduct}`)
            .then((respone) => respone.json())
            .then((data) => {
                const imgs = data.map((i) => {
                    return { img: i.imageProduct };
                });
                setimgData(imgs);
            })
            .catch((error) => {
                console.log(error);
            });
        fetch(' https://sdvanbao17.id.vn/api/v1/getCommentForProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idProduct }),
        })
            .then((rs) => rs.json())
            .then((dt) => setcomments(dt))
            .catch((err) => {
                console.log(err);
            });
        fetch(' https://sdvanbao17.id.vn/api/v1/getOrderFinal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idProduct }),
        })
            .then((rs) => rs.json())
            .then((dt) => setselled(dt.length))
            .catch((err) => {
                console.log(err);
            });
    }, []);
    useEffect(() => {
        let idCate = datadetail.madm1 + '' + datadetail.madm2;
        sessionStorage.setItem('idShop', datadetail.idShop);
        fetch(`https://sdvanbao17.id.vn/api/v1/favoriteProdShop/${idCate}`)
            .then((respone) => respone.json())
            .then((data) => {
                setfavoriteProds(data);
                setloadding(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [datadetail]);
    const handleAddToCart = (s) => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const idCustomer = user.idCustomers;
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
            fetch(`https://sdvanbao17.id.vn/api/v1/check-prods-select`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idCustomer, idProduct }),
            })
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
                            idCustomer: idCustomer,
                        };
                        const options = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(dataUpdate),
                        };
                        fetch(`https://sdvanbao17.id.vn/api/v1/update-cart`, options)
                            .then((response) => {
                                console.log(response);
                                if (!response.ok) {
                                    throw new Error('Failed to update item from cart');
                                }
                                return response.text();
                            })
                            .then((data) => {
                                if (s == true) {
                                    route('/gio-hang', { state: { dt: 1 } });
                                } else {
                                    const secretKey = 'Phamvanbao_0123';
                                    const idShopString = JSON.stringify([
                                        {
                                            ...datadetail,
                                            size: size.attribute_value_id,
                                            color: color.attribute_value_id,
                                        },
                                    ]);
                                    const encryptedIdShop = CryptoJS.AES.encrypt(idShopString, secretKey).toString();
                                    window.location.href = `/thanh-toan?product=${encodeURIComponent(encryptedIdShop)}`;
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    } else {
                        fetch(`https://sdvanbao17.id.vn/api/v1/addtocart`, optionsAdd)
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                                return response.text();
                            })
                            .then((data) => {
                                if (s == true) {
                                    route('/gio-hang', { state: { dt: 1 } });
                                } else {
                                    const secretKey = 'Phamvanbao_0123';
                                    const idShopString = JSON.stringify([
                                        {
                                            ...datadetail,
                                            size: size.attribute_value_id,
                                            color: color.attribute_value_id,
                                        },
                                    ]);
                                    const encryptedIdShop = CryptoJS.AES.encrypt(idShopString, secretKey).toString();
                                    window.location.href = `/thanh-toan?product=${encodeURIComponent(encryptedIdShop)}`;
                                }
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
    useEffect(() => {
        comments.forEach((i) => {
            settotal((e) => e + parseInt(i.rateCount));
        });
    }, [comments]);
    const StarContainer = styled.div`
        position: relative;
        &::before {
            content: '★★★★★';
            display: block;
            -webkit-text-fill-color: transparent;
            background: linear-gradient(90deg, #ffc600 ${(total / comments.length / 5) * 100}%, #e7e8ea 0);
            background-clip: text;
            -webkit-background-clip: text;
        }
    `;
    const StarContainerSpan = styled.div`
        position: relative;
        &::before {
            content: '★★★★★';
            display: block;
            -webkit-text-fill-color: transparent;
            background: linear-gradient(90deg, #e7e8ea ${100}%, #e7e8ea 0);
            background-clip: text;
            -webkit-background-clip: text;
        }
    `;
    const handleCheckOut = () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            const idCustomer = user.idCustomers;
            fetch('https://sdvanbao17.id.vn/api/v1/checkAddressCustomer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idCustomer }),
            })
                .then(async (rs) => {
                    if (rs.status == 200) {
                        try {
                            await handleAddToCart(false);
                        } catch (error) {
                            console.log(error);
                        }

                        // const encodedIdProduct = encodeURIComponent(idProduct);
                        // const idShop = encodeURIComponent(datadetail.idShop);
                        // window.location.href = `https://senvb.vercel.app/thanh-toan?idProduct=${encodedIdProduct}&idShop=${idShop}`;
                    } else {
                        const secretKey = 'Phamvanbao_0123';
                        const idShopString = JSON.stringify([datadetail]);
                        const encryptedIdShop = CryptoJS.AES.encrypt(idShopString, secretKey).toString();
                        window.location.href = `/them-dia-chi?product=${encodeURIComponent(encryptedIdShop)}`;
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setdis(!dis);
        }
    };
    const handleChatWithShop = () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user != null) {
            const idCustomer = user.idCustomers;
            const idShop = datadetail.idShop;
            fetch('https://sdvanbao17.id.vn/api/v1/getChatIdShopCustomer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idCustomer, idShop }),
            })
                .then((rs) => rs.json())
                .then((dt) => {
                    if (dt.length != 0) {
                        setchatBox(!chatBox);
                    } else {
                        if (user != null) {
                            const idCustomers = user.idCustomers;
                            const idShop = datadetail.idShop;
                            fetch('https://sdvanbao17.id.vn/api/v1/addChatUser', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ idCustomers, idShop }),
                            })
                                .then((rs) => {
                                    if (rs.status == 200) {
                                        setchatBox(!chatBox);
                                    }
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        } else {
                            setdis(!dis);
                        }
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setdis(!dis);
        }
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
                                style={{ height: '500px', objectFit: 'cover' }}
                                src={`${choseImage != undefined ? choseImage : datadetail.imageProduct}`}
                                alt={`${datadetail.nameProduct}`}
                                className={cx('image_product')}
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
                        <Slide
                            data={imgData}
                            normal={true}
                            ovr={6}
                            size={72}
                            urlChose={(url) => {
                                setchoseImage(url);
                            }}
                        />
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
                            {datadetail.priceSale != undefined ? datadetail.priceSale.toLocaleString('vi-VN') : ''}đ
                        </div>
                        <div className={cx('reduce')}>
                            <span className={cx('reduce-price')}>
                                {datadetail.priceDefault != undefined
                                    ? datadetail.priceDefault.toLocaleString('vi-VN')
                                    : ''}
                                đ
                            </span>
                        </div>
                        <div className={cx('code-reduce')}>
                            {/* <span>
                                Áp mã còn:<span className={cx('redtext')}>38.000đ</span>
                            </span>
                            <span>Chi tiết </span> */}
                        </div>
                        <div className={cx('ovr')}>
                            {comments.length == 0 ? (
                                <StarContainerSpan>
                                    <div></div>
                                </StarContainerSpan>
                            ) : (
                                <StarContainer>
                                    <div></div>
                                </StarContainer>
                            )}

                            <div className={cx('count-rate')}>
                                <span>{comments.length} Lượt Đánh giá</span>
                            </div>
                            <div className={cx('count-buy')}>
                                <BinIcon />
                                <span>{selled} Lượt mua</span>
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
                            <button
                                onClick={() => {
                                    handleAddToCart(true);
                                }}
                                className={cx('addtocart')}
                            >
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
                        <InforProRight id="rate" idQuestion="question" dataText={datadetail} />
                    </div>
                </div>
                <div className={cx('productyourlike')} id="productyourlike">
                    <h3>Ở đây có sản phẩm bạn thích</h3>
                    <Products data={favoriteProds}></Products>
                </div>
            </div>
            <div className={cx('containerFixed', showGototop == true ? 'show' : '')}>
                <div className={cx('container')}>
                    <div className={cx('left')}>
                        <div className={cx('imageProd')}>
                            <img style={{ width: '100%', objectFit: 'cover' }} src={datadetail.imageProduct}></img>
                        </div>
                        <div className={cx('inforProd')}>
                            <div className={cx('nameProd')}>
                                <p>{datadetail.nameProduct}</p>
                                <span>Tạm tính</span>
                            </div>
                            <div className={cx('priceProd')}>
                                <p>Mặc định | x1</p>
                                <span>
                                    {datadetail.priceSale != undefined
                                        ? datadetail.priceSale.toLocaleString('vi-VN')
                                        : ''}
                                    đ
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('list-button')}>
                            <button>
                                <ShopIcon className={cx('icon')} />
                            </button>
                            <button onClick={handleChatWithShop}>
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
