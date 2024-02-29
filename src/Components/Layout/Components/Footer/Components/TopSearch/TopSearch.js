import classNames from 'classnames/bind'
import styles from "./TopSearch.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {useState } from 'react';
const cx = classNames.bind(styles)

function TopSearch() {
    const [listHeight,setlistHeight] = useState(false)
    const data = [
        "Đồng Hồ", "SHOPPING Mall", "Thế Giới Di Động", "Bánh Trung Thu Kinh Đô", "Black Friday", "Tivi", "Mỹ phẩm hàn quốc", "Kem chống nắng", "Chợ Tốt", "Shopee", "Corona Virus", "Đồ chơi nấu ăn", "Laptop", "iPhone 6", "Bàn phím cơ", "Quạt trần", "Loa bluetooth", "Điện thoại samsung", "Áo khoác nam", "Áo sơ mi nam", "Đồng hồ nữ", "Đồng hồ nam", "Đồng hồ casio", "Xe đạp", "Vali kéo", "Balo hang hieu", "Xe tay ga", "Xe đạp điện", "Ghế văn phòng", "Nồi cơm điện", "Dép adidas", "Giày nike", "Handmade", "Áo dài", "Váy cưới", "Bikini", "Máy hút sữa", "Máy khoan", "Máy bơm nước", "Đèn led", "Sữa ensure", "Đèn pin", "Máy ảnh", "Đồng hồ thông minh", "Nón sơn", "Camera wifi", "Flycam", "Sách giáo khoa", "Máy đo huyết áp", "Cốc nguyệt san", "Thịt bò", "Mắm ruốc", "Tiki", "Nhà hàng", "Lazada", "Shopee", "Corona Virus", "trang", "quan ao", "thoi trang", "khẩu trang", "khẩu trang kf94", "giay trang", "tu trang diem", "khẩu trang y tế", "bộ cọ trang điểm nake 5 12 cây", "đèn led trang trí", "bo cọ trang điểm", "kem tam trang", "trang tri", "bang chu dien tu", "thời trang nữ", "khẩu trang kf94 thùng 300 cái", "hap trang collagen", "túi xách nữ thời trang", "mau ao co chu váo kiểu nữ thời trang", "kem one today trang da", "giay boot o nha trang", "bàn trang điểm", "serum ngoc trai trang da", "thoi trang huyen lady", "khau trang da nang di phuot", "dien thoai nokia 8855 man hinh trang den", "duong trang", "giay trang nu", "trang diem", "quan jean nha trang"
    ]
    function handleTitleList() {
        window.scrollTo(0, document.body.scrollHeight);
        setlistHeight(!listHeight)  
    }
    return (  
        <div className={cx('wrapper')}>
            <span className={cx('title')} onClick={handleTitleList}> TOP TÌM KIẾM <FontAwesomeIcon icon={faChevronDown} rotation={listHeight?180:0}/></span>
            <div className={cx('lists-result')} style={{height:!listHeight?"18px":"auto"}}>
                {
                    data.map((text,index)=>{
                        return <a href='' key={index}>{text}</a>
                    })
                }
            </div>
        </div>
    );
}

export default TopSearch;