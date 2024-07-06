import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import Typography from "@mui/material/Typography";
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
import Loader from "./Loader";

const Home = ({ snackbar }) => {
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
  const [check, setCheck] = React.useState(false);
  const [breakfast, setBreakFast] = React.useState([]);
  const [lunch, setLunch] = React.useState([]);
  const [dinner, setDinner] = React.useState([]);

  const [dailyCalorie, setDailyCalorie] = React.useState(0);
  const [dailyProtien, setDailyProtien] = React.useState(0);
  const [dailyCarbohydrates, setDailyCarbohydrates] = React.useState(0);
  const [dailyFats, setDailyFats] = React.useState(0);
  const [dailyFibre, setDailyFibre] = React.useState(0);

  const [maxProtien, setMaxProtien] = React.useState(0);
  const [maxCarb, setMaxCarb] = React.useState(0);
  const [maxFat, setMaxFat] = React.useState(0);
  const [maxFiber, setMaxFiber] = React.useState(0);

  const [cal, setCal] = React.useState(0);
  var kcal = 0;
  var prot = 0;
  var carb = 0;
  var fatty = 0;
  var fibrous = 0;
  const [change, setChange] = React.useState(false);
  // const maxcalorie = 1600;
  const value = cal;

  const handleAddToBreakFast = () => {
    setChange(!change);
    axios
      .post("/addbreakfast", {
        meal: "breakfast",
        meal_name: name,
        meal_servings: servings,
        meal_protien: protien,
        meal_calories: calorie,
        meal_carbohydrates: carbo,
        meal_fats: fats,
        meal_fiber: fibre,
      })
      .then((_) => {
        snackbar({ message: "Meal added successfully" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddToLunch = () => {
    setChange(!change);
    axios
      .post("/addlunch", {
        meal: "lunch",
        meal_name: name,
        meal_servings: servings,
        meal_protien: protien,
        meal_calories: calorie,
        meal_carbohydrates: carbo,
        meal_fats: fats,
        meal_fiber: fibre,
      })
      .then((_) => {
        snackbar({ message: "Meal added successfully" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddToDinner = () => {
    setChange(!change);
    axios
      .post("/addDinner", {
        meal: "dinner",
        meal_name: name,
        meal_servings: servings,
        meal_protien: protien,
        meal_calories: calorie,
        meal_carbohydrates: carbo,
        meal_fats: fats,
        meal_fiber: fibre,
      })
      .then((_) => {
        snackbar({ message: "Meal added successfully" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      console.log(response.data);
      setName(response.data.foods[0].food_name);
      setCalorie(Math.round(response.data.foods[0].nf_calories * servings));
      setProtien(Math.round(response.data.foods[0].nf_protein * servings));
      setCarbo(
        Math.round(response.data.foods[0].nf_total_carbohydrate * servings)
      );
      setFats(Math.round(response.data.foods[0].nf_total_fat * servings));
      setFibre(Math.round(response.data.foods[0].nf_dietary_fiber * servings));
      setShow(true);
      // Handle the response data here
    } catch (error) {
      console.error(error);
    }
  };

  const handleMacro = (bk) => {
    for (var i = 0; i < bk.length; i++) {
      kcal = kcal + parseInt(bk[i].meal_calories);
      setCal(kcal);
      prot = prot + parseInt(bk[i].meal_protien);
      setDailyProtien(prot);
      carb = carb + parseInt(bk[i].meal_carbohydrates);
      setDailyCarbohydrates(carb);
      fatty = fatty + parseInt(bk[i].meal_fats);
      setDailyFats(fatty);
      fibrous = fibrous + parseInt(bk[i].meal_fiber);
      setDailyFibre(fibrous);
    }
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  //for getting body data
  React.useEffect(() => {
    setCheck(true);
    axios
      .get("/getbodydata")
      .then((response) => {
        // console.log(response.data[0].maintainance_cal)

        setDailyCalorie(Math.round(response.data[0].maintainance_cal));
        setMaxProtien(Math.round(response.data[0].weight * 1.2));
        setMaxCarb(Math.round((response.data[0].maintainance_cal * 0.7) / 4)-50);
        setMaxFat(Math.round((response.data[0].maintainance_cal * 0.3) / 9));
        setMaxFiber(30);
        sleep(2000)
        setCheck(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //for breakfast
  React.useEffect(() => {
    axios
      .get("/getbreakfast")
      .then((response) => {
        // console.log(response.data)
        setBreakFast(response.data);
        var bk = response.data;
        handleMacro(bk);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [change]);

  //for dinner
  React.useEffect(() => {
    axios
      .get("/getdinner")
      .then((response) => {
        // console.log(response.data)
        setDinner(response.data);
        var bk = response.data;
        handleMacro(bk);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [change]);

  // for lunch
  React.useEffect(() => {
    axios
      .get("/getlunch")
      .then((response) => {
        setLunch(response.data);
        var bk = response.data;
        handleMacro(bk);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [change]);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: check ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          // border: "1px solid black",
        }}
      >
        <Loader />
      </Box>
      <Box
        sx={{
          margin: 0,
          padding: "20px",
          paddingTop: "10px",
          gap: 10,
          // backgroundColor: "#FFF9D0",
          background:"linear-gradient(#FFF9D0,#76ABAE)",
          display: check ? "none" : "",
        }}
      >
        <NavBar />
        <Stack direction="row" sx={{ marginBottom: "30px" }}>
          <Box width="40%">
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: `"Fraunces", serif`,
              }}
            >
              <Gauge
                width={250}
                height={250}
                value={value}
                valueMin={0}
                valueMax={dailyCalorie}
                cornerRadius="50%"
                sx={(theme) => ({
                  [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 40,
                  },
                })}
              />
            </Typography>

            <Typography
              sx={{
                fontFamily: `"Fraunces", serif`,
                fontSize: "1.1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                color:"#222831"
              }}
            >
              Calories:
              <span>
                {cal} / {dailyCalorie} kcal
              </span>
            </Typography>
          </Box>
          <Stack
            width="60%"
            direction="column"
            sx={{ paddingRight: "10%" }}
            spacing={3}
          >
            <Stack direction="row">
              <Box sx={{ width: "50%" }}>
                <Typography
                  sx={{
                    fontFamily: `"Fraunces", serif`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Gauge
                    width={120}
                    height={120}
                    value={dailyProtien}
                    valueMax={maxProtien}
                    cornerRadius="50%"
                    sx={(theme) => ({
                      [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 20,
                      },
                    })}
                  />
                </Typography>

                <Typography
                  sx={{
                    fontFamily: `"Fraunces", serif`,
                    fontSize: "1.1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    color:"#222831"
                  }}
                >
                  Protiens:
                  <span>
                    {dailyProtien}g / {maxProtien}g
                  </span>
                </Typography>
              </Box>
              <Box sx={{ width: "50%" }}>
                <Typography
                  sx={{
                    fontFamily: `"Fraunces", serif`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Gauge
                    width={120}
                    height={120}
                    value={dailyCarbohydrates}
                    valueMax={maxCarb}
                    cornerRadius="50%"
                    sx={(theme) => ({
                      [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 20,
                      },
                    })}
                  />
                </Typography>

                <Typography
                  sx={{
                    fontFamily: `"Fraunces", serif`,
                    fontSize: "1.1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    color:"#222831"
                  }}
                >
                  Carbohydrates:
                  <span>
                    {dailyCarbohydrates}g / {maxCarb}g
                  </span>
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row">
              <Box sx={{ width: "50%" }}>
                <Typography
                  sx={{
                    fontFamily: `"Fraunces", serif`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Gauge
                    width={120}
                    height={120}
                    value={dailyFats}
                    valueMax={maxFat}
                    cornerRadius="50%"
                    sx={(theme) => ({
                      [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 20,
                      },
                    })}
                  />
                </Typography>

                <Typography
                  sx={{
                    fontFamily: `"Fraunces", serif`,
                    fontSize: "1.1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    color:"#222831"
                  }}
                >
                  Fats:
                  <span>
                    {dailyFats}g / {maxFat}g
                  </span>
                </Typography>
              </Box>
              <Box sx={{ width: "50%" }}>
                <Typography
                  sx={{
                    fontFamily: `"Fraunces", serif`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Gauge
                    width={120}
                    height={120}
                    value={dailyFibre}
                    valueMax={maxFiber}
                    cornerRadius="50%"
                    sx={(theme) => ({
                      [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 20,
                      },
                    })}
                  />
                </Typography>

                <Typography
                  sx={{
                    fontFamily: `"Fraunces", serif`,
                    fontSize: "1.1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    color:"#222831"
                  }}
                >
                  Fiber:
                  <span>
                    {dailyFibre}g / {maxFiber}g
                  </span>
                </Typography>
              </Box>
            </Stack>
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
            color:"#222831"
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
                borderColor: "#222831",
                fontFamily: `"Fraunces", serif`,
              },
              "& label": { color: "#222831", fontFamily: `"Fraunces", serif` },
              "& input": { color: "#222831", fontFamily: `"Fraunces", serif` },
              "&:hover": {
                borderColor: "#222831",
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
                borderColor: "#222831",
                fontFamily: `"Fraunces", serif`,
              },
              "& label": { color: "#222831", fontFamily: `"Fraunces", serif` },
              "& input": { color: "#222831", fontFamily: `"Fraunces", serif` },
              "&:hover": {
                borderColor: "#222831",
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
              backgroundColor:"#5AB2FF"
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
                    onClick={handleAddToBreakFast}
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
                    onClick={handleAddToLunch}
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
                    onClick={handleAddToDinner}
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
              sx={{ backgroundColor: "#A0DEFF", fontSize: "1.3em" }}
            >
              BreakFast
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "#CAF4FF" }}>
              <Box sx={{ width: "100%" }}>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // justifyContent: "space-evenly",
                    fontFamily: `"Fraunces", serif`,
                  }}
                >
                  <span
                    style={{
                      border: "1px solid black",
                      width: "14%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Meal Name
                  </span>
                  <span
                    style={{
                      border: "1px solid black",
                      width: "14%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Servings
                  </span>
                  <span
                    style={{
                      border: "1px solid black",
                      width: "14%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Calories
                  </span>
                  <span
                    style={{
                      border: "1px solid black",
                      width: "14%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Protien
                  </span>
                  <span
                    style={{
                      border: "1px solid black",
                      width: "14%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Carbohydrates
                  </span>
                  <span
                    style={{
                      border: "1px solid black",
                      width: "14%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Fats
                  </span>
                  <span
                    style={{
                      border: "1px solid black",
                      width: "14%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Fiber
                  </span>
                </Typography>
              </Box>
              {breakfast.length !== 0 ? (
                breakfast.map((item) => (
                  <Box sx={{ width: "100%" }}>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        // justifyContent: "space-evenly",
                        fontFamily: `"Fraunces", serif`,
                        // border:"1px solid black"
                      }}
                    >
                      <span
                        style={{
                          border: "1px solid black",
                          width: "14%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.meal_name}
                      </span>
                      <span
                        style={{
                          border: "1px solid black",
                          width: "14%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.meal_servings}
                      </span>
                      <span
                        style={{
                          border: "1px solid black",
                          width: "14%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.meal_calories}
                      </span>
                      <span
                        style={{
                          border: "1px solid black",
                          width: "14%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.meal_protien}
                      </span>
                      <span
                        style={{
                          border: "1px solid black",
                          width: "14%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.meal_carbohydrates}
                      </span>
                      <span
                        style={{
                          border: "1px solid black",
                          width: "14%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.meal_fats}
                      </span>
                      <span
                        style={{
                          border: "1px solid black",
                          width: "14%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.meal_fiber}
                      </span>
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: "20px",
                  }}
                >
                  No Meals Found
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ backgroundColor: "#A0DEFF", fontSize: "1.3em" }}
            >
              Lunch
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "#CAF4FF" }}>
              <Box sx={{ width: "100%" }}>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // justifyContent: "space-evenly",
                    fontFamily: `"Fraunces", serif`,
                  }}
                >
                  <span
                    style={{
                      border: "1px solid black",
                      width: "14%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Meal Name
                  </span>
                  <span
                    style={{
                      border: "1px solid black",
                      width: "14%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Servings
                  </span>
                  <span
                    style={{
                      border: "1px solid black",
                      width: "14%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Calories
                  </span>
                  <span
                    style={{
                      border: "1px solid black",
                      width: "14%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Protien
                  </span>
                  <span
                    style={{
                      border: "1px solid black",
                      width: "14%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Carbohydrates
                  </span>
                  <span
                    style={{
                      border: "1px solid black",
                      width: "14%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Fats
                  </span>
                  <span
                    style={{
                      border: "1px solid black",
                      width: "14%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Fiber
                  </span>
                </Typography>
              </Box>
              {lunch.length !== 0 ? (
                lunch.map((item) => (
                  <Box sx={{ width: "100%" }}>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        // justifyContent: "space-evenly",
                        fontFamily: `"Fraunces", serif`,
                        // border:"1px solid black"
                      }}
                    >
                      <span
                        style={{
                          border: "1px solid black",
                          width: "14%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.meal_name}
                      </span>
                      <span
                        style={{
                          border: "1px solid black",
                          width: "14%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.meal_servings}
                      </span>
                      <span
                        style={{
                          border: "1px solid black",
                          width: "14%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.meal_calories}
                      </span>
                      <span
                        style={{
                          border: "1px solid black",
                          width: "14%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.meal_protien}
                      </span>
                      <span
                        style={{
                          border: "1px solid black",
                          width: "14%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.meal_carbohydrates}
                      </span>
                      <span
                        style={{
                          border: "1px solid black",
                          width: "14%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.meal_fats}
                      </span>
                      <span
                        style={{
                          border: "1px solid black",
                          width: "14%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.meal_fiber}
                      </span>
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: "20px",
                  }}
                >
                  No Meals Found
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ backgroundColor: "#A0DEFF", fontSize: "1.3em" }}
            >
              Dinner
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: "#CAF4FF" }}>
              <Box sx={{ width: "100%" }}>
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // justifyContent: "space-evenly",
                    fontFamily: `"Fraunces", serif`,
                  }}
                >
                  <span
                    style={{
                      border: "1px solid black",
                      width: "14%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Meal Name
                  </span>
                  <span
                    style={{
                      border: "1px solid black",
                      width: "14%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Servings
                  </span>
                  <span
                    style={{
                      border: "1px solid black",
                      width: "14%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Calories
                  </span>
                  <span
                    style={{
                      border: "1px solid black",
                      width: "14%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Protien
                  </span>
                  <span
                    style={{
                      border: "1px solid black",
                      width: "14%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Carbohydrates
                  </span>
                  <span
                    style={{
                      border: "1px solid black",
                      width: "14%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Fats
                  </span>
                  <span
                    style={{
                      border: "1px solid black",
                      width: "14%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Fiber
                  </span>
                </Typography>
              </Box>
              {dinner.length !== 0 ? (
                dinner.map((item) => (
                  <Box sx={{ width: "100%" }}>
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        // justifyContent: "space-evenly",
                        fontFamily: `"Fraunces", serif`,
                        // border:"1px solid black"
                      }}
                    >
                      <span
                        style={{
                          border: "1px solid black",
                          width: "14%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.meal_name}
                      </span>
                      <span
                        style={{
                          border: "1px solid black",
                          width: "14%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.meal_servings}
                      </span>
                      <span
                        style={{
                          border: "1px solid black",
                          width: "14%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.meal_calories}
                      </span>
                      <span
                        style={{
                          border: "1px solid black",
                          width: "14%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.meal_protien}
                      </span>
                      <span
                        style={{
                          border: "1px solid black",
                          width: "14%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.meal_carbohydrates}
                      </span>
                      <span
                        style={{
                          border: "1px solid black",
                          width: "14%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.meal_fats}
                      </span>
                      <span
                        style={{
                          border: "1px solid black",
                          width: "14%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {item.meal_fiber}
                      </span>
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: "20px",
                  }}
                >
                  No Meals Found
                </Typography>
              )}
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
