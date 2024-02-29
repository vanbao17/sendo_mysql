import classNames from 'classnames/bind'
import styles from './Buttons.module.scss'
const cx = classNames.bind(styles)
function Buttons({
  normal,
  children,
  primary,
  large,
  hide,
  onClick,
  to,
  chat,
  href,
  totop,
  className,
  ...passProps
}) {
  const classes = cx('wrapper', {
    normal,
    primary,
    large,
    chat,
    totop,
    hide,
    [className]: className,
  })
  const props = {
    onClick,
    ...passProps,
  }
  const Cpn = 'button'
  return (
    <Cpn className={classes} {...props}>
      <span>{children}</span>
    </Cpn>
  )
}

export default Buttons
