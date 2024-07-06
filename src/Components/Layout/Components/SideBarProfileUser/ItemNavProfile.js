import classNames from 'classnames/bind';
import styles from './SideBarProfileUser.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
const cx = classNames.bind(styles);
function ItemNavProfile({ title, list_nav }) {
    const [state, setstate] = useState(true);
    return (
        <div className={cx('nav')}>
            <div
                className={cx('title')}
                onClick={() => {
                    setstate(!state);
                }}
            >
                <span className={cx('title_span')}>{title}</span>
                <FontAwesomeIcon icon={faChevronDown} />
            </div>
            <ul style={state != false ? { height: '0px', overflow: 'hidden' } : {}}>
                {list_nav.map((nav) => {
                    return (
                        <li>
                            <a href={nav.path}>
                                <span>{nav.name}</span>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default ItemNavProfile;
