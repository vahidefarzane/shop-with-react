import React, { Suspense, useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import HomeProductBox from "../HomeProductBox/HomeProductBox";
import HomeTitleComponent from "../HomeTitleComponent/HomeTitleComponent";
import Loading from "../Loading/Loading";
import { httpService } from "../../hooks/useAxios";

import "./BestSeller.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function BestSeller() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const fetchData = async () => {
    const response = await httpService.get(
      "/products?numbersale_gte=200&numbersale_lte=700"
    );
    setData(response.status === 200 ? response.data : []);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Stack
      sx={(theme) => ({
        margin: "2rem 0",
        backgroundColor: "#212121",
        padding: "0 1rem",
        display: "flex",
        justifyContent: "space-between",
        [theme.breakpoints.down("md")]: {
          padding: "1rem",
        },
        [theme.breakpoints.down("sm")]: {
          padding: "0.6rem 1rem",
        },
        [theme.breakpoints.down("xs")]: {
          padding: "0.7rem 3rem",
        },
      })}
    >
      <HomeTitleComponent title="پرفروش ترین محصولات" color="#fff" />
      <Box className="swiper-best-seller-product-wraper">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fb4707",
            "--swiper-pagination-color": "#fb4707",
            padding: "0 0 3rem 0",
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            500: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            600: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            700: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <Suspense fallback={<Loading />}>
            {data.map((product) => (
              <SwiperSlide key={product.id}>
                <HomeProductBox
                  productId={product.id}
                  productImage={product.image}
                  productTitle={product.title}
                  productPrice={product.price}
                  offer={product.off}
                  isSlider={true}
                />
              </SwiperSlide>
            ))}
          </Suspense>
        </Swiper>
      </Box>
    </Stack>
  );
}
