import React, { useEffect, useState } from "react";
import {
  Stack,
  Slider,
  Box,
  Typography,
  TextField,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItem,
  ListItemButton,
  ListItemText,
  List,
} from "@mui/material";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Product from "../Product/Product";
import SortIcon from "@mui/icons-material/Sort";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MyButton from "../MyButton/MyButton";
import "./ProductsList.css";

const useStyles = makeStyles((theme) => ({
  productListContainer: {
    display: "flex",
    padding: "2rem",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      padding: "1rem",
    },
  },
  categoryBox: {
    display: "flex",
    alignItems: "center",
  },
  productListBox: {
    boxShadow: "0 2px 4px 0 rgb(0 0 0 / 3%)",
    border: "1px solid #e4e4e4",
    borderRadius: " 0.7rem",
    width: "77%",
    [theme.breakpoints.between("md", "lg")]: {
      width: "70%",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  productListHead: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #e4e4e4",
    padding: "0.5rem",
    [theme.breakpoints.down("sm")]: {
      alignItems: "flex-start",
      flexDirection: "column",
    },
  },
  allProductsList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
}));
const SideBarStyled = styled(Stack)(({ theme }) => ({
  width: "22%",
  position: "sticky",
  top: "1rem",
  height: "120vh",
  bottom: "1rem",
  [theme.breakpoints.between("md", "lg")]: {
    width: "29%",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
const AccordionStyled = styled(Accordion)(({ theme }) => ({
  border: "1px solid  #e4e4e4",
  boxShadow: "0 2px 4px 0 rgb(0 0 0 / 3%)",
  borderRadius: "0.7rem",
  margin: "0.5rem 0",
  "&::before": {
    display: "none",
  },
  "&:first-of-type": {
    borderTopLeftRadius: "0.7rem",
    borderTopRightRadius: "0.7rem",
  },
  "&:last-of-type": {
    borderBottomLeftRadius: "0.7rem",
    borderBottomRightRadius: "0.7rem",
  },
  "&.Mui-expanded": {
    margin: "0.5rem 0",
  },
}));
const CustomSlider = styled(Slider)(({ theme }) => ({
  "& .MuiSlider-thumb": {
    backgroundColor: "#fff",
    border: "1px solid blue",
    width: "1.1rem",
    height: "1.1rem",
  },
  "& .MuiSlider-track": {
    height: "2px",
  },
}));
const H2ElemSideBar = styled(Typography)(({ theme }) => ({
  fontSize: "0.9rem",
  fontWeight: "600",
}));
const TextFieldStyled = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: "2.5rem",
    fontSize: "0.8rem",
    marginLeft: "0.5rem",
    color: "#81858b",
  },
}));
const ListItemButtonHeader = styled(ListItemButton)(({ theme }) => ({
  transition: "none",
  color: " #4d4d4d",
  marginLeft: "0.3rem",

  "&:hover": {
    background: "#ff6a00",
    color: "#fff",
    borderRadius: "0.7rem",
  },
  "&:focus": {
    background: "#ff6a00",
    color: "#fff",
    borderRadius: "0.7rem",
  },
  [theme.breakpoints.down("lg")]: {
    padding: "0.6rem",
  },
  [theme.breakpoints.down("md")]: {
    padding: "0.5rem",
  },
}));
const ListItemTextStyled = styled(ListItemText)(({ theme }) => ({
  "& .MuiTypography-root ": {
    fontSize: "0.9rem",

    [theme.breakpoints.down("md")]: {
      fontSize: "0.8rem",
    },
  },
}));

export default function ProductsList() {
  const classes = useStyles();
  const { allProducts, ispending } = useFetch("http://localhost:4000/products");
  const { categories, setCategoriesIsPenging } = useFetch(
    "http://localhost:4000/categories"
  );
  const [filteredList, setFilteredList] = useState([
    { id: 1, title: "پیشفرض" },
    { id: 2, title: "محبوب ترین" },
    { id: 3, title: "پر فروش ارین" },
    { id: 4, title: "ارزان ترین" },
    { id: 5, title: "گران ترین" },
  ]);

  const [newValue, setNewValue] = useState(800);
  const [value, setValue] = useState([100, 900]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setNewValue(newValue[1] - newValue[0]);
  };

  const filterProductPrice = () => {};
  return (
    <Box className={classes.productListContainer}>
      <SideBarStyled>
        <AccordionStyled defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <H2ElemSideBar component={"h2"}>فیلتر بر اساس قیمت :</H2ElemSideBar>
          </AccordionSummary>
          <AccordionDetails sx={{ margin: " 0 0.7rem" }}>
            <CustomSlider
              value={value}
              onChange={handleChange}
              min={100}
              max={900}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.7rem",
              }}
            >
              <Typography sx={{ fontSize: "0.9rem" }}>
                {value[1] + ",000" + "  تومان"}
              </Typography>
              <Typography sx={{ fontSize: "0.9rem" }}>
                {value[0] + ",000" + "  تومان"}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "0.6rem",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              {newValue + ",000" + "   تومان"}
            </Box>
            <MyButton widthupmd="100%" onClick={filterProductPrice}>
              صافی
            </MyButton>
          </AccordionDetails>
        </AccordionStyled>
        <AccordionStyled defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <H2ElemSideBar component={"h2"}>جستجو در محصولات :</H2ElemSideBar>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "flex", marginTop: "1rem" }}>
              <TextFieldStyled type="text" placeholder="جستجوی محصول ... " />
              <MyButton>ثبت</MyButton>
            </Box>
          </AccordionDetails>
        </AccordionStyled>
        <AccordionStyled defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <H2ElemSideBar component={"h2"}>
              فیلتر بر اساس دسته بندی :
            </H2ElemSideBar>
          </AccordionSummary>
          <AccordionDetails>
            {setCategoriesIsPenging &&
              categories.map((category) => (
                <Box className={classes.categoryBox}>
                  <Checkbox />
                  <Typography component={"span"}>{category.name}</Typography>
                </Box>
              ))}
          </AccordionDetails>
        </AccordionStyled>
      </SideBarStyled>
      <Stack className={classes.productListBox}>
        <Box className={classes.productListHead}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SortIcon
              sx={{
                fontSize: {
                  md: "2rem",
                  sm: "1.7rem",
                },
                marginLeft: "0.5rem",
                color: "#b5b2b2",
              }}
            />
            <Typography
              component={"h2"}
              sx={{
                fontSize: {
                  lg: "0.9rem",
                  // md: "0.8rem",
                  // sm: "0.8rem",
                  xs: "0.8rem",
                },
                marginLeft: {
                  md: "2rem",
                  sm: "1.7rem",
                },
                fontWeight: "600",
                color: "#4d4d4d",
              }}
            >
              مرتب سازی بر اساس:
            </Typography>
          </Box>

          <List sx={{ display: "flex", padding: "0", flexWrap: "wrap" }}>
            {filteredList.map((listItem) => (
              <Link key={listItem.id}>
                <ListItem disablePadding>
                  <ListItemButtonHeader>
                    <ListItemTextStyled primary={listItem.title} />
                  </ListItemButtonHeader>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
        <Box className={classes.allProductsList}>
          {ispending &&
            allProducts.map((product) => (
              <Product
                key={product.id}
                productImage={product.image}
                productTtile={product.title}
                productPrice={product.price}
                productRate={product.rating.rate}
                ProductId={product.id}
                offer={product.off}
              />
            ))}
        </Box>
      </Stack>
    </Box>
  );
}
