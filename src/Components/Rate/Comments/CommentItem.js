import classNames from 'classnames/bind';
import styles from './Comments.module.scss';
import Comments from './Comments';
import { format } from 'date-fns';
import { FlagIcon, LikeIcon } from '../../IconSvg';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faEllipsis, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function CommentItem({ data, normal }) {
    const [attrComment, setAttComment] = useState([]);
    const [imagesComment, setImagesComment] = useState([]);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const dt = [1, 2, 3, 4, 5];
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
    }, []);
    useEffect(() => {
        const list_url = data.imageComment.split(',');
        setImagesComment(list_url);
    }, [data]);
    return (
        <div className={cx('wrapperItem')}>
            {normal == false ? (
                <>
                    <div className={cx('imageUser')}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4O-jd-HDATEFcN4KJjaeQH-If38062C8nyBrXmxo&s"></img>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('line')}>
                            <hr></hr>
                        </div>
                        <p className={cx('nameUser')}>
                            <span>0385230184</span>
                            <p className={cx('timePublic')}>Hôm nay</p>
                        </p>
                        <span className={cx('status')}>Tạm hài lòng</span>
                        <p className={cx('stars')}></p>
                        <p className={cx('comment')}>
                            Cần đúng với mô tả. Chất lượng cần tốt hơn. Giao hàng cần nhanh hơn. Shop cần thân thiện
                            hơn. Nên đóng gói kỹ hơn. shop lừa đảo
                        </p>
                        <a className={cx('buyrecent')}>
                            <div className={cx('imageProd')}>
                                <img src="https://media3.scdn.vn/img4/2023/10_27/trf740hJU8xYr0bFy6oR_simg_b5529c_250x250_maxb.jpg"></img>
                            </div>
                            <div className={cx('nameProd')}>
                                <span>Dây cáp sạc nhanh</span>
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
                                    return <p className={cx('starscomment', data.rateCount >= i ? 'active' : '')}></p>;
                                })}
                                {data.idCustomers == user.idCustomers ? (
                                    <div className={cx('action_user')}>
                                        <FontAwesomeIcon icon={faEllipsisVertical} className={cx('icon')} />
                                        <div className={cx('drop_box_action')}>
                                            <ul>
                                                <li></li>
                                                <li></li>
                                                <li></li>
                                            </ul>
                                        </div>
                                    </div>
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
        </div>
    );
}

export default CommentItem;
