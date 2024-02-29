import classNames from 'classnames/bind'
import styles from "./ListHelps.module.scss"
const cx = classNames.bind(styles)

function HelpsItem(data) {
    return (  
        <div className={cx('item')}>
            <span className={cx('title')}>{data.data.title}</span>
            {
                data.data.lists.map((item,index)=>{
                    return <a key={index} href=''>{item}</a>
                })
            }
            <span>{data.data.description}</span>
            <div className={cx('img-footer')}>
                {
                    data.data.img.map((src,index)=>{
                        return <img key={index} src={src}/>
                    })
                }
            </div>
        </div>
    );
}

export default HelpsItem;