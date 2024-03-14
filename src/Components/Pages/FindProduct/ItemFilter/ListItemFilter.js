import classNames from 'classnames/bind';
import styles from './ItemFilter.module.scss';
import ItemFilter from './ItemFilter';
const cx = classNames.bind(styles);
function ListItemFilter() {
    return (
        <div className={cx('listItem')}>
            <ItemFilter></ItemFilter>
            <ItemFilter></ItemFilter>
            <ItemFilter></ItemFilter>
            <ItemFilter></ItemFilter>
            <ItemFilter></ItemFilter>
        </div>
    );
}

export default ListItemFilter;
