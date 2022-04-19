// @ts-ignore
import classnames from 'classnames'

type ButtonPercentProps = {
  isLast?: boolean
  isActive?: boolean
  percent: string
  onClick: () => void
}

export default function ButtonPercent({ percent, onClick, isActive = false, isLast = false }: ButtonPercentProps) {
  return (
    <div
      className={classnames(
        'flex flex-1 h-9 justify-center text-xs md:text-sm rounded-3xl border border-transparent items-center cursor-pointer ',
        {
          'text-white font-bold': isActive,
          '': isLast,
        }
      )}
      onClick={onClick}
    >
      {percent}
    </div>
  )
}
