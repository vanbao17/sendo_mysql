import classNames from 'classnames/bind';
import styles from './Sitemap.module.scss';
import ContainerCateSiteMap from '../../Layout/Components/ContainerCateSiteMap/ContainerCateSiteMap';
import { useEffect, useState } from 'react';
import slugify from 'slugify';
const cx = classNames.bind(styles);

function Sitemap() {
    const [danhmuc1, setdanhmuc1] = useState([]);
    const [danhmuc2, setdanhmuc2] = useState([]);
    useEffect(() => {
        fetch('https://sdvanbao17.id.vn/api/v1/danhmuc1')
            .then((rs) => rs.json())
            .then((dt) => setdanhmuc1(dt))
            .catch((err) => {
                console.log(err);
            });
        fetch('https://sdvanbao17.id.vn/api/v1/danhmuc2')
            .then((rs) => rs.json())
            .then((dt) => setdanhmuc2(dt))
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('history_nav')}>Sendo.vn Danh mục sản phẩm</div>
                <div className={cx('list_cate_detail')}>
                    {danhmuc1.map((dm1) => {
                        const dm2 = danhmuc2.filter((itemdm2) => itemdm2.madm1 === dm1.madm1);
                        return <ContainerCateSiteMap title={dm1.tendm1} danhmuc2={dm2} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default Sitemap;
