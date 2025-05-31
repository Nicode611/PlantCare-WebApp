import "./switchButton.css"

function SwitchButton({ checked, onCheckedChange }) {
  // 'checked' controls the toggle state, 'onCheckedChange' notifies parent
  return (
    /* From Uiverse.io by JaydipPrajapati1910 */
      <div className="toggle-button-cover">
        <div id="button-3" className="button r">
          {/* Controlled checkbox */}
          <input
            className="checkbox"
            type="checkbox"
            checked={checked}
            onChange={e => onCheckedChange(e.target.checked)}
          />
         <div className="knobs"></div>
         <div className="layer"></div>
        </div>
      </div>

  )
}

export default SwitchButton
