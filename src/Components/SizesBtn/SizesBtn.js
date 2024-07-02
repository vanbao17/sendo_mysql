import styles from './SizesBtn.js.module.scss';
import classNames from 'classnames/bind';
import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);
function SizesBtn({ data, idProduct, handleSendData }) {
    const [active, setactive] = useState(null);
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
            .then((data) => {
                setsizes(data);
                setactive(data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [idProduct]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('displaySize')}>
                <p>Chọn Size</p>
                <p></p>
            </div>
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
