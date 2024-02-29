import classNames from 'classnames/bind';
import styles from './Slide.module.scss';
import ProductItem from '../../../ProductItem/ProductItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import CatetorysItem from '../../../CatetoryItem/CatetorysItem';
const cx = classNames.bind(styles);

function Slide({ data, ovr, prod, size, normal, width, height, prodNew }) {
    const [lengths, setlenghts] = useState(0);
    const refSlide = useRef();
    function handleSlide() {
        refSlide.current.style.transform = `translateX(-${size * lengths + (lengths - 1) * 15}px)`;
        if (lengths == 0) {
            refSlide.current.style.transform = `translateX(0px)`;
        }
    }
    useEffect(() => {
        handleSlide();
    }, [lengths]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('overflowslide')}>
                <div className={cx('slides', 'normal')} ref={refSlide}>
                    {/* normal && */}
                    {normal &&
                        data.map((item, index) => {
                            return <img className={cx('normal')} src={item.img} key={index}></img>;
                        })}
                    {prod == false &&
                        data.map((item, index) => {
                            return (
                                <CatetorysItem className={cx('item')} large bgcolor={item.bg} key={index} item={item} />
                            );
                        })}
                    {prod == true &&
                        data.map((item, index) => {
                            return <ProductItem key={index} data={item} pdnormal width={width} height={height} />;
                        })}
                    {prodNew == true &&
                        data.map((item, index) => {
                            return (
                                <ProductItem newProd={true} className={cx('prmain')} key={index} pdmain data={item} />
                            );
                        })}
                    {/* {data.map((item, index) => {
                        if (prod) {
                            return <ProductItem key={index} data={item} pdnormal />;
                        }
                        if ((prod = false)) {
                            return (
                                <CatetorysItem className={cx('item')} large bgcolor={item.bg} key={index} item={item} />
                            );
                        }
                        if (normal) {
                            return <img className={cx('normal')} src={item.img} key={index}></img>;
                        }
                    })} */}
                </div>
                {lengths <= data.length - ovr && (
                    <button
                        className={cx('icon', 'right')}
                        onClick={() => {
                            if (lengths < data.length - ovr) {
                                setlenghts(lengths + ovr);
                                if (lengths == data.length) {
                                    setlenghts(data.length);
                                }
                            }
                            handleSlide();
                        }}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                )}
                {lengths >= ovr && (
                    <button
                        className={cx('icon', 'left')}
                        onClick={() => {
                            if (data.length - lengths < data.length) {
                                setlenghts(lengths - ovr);
                            }
                            handleSlide();
                        }}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                )}
            </div>
        </div>
    );
}

export default Slide;
