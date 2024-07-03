import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ColorsBtn.module.scss';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);
function ColorsBtn({ dataColor, imgs, idProduct, handleSendData }) {
    const [active, setactive] = useState(null);
    const [colors, setcolors] = useState([]);
    function handle(index) {
        setactive(index);
    }
    useEffect(() => {
        if (active != undefined) {
            handleSendData(active);
        }
    }, [active]);
    useEffect(() => {
        fetch(`https://sdvanbao17.id.vn/api/v1/getColorsProduct/${idProduct}`)
            .then((respone) => respone.json())
            .then((data) => {
                setcolors(data);
                setactive(data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [idProduct]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('displaySize')}>
                <p>Chọn Màu</p>
                <p></p>
            </div>
            {dataColor &&
                colors.map((item, index) => {
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

export default ColorsBtn;
