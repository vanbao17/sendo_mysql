import classNames from 'classnames/bind';
import styles from './Rate.module.scss';
import ProductItem from '../ProductItem/ProductItem';
import Popup from '../Layout/Components/Popup/Popup';
import ProgressItem from './ProgressItem/ProgressItem';
import styled from 'styled-components';
import { useContext, useEffect, useRef, useState } from 'react';
import Comments from './Comments/Comments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faImage, faMessage, faStar } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../store/Context';
import { format } from 'date-fns';
const cx = classNames.bind(styles);

function Rate({ dataDetail, id, normal, idShop = null }) {
    const [stateComment, setStateComment] = useState(false);
    const [stateButtonComment, setStateButtonComment] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [filename, setfilename] = useState([]);
    const [comments, setcomments] = useState([]);
    const [total, settotal] = useState(0);
    const [dt, setdt] = useState([
        { rate: 5, count: 0 },
        { rate: 4, count: 0 },
        { rate: 3, count: 0 },
        { rate: 2, count: 0 },
        { rate: 1, count: 0 },
    ]);
    const [indexStar, setindexStar] = useState();
    const [rate, setRate] = useState(null);
    const { dis, setdis, loadding, setloadding } = useContext(Context);
    const fileInputRef = useRef(null);
    const user = JSON.parse(sessionStorage.getItem('user'));

    const textareaRef = useRef();

    const formatDate = (stringDate) => {
        const date = new Date(stringDate);
        const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss');
        return formattedDate;
    };
    useEffect(() => {
        if (idShop != null) {
            fetch('https://sdvanbao17.id.vn/api/v1/getCommentForShop/' + idShop)
                .then((rs) => rs.json())
                .then((dt) => setcomments(dt))
                .catch((err) => {
                    console.log(err);
                });
        } else {
            if (dataDetail != undefined) {
                const idProduct = dataDetail.idProduct;
                fetch('https://sdvanbao17.id.vn/api/v1/getCommentForProduct', {
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
            }
        }
    }, [dataDetail]);
    useEffect(() => {
        const s5 = comments.filter((cm) => cm.rateCount == 5).length;
        const s4 = comments.filter((cm) => cm.rateCount == 4).length;
        const s3 = comments.filter((cm) => cm.rateCount == 3).length;
        const s2 = comments.filter((cm) => cm.rateCount == 2).length;
        const s1 = comments.filter((cm) => cm.rateCount == 1).length;
        setdt([
            { rate: 5, count: s5 },
            { rate: 4, count: s4 },
            { rate: 3, count: s3 },
            { rate: 2, count: s2 },
            { rate: 1, count: s1 },
        ]);
        comments.forEach((i) => {
            settotal((e) => e + parseInt(i.rateCount));
        });
    }, [comments]);
    const [selectted, setselectted] = useState([]);
    function handleBtn(index) {
        if (selectted.includes(index) == false) {
            setselectted([...selectted, index]);
        } else {
            setselectted(selectted.filter((num) => num !== index));
        }
    }
    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedImages(files);
        setfilename(files.map((i) => 'https://sdvanbao17.id.vn/uploads/' + i.name).join(','));
        const previewUrls = files.map((file) => URL.createObjectURL(file));
        setPreviewImages(previewUrls);
    };

    const handleDeleteImage = (index) => {
        const newSelectedImages = selectedImages.filter((_, i) => i !== index);
        const newPreviewImages = previewImages.filter((_, i) => i !== index);

        setSelectedImages(newSelectedImages);
        setPreviewImages(newPreviewImages);
    };

    const handleSubmit = async (event) => {
        // try {
        //     const response = await fetch('http://localhost:3001/upload', {
        //         method: 'POST',
        //         body: formData,
        //     });
        //     const data = await response.json();
        //     console.log('Success:', data);
        // } catch (error) {
        //     console.error('Error:', error);
        // }
    };
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
    useEffect(() => {
        if (user != null && dataDetail != undefined) {
            const idCustomer = user.idCustomers;
            const idProduct = dataDetail.idProduct;
            fetch(' https://sdvanbao17.id.vn/api/v1/checkStateComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idCustomer, idProduct }),
            })
                .then((rs) => rs.json())
                .then((data) => {
                    if (data.length != 0) {
                        setStateButtonComment(true);
                    } else {
                        setStateButtonComment(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [dataDetail]);
    useEffect(() => {
        const check = comments.filter((comment) => comment.idCustomers == user.idCustomers);
        if (check.length != 0) {
            setStateButtonComment(false);
        }
    }, [stateButtonComment]);
    const handleSendComment = (e) => {
        e.preventDefault();
        setloadding(true);
        setStateComment(false);
        if (user != null) {
            const idCustomer = user.idCustomers;
            const contentComment = textareaRef.current.value;
            const timePublic = formatDate(new Date());
            const formData = new FormData();
            const idProduct = dataDetail.idProduct;
            selectedImages.forEach((image) => {
                formData.append('images', image);
            });
            fetch('https://sdvanbao17.id.vn/api/v1/upload_images_product', {
                method: 'POST',
                body: formData,
            })
                .then((response) => {
                    console.log('File uploaded successfully');
                    fetch('https://sdvanbao17.id.vn/api/v1/addComment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ idCustomer, idProduct, contentComment, timePublic, rate, filename }),
                    })
                        .then((rs) => {
                            if (rs.status == 200) {
                                setloadding(false);
                                window.location.href = `/detail/${dataDetail.nameProduct}/${dataDetail.idProduct}`;
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((error) => {
                    console.error('Error uploading file:', error);
                });
        } else {
            setdis(!dis);
        }
    };
    return (
        <div className={cx('wrapper')} id={id}>
            <div className={cx('nonTempRate')}>
                <span className={cx('title')}>
                    Đánh giá nhận xét về sản phẩm <i>( 1 lượt đánh giá )</i>
                </span>
                <div className={cx('ovrRate')}>
                    <div className={cx('total')}>
                        <span className={cx('dis-total')}>
                            <span className={cx('avg')}>{comments.length != 0 ? total / comments.length : 0}</span>
                            <span>/5</span>
                            <StarContainer>
                                <div className={cx('stars')}></div>
                            </StarContainer>
                        </span>
                        <div className={cx('notification')}>
                            {normal == true
                                ? 'Đây là thông tin người mua đánh giá shop bán sản phẩm này có đúng mô tả không.'
                                : '(5093 đánh giá)'}
                        </div>
                    </div>
                    <div className={cx('dis-rate', normal == false && 'changeWidth')}>
                        {dt.map((item, index) => {
                            return (
                                <ProgressItem
                                    key={index}
                                    normal={true}
                                    sum={total}
                                    data={item.count}
                                    className={'star' + item.rate}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className={cx('button-rate')}>
                    <button className={cx('btn', selectted.length == 0 ? 'active' : '')}>
                        <span>Tất cả</span>
                    </button>
                    {dt.map((item, index) => {
                        return (
                            <button
                                key={index}
                                className={cx(
                                    'btn',
                                    selectted.length > 0 ? (selectted.includes(index) == true ? 'active' : '') : '',
                                )}
                                onClick={() => {
                                    handleBtn(index);
                                }}
                            >
                                <span>{-(index - 5)} Sao</span>
                            </button>
                        );
                    })}
                    <button className={cx('btn')}>
                        <span>Đánh giá có hình</span>
                    </button>
                </div>
            </div>
            {comments.length != 0 ? (
                <Comments data={comments} normal={normal} datadetail={dataDetail} />
            ) : (
                <div className={cx('tempRate')}>
                    <img src="https://web-static.scdn.vn/sendo-communication-rating/863edd0-web/media/rating-empty.f56ae9e22805ed6a864d1a540bea0947.svg"></img>
                    <strong>Sản phẩm chưa có đánh giá.</strong>
                    <p>Chọn mua sản phẩm để là người đầu tiên đánh giá sản phẩm này.</p>
                </div>
            )}
            {stateButtonComment == true ? (
                <button
                    className={cx('action_comment')}
                    onClick={() => {
                        if (user == null) {
                            setdis(!dis);
                        } else {
                            setStateComment(true);
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faMessage} className={cx('icon')} />
                    <span>Bình luận ngay</span>
                </button>
            ) : (
                <></>
            )}
            {stateComment == true ? (
                <Popup>
                    <div className={cx('container_input_comments')}>
                        <div className={cx('title')}>
                            <div className={cx('image_user')}>
                                <span>Đánh giá sản phẩm</span>
                            </div>
                            <div
                                className={cx('icon_close')}
                                onClick={() => {
                                    setStateComment(false);
                                }}
                            >
                                <FontAwesomeIcon icon={faClose} />
                            </div>
                        </div>
                        <div className={cx('infor_rate')}>
                            <div className={cx('image_user')}>
                                {user != null ? <img src={user.imageUser}></img> : <></>}
                            </div>
                            <ul>
                                {dt.map((ra, index) => {
                                    // return <FontAwesomeIcon fill="blue" icon={faStar} className={cx('icon_star')} />;
                                    return (
                                        <li
                                            className={cx(
                                                'star_item',
                                                rate == null
                                                    ? indexStar >= index + 1
                                                        ? 'active'
                                                        : ''
                                                    : rate >= index + 1
                                                    ? 'active'
                                                    : '',
                                            )}
                                            onMouseMove={() => {
                                                setindexStar(index + 1);
                                            }}
                                            onClick={() => {
                                                setRate(index + 1);
                                            }}
                                        ></li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className={cx('input_comment')}>
                            <textarea ref={textareaRef}></textarea>
                        </div>
                        <div className={cx('action_send')}>
                            <form onSubmit={handleSubmit} className={cx('actions')} encType="multipart/form-data">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                />
                                <div className={cx('action_post')}>
                                    <FontAwesomeIcon onClick={handleIconClick} icon={faImage} />
                                </div>
                                <div className={cx('list_image')}>
                                    {previewImages.map((src, index) => (
                                        <div
                                            key={index}
                                            style={{ display: 'inline-block', position: 'relative', margin: '10px' }}
                                        >
                                            <img src={src} alt={`Preview ${index}`} style={{ width: '100px' }} />
                                            <button
                                                onClick={() => handleDeleteImage(index)}
                                                style={{
                                                    position: 'absolute',
                                                    top: '0',
                                                    right: '0',
                                                    background: 'red',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '50%',
                                                    width: '20px',
                                                    height: '20px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faClose} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={handleSendComment}>
                                    <span>Gửi</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </Popup>
            ) : (
                <></>
            )}
        </div>
    );
}

export default Rate;
