import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Gauge } from "@mui/x-charts/Gauge";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import NavBar from "./NavBar";

const Home = () => {
  const caloie = 200;
  const maxcalorie = 1600;
  const value = `${caloie}/${maxcalorie}`;

  const [searchFood, setSearchFood] = React.useState("");

  const [name, setName] = React.useState("");
  const [calorie, setCalorie] = React.useState("");
  const [protien, setProtien] = React.useState("");
  const [carbo, setCarbo] = React.useState("");
  const [fats, setFats] = React.useState("");
  const [fibre, setFibre] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [check, setCheck] = React.useState({ msg: "", flag: false });
  const [breakfast, setBreakFast] = React.useState([]);

  const options = {
    method: "GET",
    url: "https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition",
    params: {
      query: searchFood,
    },
    headers: {
      "X-RapidAPI-Key": "f775f70b37msh97fa7ed0c6cd78cp17d0a4jsn0725e9aaad31",
      "X-RapidAPI-Host": "nutrition-by-api-ninjas.p.rapidapi.com",
    },
  };
  const handleSearch = async () => {
    try {
      const response = await axios.request(options).then((res) => {
        console.log(res);
        if (res.data.length === 0) {
          setCheck({ msg: "No such item found", flag: true });
        }
        setName(res.data[0].name);
        setCalorie(res.data[0].calories);
        setProtien(res.data[0].protein_g);
        setCarbo(res.data[0].carbohydrates_total_g);
        setFats(res.data[0].fat_total_g);
        setFibre(res.data[0].fiber_g);
        setShow(true);
        // console.log(calorie,protien,carbo,fats);
      });
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ margin: 0, padding: "20px", paddingTop: "10px", gap: 10 , backgroundColor:"yellow"}}>
      <NavBar />
      <Stack direction="row">
        <Box
          width="40%"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Gauge
            width={250}
            height={250}
            value={caloie}
            valueMin={0}
            valueMax={maxcalorie}
          />
        </Box>
        <Stack width="60%" direction="column" sx={{ paddingRight: "10%" }}>
          <Typography>Protiens</Typography>
          <Slider
            disabled
            defaultValue={70}
            aria-label="Disabled slider"
            max={100}
            min={0}
          />

          <Typography>Carbohydrates</Typography>
          <Slider
            disabled
            defaultValue={10}
            aria-label="Disabled slider"
            max={100}
            min={0}
          />

          <Typography>Fats</Typography>
          <Slider
            disabled
            defaultValue={20}
            aria-label="Disabled slider"
            max={100}
            min={0}
            color="success"
          />

          <Typography>Fibre</Typography>
          <Slider
            disabled
            defaultValue={40}
            aria-label="Disabled slider"
            max={100}
            min={0}
            color="success"
          />
        </Stack>
      </Stack>
      <Typography
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "900",
          fontSize: "2rem",
          marginBottom: "10px",
        }}
      >
        Add your meals
      </Typography>
      <Box
        sx={{
          paddingLeft: "50px",
          paddingRight: "50px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search for a food"
          variant="outlined"
          onChange={(e) => setSearchFood(e.target.value)}
          sx={{
            "& fieldset": { borderColor: "black" },
            "& label": { color: "black" },
            "& input": { color: "black" },
            "&:hover": { borderColor: "black" },
            width: "75%",
          }}
        />
        <Button
          variant="contained"
          sx={{
            width: "20%",
            height: "55px",
            "&:hover": { backgroundColor: "black" },
            borderRadius: "50px",
          }}
          onClick={handleSearch}
        >
          {" "}
          Search{" "}
        </Button>
      </Box>
      {show ? (
        <Box
          sx={{
            borderRadius: "50px",
            marginLeft: "50px",
            marginRight: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            sx={{ minWidth: 300, width: "50%", marginTop: "20px" }}
            elevation={3}
          >
            <CardContent>
              <Typography
                sx={{
                  fontWeight: "900",
                  fontSize: "2rem",
                  textAlign: "center",
                }}
              >
                {name}
              </Typography>

              <Stack sx={{ marginBottom: "10px" }} direction="row">
                <Typography sx={{ fontWeight: "900", fontSize: "1.5rem" }}>
                  Calories
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {calorie} calories
                </Typography>
              </Stack>

              <Stack sx={{ marginBottom: "10px" }} direction="row">
                <Typography sx={{ fontWeight: "900", fontSize: "1.5rem" }}>
                  Protien
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {protien} g
                </Typography>
              </Stack>

              <Stack sx={{ marginBottom: "10px" }} direction="row">
                <Typography sx={{ fontWeight: "900", fontSize: "1.5rem" }}>
                  Carbohydrates
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {carbo} g
                </Typography>
              </Stack>

              <Stack sx={{ marginBottom: "10px" }} direction="row">
                <Typography sx={{ fontWeight: "900", fontSize: "1.5rem" }}>
                  Fats
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {fats} g
                </Typography>
              </Stack>

              <Stack sx={{ marginBottom: "10px" }} direction="row">
                <Typography sx={{ fontWeight: "900", fontSize: "1.5rem" }}>
                  Fibre
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  {fibre} g
                </Typography>
              </Stack>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Stack direction="row" spacing={6}>
                <Button variant="contained">Add to Breakfast</Button>
                <Button variant="contained">Add to Lunch</Button>
                <Button variant="contained">Add to Dinner</Button>
              </Stack>
            </CardActions>
          </Card>
        </Box>
      ) : (
        ""
      )}
      <Box sx={{ marginTop: "20px", width: "100%" }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ backgroundColor: "#92FE9D" }}
          >
            BreakFast
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: "#00C9FF" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ backgroundColor: "#92FE9D" }}
          >
            Lunch
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: "#00C9FF" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ backgroundColor: "#92FE9D" }}
          >
            Dinner
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: "#00C9FF" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default Home;
