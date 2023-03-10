import { React, useEffect, useState } from "react";
import {
  Stack,
  Box,
  Typography,
  Stepper,
  Step,
  Button,
  StepButton,
  Divider,
  IconButton,
  InputBase,
  FormControlLabel,
  Checkbox,
  FormControl,
  RadioGroup,
  Radio,
  FormLabel,
  StepLabel,
} from "@mui/material";
import { TextareaAutosize } from "@mui/base";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import MyButton from "../MyButton/MyButton";
import SelectBox from "../SelectBox/SelectBox";
import Checkout from "../Checkout/Checkout";
import OrderInfo from "../OrderInfo/OrderInfo";
import Input from "../Input/Input";
import Logo from "../../logo.png";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import BeenhereIcon from "@mui/icons-material/Beenhere";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";

import "./cart.css";
import OrderReceived from "../OrderReceived/OrderReceived";

const steps = ["سبد خرید", "صورتحساب", "فاکتور"];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: " #ff6a00",
      borderTopWidth: 2,
      borderRadius: 1,
    },
  },

  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#eaeaf0",
    borderTopWidth: 2,
    borderRadius: 1,
  },
}));

export default function Cart() {
  // const [activeStep, setActiveStep] = useState(0);
  // const handleStep = (step) => () => {

  //     setActiveStep(step);

  // };

  // const [cities, setCities] = useState({
  //   Iran: ["Tabriz", "Tehran", "Shiraz", "Esfahan", "Mashhad"],
  //   Turkey: ["Istanbul", "Ezmir", "Ankara", "Antaliya"],
  //   US: ["Los Angles", "San Diego", "Chicago"],
  // });

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Stack
      sx={{
        padding: {
          md: "2.5rem",
          xs: "1rem",
        },
      }}
    >
      <Stack
        sx={{
          border: "1px solid #E3E3E3",
          borderRadius: "0.8rem",
          display: "flex",
          alignItems: "center",
          width: "100%",
          padding: "1rem",
        }}
      >
        <Box component="img" src={Logo} sx={{ width: "15%", margin: "1rem" }} />
        <Box
          sx={{
            width: {
              lg: "60%",
              md: "70%",
              sm: "80%",
              xs: "100%",
            },
          }}
        >
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {
                sx: {
                  "& .MuiStepLabel-root .Mui-active": {
                    color: "#FF6A00",
                    fontWeight: "bold",
                  },
                  "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                    {
                      color: "#FF6A00",
                    },
                  "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                    fill: "#fff",
                  },
                  "& .MuiSvgIcon-root": {
                    marginLeft: "0.6rem",
                  },
                },
              };
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption"></Typography>
                );
              }
              
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>
      </Stack>

      {activeStep === 0 && <OrderInfo handleNext={handleNext} />}
      {activeStep === 1 && (
        <Checkout handleBack={handleBack} handleNext={handleNext} />
      )}
      {activeStep === 2 && (
        <OrderReceived handleBack={handleBack} handleNext={handleNext} />
      )}
    </Stack>
  );
}
