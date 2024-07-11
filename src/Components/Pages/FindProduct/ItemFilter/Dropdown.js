import classNames from 'classnames/bind';
import styles from './ItemFilter.module.scss';
import { faAdd, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import slugify from 'slugify';
const cx = classNames.bind(styles);

function Dropdown({ itemdm2, dm1Id }) {
    const [filter2State, setfilter2State] = useState(false);
    const [dm3, setdm3] = useState([]);
    const handleItem2Filter = () => {
        setfilter2State(!filter2State);
    };
    useEffect(() => {
        fetch('https://sdvanbao17.id.vn/api/v1/danhmuc3/' + dm1Id)
            .then((res) => res.json())
            .then((data) => setdm3(data))
            .catch((rejected) => {
                console.log(rejected);
            });
    }, [dm1Id]);
    const convertToSlug = (text) => {
        return slugify(text, {
            lower: true, // Chuyển tất cả ký tự thành chữ thường
            remove: /[*+~.()'"!:@,]/g, // Loại bỏ các ký tự đặc biệt bao gồm dấu phẩy
            locale: 'vi', // Hỗ trợ ngôn ngữ tiếng Việt
        });
    };
    const handleUrl = (string) => {
        window.location.href = `/${convertToSlug(string)}`;
    };
    return (
        <div className={cx('wrapperDropdown')}>
            <div className={cx('titleFilter2')}>
                <FontAwesomeIcon
                    onClick={handleItem2Filter}
                    className={cx('filterIcon')}
                    icon={filter2State == false ? faChevronDown : faChevronUp}
                />
                <span
                    onClick={() => {
                        handleUrl(itemdm2.tendm2);
                    }}
                >
                    {itemdm2.tendm2}
                </span>
            </div>
            {filter2State == true ? (
                dm3.map((itemdm3, index) => {
                    if (itemdm3.madm2 == itemdm2.madm2) {
                        return (
                            <div
                                className={cx('filter3')}
                                onClick={() => {
                                    handleUrl(itemdm3.tendm3);
                                }}
                            >
                                <span key={index}>{itemdm3.tendm3}</span>
                            </div>
                        );
                    }
                })
            ) : (
                <></>
            )}
        </div>
    );
}

export default Dropdown;
