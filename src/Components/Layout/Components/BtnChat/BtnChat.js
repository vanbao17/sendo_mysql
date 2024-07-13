import { faClose, faMessage, faPaperPlane, faSearch } from '@fortawesome/free-solid-svg-icons';
import Buttons from '../../../Buttons/Buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Chat.module.scss';
import { SendImageIcon, SendProductIcon } from '../../../IconSvg/IconSvg';
import io from 'socket.io-client';
import { Context } from '../../../store/Context';

function BtnChat() {
    const cx = classNames.bind(styles);
    const { chatBox, setchatBox } = useContext(Context);
    const [stateSearch, setstateSearch] = useState(false);
    const user = JSON.parse(sessionStorage.getItem('user'));
    // const idShop = JSON.parse(sessionStorage.getItem('idShop'));

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [mess_vs_shop, setmess_vs_shop] = useState([]);
    const [shops, setshops] = useState([]);
    const [shopsWithMess, setshopsWithMess] = useState([]);
    const [idconvention, setIdconvention] = useState();
    const [idshop, setidshop] = useState();
    const [Messes, setMesses] = useState([]);
    // const socket = io('http://localhost:3001', {
    //     transports: ['websocket'],
    //     upgrade: true,
    // });
    const messRef = useRef();
    useEffect(() => {
        if (chatBox == true) {
            setSocket(
                io('https://sdvanbao17.id.vn/', {
                    transports: ['websocket'],
                }),
            );
        } else {
            if (socket != null) {
                socket.disconnect();
            }
            setSocket(null);
        }
    }, [chatBox]);
    useEffect(() => {
        if (user != undefined) {
            const userId = user.idCustomers;
            if (chatBox == true) {
                socket.on('receiveMessage', (message) => {
                    setMessages((prevMessages) => {
                        const data = [...prevMessages, message];
                        return data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
                    });
                });
                return () => {
                    socket.off('receiveMessage');
                    socket.emit('leaveConversation', userId);
                };
            } else {
                if (socket != null) {
                    socket.off('receiveMessage');
                    socket.emit('leaveConversation', userId);
                }
            }
        }
    }, [socket]);
    useEffect(() => {
        if (user != null) {
            const userId = user.idCustomers;
            fetch('https://sdvanbao17.id.vn/api/v1/getChatUser/' + userId)
                .then((rs) => rs.json())
                .then((dt) => setmess_vs_shop(dt))
                .catch((err) => {
                    console.log(err);
                });

            fetch('https://sdvanbao17.id.vn/api/v1/getShops')
                .then((rs) => rs.json())
                .then((dt) => setshops(dt))
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);
    const sendMessage = () => {
        const userId = user.idCustomers;
        if (idconvention != null) {
            if (messRef.current.value !== '') {
                socket.emit('sendMessage', {
                    idconvention,
                    senderId: userId,
                    content: messRef.current.value,
                    sender_type: 'customer',
                });
            }
        }
        messRef.current.value = '';
    };
    const handleActiveChat = (idConvention) => {
        socket.emit('joinConversation', idConvention);
    };
    const handleGetChatConvent = (id) => {
        fetch('https://sdvanbao17.id.vn/api/v1/getMessIdConve/' + id)
            .then((rs) => rs.json())
            .then((dt) => setMesses(dt))
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        if (mess_vs_shop.length != 0) {
            const list_idShop = mess_vs_shop.map((m) => m.idShop);
            fetch('https://sdvanbao17.id.vn/api/v1/getAllShop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ list_idShop }),
            })
                .then((rs) => rs.json())
                .then((dt) => setshopsWithMess(dt))
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [mess_vs_shop]);
    return (
        <>
            {chatBox == false ? (
                <Buttons
                    chat
                    hide
                    onClick={() => {
                        setchatBox(!chatBox);
                    }}
                >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <FontAwesomeIcon icon={faMessage} flip="horizontal" />
                        Chat
                    </span>
                </Buttons>
            ) : (
                <div className={cx('wrapper_chat')}>
                    <div className={cx('container_title')}>
                        <div className={cx('title')}>
                            <FontAwesomeIcon icon={faMessage} flip="horizontal" className={cx('icon')} />
                            Chat cùng:{idshop != undefined ? idshop.tenshop : 'Chọn đoạn chat'}
                        </div>
                        <div
                            className={cx('icon_close')}
                            onClick={() => {
                                setchatBox(!chatBox);
                            }}
                        >
                            <FontAwesomeIcon icon={faClose} flip="horizontal" className={cx('icon')} />
                        </div>
                    </div>
                    <div className={cx('container_content')}>
                        <div className={cx('content_left')}>
                            <div className={cx('container_search_filter')}>
                                {stateSearch == true ? (
                                    <div className={cx('container_input_search')}>
                                        <input type="text" className={cx('input_search')}></input>
                                        <FontAwesomeIcon
                                            icon={faClose}
                                            onClick={() => {
                                                setstateSearch(false);
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <div className={cx('filter')}>
                                            <input type="checkbox"></input>
                                            <span>Chưa đọc</span>
                                        </div>
                                        <div
                                            className={cx('search')}
                                            onClick={() => {
                                                setstateSearch(true);
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faSearch} className={cx('icon_search', 'icon')} />
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className={cx('list_conversations')}>
                                <div className={cx('container_list_conversations')}>
                                    {mess_vs_shop.map((item) => {
                                        const shop = shopsWithMess.filter((s) => s.idShop === item.idShop);
                                        if (shop.length != 0) {
                                            return (
                                                <div
                                                    className={cx(
                                                        'item_conversations',
                                                        idshop != undefined
                                                            ? idshop.idShop == shop[0].idShop
                                                                ? 'active'
                                                                : ''
                                                            : '',
                                                    )}
                                                    onClick={() => {
                                                        setidshop(shop[0]);
                                                        handleGetChatConvent(item.conversation_id);
                                                        setIdconvention(item.conversation_id);
                                                        handleActiveChat(item.conversation_id);
                                                    }}
                                                >
                                                    <img src={shop[0].imageShop}></img>
                                                    <div className={cx('infor_mess')}>
                                                        <div className={cx('name_minute')}>
                                                            <span>{shop[0].tenshop}</span>
                                                            <p>20 phút trước</p>
                                                        </div>
                                                        <div className={cx('mess_last')}>
                                                            {/* <span>
                                                                Bạn:
                                                                {messages.length != 0
                                                                    ? messages[messages.length - 1].conversation_id ==
                                                                      item.conversation_id
                                                                        ? messages[messages.length - 1].content
                                                                        : ''
                                                                    : Messes.length != 0
                                                                    ? Messes[Messes.length - 1].conversation_id ==
                                                                      item.conversation_id
                                                                        ? Messes[Messes.length - 1].content
                                                                        : ''
                                                                    : ''}
                                                                {messages.length == 0
                                                                    ? Messes.length != 0
                                                                        ? Messes[Messes.length - 1].content
                                                                        : ''
                                                                    : messages[messages.length - 1].content}
                                                            </span> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className={cx('content_right')}>
                            <div className={cx('list_chat_history')}>
                                <div className={cx('list_mess')}>
                                    {Messes.map((mess) => {
                                        return (
                                            <div className={cx('container_item_mess', mess.sender_type)}>
                                                <div className={cx('item_mess')}>
                                                    <span>{mess.content}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {messages.map((mess) => {
                                        return (
                                            <div className={cx('container_item_mess', mess.sender_type)}>
                                                <div className={cx('item_mess')}>
                                                    <span>{mess.content}</span>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* <div className={cx('container_item_mess', 'shop')}>
                                        <div className={cx('item_mess', 'shop')}>
                                            <span>Cút</span>
                                        </div>
                                    </div> */}
                                </div>
                                {/* {Messes.length == 0 ? (
                                    <div className={cx('product_shop')}>
                                        <img src="https://media3.scdn.vn/img4/2023/08_10/bP9WkmK6uJHr6hfj4OoJ_simg_b5529c_80x80_maxb.jpg"></img>
                                        <div className={cx('infor_product')}>
                                            <p>Rĩa Inox Ăn Hoa Quả Có Hoa Văn Đa Năng Tiện Lợi</p>
                                            <div className={cx('price')}>
                                                <span className={cx('price_sale')}>2000đ</span>
                                                <span className={cx('price_default')}>8000đ</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )} */}
                            </div>
                            <div className={cx('container_input_chat')}>
                                <div className={cx('actions_chat')}>
                                    <div className={cx('send_order')}>
                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAUtJREFUSA3tlDlLRDEUhZ8L6CiMS+k09oOCnXZj7fJjHawtXRhmXEpbS0VQUBRBvyN5cDE3yRunnQuH3CU5J7kvL1U1tUIHZgp1W94i2AmJEeOdLab8+UShTX7B1Nbw98BXyMn/AM8h1qD4xcS/rneCXSrbfyeG+CSMx4n6LfkLW5u1QfC7Tq5OSTglrjnRWq9FczWbM246OZuK1nonsAsm9icVGLKDs9wuvBbl5tvaNcEALIM3sAQi++8JbmC6AiI9DCNDbCUB3Wvdb2u6ipdA5EdgBSQtJ6Bj98EpqEX09+qet4B2niWnXuUEtMMOeAQSUc/PQU2+il+00kfuwfAN7oGEFsEB0NPRyEoCIukBiTwAtWUdNLYmAnqv9sEraDdmDhNz38BySWRschF4Ap+WeUw/Whs9ThC+gw3g1XJ6Itcte8pNmtaiDvwAPbIrlc42EsgAAAAASUVORK5CYII="></img>
                                    </div>
                                    <div className={cx('send_product')}>
                                        <SendProductIcon />
                                    </div>
                                    <div className={cx('send_img')}>
                                        <SendImageIcon />
                                    </div>
                                </div>
                                <div className={cx('container_input')}>
                                    <input
                                        onKeyDown={(e) => {
                                            if (e.key == 'Enter') {
                                                sendMessage();
                                            }
                                        }}
                                        ref={messRef}
                                        placeholder="Nhập nội dung"
                                        type="text"
                                        className="input_chat"
                                    ></input>
                                    <FontAwesomeIcon
                                        icon={faPaperPlane}
                                        className={cx('icon')}
                                        onClick={() => {
                                            sendMessage();
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={cx('content_messages')}></div>
                    </div>
                </div>
            )}
        </>
    );
}

export default BtnChat;
