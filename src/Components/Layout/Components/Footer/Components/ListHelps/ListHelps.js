import classNames from 'classnames/bind'
import styles from "./ListHelps.module.scss"
import appstore from "./appstore.png"
import appgallery from "./appgallery.png"
import ggplay from "./ggplay.png"
import HelpsItem from './HelpsItem'
const cx = classNames.bind(styles)

function ListHelps() {
    const data =[ 
        {
            title:"VỀ CHÚNG TÔI",
            lists:["Giới thiệu Sendo.vn","Giới thiệu SenMall","Quy chế hoạt động","Chính sách bảo mật","Giao hàng và Nhận hàng"],
            description:"",
            img:[]
        },
        {
            title:"DÀNH CHO NGƯỜI MUA",
            lists:["Giải quyết khiếu nại","Hướng dẫn mua hàng","Chính sách đổi trả","Chăm sóc khách hàng","Nạp tiền điện thoại"],
            description:"",
            img:[]
        },
        {
            title:"DÀNH CHO NGƯỜI BÁN",
            lists:["Quy định đối với người bán","Chính sách bán hàng","Hệ thống tiêu chí kiểm duyệt","Mở shop trên Sendo"],
            description:"",
            img:[]
        },
        {
            title:"TẢI ỨNG DỤNG SENDO",
            lists:[],
            description:"Mang thế giới mua sắm của Sendo trong tầm tay bạn",
            img:[appstore,ggplay,appgallery]
        },
    ]
    return ( 
        <div className={cx('wrapper')}>
            {
                data.map((item,index)=>{
                    return <HelpsItem data={item} key={index}/>
                })
            }
        </div>
    );
}

export default ListHelps;