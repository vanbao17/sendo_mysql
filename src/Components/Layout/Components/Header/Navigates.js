import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import HomePage from '../HomePage/HomePage';

const cx = classNames.bind(styles);

function Navigates() {
    const [dataCate, setdataCate] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/v1/danhmuc2rand5')
            .then((response) => response.json())
            .then((data) => {
                const dataArray = JSON.stringify(data);
                setdataCate(data);
                Cookies.set('cate', data, { expires: 1 });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const storedArray = Cookies.get('cate');
    const resultsData = storedArray;

    return (
        <menu>
            <NavLink to="/" className={(nav) => cx('menu-item', { active: nav.isActive })}>
                Cho bạn
            </NavLink>
            {dataCate.map((item, index, history) => (
                <NavLink
                    to={`http://localhost:3001?cate_recommend=${item.madm1}`}
                    className={(nav) => cx('menu-item', { active: nav.isActive })}
                    key={index}
                    onClick={() => {
                        history.push(`/?cate_recommend=${item.madm1}`);
                    }}
                >
                    {item.tendm2}
                </NavLink>
            ))}
        </menu>
    );
}

export default Navigates;
