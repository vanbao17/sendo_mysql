import classNames from 'classnames/bind'
import styles from "./Footer.module.scss"
import Tagfooters from './Components/Tagfooters/Tagfooters'
import ListHelps from './Components/ListHelps/ListHelps'
import ac1 from "./ac1.png"
import ac2 from "./ac2.png"
import Buttons from '../../../Buttons/Buttons'
import TopSearch from './Components/TopSearch/TopSearch'
const cx = classNames.bind(styles)
function Footer() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('fcol1')}>
        <div className={cx('container')}>
          <Tagfooters />
        </div>
      </div>
      <div className={cx('fcol2')}>
        <div className={cx('container')}>
          <ListHelps />
        </div>
      </div>
      <div className={cx('fcol3')}>
        <div className={cx('container')}>
          <div className={cx('infor')}>
            <p className={cx('title')}>Công ty Cổ phần Công nghệ Sen Đỏ, thành viên của Tập đoàn FPT</p>
            <p>Số ĐKKD: 0312776486 - Ngày cấp: 13/05/2014, được sửa đổi lần thứ 20, ngày 26/04/2022.</p>
            <p>Cơ quan cấp: Sở Kế hoạch và Đầu tư TPHCM.</p>
            <p>Địa chỉ: Tầng 5, Tòa nhà A, Vườn Ươm Doanh Nghiệp, Lô D.01, Đường Tân Thuận, Khu chế xuất Tân Thuận, Phường Tân Thuận Đông, Quận 7, Thành phố Hồ Chí Minh, Việt Nam.</p>
            <p>Email: lienhe@sendo.vn</p>
            <div className={cx('accept')}>
              <img src={ac1}></img>
              <img src={ac2}></img>
            </div>
          </div>
          <div className={cx('sign')}>
            <p className={cx('title')}>Đăng ký nhận bản tin ưu đãi khủng từ Sendo</p>
            <input type='text' placeholder='Email của bạn là '/>
            <Buttons primary>Đăng ký</Buttons>
          </div>
        </div>
      </div>
      <div className={cx('fcol4')}>
        <div className={cx('container')}>
          <TopSearch/>
        </div>
      </div>
    </div>
  )
}

export default Footer
