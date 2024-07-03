import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { ListCate } from '../IconSvg/IconSvg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import ListCates from '../ListCates/ListCates';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function Search() {
    const [dataInput, setdataInput] = useState('');
    const [dataSearch, setdataSearch] = useState([]);

    const [stateMouse, setStateMouse] = useState(false);
    // const [stateMouse,setStateMouse] = useState(false)
    const navigate = useNavigate();
    function renderListCate() {
        return <ListCates />;
    }
    const handleChangeInput = (e) => {
        setdataInput(e.target.value);
    };
    useEffect(() => {
        if (dataInput.length !== 0) {
            fetch(`https://sdvanbao17.id.vn/api/v1/getProductsLetters?query=${dataInput}`)
                .then((response) => response.json())
                .then((data) => setdataSearch(data))
                .catch((err) => {
                    if (err) throw err;
                });
        } else {
            setdataSearch([]);
        }
    }, [dataInput]);
    function HandlePath(product) {
        navigate(`/detail/${product.nameProduct}`, { state: { dt: product.idProduct } });
    }
    return (
        <div className={cx('wrapper')}>
            <Tippy
                interactive={true}
                appendTo={() => document.body}
                // visible
                offset={[50, 15]}
                delay={[0, 0]}
                placement="bottom"
                render={renderListCate}
            >
                <a className={cx('listcate')}>
                    <Link to="/sitemap">
                        <ListCate width="24px" height="24px "></ListCate>
                    </Link>
                </a>
            </Tippy>

            <div className={cx('containerInput')}>
                <input type="text" placeholder="Tìm trên Sendo ..." onChange={handleChangeInput}></input>
                {dataSearch.length !== 0 ? (
                    <ul className={cx('containerResult')}>
                        {dataSearch.map((item, index) => {
                            return (
                                <li
                                    onClick={() => {
                                        HandlePath(item);
                                    }}
                                >
                                    <span>{item.nameProduct}</span>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <></>
                )}
            </div>

            {/* <input type="text" placeholder="Tìm trên Sendo ..." onChange={handleChangeInput}></input> */}
            <button className={cx('search-icon')}>
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ width: '24px', height: '24px' }} />
            </button>
        </div>
    );
}

export default Search;
