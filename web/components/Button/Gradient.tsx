import { Button } from '.'
import ButtonBase from './Base'

export default function ButtonGradient({
  text,
  icon,
  iconPosition = 'right',
  isFullWidth = false,
  loading = false,
  disabled = false,
  className = '',
  classNameExt = '',
  onClick,
  href,
}: Button) {
  const cn =
    className !== ''
      ? className
      : `transition px-6 py-4 rounded-full bg-lime-default text-dark-400 hover:bg-lime-400 active:bg-lime-500 ${classNameExt}`

  return (
    <ButtonBase
      text={text}
      icon={icon}
      iconPosition={iconPosition}
      isFullWidth={isFullWidth}
      loading={loading}
      disabled={disabled}
      className={cn}
      onClick={onClick}
      href={href}
    />
  )
}
