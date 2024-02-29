import classNames from 'classnames/bind'
import styles from "./CatetoryItem.module.scss"
const cx = classNames.bind(styles)
function CatetorysItem({mini,large,bgcolor,item,className,bg}) {
    const classStyle = cx('item-cate',{
        bg,
        mini,
        large,
        [className]:className
    })
    return (
        <div className={classStyle} style={{backgroundColor:bgcolor}}>
            <a>
                <div className={cx('img-cate')}><img src={item.img} alt='Catetory'></img></div>
                <span className={cx('title')}>{item.name}</span>
            </a>
        </div>
    );
}

export default CatetorysItem;