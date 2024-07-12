import classNames from 'classnames/bind';
import styles from './Loading.module.scss';
import { CircleRouteIcon, SendoIcon } from '../../IconSvg';
const cx = classNames.bind(styles);
function Loading() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('container_icon_loading')}>
                    <SendoIcon className={cx('icon_sendo')} />
                    <CircleRouteIcon width="60px" height="60px" className={cx('circle_router')} />
                </div>
                <div className={cx('background_loading')}></div>
            </div>
        </div>
    );
}

export default Loading;
