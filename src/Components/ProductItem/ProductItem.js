import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import { important } from '../../Assets/images/image/image';
import { ig } from '../../Assets/images';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);

function ProductItem({ pdnormal, pdmain, className, data, width, height, newProd }) {
    const classes = cx('wrapper', {
        [className]: className,
    });
    const navigate = useNavigate();
    function HandlePath() {
        // navigate(`/detail/${data.nameProduct}`, { state: { dt: data.idProduct } });
    }
    return (
        <div className={classes}>
            {pdnormal && (
                <div className={cx('item-slide')}>
                    <a className={cx('item')} href="">
                        <div className={cx('content')} style={{ width: width, height: height }}>
                            <div className={cx('image')}>
                                <img className={cx('img-main')} src={data.imageProduct}></img>
                                {data.name ? <></> : <img className={cx('img-sale')} src={important.sale}></img>}
                            </div>
                            {data.nameProduct && <div className={cx('name')}>{data.nameProduct}</div>}
                            <div className={cx('price')}>
                                {!data.nameProduct && <h3>{data.priceDefault}</h3>}
                                {data.nameProduct && <h3>{data.priceSale}đ</h3>}
                                <span className={cx('linethrought')} style={{ fontWeight: 400 }}>
                                    {data.priceDefault}đ
                                </span>
                                <span className={cx('sale')} style={{ fontWeight: 400 }}>
                                    -{Math.round((data.priceSale / data.priceDefault) * 100)}%
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            )}
            {pdmain && (
                <div className={cx('item-pdmain')} onClick={() => HandlePath(data.idProduct)}>
                    <a href={`/detail/${data.nameProduct}/${data.idProduct}`}>
                        <div className={cx('item')}>
                            <div className={cx('pdmain-content')}>
                                <div className={cx('image')}>
                                    <img className={cx('img-main')} src={`${data.imageProduct}`} alt="Product Image" />
                                </div>
                                <div className={cx('infor')}>
                                    <div className={cx('name')}>
                                        {newProd == true ? (
                                            <img className={cx('img-shop')} src={ig.shoptag}></img>
                                        ) : (
                                            <></>
                                        )}
                                        <span>{data.nameProduct}</span>
                                    </div>
                                    <div className={cx('price')}>
                                        {data.priceDefault && (
                                            <span className={cx('linethrought')}>{data.priceDefault}</span>
                                        )}
                                        <span className={cx('sale')}>{data.precent}</span>

                                        <h3>{data.priceSale}</h3>
                                    </div>

                                    <div className={cx('tag')}>
                                        {!newProd && (
                                            <>
                                                <img className={cx('img-shop')} src={ig.tragoptag}></img>
                                                <span>Trả góp Kredivo</span>
                                            </>
                                        )}
                                    </div>
                                    {!newProd && (
                                        <div className={cx('buyopen')}>
                                            <span>Mở bán</span>
                                        </div>
                                    )}

                                    <div className={cx('infother')}>
                                        <p>{newProd && `Đã bán ${data.selledQuality}`}</p>
                                        <div className={cx('rate-address')}>
                                            {newProd && (
                                                <>
                                                    <div className={cx('rate')}>
                                                        <span>4.2/5</span>
                                                        <span className={cx('star')}></span>
                                                    </div>
                                                </>
                                            )}
                                            {newProd && <span></span>}

                                            <span>Bình Thuận</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            )}
        </div>
    );
}

export default ProductItem;
