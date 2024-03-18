import classNames from 'classnames/bind';
import styles from './Count.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function Count({ update, quanlityFunc, index }) {
    let [count, setcount] = useState(1);
    const handleClickAdd = () => {
        quanlityFunc(count + 1);
    };
    const handleClick = () => {
        quanlityFunc(count - 1);
    };
    return (
        <div className={cx('count')}>
            {update && (
                <FontAwesomeIcon
                    icon={faMinus}
                    className={cx('icon')}
                    onClick={() => {
                        if (count > 1) {
                            setcount(count - 1);
                            handleClick();
                        }
                    }}
                />
            )}
            {update && (
                <input
                    value={index ?? count}
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
                        handleClickAdd();
                    }}
                />
            )}
        </div>
    );
}

export default Count;
