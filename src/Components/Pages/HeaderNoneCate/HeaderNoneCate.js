import classNames from 'classnames/bind';
import styles from './HeaderNoneCate.module.scss';
import Header from '../../Layout/Components/Header/Header';
import Footer from '../../Layout/Components/Footer/Footer';
const cx = classNames.bind(styles);

function HeaderNoneCate({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className="content">{children}</div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default HeaderNoneCate;
