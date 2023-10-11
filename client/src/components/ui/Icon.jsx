"use client";
import {
   ArrowBackIos,
   ArrowCircleRightOutlined,
   ArrowRightAltOutlined,
   FavoriteBorderOutlined,
   RemoveCircleOutline,
   RocketLaunch,
   StarOutlined,
} from "@mui/icons-material";
import React from "react";

export const StarIcon = ({ rating = 1 }) => {
   const stars = Array.from({ length: rating }, (_, index) => (
      <StarOutlined key={index} sx={{ fontSize: "14px", color: "#fdb11a" }} />
   ));
   return <>{stars}</>;
};

export const RightArrow = () => {
   return <ArrowRightAltOutlined />;
};

export const CircleRightArrow = () => {
   return <ArrowCircleRightOutlined />;
};

export const LeftArrow = () => {
   return <ArrowBackIos />;
};

export const Rocket = () => {
   return <RocketLaunch />;
};

export const Heart = ({ size }) => {
   return <FavoriteBorderOutlined fontSize={size} />;
};

export const Remove = ({ className }) => {
   return <RemoveCircleOutline className={className} />;
};
