import classNames from 'classnames/bind'
import styles from "./Catetorys.module.scss"
import CatetorysItem from '../CatetoryItem/CatetorysItem';
const cx = classNames.bind(styles)
function Catetorys({data,children,className,large,bg}) {
    const classes = cx("container",{
        children,
        [className]:className
    })
    return (
        <div className={cx("wrapper")}>
            <div className={classes}>
                <div className={cx('setWidth')}>
                    {
                        data.map((item,index) => {
                            return <CatetorysItem  mini bg={bg} bgcolor={item.bg}  key={index} item={item} />
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Catetorys;