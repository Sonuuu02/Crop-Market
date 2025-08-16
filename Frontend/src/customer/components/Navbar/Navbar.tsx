import {
  Avatar,
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Navbar.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { mainCategory } from "../../../data/category/mainCategory";
import CategorySheet from "./CategorySheet";
import DrawerList from "./DrawerList";
import { useNavigate, useSearchParams } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { FavoriteBorder } from "@mui/icons-material";


const Navbar = () => {
  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("men");
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const dispatch = useAppDispatch();
  const { user, auth, cart, sellers } = useAppSelector((store) => store);
  const navigate = useNavigate();
  
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const becomeSellerClick = () => {
    if (sellers.profile?.id) {
      navigate("/seller")
    } else navigate("/become-seller")
  }
 
  return (
    <Box
      sx={{ zIndex: 2 }}
      className="sticky top-0 left-0 right-0 bg-white blur-bg bg-opacity-80 "
    >
      <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
        <div className="flex items-center gap-9">
          <div className="flex items-center gap-2">
            {!isLarge && (
              <IconButton onClick={() => toggleDrawer(true)()}>
                <MenuIcon className="text-gray-700" sx={{ fontSize: 29 }} />
              </IconButton>
            )}
            <h1
              onClick={() => navigate("/")}
              className="logo cursor-pointer text-lg md:text-2xl text-[#ff8000]"
            >
              Crop Market
            </h1>
          </div>

          {isLarge && (
            <ul
              className="flex font-medium text-gray-800 it ems-center "
            >
              {mainCategory.map((item) => (
                <li
                  onMouseLeave={() => {
                    // setSelectedCategory("")
                    setShowSheet(false);
                  }}
                  onMouseEnter={() => {
                    setSelectedCategory(item.categoryId);
                    setShowSheet(true);
                  }}
                  className="mainCategory hover:text-[#ff8000] cursor-pointer hover:border-b-2 h-[70px] px-4 border-[#ff8000] flex items-center"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center gap-1 lg:gap-6">
          <IconButton onClick={()=>navigate("/search-products")}>
            <SearchIcon className="text-gray-700" sx={{ fontSize: 29 }} />
          </IconButton>

          {user.user ? (
            <Button
              onClick={() => navigate("/account/orders")}
              className="flex items-center gap-2"
            >
              <Avatar
                sx={{ width: 29, height: 29 }}
                src="data:image/jpeg;base64,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"
              />
              <h1 className="hidden font-semibold lg:block">
                {user.user?.fullName?.split(" ")[0]}
              </h1>
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<AccountCircleIcon sx={{ fontSize: "12px" }} />}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}

          <IconButton onClick={()=>navigate("/wishlist")}>
            <FavoriteBorder sx={{ fontSize: 29 }}
                className="text-gray-700" />
          </IconButton>

          <IconButton onClick={() => navigate("/cart")}>
            <Badge badgeContent={cart.cart?.cartItems.length} color="primary">
              <AddShoppingCartIcon
                sx={{ fontSize: 29 }}
                className="text-gray-700"
              />
            </Badge>
          </IconButton>

          {isLarge && (
            <Button
              onClick={becomeSellerClick}
              startIcon={<StorefrontIcon />}
              variant="outlined"
            >
              Become Seller
            </Button>
          )}
        </div>
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {<DrawerList toggleDrawer={toggleDrawer} />}
      </Drawer>
      {showSheet && selectedCategory && (
        <div
          onMouseLeave={() => setShowSheet(false)}
          onMouseEnter={() => setShowSheet(true)}
          className="categorySheet absolute top-[4.41rem] left-20 right-20 "
        >
          <CategorySheet
            setShowSheet={setShowSheet}
            selectedCategory={selectedCategory}
          />
        </div>
      )}
    </Box>
  );
};

export default Navbar;