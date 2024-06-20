import classNames from 'classnames/bind';
import styles from './Rate.module.scss';
import ProductItem from '../ProductItem/ProductItem';
import ProgressItem from './ProgressItem/ProgressItem';
import { useState } from 'react';
import Comments from './Comments/Comments';
const cx = classNames.bind(styles);

function Rate({ data, id, normal }) {
    const total = 15;
    const dt = [
        { rate: 5, count: 12 },
        { rate: 4, count: 3 },
        { rate: 3, count: 0 },
        { rate: 2, count: 0 },
        { rate: 1, count: 0 },
    ];
    let max = 0;
    dt.forEach((item) => {
        if (item.rate == 5) {
            max = item.count;
        }
    });
    const [selectted, setselectted] = useState([]);
    function handleBtn(index) {
        if (selectted.includes(index) == false) {
            setselectted([...selectted, index]);
        } else {
            setselectted(selectted.filter((num) => num !== index));
        }
    }
    return (
        <div className={cx('wrapper')} id={id}>
            <div className={cx('nonTempRate')}>
                <span className={cx('title')}>
                    Đánh giá nhận xét về sản phẩm <i>( 1 lượt đánh giá )</i>
                </span>
                <div className={cx('ovrRate')}>
                    <div className={cx('total')}>
                        <span className={cx('dis-total')}>
                            <span className={cx('avg')}>{(max / total) * 5}</span>
                            <span>/5</span>
                            <div className={cx('stars')}></div>
                        </span>
                        <div className={cx('notification')}>
                            {normal == true
                                ? 'Đây là thông tin người mua đánh giá shop bán sản phẩm này có đúng mô tả không.'
                                : '(5093 đánh giá)'}
                        </div>
                    </div>
                    <div className={cx('dis-rate', normal == false && 'changeWidth')}>
                        {dt.map((item, index) => {
                            return (
                                <ProgressItem
                                    key={index}
                                    normal={true}
                                    sum={total}
                                    data={item.count}
                                    className={'star' + item.rate}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className={cx('button-rate')}>
                    <button className={cx('btn', selectted.length == 0 ? 'active' : '')}>
                        <span>Tất cả</span>
                    </button>
                    {dt.map((item, index) => {
                        return (
                            <button
                                key={index}
                                className={cx(
                                    'btn',
                                    selectted.length > 0 ? (selectted.includes(index) == true ? 'active' : '') : '',
                                )}
                                onClick={() => {
                                    handleBtn(index);
                                }}
                            >
                                <span>{-(index - 5)} Sao</span>
                            </button>
                        );
                    })}
                    <button className={cx('btn')}>
                        <span>Đánh giá có hình</span>
                    </button>
                </div>
            </div>
            <div className={cx('tempRate')}>
                <img src="https://web-static.scdn.vn/sendo-communication-rating/863edd0-web/media/rating-empty.f56ae9e22805ed6a864d1a540bea0947.svg"></img>
                <strong>Sản phẩm chưa có đánh giá.</strong>
                <p>Chọn mua sản phẩm để là người đầu tiên đánh giá sản phẩm này.</p>
            </div>
            <Comments normal={normal} />
        </div>
    );
}

export default Rate;
