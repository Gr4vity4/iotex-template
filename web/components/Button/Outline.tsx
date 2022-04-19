import { Button } from '.'
import ButtonBase from './Base'

export default function ButtonOutline({
  text,
  onClick,
  isFullWidth = false,
  icon,
  iconPosition = 'right',
  className = '',
  classNameExt = '',
  href,
}: Button) {
  const cn =
    className !== ''
      ? className
      : `transition px-6 py-3 text-sm rounded-full border border-lime-default  hover:bg-lime-400 transition
  hover:border-lime-default hover:text-lime-600 active:bg-lime-500 active:border-lime-500 ${classNameExt}`

  return (
    <ButtonBase
      className={cn}
      icon={icon}
      iconPosition={iconPosition}
      isFullWidth={isFullWidth}
      text={text}
      onClick={onClick}
      href={href}
    />
  )
}
