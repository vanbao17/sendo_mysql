import classNames from 'classnames/bind';
import styles from './ListCates.module.scss';
import { useEffect, useState } from 'react';
import slugify from 'slugify';

const cx = classNames.bind(styles);

function ContainerCateItems({ index }) {
    const [dm2, setdm2] = useState([]);
    const [dm3, setdm3] = useState([]);
    const convertToSlug = (text) => {
        return slugify(text, {
            lower: true, // Chuyển tất cả ký tự thành chữ thường
            remove: /[*+~.()'"!:@,]/g, // Loại bỏ các ký tự đặc biệt bao gồm dấu phẩy
            locale: 'vi', // Hỗ trợ ngôn ngữ tiếng Việt
        });
    };
    useEffect(() => {
        fetch('https://sdvanbao17.id.vn/api/v1/danhmuc2')
            .then((res) => res.json())
            .then((data) => setdm2(data))
            .catch((rejected) => {
                console.log(rejected);
            });
    }, []);
    useEffect(() => {
        fetch('https://sdvanbao17.id.vn/api/v1/danhmuc3/' + index)
            .then((res) => res.json())
            .then((data) => setdm3(data))
            .catch((rejected) => {
                console.log(rejected);
            });
    }, [index]);
    const handleUrl = (string) => {
        window.location.href = `/${convertToSlug(string)}`;
    };
    localStorage.setItem('danhmuc2', JSON.stringify(dm2));
    var a = dm2.filter((item) => item.madm1 == index);
    return (
        <div className={cx('container')}>
            <div className={cx('list')}>
                {a.map((item, indexdm2) => {
                    return (
                        <div key={item.madm2} className={cx('itemBoxTag')}>
                            <div
                                onClick={() => {
                                    handleUrl(item.tendm2);
                                }}
                            >
                                {/* //<FontAwesomeIcon className={cx('icon')} icon={item.icon} /> */}
                                <p style={{ fontWeight: 700 }}>{item.tendm2}</p>
                            </div>
                            {dm3.map((ietmdm3, indexdm3) => {
                                if (ietmdm3.madm2 == item.madm2) {
                                    return (
                                        <p
                                            onClick={() => {
                                                handleUrl(ietmdm3.tendm3);
                                            }}
                                            key={indexdm3}
                                        >
                                            {ietmdm3.tendm3}
                                        </p>
                                    );
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
