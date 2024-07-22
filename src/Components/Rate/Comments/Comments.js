import classNames from 'classnames/bind';
import styles from './Comments.module.scss';
import CommentItem from './CommentItem';
const cx = classNames.bind(styles);

function Comments({ data, normal }) {
    console.log(data);
    return (
        <div className={cx('wrapper')}>
            {data.length != 0 ? (
                data.map((cm) => {
                    return <CommentItem data={cm} normal={normal} />;
                })
            ) : (
                <></>
            )}
        </div>
    );
}

export default Comments;
