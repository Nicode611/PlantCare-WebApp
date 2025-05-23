import "./switchButton.css"

function SwitchButton(value) {
  return (
    /* From Uiverse.io by JaydipPrajapati1910 */
      <div className="toggle-button-cover">
        <div id="button-3" className="button r">
          {/* Insert the value in input */}
          <input className="checkbox" type="checkbox" checked={value} />
          <div className="knobs"></div>
          <div className="layer"></div>
        </div>
      </div>

  )
}

export default SwitchButton
