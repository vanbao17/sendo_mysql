import classNames from 'classnames/bind'
import styles from "./Tagfooter.module.scss"
const cx = classNames.bind(styles)

function TagfooterItem({data}) {
    return ( 
        <div className={cx('item')}>
            <img src={data.img}/>
            <div className={cx('infor')}>
                <span className={cx('title')}>{data.title}</span>
                <span className={cx('description')}>{data.description}</span>
            </div>
        </div>
    );
}

export default TagfooterItem;