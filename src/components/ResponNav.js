import { React, useState, useEffect } from 'react'
import { MdMenu } from "react-icons/md";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export default function ResponNav() {

    const [getData, setData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    useEffect(() => {
        const categoryList = async () => {

            try {
                const responce = await axios.get("https://academics.newtonschool.co/api/v1/ecommerce/clothes/categories", {
                    headers: {
                        projectId: "rhxg8aczyt09"
                    }
                });
                // console.log(responce.data.data);
                setData(responce.data.data)
            }
            catch (err) {
                console.log("Error shows ", err);
            }
        }
        categoryList();
        localStorage.setItem("GENDER", "Men");
    }, []);

    const onCLickHandler = () => {

    }


    return (
        <div>
            <div>
                <Button
                    id="demo-positioned-button"
                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <MdMenu />
                </Button>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    {getData.map((item, index) => (
                        <MenuItem key={index} onClick={handleClose}>
                            {item} data
                        </MenuItem>
                    ))}
                    {
                        getData.map((item, index) => {
                            return <div onClick={() => { nevigateToProductCategory(item), setCategoryToggle(!categoryToggle), searchMethod(""), handleClose }} key={index} className="categoryParent">
                                {item}
                                <div className="categoryUnderline" />
                            </div>
                        })
                    }
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>

                </Menu>
            </div>
        </div>
    )
}
