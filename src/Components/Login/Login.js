import { useState } from "react";
import { Stack, Box,Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import Logo from "../../logo.png";
import axios from "axios";

const ContainerImage = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
    width: "55%",
    justifyContent: "center",
    alignItems: "center",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const submitHandeler = (data) => {
  console.log(data);
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginSuccessSnackbar, setLoginSuccessSnackbar] = useState(false);
  const [loginFailedSnackbar, setLoginFailedSnackbar] = useState(false);
  const handleClose = () => {
    setLoginSuccessSnackbar(false);
    setLoginFailedSnackbar(false)
  };

  const submitHandeler = (data) => {
    axios
      .get(
        `http://localhost:4000/users?username=${data.userName}&password=${data.password}`
      )
      .then((response) => {
        if (response.data.length) {
          console.log(response.data[0].username);
          localStorage.setItem("username", response.data[0].username);
          setLoginSuccessSnackbar(true);

          setTimeout(() => {
            window.location.href = "http://localhost:3000";
          }, 2000);
        } else {
          setLoginFailedSnackbar(true)
        }
      });
  };

  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: {
            lg: "75%",
            md: "94%",
            sm: "50%",
            xs: "70%",
          },
          justifyContent: "center",
          margin: {
            md: "2rem 0",
            xs: "1rem 0",
          },
          boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
          padding: {
            md: "2rem 1.5rem",
            xs: "1.5rem 1rem",
          },
          borderRadius: "1rem",
        }}
      >
        <Box
          sx={{
            width: {
              md: "45%",
              xs: "100%",
            },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack sx={{ width: "85%" }}>
            <Box sx={{ margin: "auto", marginBottom: "2rem" }}>
              <Box
                component="img"
                sx={{
                  width: 130,
                }}
                alt="Your logo"
                src={Logo}
              ></Box>
            </Box>
            <form onSubmit={handleSubmit(submitHandeler)}>
              <label className="lable">?????? ???????????? :</label>
              <input
                {...register("userName", {
                  required: "???????? ?????? ???????????? ?????? ???? ???????? ???????? .",
                })}
                type="text"
                className="input-form"
              />
              <p className="alert">{errors.userName?.message}</p>

              <label className="lable">?????????????? :</label>
              <input
                {...register("password", {
                  required: "???????? ?????????????? ?????? ???? ???????? ???????? .",
                })}
                type="password"
                className="input-form"
              />
              <p className="alert">{errors.password?.message}</p>
              <input type="submit" className="submit-btn" value="????????" />
              <div className="link-container">
                <span className="link">
                  ?????? ???????? ?????? ???? ???????????? ????????????
                  <Link to="/register">?????????????? ?????? ????????</Link>
                </span>
                <span className="link">
                  ???????? ?????? ?????? ?????????????? <Link to="/register">?????? ??????</Link>
                </span>
              </div>
              <Snackbar
                open={loginSuccessSnackbar}
                autoHideDuration={2000}
                onClose={handleClose}
                
              >
                <MuiAlert elevation={6} variant="filled" severity="success">
                  ?????? ???? ???????????? ???????? ????????
                </MuiAlert>
              </Snackbar>
              <Snackbar
                open={loginFailedSnackbar}
                autoHideDuration={2000}
                onClose={handleClose}
                
              >
                <MuiAlert elevation={6} variant="filled" severity="error">
              ?????????????? ???????? ???? ???????? ????????
                </MuiAlert>
              </Snackbar>
            </form>
          </Stack>
        </Box>

        <ContainerImage>
          <Box
            sx={{ width: "85%", height: "27rem" }}
            component="img"
            alt="Your logo"
            src="./images/login.png"
          ></Box>
        </ContainerImage>
      </Box>
    </Stack>
  );
}
