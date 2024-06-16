import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import "../styles/Nav.css";
import axios from "axios";
import { useUser } from "../providers/UserProvider";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegHeart, FaRegUser, FaSearch } from "react-icons/fa";
import { capitalize } from "@mui/material";
import { FaBold } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const {
    whishListItem,
    getToken,
    getName,
    setNewToken,
    token,
    TokenHandler,
    NameHandler,
    categoryToggle,
    setCategoryToggle,
    searchItem,
    setSearchItem,
    wishListCount,
    cartItemCount,
    setCartItemCount,
    cartitem,
    isScreenSmall,
    setIsScreenSmall,
  } = useUser();

  const [isHovered, setIsHovered] = useState(false);
  const [togglesearch, settogglesearch] = useState(false);
  const [loginFirst, setLoginFirst] = useState(false);
  const [toggelNav, setToggleNav] = useState(false);

  const navigate = useNavigate();

  const toggeleNavBar = () => {
    setToggleNav(!toggelNav);

    console.log("clicked");
  };

  const nevigateToProductCategory = (value) => {
    navigate(`/ProductList?category=${value}`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const logOutHandler = () => {
    TokenHandler(null);
    NameHandler(null);
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("wishList");
    localStorage.removeItem("cartItem");
    localStorage.removeItem("addData");
    setNewToken("");
    console.log("clicked logout");
  };

  const [getData, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const handleItemClick = (index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    const categoryList = async () => {
      try {
        const responce = await axios.get(
          "https://academics.newtonschool.co/api/v1/ecommerce/clothes/categories",
          {
            headers: {
              projectId: "rhxg8aczyt09",
            },
          }
        );
        console.log(responce.data.data);
        setData(responce.data.data);
      } catch (err) {
        console.log("Error shows ", err);
      }
    };
    categoryList();
    // localStorage.setItem("GENDER", "Men");
  }, []);

  const searchMethod = async (searchValue) => {
    setSearchItem(searchValue);
    if (
      searchValue !== "" &&
      searchValue !== null &&
      searchItem !== undefined
    ) {
      navigate(`/ProductList?category=${searchValue}`);
    }
  };

  return (
    <AppBar position="static" sx={{ background: "white" }}>
      <Container maxWidth="xl">
        <ToastContainer position="top-center" />
        <Toolbar disableGutters sx={{ background: "white" }}>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsi
                        ve-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <div className="logoNav">
              <img
                className="nav-img-logo"
                src="https://www.thesouledstore.com/static/img/300x157-twitter.png"
                onClick={() => navigate("/")}
              />
            </div>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="red"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <NavLink to="/Men">
                  <Typography
                    onClick={() => localStorage.setItem("GENDER", "Men")}
                    textAlign="center"
                  >
                    Men
                  </Typography>
                </NavLink>
                <NavLink to="/Women">
                  <Typography
                    sx={{ marginLeft: "0.5rem" }}
                    onClick={() => localStorage.setItem("GENDER", "Women")}
                    textAlign="center"
                  >
                    Women
                  </Typography>
                </NavLink>
              </MenuItem>

              {getData.map((item, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography
                    onClick={() => {
                      nevigateToProductCategory(item),
                        setCategoryToggle(!categoryToggle),
                        searchMethod(""),
                        handleCloseNavMenu();
                    }}
                    textAlign="center"
                  >
                    {item}
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem>
                {!localStorage.getItem("token") && (
                  <>
                    <Typography
                      sx={{ color: "blue" }}
                      onClick={() => navigate("/Login")}
                    >
                      Login
                    </Typography>
                  </>
                )}
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                {localStorage.getItem("token") && (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography onClick={() => logOutHandler()}>
                        Logout
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography onClick={() => navigate("/TrackOrder")}>
                        TrackOrder
                      </Typography>
                    </MenuItem>
                  </div>
                )}
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <div className="logoNav">
              <img
                className="nav-img-logo"
                src="https://www.thesouledstore.com/static/img/300x157-twitter.png"
                onClick={() => navigate("/")}
              />
            </div>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {getData.map((item, index) => (
              <Button
                key={index}
                className={`categoryParent ${
                  selectedIndex === index ? "selected" : ""
                }`}
                onClick={() => {
                  nevigateToProductCategory(item),
                    setCategoryToggle(!categoryToggle),
                    searchMethod(""),
                    handleCloseNavMenu(),
                    handleItemClick(index);
                }}
                sx={{ color: "black", display: "block" }}
              >
                {item}
                {selectedIndex === index && (
                  <div className="categoryUnderline" />
                )}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isScreenSmall && (
              <Typography
                className="d-flex"
                href="#app-bar-with-responsi
                        ve-menu"
              >
                {/* <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {
                                    localStorage.getItem("token") ? <span><FaRegUser /> {localStorage.getItem("name")}</span> : <FaRegUser />
                                }
                            </IconButton> */}
                <div className="navbar">
                  {/* setSearchItem(e.target.value) */}
                  {
                    <input
                      type="text"
                      value={searchItem}
                      onChange={(e) => searchMethod(e.target.value)}
                      placeholder="Search..."
                      className="search-bar"
                    />
                  }
                  <div style={{ color: "red" }} className="search-icon">
                    <FaSearch />
                  </div>
                </div>
                <div
                  onClick={() => {
                    localStorage.getItem("token")
                      ? navigate("/WhishList")
                      : setLoginFirst(!loginFirst);
                  }}
                  className="categoryParent"
                >
                  <span style={{ color: "black" }}>
                    <FaRegHeart />
                  </span>
                  {localStorage.getItem("token") && (
                    <sup style={{ color: "black" }}>
                      {whishListItem ? whishListItem.length : 0}
                    </sup>
                  )}
                  {loginFirst && (
                    <div >
                      {/* <p>Please Login First!</p>{" "} */}
                     { toast.warn("Please Login First")}
                      {/* <MdCancel onClick={() => setLoginFirst(false)} /> */}
                    </div>
                  )}
                             
                </div>

                <div
                  onClick={() => {
                    localStorage.getItem("token")
                      ? navigate("/ProductCart")
                      : setLoginFirst(!loginFirst);
                  }}
                  className="categoryParent"
                >
                  <span style={{ color: "black" }}>
                    <HiOutlineShoppingBag />
                  </span>
                  {localStorage.getItem("token") && (
                    <sup style={{ color: "black" }}>{cartitem.length}</sup>
                  )}
                </div>
              </Typography>
            )}

            {/* <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {getData.map((setting,index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
                            <MenuItem onClick={handleCloseUserMenu}>
                                {
                                    localStorage.getItem('token') && <div style={{ display: "flex", flexDirection: "column" }}><MenuItem onClick={handleCloseUserMenu}>
                                        <Typography onClick={() => logOutHandler}>
                                            Logout
                                        </Typography>
                                    </MenuItem>
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography onClick={() => navigate('/TrackOrder')}>
                                                TrackOrder
                                            </Typography>
                                        </MenuItem>
                                    </div>
                                }
                            </MenuItem>
                            <MenuItem>
                                {
                                    !localStorage.getItem('token') && <>
                                        <Typography onClick={() => navigate('/Login')}>Login</Typography>
                                    </>
                                }
                            </MenuItem>
                        </Menu> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
