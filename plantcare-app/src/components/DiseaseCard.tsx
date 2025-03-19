import "@/styles/diseaseCard.css"

// Images
import DeceaseImg from "@/images/decease2.jpeg"

// Types
import { Disease } from "@/types/diseases";

// mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CircleIcon from '@mui/icons-material/Circle';

function DiseaseCard() {

    const disease: Disease = {
        name: "Plant disease",
        description: "",
        severity: 3,
        treatment: ""
    }

    return (
        <Card sx={{ width: 250, minWidth: 200, height: "100%", marginRight: "35px"}}>
            <CardActionArea className="h-[85%]">
                <CardMedia
                component="img"
                image={DeceaseImg.src}
                alt="green iguana"
                className="h-[55%]"
                />
                <CardContent className="h-[45%]">
                    <Typography gutterBottom variant="h5" component="div" className="whitespace-nowrap overflow-hidden text-ellipsis">
                        {disease.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary'}} className="whitespace-nowrap overflow-hidden">
                        Severity :
                        {Array.from({ length: disease.severity }).map((_, i) => {
                            let color;
                            if (disease.severity === 3) color = "red";
                            else if (disease.severity === 2) color = "orange";
                            else if (disease.severity === 1) color = "green";

                            return <CircleIcon key={i} sx={{ fontSize: "0.8rem", marginLeft: "2px", color }} />;
                        })}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className="h-[15%] flex justify-end">
                <button className="bg-[#b8f7c1] text-[#277a1c] text-[0.7rem] font-bold rounded-full w-auto pl-2 pr-2 m-2 active:bg-[#277a1c] active:text-[#b8f7c1]">
                    Treament
                </button>
            </CardActions>
        </Card>

    )
}

export default DiseaseCard
