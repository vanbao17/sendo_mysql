import classNames from 'classnames/bind';
import styles from './CheckOut.module.scss';
import { CheckboxActiveIcon, CheckboxIcon, InforIcon } from '../../IconSvg/IconSvg';
import { useEffect, useRef, useState } from 'react';
const cx = classNames.bind(styles);
function ItemTranformMethod({ classNames = [], checked, title, image, desc, titleRight }) {
    const [stateActive, setStateActive] = useState(checked);
    return (
        <div
            className={cx(
                'wrapper_item_method',
                [...classNames],
                stateActive == true && classNames.length != 0 ? 'active' : '',
            )}
        >
            <div className={cx('left')}>
                <div
                    className={cx('icon_input')}
                    onClick={() => {
                        setStateActive(!stateActive);
                    }}
                >
                    {stateActive == true ? (
                        <CheckboxActiveIcon className={cx('icon')} />
                    ) : (
                        <CheckboxIcon className={cx('icon')} />
                    )}
                </div>
                <div className={cx('infor')}>
                    <div className={cx('title_method')}>
                        {image != undefined ? <img style={{ with: '32px', height: '32px' }} src={image}></img> : ''}
                        <span>{title != undefined ? title : 'Giao Tiêu chuẩn'}</span>
                    </div>
                    <span>{desc != undefined ? desc : <></>}</span>
                </div>
            </div>
            <div className={cx('price')}>{titleRight != undefined ? titleRight : <></>}</div>
        </div>
    );
}

export default ItemTranformMethod;
