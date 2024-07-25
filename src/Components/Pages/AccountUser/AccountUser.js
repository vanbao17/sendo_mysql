import classNames from 'classnames/bind';
import styles from './AccountUser.module.scss';
import ProfileUser from '../../Layout/Components/ProfileUser/ProfileUser';
import DatePicker from 'react-datepicker';
import React, { useContext, useEffect, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { format, parse } from 'date-fns';
import { Context } from '../../store/Context';
import Popup from '../../Popup/Popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { EyeactiveIcon, EyeaNonActiveIcon } from '../../IconSvg/IconSvg';
const cx = classNames.bind(styles);
function AccountUser() {
    // const [dob, setdob] = useState(null);
    // const [name, setname] = useState(null);
    // const [email, setemail] = useState(null);
    const inputPhoneRef = useRef();
    const inputEmailRef = useRef();
    const [statePopupUpdatePass, setstatePopupUpdatePass] = useState(false);
    const [seePassword, setseePassword] = useState(false);
    const [seePassword1, setseePassword1] = useState(false);
    const [warning, setwarning] = useState(null);
    const [preview, setPreview] = useState(null);
    const user = JSON.parse(sessionStorage.getItem('user'));

    const [us, setus] = useState({
        idCustomers: null,
        imageUser: null,
        nameCustomers: null,
        phoneNumber: null,
        emailUser: null,
        dateOB: null,
    });
    const [sex, setsex] = useState(null);
    const fileInputRef = useRef(null);
    const password_new = useRef(null);
    const password_new_confirm = useRef(null);
    const { dis, setdis } = useContext(Context);
    const [fileupload, setfileUpload] = useState();
    const { loadding, setloadding } = useContext(Context);
    useEffect(() => {
        if (user == null) {
            setdis(!dis);
        } else {
            setus({
                idCustomers: user.idCustomers,
                imageUser: user.imageUser,
                nameCustomers: user.nameCustomers,
                phoneNumber: user.phoneNumber,
                emailUser: user.emailUser,
                dateOB: user.dateOB,
            });
            if (user.googleId != null) {
                inputEmailRef.current.readOnly = true;
            }
        }
    }, []);
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setus((prev) => ({ ...prev, imageUser: 'https://sdvanbao17.id.vn/uploads/' + file.name }));
        const formData = new FormData();
        formData.append('file', file);
        setfileUpload(formData);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };
    const handleUpdateInfor = () => {
        const { idCustomers, imageUser, nameCustomers, phoneNumber, emailUser, dateOB } = us;

        if (fileupload !== undefined) {
            fetch('https://sdvanbao17.id.vn/api/v1/upload_images_product', {
                method: 'POST',
                body: fileupload,
            })
                .then((response) => {
                    console.log('File uploaded successfully');
                })
                .catch((error) => {
                    console.error('Error uploading file:', error);
                });
        }
        fetch('https://sdvanbao17.id.vn/api/v1/updateInforCustomer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idCustomers, imageUser, nameCustomers, phoneNumber, emailUser, dateOB }),
        })
            .then((response) => {
                if (response.status == 201 || response.status == 500) {
                    setwarning('Gmail đã bị trùng');
                }
                if (response.status == 200) {
                    fetch('https://sdvanbao17.id.vn/api/v1/getCustomerId/' + user.idCustomers)
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.length !== 0) {
                                sessionStorage.clear();
                                sessionStorage.setItem('user', JSON.stringify(data[0]));
                                window.location.href = '/tai-khoan';
                            }
                        })
                        .catch((err) => {
                            if (err) throw err;
                        });
                }
            })
            .catch((error) => {
                console.error('Error uploading file:', error);
            });
    };
    const formatDate = (string) => {
        let year = string.getFullYear();
        let month = String(string.getMonth() + 1).padStart(2, '0');
        let day = String(string.getDate()).padStart(2, '0');
        let formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    };
    const handleUpdatePassword = () => {
        const idCustomers = user.idCustomers;
        const password = password_new.current.value;
        const password_confirm = password_new_confirm.current.value;
        setloadding(true);
        if (password.trim() === password_confirm.trim()) {
            fetch('https://sdvanbao17.id.vn/api/v1/updatePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ idCustomers, password }),
            })
                .then((response) => {
                    if (response.status === 200) {
                        setstatePopupUpdatePass(!statePopupUpdatePass);
                        setloadding(false);
                    } else {
                        alert('Lỗi cm gì rồi, đợi tau fix đã :))');
                    }
                })
                .catch((err) => {
                    if (err) throw err;
                });
        } else {
            alert('Mật khẩu xác nhận chưa trùng khớp');
        }
    };
    return (
        <ProfileUser>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('title')}>
                        <strong>Thông tin tài khoản</strong>
                    </div>
                    <div className={cx('container_infor')}>
                        <div className={cx('thumb_user')}>
                            <div className={cx('thumb')}>
                                {/* <img src={preview != null ? preview : us.imageUser}></img> */}
                                <img
                                    src={
                                        us.imageUser != null
                                            ? preview != null
                                                ? preview
                                                : us.imageUser
                                            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpwxCN33LtdMLbWdhafc4HxabqpaU0qVbDxQ&s'
                                    }
                                ></img>
                            </div>
                            <button onClick={handleButtonClick}>Upload File</button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className={cx('detail_infor')}>
                            <div className={cx('sex')}>
                                <span className={cx('label')}>Giới tính</span>
                                <div>
                                    <div>
                                        <input
                                            value={1}
                                            checked={sex == 1}
                                            type="radio"
                                            onClick={(e) => {
                                                setsex(e.target.value);
                                            }}
                                        ></input>
                                        <span>Anh</span>
                                    </div>
                                    <div>
                                        <input
                                            value={2}
                                            checked={sex == 2}
                                            type="radio"
                                            onClick={(e) => {
                                                setsex(e.target.value);
                                            }}
                                        ></input>
                                        <span>Chị</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('name', 'container_input')}>
                                <span className={cx('label')}>Họ và tên</span>
                                <input
                                    placeholder="Nhập đầy đủ họ tên"
                                    value={us.nameCustomers != null ? us.nameCustomers : ''}
                                    type="text"
                                    onChange={(e) => {
                                        setus((prevState) => ({
                                            ...prevState,
                                            nameCustomers: e.target.value,
                                        }));
                                    }}
                                ></input>
                            </div>
                            {user.googleId == null ? (
                                <div className={cx('phone', 'container_input')}>
                                    <span className={cx('label')}>Số điện thoại</span>
                                    <input value={us.phoneNumber} type="text" ref={inputPhoneRef} readOnly></input>
                                </div>
                            ) : (
                                <></>
                            )}

                            <div className={cx('email', 'container_input')}>
                                <span style={warning != null ? { color: 'red' } : {}} className={cx('label')}>
                                    Email cá nhân
                                </span>
                                <input
                                    style={warning != null ? { border: '1px solid red', color: 'red' } : {}}
                                    ref={inputEmailRef}
                                    value={us.emailUser || ''}
                                    placeholder="Nhập đầy đủ email"
                                    type="text"
                                    onChange={(e) => {
                                        setus((prevState) => ({
                                            ...prevState,
                                            emailUser: e.target.value,
                                        }));
                                    }}
                                />
                                <span style={{ color: 'red', fontSize: '12px' }}>{warning != null ? warning : ''}</span>
                            </div>
                            <div className={cx('date', 'container_input')}>
                                <span className={cx('label')}>Ngày sinh</span>
                                <DatePicker
                                    className={cx('data_date')}
                                    placeholderText="Chọn ngày sinh"
                                    selected={us.dateOB != null ? us.dateOB : ''}
                                    onChange={(date) => {
                                        setus((prevState) => ({
                                            ...prevState,
                                            dateOB: formatDate(date),
                                        }));
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('actions')}>
                        <button onClick={handleUpdateInfor}>
                            <span>Cập nhật</span>
                        </button>
                        {user.googleId == null ? (
                            <a
                                onClick={() => {
                                    setstatePopupUpdatePass(!statePopupUpdatePass);
                                }}
                            >
                                Tạo / đổi mật khẩu{' '}
                            </a>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
            {statePopupUpdatePass == true ? (
                <Popup>
                    <div className={cx('container_update_passs')}>
                        <div className={cx('action_close')}>
                            <div className={cx('close_popup')}>
                                <button
                                    onClick={() => {
                                        setstatePopupUpdatePass(!statePopupUpdatePass);
                                    }}
                                >
                                    <span>Thoát</span>
                                </button>
                            </div>
                        </div>
                        <div className={cx('title')}>
                            <span>Tạo mật khẩu mới</span>
                        </div>
                        <div className={cx('password_new', 'input_container')}>
                            <label for="password_new">Nhập mật khẩu mới </label>
                            <div className={cx('input')}>
                                <input
                                    ref={password_new}
                                    type={seePassword == true ? 'text' : 'password'}
                                    id="password_new"
                                    name="password_new"
                                    placeholder="Nhập mật khẩu mới"
                                ></input>
                                {seePassword == true ? (
                                    <div
                                        className={cx('icon')}
                                        onClick={() => {
                                            setseePassword(!seePassword);
                                        }}
                                    >
                                        <EyeactiveIcon />
                                    </div>
                                ) : (
                                    <div
                                        className={cx('icon')}
                                        onClick={() => {
                                            setseePassword(!seePassword);
                                        }}
                                    >
                                        <EyeaNonActiveIcon />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={cx('password_new_confirm', 'input_container')}>
                            <label for="password_new_confirm">Xác nhận mật khẩu mới </label>
                            <div className={cx('input')}>
                                <input
                                    ref={password_new_confirm}
                                    type={seePassword1 == true ? 'text' : 'password'}
                                    id="password_new_confirm"
                                    name="password_new_confirm"
                                    placeholder="Xác nhận mật khẩu mới"
                                ></input>
                                {seePassword1 == true ? (
                                    <div
                                        className={cx('icon')}
                                        onClick={() => {
                                            setseePassword1(!seePassword1);
                                        }}
                                    >
                                        <EyeactiveIcon />
                                    </div>
                                ) : (
                                    <div
                                        className={cx('icon')}
                                        onClick={() => {
                                            setseePassword1(!seePassword1);
                                        }}
                                    >
                                        <EyeaNonActiveIcon />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={cx('button_submit')}>
                            <button onClick={handleUpdatePassword}>
                                <span>Hoàn tất</span>
                            </button>
                        </div>
                    </div>
                </Popup>
            ) : (
                <></>
            )}
        </ProfileUser>
    );
}

export default AccountUser;
