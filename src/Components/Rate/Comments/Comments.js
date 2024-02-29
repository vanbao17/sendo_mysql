import classNames from 'classnames/bind';
import styles from './Comments.module.scss';
import CommentItem from './CommentItem';
const cx = classNames.bind(styles);

function Comments({ data, normal }) {
    return (
        <div className={cx('wrapper')}>
            <CommentItem normal={normal} />
        </div>
    );
}

export default Comments;
