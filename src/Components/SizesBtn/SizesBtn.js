import styles from './SizesBtn.js.module.scss';
import classNames from 'classnames/bind';
import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);
function SizesBtn({ data = null, idProduct, handleSendData, title = null }) {
    const [active, setactive] = useState(data);
    const [sizes, setsizes] = useState([]);
    function handle(index) {
        setactive(index);
    }

    useEffect(() => {
        if (active != undefined) {
            handleSendData(active);
        }
    }, [active]);
    useEffect(() => {
        fetch(`https://sdvanbao17.id.vn/api/v1/getSizesProduct/${idProduct}`)
            .then((respone) => respone.json())
            .then((dt) => {
                setsizes(dt);
                if (data == null) {
                    setactive(dt[0]);
                } else {
                    setactive(data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [idProduct, data]);

    return (
        <div className={cx('wrapper')}>
            {title == null ? (
                <div className={cx('displaySize')}>
                    <p>Chọn Size</p>
                    <p></p>
                </div>
            ) : (
                <></>
            )}

            {sizes.map((item, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => {
                            handle(item);
                        }}
                        className={cx(
                            active != null
                                ? item.attribute_value_id == active.attribute_value_id
                                    ? 'active'
                                    : ''
                                : '',
                        )}
                    >
                        <span className={cx('choseSize')}>{item.value}</span>
                    </button>
                );
            })}
        </div>
    );
}

export default SizesBtn;
