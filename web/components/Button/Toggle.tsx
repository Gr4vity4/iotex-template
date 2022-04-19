interface IToggleButton {
  isToggle: boolean
  onToggle: () => void
}

ToggleButton.defaultProps = {
  onToggle: () => {},
}

function ToggleButton({ isToggle = false, onToggle }: IToggleButton) {
  return (
    <div className="flex items-center justify-center toggle-button" onClick={onToggle}>
      <label htmlFor="toggleB" className="flex items-center cursor-pointer">
        <div className="relative">
          <input type="checkbox" className="sr-only" checked={isToggle} readOnly />
          <div className="block h-6 bg-white rounded-full bg-dot w-11"></div>
          <div className="dot absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition"></div>
        </div>
      </label>
    </div>
  )
}
export default ToggleButton
