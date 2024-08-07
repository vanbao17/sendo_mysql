import classNames from 'classnames/bind';
import styles from './ListCates.module.scss';
import { faPersonBooth, faPersonDress, faShirt, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import ContainerCateItems from './ContainerCateItems';
import { json, useNavigate } from 'react-router-dom';
import slugify from 'slugify';
const cx = classNames.bind(styles);

function ListCates() {
    const [index, setindex] = useState();
    const [data, setdata] = useState([]);
    const route = useNavigate();
    const convertToSlug = (text) => {
        return slugify(text, {
            lower: true,
            remove: /[*+~.()'"!:@]/g,
            locale: 'vi',
        });
    };
    const handleRoute = (data) => {
        window.location.href = `/${convertToSlug(data.tendm1)}`;
    };
    useEffect(() => {
        fetch('https://sdvanbao17.id.vn/api/v1/danhmuc1')
            .then((res) => res.json())
            .then((data) => setdata(data))
            .catch((rejected) => {
                console.log(rejected);
            });
    }, []);
    localStorage.setItem('danhmuc1', JSON.stringify(data));
    return (
        <div className={cx('wrapper')}>
            <div className={cx('list')}>
                {data.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={cx('item')}
                            onMouseEnter={() => {
                                setindex(item.madm1);
                            }}
                        >
                            <div>
                                {/* //<FontAwesomeIcon className={cx('icon')} icon={item.icon} /> */}
                                <span
                                    onClick={() => {
                                        handleRoute(item);
                                    }}
                                >
                                    {item.tendm1}
                                </span>
                            </div>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div>
                    );
                })}
            </div>
            {index >= 0 && <ContainerCateItems index={index} />}
        </div>
    );
}

export default ListCates;
