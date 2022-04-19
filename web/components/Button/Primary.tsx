import { Button } from '.'
import ButtonBase from './Base'

export default function ButtonPrimary({ isFullWidth, text, onClick, disabled }: Button) {
  return (
    <ButtonBase
      className="text-white transition bg-green-500 hover:bg-green-400 hover:border-green-400 hover:text-green-600 focus:bg-green-600 focus:text-white focus:border-green-600"
      text={text}
      onClick={onClick}
      disabled={disabled}
      isFullWidth={isFullWidth}
    />
  )
}
