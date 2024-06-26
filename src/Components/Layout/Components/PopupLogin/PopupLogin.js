import classNames from 'classnames/bind';
import styles from './PopupLogin.module.scss';
import { useContext, useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../../../store/Context';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { gapi } from 'gapi-script';
import jwt_decode from 'jwt-decode';

const cx = classNames.bind(styles);
const id = '927153163763-liqf9jmc15drk1dfep7mrpn78mk9hg4e.apps.googleusercontent.com';
function PopupLogin({ className, style }) {
    useEffect(() => {
        function start() {
            gapi.client.init({ clientId: id, scope: '' });
        }
        gapi.load('client:auth2', start);
    });
    const classes = cx('wrapper', { [className]: className });
    const { setuser, setusergg, setuserfb, setdis, dis } = useContext(Context);
    const buttonref = useRef();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setpassword] = useState('');
    const [whatnext, setwhatnext] = useState(null);
    const [inforuser, setinforuser] = useState(null);
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('INPUT_PHONE_NUMBER');
    const [result, setResult] = useState('');
    function changeInput(e) {
        setPhoneNumber(e);
        if (e.length >= 1) {
            buttonref.current.disabled = false;
            buttonref.current.style.color = '#fff';
            buttonref.current.style.backgroundColor = '#ee2624';
            buttonref.current.style.cursor = 'pointer';
            buttonref.current.style.opacity = 1;
        }
        if (e.length == 0) {
            buttonref.current.disabled = true;
            buttonref.current.style.opacity = 0.2;
            buttonref.current.style.color = 'black';
            buttonref.current.style.backgroundColor = '#aaa';
            buttonref.current.style.cursor = 'not-allowed';
        }
    }
    const handleButtonLogin = () => {
        if (whatnext == null) {
            const phone_data = '+84' + phoneNumber.slice(1);
            console.log(phone_data);
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone_data }),
            };
            fetch('http://localhost:3001/api/v1/get-customer', options)
                .then((response) => response.json())
                .then((data) => {
                    if (data.length !== 0) {
                        setwhatnext(true);
                        setinforuser(data[0]);
                    } else {
                        setwhatnext(false);
                    }
                })
                .catch((err) => {
                    if (err) throw err;
                });
        } else {
            if (whatnext == true) {
                if (password == inforuser.password) {
                    setdis(!dis);
                }
            } else {
                ValidateOtp();
            }
        }
    };
    const ValidateOtp = () => {
        if (otp === null) return;

        result
            .confirm(otp)
            .then((result) => {
                setStep('VERIFY_SUCCESS');
                setwhatnext(true);
            })
            .catch((err) => {
                alert('Incorrect code');
            });
    };
    const responseFacebook = (response) => {
        console.log(response.credential);
        setuser(response);
        setdis(false);
        setuserfb(true);
    };
    const handleLoginGG = (response) => {
        const data = jwt_decode(response.credential);
        setuser(data);
        sessionStorage.setItem('user', JSON.stringify(data));
        setusergg(true);
        setdis(false);
    };
    useEffect(() => {
        sessionStorage.setItem('user', JSON.stringify(inforuser));
    }, [inforuser]);
    return (
        <div className={classes} style={style}>
            <div
                className={cx('shadow')}
                onClick={() => {
                    setdis(false);
                }}
            ></div>
            <div className={cx('container')}>
                <div className={cx('form-login')}>
                    <div className={cx('close')}>
                        <span></span>
                        <p
                            onClick={() => {
                                setdis(false);
                            }}
                        >
                            Thoát
                        </p>
                    </div>
                    <div className={cx('contents')}>
                        <div className={cx('content1')}>
                            <h2>Xin Chào</h2>
                            <p>Đăng nhập hay đăng kí tài khoản</p>
                            <form>
                                {whatnext == null ? (
                                    <input
                                        type="tel"
                                        placeholder="Nhập số điện thoại"
                                        onChange={(e) => {
                                            changeInput(e.target.value);
                                        }}
                                    ></input>
                                ) : (
                                    <>
                                        {whatnext == true ? (
                                            <input
                                                type="tel"
                                                placeholder="Nhập mật khẩu"
                                                onChange={(e) => {
                                                    setpassword(e.target.value);
                                                }}
                                            ></input>
                                        ) : (
                                            <input
                                                type="tel"
                                                placeholder="Nhập mã code"
                                                onChange={(e) => {
                                                    setOtp(e.target.value);
                                                }}
                                            ></input>
                                        )}
                                    </>
                                )}

                                <div id="recaptcha-container"></div>
                                <div ref={buttonref} disabled className={cx('btn-next')} onClick={handleButtonLogin}>
                                    Tiếp tục <FontAwesomeIcon icon={faAngleRight} />
                                </div>
                            </form>
                        </div>
                        <div className={cx('content2')}>
                            <p>Hoặc thông qua : </p>
                            <div className={cx('face-goo')}>
                                <GoogleOAuthProvider clientId="927153163763-liqf9jmc15drk1dfep7mrpn78mk9hg4e.apps.googleusercontent.com">
                                    <GoogleLogin
                                        clientId="927153163763-liqf9jmc15drk1dfep7mrpn78mk9hg4e.apps.googleusercontent.com"
                                        buttonTetx="Đăng nhập bằng Google"
                                        onSuccess={handleLoginGG}
                                        onFailure={() => {
                                            console.log('login failed');
                                        }}
                                        cookiePolicy={'single_host_origin'}
                                        isSignedIn={true}
                                    />
                                </GoogleOAuthProvider>
                                {/* <ReactFacebookLogin
                                    appId="783148693291363"
                                    autoLoad={true}
                                    fields="name,email,picture"
                                    callback={responseFacebook}
                                /> */}
                                {/* <ReactFacebookLogin
                                    appId="783148693291363"
                                    autoLoad={true}
                                    fields="name,email,picture"
                                    // onClick={componentClicked}
                                    callback={responseFacebook}
                                /> */}
                                ,
                            </div>
                            <p>
                                Khi dùng tài khoản Sendo, bạn đã đồng ý về{' '}
                                <span style={{ color: '#0F62FE' }}>điều khoản dịch vụ.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopupLogin;
