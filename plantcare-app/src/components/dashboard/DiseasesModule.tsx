
import DiseaseCard from "../DiseaseCard"
function DiseasesModule() {

    const cardsNumber = 8;


    return (
        <div className="w-full h-full flex items-center p-5">
            { Array.from({length: cardsNumber}).map((_ , i) => {
                return <DiseaseCard key={i}/>
            })}

            
        </div>
    )
}

export default DiseasesModule
