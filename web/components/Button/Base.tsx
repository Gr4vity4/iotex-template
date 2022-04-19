import classnames from 'classnames'
import { Spinner } from 'components/Spinner'
import Link from 'next/link'
import { Button } from '.'

export type ButtonProps = Button & {
  className: string
}

const StyledButton: React.FC<ButtonProps> = ({
  isFullWidth,
  className,
  text,
  icon,
  iconPosition = 'right',
  disabled = false,
  loading = false,
  onClick,
  href,
}) => {
  const classes = classnames('transition duration-200 rounded-4xl shadow-sm', {
    'flex items-center': icon,
    'bg-lime-800 text-lime-600 text-xl py-4': disabled,
    'w-full': isFullWidth,
    [className]: !disabled,
  })

  const content = (
    <>
      {iconPosition === 'left' && icon}
      {loading ? <Spinner color={`#fff`} /> : text}
      {iconPosition === 'right' && icon}
    </>
  )

  return href ? (
    href.indexOf('http') === 0 ? (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {content}
      </a>
    ) : (
      <Link href={href}>
        <a className={classes}>{content}</a>
      </Link>
    )
  ) : (
    <button className={classes} disabled={disabled || loading} onClick={onClick}>
      {content}
    </button>
  )
}

const ButtonBase: React.FC<ButtonProps> = (props) => {
  return <StyledButton {...props} />
}

export default ButtonBase
