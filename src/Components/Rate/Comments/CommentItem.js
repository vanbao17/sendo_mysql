import classNames from 'classnames/bind';
import styles from './Comments.module.scss';
import Comments from './Comments';
import { FlagIcon, LikeIcon } from '../../IconSvg';
const cx = classNames.bind(styles);
function CommentItem({ data, normal }) {
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
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4O-jd-HDATEFcN4KJjaeQH-If38062C8nyBrXmxo&s"></img>
                    </div>
                    <div className={cx('Comment')}>
                        <div className={cx('infor')}>
                            <div className={cx('inforleft')}>
                                <p className={cx('name')}>Phạm Văn Bảo</p>
                                <span className={cx('timedatepublic')}>13:50 | 17/11/2003</span>
                            </div>
                            <div className={cx('inforright')}>
                                <p className={cx('starscomment')}></p>
                            </div>
                        </div>
                        <div className={cx('contentComment')}>
                            Cần đúng với mô tả. Chất lượng cần tốt hơn. Giao hàng cần nhanh hơn. Shop cần thân thiện
                            hơn. Nên đóng gói kỹ hơn. shop lừa đảo
                        </div>
                        <div className={cx('commentImage')}>
                            <div className={cx('tag')}>Xanh Lá</div>
                            <ul>
                                <li>
                                    <img
                                        className={cx('imageComment')}
                                        src="http://media3.scdn.vn/img4/2023/05_06/9UOmc5d9kqpA3mkelBSN.jpg"
                                    ></img>
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
