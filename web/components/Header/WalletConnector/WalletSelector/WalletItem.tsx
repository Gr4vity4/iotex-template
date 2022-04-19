import ButtonOutline from 'components/Button/Outline'

type Props = {
  text: string
  icon: string
  onClick: () => void
}

export default function WalletItem({ text, icon, onClick }: Props) {
  return (
    <li className="flex items-center gap-4">
      <div className="flex-1">
        <ButtonOutline
          className="flex w-full px-6 py-4 leading-none transition duration-200 border md:text-lg md:py-6 border-lime-default  hover:bg-lime-400 hover:border-lime-default hover:text-lime-600 active:bg-lime-500 active:border-lime-500"
          iconPosition="left"
          icon={<img src={icon} alt={`${text}-wallet-option`} className="w-6 mr-4" />}
          text={text}
          isFullWidth
          onClick={onClick}
        />
      </div>
    </li>
  )
}
