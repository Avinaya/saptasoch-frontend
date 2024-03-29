import React,{ useState ,useEffect} from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import Search from "./search/Search";
import { useStateValue } from "./../contexApi/stateProvider/StateProvider";
import AuthService from ".././../service/auth.service";
import {getCartByUserId} from "../../service/cartService/CartService";
import { useHistory } from 'react-router-dom';
import LocationPopup from "../locationPopUp/LocationPopup";

const Navbar = () => {
  const history = useHistory();
  const [{basket}]=useStateValue();
  const [user]=useState(JSON.parse(localStorage.getItem("user")));
  const [cart,setCart]=useState([]);
  

  const logOut= () => {
    AuthService.logout();
    window.location.reload();
   
  }
  useEffect(() => {
    if(user!=null){
      getCartByUserId(user.id).then(response => {
        setCart(response.data);
      });
    }else{
      setCart(null);
    }
  },[setCart]);
  return (
    <nav className="navBar">
      <div className="navBar-tools">
        <div className="navBar-tools-item navBar-tools-item-logo">
          <Link to="/" className="link">
            <img src={require("../../image/Saptabazzarlogo.png")} alt="saptabazar"></img>
          </Link>
        </div>
        <div className="navBar-tools-item navBar-tools-item-store">
          <LocationPopup/>
        </div>
        <div className="navBar-tools-item navBar-tools-item-help">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle navBar-tools-item-help-btn"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Help
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="/">
                FAQs
              </a>
              <a className="dropdown-item" href="/">
                Contact Us
              </a>
            </div>
          </div>
        </div>
        <div className="navBar-tools-item navBar-tools-item-search">
          <Search />
        </div>
        <div className="navBar-tools-item navBar-tools-item-sell">
          <Link to="/sell" className="link">
            Sells On <br></br>SaptaBazar
          </Link>
        </div>
        {user == null ? (
          <div>
            <div className="navBar-tools-item navBar-tools-item-login">
              <Link to="/login" className="link">
                Login/ <br></br>Signup
              </Link>
            </div>
          </div>
        ) : (
          <div className="navBar-tools-item navBar-tools-item-login">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle navBar-tools-item-help-btn"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Hey,{(user.username)}
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <span className="dropdown-item" onClick={logOut} style={{cursor:"pointer"}}>
                  LogOut
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="navBar-tools-item navBar-tools-item-cart">
        <Link to="/cart" className="link">
          <i className="fa fa-shopping-cart mr-1"></i>
         
          <span className="mr-1 navBar-tools-item-cart-text">My Cart</span>
          <span className="navBar-tools-item-item">{
            user!=null ? (
              <span>{cart.length}</span>
            ) : (
              <span>{basket.length}</span>
            )
          }</span>
          </Link>
        </div>

        <div className="navBar-tools-item-sell_cart-mob">
          <div className="navBar-tools-item-sell_cart-mob-sell mr-3">
            <Link to="/" className="link">
              <i className="fas fa-store-alt"></i>
            </Link>
          </div>
          <div className="navBar-tools-item-sell_cart-mob-cart">
            <Link to="/" className="link">
              <i className="fa fa-shopping-cart mr-1"></i>
            </Link>
          </div>
        </div>
      </div>
      <div className="nav-searchBar-mob">
        <Search />
      </div>
    </nav>
  );
}

export default Navbar
