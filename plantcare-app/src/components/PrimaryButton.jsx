
function PrimaryButton(props) {
  return (
    <div>
      <button className="font-sans relative z-[100] bg-gradient-to-b from-[#28921A] to-[#277A1D] hover:from-[#1D5A15] hover:to-[#175014] text-white h-auto w-auto rounded-3xl pt-2 pb-2 pl-5 pr-5 text-center">
            {props.title}
        </button>
    </div>
  )
}

export default PrimaryButton
