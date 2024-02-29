import classNames from 'classnames/bind';
import styles from './ProgressItem.module.scss';
import { StarIcon } from '../../IconSvg';
const cx = classNames.bind(styles);

function ProgressItem({ sum, data, className, normal }) {
    const classes = cx('star', {
        [className]: className,
    });
    const wd = (data / sum) * 100;
    return (
        <div className={cx('item')}>
            {normal == false ? (
                <div className={classes}></div>
            ) : (
                <div className={cx('onestar')}>
                    <StarIcon width="12px" height="12px" />
                </div>
            )}
            <div className={cx('progress')} style={{ width: '100%', height: '8px', backgroundColor: '#e0e0e0' }}>
                <span className={cx('bgr-red')} style={{ width: `${wd}%` }}></span>
            </div>
            <span className={cx('count')}>{data}</span>
        </div>
    );
}

export default ProgressItem;
