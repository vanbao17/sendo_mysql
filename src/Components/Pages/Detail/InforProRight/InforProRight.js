import DescriptionPr from '../../../DescriptionPr/DescriptionPr';
import Rate from '../../../Rate/Rate';
import classNames from 'classnames/bind';
import styles from './InforProRight.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function InforProRight({ id, idQuestion, dataText }) {
    return (
        <div className={cx('wrapper')}>
            <DescriptionPr data={dataText} />
            <Rate id={id} normal={true} />
            <div className={cx('questionProduct')} id={idQuestion}>
                <p className={cx('title')}>Hỏi về sản phẩm</p>
                <p>Bạn có thắc mắc cần giải đáp?</p>
                <button>
                    <FontAwesomeIcon icon={faMessage} className={cx('icon')} />
                    <span>Hỏi shop ngay</span>
                </button>
            </div>
        </div>
    );
}

export default InforProRight;
