import classNames from 'classnames/bind';
import styles from './ContainerIntro.module.scss';
const cx = classNames.bind(styles);
function ContainerIntro({ title = false, children, icon }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                {title ? (
                    <h2>
                        {<img src={icon} style={{ height: '24px', paddingRight: '12px' }}></img>}
                        {title}
                    </h2>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                            className={cx('bgimg')}
                            style={{
                                width: '119px',
                                height: '28px',
                                backgroundImage: `url('https://web-static.scdn.vn/sendo-buyers-flash-sale-widget/35b761b6-web/media/flashsale-icon.6d0b98fffda3d7d526b45c53de367840.svg')`,
                            }}
                        ></div>
                    </div>
                )}
                <a href="">Xem tất cả</a>
            </div>
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default ContainerIntro;
