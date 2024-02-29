import classNames from 'classnames/bind'
import styles from "./Banner.module.scss"
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles)
function Banner({img}) {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container-banner')}>
                <img src={img} alt='Banner Web '></img>
                <div className={cx('handle-banner')}>
                    <Link to="/timkiem" className={cx('place','left')}  ></Link>
                    <Link to="/sukien" className={cx('place','center')} ></Link>
                    <Link to="/timkiem" className={cx('place',"right")} ></Link>
                </div>
            </div>
        </div>
     );
}

export default Banner;