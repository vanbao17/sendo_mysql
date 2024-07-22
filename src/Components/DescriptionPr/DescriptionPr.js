import classNames from 'classnames/bind';
import styles from './DescriptionPr.module.scss';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);
function DescriptionPr({ data }) {
    const [seemore, setseemore] = useState(false);
    const [attrs, setattrs] = useState([]);

    useEffect(() => {
        fetch(`https://sdvanbao17.id.vn/api/v1/getAttrDetailProduct/${data.idProduct}`)
            .then((respone) => respone.json())
            .then((data) => {
                setattrs(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [data]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('dscrip')}>
                <p className={cx('title')}>Mô tả sản phẩm</p>
                <div dangerouslySetInnerHTML={{ __html: data.descriptionDetail }} />
            </div>
            <div className={cx(seemore == true ? '.basic-infor-see-more' : 'basic-infor')}>
                <p className={cx('title')}>Chi tiết sản phẩm</p>
                <div className={cx('list-infor')}>
                    {attrs.map((att, index) => {
                        const string = 'Màu sắc';
                        if (att.attribute_name != 'Màu sắc' && att.attribute_name != 'Kích thước')
                            return (
                                <div className={cx('item', index % 2 == 0 ? 'active' : '')}>
                                    <span className={cx('title-attribute')}>{att.attribute_name}</span>
                                    <span className={cx('attribute')}>{att.value}</span>
                                </div>
                            );
                    })}
                </div>
            </div>
            {/* <div className={cx('detail-product')}>
                <p className={cx('title')}>Chi tiết sản phẩm</p>

                <div dangerouslySetInnerHTML={{ __html: data.descriptionDetail }} />
            </div> */}
            <button
                className={cx('see-more')}
                onClick={() => {
                    setseemore(!seemore);
                }}
            >
                {seemore == false ? <span>Xem thêm</span> : <span>Thu gọn</span>}
            </button>
        </div>
    );
}

export default DescriptionPr;
