import React from "react";
import SeedCategoryCard from "./seedCategoryCard";
import { useMediaQuery } from "@mui/material";
import { useAppSelector } from "../../../../Redux Toolkit/Store";

const seedCategories = [
  {
    section: "SEED_CATEGORIES",
    name: "Wheat Seeds",
    image:
      "https://www.bbassets.com/media/uploads/p/l/40112396_3-bb-royal-seeds-sunflower.jpg",
    categoryId: "wheat_seeds",
  },
  {
    section: "SEED_CATEGORIES",
    name: "Rice Seeds",
    image:
      "https://agrikheti.com/wp-content/uploads/2021/05/rice-seed.jpg",
    categoryId: "rice_seeds",
  },
  {
    section: "SEED_CATEGORIES",
    name: "Maize Seeds",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2021/6/XA/MW/KL/5398224/maize-seed-500x500.jpg",
    categoryId: "maize_seeds",
  },
  {
    section: "SEED_CATEGORIES",
    name: "Vegetable Seeds",
    image:
      "https://m.media-amazon.com/images/I/71CJefT6iLL.jpg",
    categoryId: "vegetable_seeds",
  },
  {
    section: "SEED_CATEGORIES",
    name: "Fruit Seeds",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2021/2/WR/RA/JQ/117126971/fruit-seeds.jpg",
    categoryId: "fruit_seeds",
  },
  {
    section: "SEED_CATEGORIES",
    name: "Flower Seeds",
    image:
      "https://rukminim1.flixcart.com/image/416/416/kdqa4y80/plant-seed/x/8/f/100-flower-seeds-mix-of-flowers-100-original-imafu4zfnsdf4f3h.jpeg?q=70",
    categoryId: "flower_seeds",
  },
  {
    section: "SEED_CATEGORIES",
    name: "Oil Seeds",
    image:
      "https://5.imimg.com/data5/FI/KI/MY-15937412/oil-seeds.jpg",
    categoryId: "oil_seeds",
  },
];

const SeedCategory = () => {
  const { homePage } = useAppSelector((store) => store);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  return (
    <div className="flex flex-wrap justify-between py-5 lg:px-20 border-b">
      {homePage.homePageData?.seedCategories
        .slice(0, isSmallScreen ? 5 : seedCategories.length)
        .map((item, index) => ( <SeedCategoryCard key={index} item={item} />
        ))}
    </div>
  );
};

export default SeedCategory;
