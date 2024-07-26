import classNames from 'classnames/bind';
import styles from './Comments.module.scss';
import Comments from './Comments';
import { format } from 'date-fns';
import { FlagIcon, LikeIcon } from '../../IconSvg';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClose,
    faDashboard,
    faEllipsis,
    faEllipsisV,
    faEllipsisVertical,
    faImage,
} from '@fortawesome/free-solid-svg-icons';
import Popup from '../../Layout/Components/Popup/Popup';
import { Context } from '../../store/Context';
import styled from 'styled-components';
const cx = classNames.bind(styles);
function CommentItem({ data, normal, datadetail }) {
    const [attrComment, setAttComment] = useState([]);
    const [imagesComment, setImagesComment] = useState([]);
    const [selectted, setselectted] = useState([]);
    const [stateComment, setStateComment] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [filename, setfilename] = useState([]);
    const [indexStar, setindexStar] = useState();
    const [rate, setRate] = useState(data.rateCount);
    const fileInputRef = useRef(null);
    const [valueTextArea, setValueTextAre] = useState(data.contentComment);
    const textareaRef = useRef(null);
    const [stateAction, setstateAction] = useState(false);
    const [commentreplays, setcommentreplays] = useState(null);
    const { loadding, setloadding } = useContext(Context);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const dt = [1, 2, 3, 4, 5];
    const idProduct = data.idProduct;
    const convertDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const formattedDate = format(date, 'dd/MM/yyyy');
        const formattedTime = format(date, 'HH:mm:ss');
        return `${formattedDate} | ${formattedTime}`;
    };

    useEffect(() => {
        fetch(' https://sdvanbao17.id.vn/api/v1/getFullAttribute')
            .then((rs) => rs.json())
            .then((dt) => {
                const attr = [data.size, data.color];
                const filter = dt.filter((i) => attr.includes(i.attribute_value_id));
                setAttComment(filter);
            })
            .catch((err) => {
                console.log(err);
            });
        fetch('https://sdvanbao17.id.vn/api/v1/getCommentReply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idProduct }),
        })
            .then((rs) => rs.json())
            .then((dt) => {
                setcommentreplays(dt);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    useEffect(() => {
        const list_url = data.imageComment.split(',');
        setImagesComment(list_url);
    }, [data]);
    const formatDate = (stringDate) => {
        const date = new Date(stringDate);
        const formattedDate = format(date, 'yyyy-MM-dd HH:mm:ss');
        return formattedDate;
    };
    const handleUpdateComment = (e) => {
        e.preventDefault();
        setloadding(true);
        setStateComment(false);
        const idCustomer = user.idCustomers;
        const contentComment = valueTextArea;
        const timePublic = formatDate(new Date());
        const idProduct = data.idProduct;
        const idComment = data.idComment;

        const formData = new FormData();
        selectedImages.forEach((image) => {
            formData.append('images', image);
        });
        fetch('https://sdvanbao17.id.vn/api/v1/upload_images_product', {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                console.log('File uploaded successfully');
                fetch('https://sdvanbao17.id.vn/api/v1/updateComment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idCustomer,
                        idProduct,
                        contentComment,
                        timePublic,
                        rate,
                        filename,
                        idComment,
                    }),
                })
                    .then((rs) => {
                        if (rs.status == 200) {
                            setloadding(false);
                            window.location.reload();
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
            });
    };
    const handleDeleteComment = () => {
        setloadding(true);
        const idComment = data.idComment;
        fetch('https://sdvanbao17.id.vn/api/v1/deleteComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idComment }),
        }).then((rs) => {
            if (rs.status == 200) {
                setloadding(false);
                window.location.reload();
            } else {
                alert('Lỗi gì rồi');
            }
        });
    };
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
    const handleSubmit = (event) => {};
    const StarContainer = styled.div`
        position: relative;
        &::before {
            content: '★★★★★';
            display: block;
            -webkit-text-fill-color: transparent;
            background: linear-gradient(90deg, #ffc600 ${(data.rateCount / 5) * 100}%, #e7e8ea 0);
            background-clip: text;
            -webkit-background-clip: text;
        }
    `;
    return (
        <div className={cx('wrapperItem')}>
            <div className={cx('container')}>
                {normal == false ? (
                    <>
                        <div className={cx('imageUser')}>
                            <img src={data.imageUser}></img>
                        </div>
                        <div className={cx('content')}>
                            <div className={cx('line')}>
                                <hr></hr>
                            </div>
                            <p className={cx('nameUser')}>
                                <span>{data.nameCustomers}</span>
                                <p className={cx('timePublic')}>{formatDate(data.timePublic)}</p>
                            </p>
                            <StarContainer>
                                <div></div>
                            </StarContainer>
                            <p className={cx('comment')}>{data.contentComment}</p>
                            <a className={cx('buyrecent')}>
                                <div className={cx('imageProd')}>
                                    <img src={data.imageProduct}></img>
                                </div>
                                <div className={cx('nameProd')}>
                                    <span>{data.nameProduct}</span>
                                </div>
                            </a>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={cx('imageUser')}>
                            <img src={data.imageUser}></img>
                        </div>
                        <div className={cx('Comment')}>
                            <div className={cx('infor')}>
                                <div className={cx('inforleft')}>
                                    <p className={cx('name')}>{data.nameCustomers}</p>
                                    <span className={cx('timedatepublic')}>{convertDateTime(data.timePublic)}</span>
                                </div>
                                <div className={cx('inforright')}>
                                    {dt.map((i) => {
                                        return (
                                            <p className={cx('starscomment', data.rateCount >= i ? 'active' : '')}></p>
                                        );
                                    })}
                                    {user != null ? (
                                        data.idCustomers == user.idCustomers ? (
                                            <div className={cx('action_user')}>
                                                <FontAwesomeIcon
                                                    icon={faEllipsisVertical}
                                                    className={cx('icon')}
                                                    onClick={() => {
                                                        setstateAction(!stateAction);
                                                    }}
                                                />
                                                {stateAction == true ? (
                                                    <div className={cx('drop_box_action')}>
                                                        <ul>
                                                            <li
                                                                onClick={() => {
                                                                    setStateComment(true);
                                                                }}
                                                            >
                                                                Sửa đánh giá
                                                            </li>
                                                            <li onClick={handleDeleteComment}>Xóa</li>
                                                        </ul>
                                                    </div>
                                                ) : (
                                                    <></>
                                                )}
                                            </div>
                                        ) : (
                                            <></>
                                        )
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                            <div className={cx('contentComment')}>{data.contentComment}</div>
                            <div className={cx('commentImage')}>
                                {attrComment.map((item) => {
                                    return (
                                        <div className={cx('tag')} style={{ marginRight: '20px' }}>
                                            {item.value}
                                        </div>
                                    );
                                })}
                                {/* <ul>
                                {imagesComment.length != 0 ? (
                                    imagesComment.map((img) => {
                                        return (
                                            <li>
                                                <img className={cx('imageComment')} src={img}></img>
                                            </li>
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
                            </ul> */}
                                <PhotoProvider>
                                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {imagesComment.map((image, index) => (
                                            <PhotoView key={index} src={image}>
                                                <img
                                                    src={image}
                                                    alt=""
                                                    style={{ width: '8%', margin: '10px', cursor: 'pointer' }}
                                                />
                                            </PhotoView>
                                        ))}
                                    </div>
                                </PhotoProvider>{' '}
                            </div>
                            <div className={cx('action')}>
                                <div></div>
                                <div className={cx('icons')}>
                                    <FlagIcon className={'icon'} />
                                    <div>
                                        <LikeIcon className={'icon'} />
                                        <span>Hữu ích</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
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
                                <textarea
                                    onChange={(e) => {
                                        setValueTextAre(e.target.value);
                                    }}
                                    value={valueTextArea}
                                ></textarea>
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
                                                style={{
                                                    display: 'inline-block',
                                                    position: 'relative',
                                                    margin: '10px',
                                                }}
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
                                    <button onClick={handleUpdateComment}>
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
            {commentreplays != null ? (
                commentreplays.map((item) => {
                    if (item.idCmReply == data.idComment) {
                        return (
                            <div className={cx('reply_comment')}>
                                <div className={cx('thumb_shop')}>
                                    <img src={datadetail.imageShop}></img>
                                </div>
                                <div className={cx('content')}>
                                    <div className={cx('name_shop')}>
                                        <span>{datadetail.tenshop}</span>
                                    </div>
                                    <span className={cx('timedatepublic')}>{convertDateTime(item.timePublic)}</span>
                                    <div className={cx('content_reply')}>
                                        <span>{item.contentComment}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })
            ) : (
                <></>
            )}
        </div>
    );
}

export default CommentItem;
