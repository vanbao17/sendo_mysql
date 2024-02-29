import classNames from 'classnames/bind';
import styles from './ListCates.module.scss';
import { useState } from 'react';
const cx = classNames.bind(styles);

function ContainerCateItems({ index }) {
    const [dm2, setdm2] = useState([]);
    const [dm3, setdm3] = useState([]);
    fetch('http://localhost:3001/api/v1/danhmuc2/' + index)
        .then((res) => res.json())
        .then((data) => setdm2(data))
        .catch((rejected) => {
            console.log(rejected);
        });
    fetch('http://localhost:3001/api/v1/danhmuc3')
        .then((res) => res.json())
        .then((data) => setdm3(data))
        .catch((rejected) => {
            console.log(rejected);
        });
    return (
        <div className={cx('container')}>
            <div className={cx('list')}>
                {dm2.map((item, indexdm2) => {
                    return (
                        <div key={indexdm2} className={cx('itemBoxTag')}>
                            <div>
                                {/* //<FontAwesomeIcon className={cx('icon')} icon={item.icon} /> */}
                                <p style={{ fontWeight: 700 }}>{item.tendm2} index</p>
                            </div>
                            {dm3.map((ietmdm3, indexdm3) => {
                                if (ietmdm3.madm2 == indexdm2) {
                                    return <p key={indexdm3}>{ietmdm3.tendm3}</p>;
                                }
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ContainerCateItems;
