import classNames from 'classnames/bind'
import styles from "./Tagfooter.module.scss"
import TagfooterItem from './TagfooterItem';
import tag1 from "./tag1.png"
import tag2 from "./tag2.png"
import tag3 from "./tag3.png"
import tag4 from "./tag4.png"
const cx = classNames.bind(styles)
function Tagfooters() {
    const col1Data = [
        {
          img:tag1,
          title:"Siêu nhiều hàng tốt",
          description:"Cần gì cũng có 26 ngành hàng & 10 triệu sản phẩm"
        },
        {
          img:tag2,
          title:"Siêu yên tâm",
          description:"Miễn phí đổi trả 48h"
        },
        {
          img:tag3,
          title:"Siêu tiện lợi",
          description:"Mang thế giới mua sắm của Sendo trong tầm tay bạn"
        },
        {
          img:tag4,
          title:"Siêu tiết kiệm",
          description:"Giá hợp lý, vừa túi tiền. Luôn có nhiều chương trình khuyến mãi"
        },
      ]
    return ( 
        <div className={cx('wrapper')}>
            {
                col1Data.map((item,index)=>{
                    return <TagfooterItem key={index} data={item} />
                })    
            }
        </div>
    );
}

export default Tagfooters;