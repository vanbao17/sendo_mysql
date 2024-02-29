import classNames from 'classnames/bind'
import styles from "./Oclock.module.scss"
const cx = classNames.bind(styles)
function Oclock() {
    return ( <div className={cx('wrapper')}>
        Oclock
    </div> 
    );
}

export default Oclock;