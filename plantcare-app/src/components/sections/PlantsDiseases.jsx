function PlantsDiseases() {

    let tab = [
        {
            index: 1,
            decease : "decease",
            description: "description",
            image : "decease3.jpg"
        },
        {
            index: 2,
            decease : "decease",
            description: "description",
            image : "decease3.jpg"
        },
        {
            index: 3,
            decease : "decease",
            description: "description",
            image : "decease3.jpg"
        },

    ]

  return (
    <div className="w-[80%] z-10">
        <h2 className="font-fancy text-[3rem] font-extrabold m-5 mb-8">Possible plant diseases :</h2>
        <div className="grid grid-cols-3 gap-[28px] place-items-center ">
            {tab.map((decease, index) => (
                <div key={index} className="relative max-w-64 shadow-lg p-5 rounded-3xl text-white hover:cursor-pointer overflow-hidden group">
                    {/* Image en background */}
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out scale-100 group-hover:scale-110" style={{ backgroundImage: `url('/images/${decease.image}')` }}></div>
                    {/* Overlay de couleur semi-transparent */}
                    <div className="absolute inset-0 bg-green-950 bg-opacity-60 transition-opacity duration-500 ease-in-out  group-hover:opacity-0"></div>
                    {/* Contenu au premier plan */}
                    <div className="relative p-4 flex flex-col justify-center h-full">
                        <span className="text-lg font-bold">{decease.decease}</span>
                        <p className="text-sm">{decease.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PlantsDiseases
