import classNames from 'classnames/bind';
import styles from './Count.module.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function Count({ update }) {
    let [count, setcount] = useState(1);
    return (
        <div className={cx('count')}>
            {update && (
                <FontAwesomeIcon
                    icon={faMinus}
                    className={cx('icon')}
                    onClick={() => {
                        if (count > 1) {
                            setcount(count - 1);
                        }
                    }}
                />
            )}
            {update && (
                <input
                    value={count}
                    onChange={(e) => {
                        setcount(e.target.value);
                    }}
                    type="text"
                    name="count-input"
                />
            )}
            {update && (
                <FontAwesomeIcon
                    icon={faPlus}
                    className={cx('icon')}
                    onClick={() => {
                        setcount(count + 1);
                    }}
                />
            )}
        </div>
    );
}

export default Count;
