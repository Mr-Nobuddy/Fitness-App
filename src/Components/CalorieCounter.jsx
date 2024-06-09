import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Gauge } from "@mui/x-charts/Gauge";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Accordion from "@mui/material/Accordion";
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
import { IoIosCloseCircleOutline } from "react-icons/io";
import CircularProgress from "@mui/material/CircularProgress";
import { grey } from '@mui/material/colors';

const Home = () => {
  const [searchFood, setSearchFood] = React.useState("");
  const [servings, setServings] = React.useState(1);

  const [name, setName] = React.useState("");
  const [calorie, setCalorie] = React.useState("");
  const [protien, setProtien] = React.useState("");
  const [carbo, setCarbo] = React.useState("");
  const [fats, setFats] = React.useState("");
  const [fibre, setFibre] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [showLoader, setShowLoader] = React.useState(false);
  const [check, setCheck] = React.useState({ msg: "", flag: false });
  const [breakfast, setBreakFast] = React.useState([]);
  const [lunch, setLunch] = React.useState([]);
  const [dinner, setDinner] = React.useState([]);

  const [dailyCalorie,setDailyCalorie] = React.useState(0);
  const [dailyProtien,setDailyProtien] = React.useState(0);
  const [dailyCarbohydrates,setDailyCarbohydrates] = React.useState(0);
  const [dailyFats,setDailyFats] = React.useState(0);
  const [dailyFibre,setDailyFibre] = React.useState(0);

  const [maxProtien,setMaxProtien] = React.useState(0);
  const [maxCarb,setMaxCarb] = React.useState(0);
  const [maxFat,setMaxFat] = React.useState(0);
  const [maxFiber,setMaxFiber] = React.useState(0);
  
  const [cal, setCal] = React.useState(0);
  const [change,setChange] = React.useState(false);
  // const maxcalorie = 1600;
  const value = `${cal}/${dailyCalorie}`;

  const handleAddToBreakFast = () => {
    axios.post('/addbreakfast',{})
    .then((response) => {

    })
    .catch((err) => {
      console.log(err);
    })
  }

  const handleAddToLunch = () => {
    axios.post('/addlunch',{})
    .then((response) => {

    })
    .catch((err) => {
      console.log(err);
    })
  }

  const handleAddToDinner = () => {
    axios.post('/addDinner',{})
    .then((response) => {

    })
    .catch((err) => {
      console.log(err);
    })
  }

  React.useEffect(() => {
    // setChange(!change);
    axios.get("/getbodydata")
    .then((response) => {
      // console.log(response.data[0].maintainance_cal)
      setDailyCalorie(Math.round(response.data[0].maintainance_cal));
      setMaxProtien(Math.round(response.data[0].weight*1.2));
      setMaxCarb(Math.round((response.data[0].maintainance_cal*0.70)/4));
      setMaxFat(Math.round((response.data[0].maintainance_cal*0.30)/9));
      setMaxFiber(30)
    })
    .catch((err) => {
      console.log(err)
    })
  },[])

  const handleSearch = async () => {
    try {
      setShowLoader(true);
      setShow(false);
      const response = await axios.post(
        "https://trackapi.nutritionix.com/v2/natural/nutrients",
        {
          query: searchFood,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-app-id": "1a299a7b",
            "x-app-key": "eedf9d333e690c05a2e66f2f26ff301c",
          },
        }
      );
      // console.log(response.data.foods[0].food_name);
      setShowLoader(false);
      setName(response.data.foods[0].food_name);
      setCalorie(response.data.foods[0].nf_calories * servings);
      setProtien(response.data.foods[0].nf_protein * servings);
      setCarbo(response.data.foods[0].nf_total_carbohydrate * servings);
      setFats(response.data.foods[0].nf_total_fat * servings);
      setFibre(response.data.foods[0].nf_dietary_fiber * servings);
      setShow(true);
      // Handle the response data here
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        margin: 0,
        padding: "20px",
        paddingTop: "10px",
        gap: 10,
        backgroundColor: "yellow",
      }}
    >
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
            value={value}
            valueMin={0}
            valueMax={dailyCalorie}
          />
        </Box>
        <Stack width="60%" direction="column" sx={{ paddingRight: "10%" }}>
          <Typography
            sx={{ fontFamily: `"Fraunces", serif`, fontSize: "1.1rem" ,display:"flex",alignItems:"center",justifyContent:"space-between"}}
          >
            Protiens
            <span>{dailyProtien}g / {maxProtien}g</span>
          </Typography>
          <Slider
            disabled
            defaultValue={dailyProtien}
            aria-label="Disabled slider"
            max={100}
            min={0}
            color={grey[900]}
          />

          <Typography
            sx={{ fontFamily: `"Fraunces", serif`, fontSize: "1.1em" ,display:"flex",alignItems:"center",justifyContent:"space-between"}}
          >
            Carbohydrates
            <span>{dailyCarbohydrates}g / {maxCarb}g</span>
          </Typography>
          <Slider
            disabled
            defaultValue={dailyCarbohydrates}
            aria-label="Disabled slider"
            max={100}
            min={0}
          />

          <Typography
            sx={{ fontFamily: `"Fraunces", serif`, fontSize: "1.1em",display:"flex",alignItems:"center",justifyContent:"space-between" }}
          >
            Fats
            <span>{dailyFats}g / {maxFat}g</span>
          </Typography>
          <Slider
            disabled
            defaultValue={dailyFats}
            aria-label="Disabled slider"
            max={100}
            min={0}
            color="success"
          />

          <Typography
            sx={{ fontFamily: `"Fraunces", serif`, fontSize: "1.1em" ,display:"flex",alignItems:"center",justifyContent:"space-between"}}
          >
            Fiber
            <span>{dailyFibre}g / {maxFiber}g</span>
          </Typography>
          <Slider
            disabled
            defaultValue={dailyFibre}
            aria-label="Disabled slider"
            max={30}
            // min={0}
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
          fontSize: "2.2rem",
          marginBottom: "10px",
          fontFamily: `"Fraunces", serif`,
        }}
      >
        Add your meals
      </Typography>
      <Box
        sx={{
          paddingLeft: "30px",
          paddingRight: "30px",
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
            "& fieldset": {
              borderColor: "black",
              fontFamily: `"Fraunces", serif`,
            },
            "& label": { color: "black", fontFamily: `"Fraunces", serif` },
            "& input": { color: "black", fontFamily: `"Fraunces", serif` },
            "&:hover": {
              borderColor: "black",
              fontFamily: `"Fraunces", serif`,
            },
            width: "49%",
            fontFamily: `"Fraunces", serif`,
          }}
        />
        <TextField
          id="outlined-basic"
          label="Enter the servings"
          variant="outlined"
          onChange={(e) => setServings(e.target.value)}
          sx={{
            "& fieldset": {
              borderColor: "black",
              fontFamily: `"Fraunces", serif`,
            },
            "& label": { color: "black", fontFamily: `"Fraunces", serif` },
            "& input": { color: "black", fontFamily: `"Fraunces", serif` },
            "&:hover": {
              borderColor: "black",
              fontFamily: `"Fraunces", serif`,
            },
            width: "49%",
          }}
        />
      </Box>
      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{
            width: "40%",
            height: "55px",
            "&:hover": { backgroundColor: "black", scale: "110%" },
            "&:active": { scale: "90%" },
            borderRadius: "50px",
            marginBottom: "20px",
            fontFamily: `"Fraunces", serif`,
            fontSize: "1.2em",
            transition: "all ease 0.2s",
            // display:show ? "none":"flex"
          }}
          onClick={handleSearch}
        >
          {" "}
          Search{" "}
        </Button>
      </Box>
      <Box
        sx={{
          display: showLoader ? "flex" : "none",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
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
            fontFamily: `"Fraunces", serif`,
          }}
        >
          <Card
            sx={{
              minWidth: 300,
              width: "50%",
              marginTop: "20px",
              fontFamily: `"Fraunces", serif`,
            }}
            elevation={3}
          >
            <CardContent>
              <Stack sx={{ marginBottom: "10px" }} direction="row">
                <Typography
                  sx={{
                    fontWeight: "900",
                    fontSize: "2.5rem",
                    textAlign: "start",
                    width: "80%",
                    // border:"1px solid black"
                    fontFamily: `"Fraunces", serif`,
                  }}
                >
                  {name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "20%",
                    // border:"1px solid black"
                  }}
                  // onClick={() => setShow(false)}
                >
                  <IoIosCloseCircleOutline
                    size={40}
                    onClick={() => setShow(false)}
                    style={{ cursor: "pointer" }}
                  />
                </Typography>
              </Stack>

              <Stack sx={{ marginBottom: "10px" }} direction="row">
                <Typography
                  sx={{
                    fontWeight: "900",
                    fontSize: "1.5rem",
                    fontFamily: `"Fraunces", serif`,
                  }}
                >
                  Servings
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                    fontFamily: `"Fraunces", serif`,
                  }}
                >
                  {servings}
                </Typography>
              </Stack>

              <Stack sx={{ marginBottom: "10px" }} direction="row">
                <Typography
                  sx={{
                    fontWeight: "900",
                    fontSize: "1.5rem",
                    fontFamily: `"Fraunces", serif`,
                  }}
                >
                  Calories
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                    fontFamily: `"Fraunces", serif`,
                  }}
                >
                  {calorie} calories
                </Typography>
              </Stack>

              <Stack sx={{ marginBottom: "10px" }} direction="row">
                <Typography
                  sx={{
                    fontWeight: "900",
                    fontSize: "1.5rem",
                    fontFamily: `"Fraunces", serif`,
                  }}
                >
                  Protien
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                    fontFamily: `"Fraunces", serif`,
                  }}
                >
                  {protien} g
                </Typography>
              </Stack>

              <Stack sx={{ marginBottom: "10px" }} direction="row">
                <Typography
                  sx={{
                    fontWeight: "900",
                    fontSize: "1.5rem",
                    fontFamily: `"Fraunces", serif`,
                  }}
                >
                  Carbohydrates
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                    fontFamily: `"Fraunces", serif`,
                  }}
                >
                  {carbo} g
                </Typography>
              </Stack>

              <Stack sx={{ marginBottom: "10px" }} direction="row">
                <Typography
                  sx={{
                    fontWeight: "900",
                    fontSize: "1.5rem",
                    fontFamily: `"Fraunces", serif`,
                  }}
                >
                  Fats
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                    fontFamily: `"Fraunces", serif`,
                  }}
                >
                  {fats} g
                </Typography>
              </Stack>

              <Stack sx={{ marginBottom: "10px" }} direction="row">
                <Typography
                  sx={{
                    fontWeight: "900",
                    fontSize: "1.5rem",
                    fontFamily: `"Fraunces", serif`,
                  }}
                >
                  Fiber
                </Typography>
                <Typography
                  sx={{
                    fontSize: "1.1rem",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                    fontFamily: `"Fraunces", serif`,
                  }}
                >
                  {fibre} g
                </Typography>
              </Stack>
            </CardContent>
            <CardActions>
              <Stack
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
                direction="row"
                spacing={4}
              >
                <Button
                  variant="contained"
                  sx={{
                    fontFamily: `"Fraunces", serif`,
                    "&:hover": { backgroundColor: "black", scale: "110%" },
                    "&:active": { scale: "90%" },
                    transition: "all ease 0.2s",
                  }}
                >
                  Add to Breakfast
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    fontFamily: `"Fraunces", serif`,
                    "&:hover": { backgroundColor: "black", scale: "110%" },
                    "&:active": { scale: "90%" },
                    transition: "all ease 0.2s",
                  }}
                >
                  Add to Lunch
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    fontFamily: `"Fraunces", serif`,
                    "&:hover": { backgroundColor: "black", scale: "110%" },
                    "&:active": { scale: "90%" },
                    transition: "all ease 0.2s",
                  }}
                >
                  Add to Dinner
                </Button>
              </Stack>
            </CardActions>
          </Card>
        </Box>
      ) : (
        ""
      )}
      <Box sx={{ marginTop: "20px", width: "100%", marginBottom: "70px" }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{ backgroundColor: "#92FE9D", fontSize: "1.3em" }}
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
            sx={{ backgroundColor: "#92FE9D", fontSize: "1.3em" }}
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
            sx={{ backgroundColor: "#92FE9D", fontSize: "1.3em" }}
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
