import classNames from 'classnames/bind';
import styles from './ContainerCateSiteMap.module.scss';
import ItemSiteMap from './ItemSiteMap';
import { useState } from 'react';
import slugify from 'slugify';
const cx = classNames.bind(styles);
function ContainerCateSiteMap({ title, danhmuc2 }) {
    const newArr = [];
    const convertToSlug = (text) => {
        return slugify(text, {
            lower: true, // Chuyển tất cả ký tự thành chữ thường
            remove: /[*+~.()'"!:@,]/g, // Loại bỏ các ký tự đặc biệt bao gồm dấu phẩy
            locale: 'vi', // Hỗ trợ ngôn ngữ tiếng Việt
        });
    };
    function chunkArray(array, chunkSize) {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            const chunk = array.slice(i, i + chunkSize);
            result.push(chunk);
        }
        return result;
    }
    const [arr, setArr] = [chunkArray(danhmuc2, 6)];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h3 className={cx('title_container')}>
                    <a href={`/${convertToSlug(title)}`}>{title}</a>
                </h3>
                <div className={cx('list')}>{arr.length != 0 ? arr.map((it) => <ItemSiteMap data={it} />) : <></>}</div>
            </div>
        </div>
    );
}

export default ContainerCateSiteMap;
