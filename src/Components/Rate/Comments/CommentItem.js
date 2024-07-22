import classNames from 'classnames/bind';
import styles from './Comments.module.scss';
import Comments from './Comments';
import { format } from 'date-fns';
import { FlagIcon, LikeIcon } from '../../IconSvg';
const cx = classNames.bind(styles);
function CommentItem({ data, normal }) {
    const dt = [1, 2, 3, 4, 5];
    const convertDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const formattedDate = format(date, 'dd/MM/yyyy');
        const formattedTime = format(date, 'HH:mm:ss');
        return `${formattedDate} | ${formattedTime}`;
    };
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
                            </div>
                        </div>
                        <div className={cx('contentComment')}>{data.contentComment}</div>
                        <div className={cx('commentImage')}>
                            <div className={cx('tag')}>{data.size}</div>
                            <div className={cx('tag')}>{data.color}</div>
                            <ul>
                                <li>
                                    <img className={cx('imageComment')} src={data.imageComment}></img>
                                </li>
                            </ul>
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
