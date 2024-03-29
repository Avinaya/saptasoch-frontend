import React, { useEffect, useContext } from "react";
import Home from "./pages/home/Home";
import { Switch, Route } from "react-router-dom";
import ProductDetail from "./pages/productDetail/ProductDetail";
import Navbar from "./components/Navbar/Navbar";
import Mobheader from "./components/mob-header/Mobheader";
import Cart from "./components/cart/Cart";
import Footer from "./components/footer/Footer";
import Checkout from "./components/checkout/Checkout";
import DeliveryAddress from "./components/deliveryAddress/DeliveryAddress";
import Login from "./components/login/Login";
import Signup from "./components/signup/SignUp";
import OtpVerify from "./components/signup/OtpVerify";
import ProductTagAll from "./pages/productTagAll/ProductTagAll";
import ProductCategory from "./pages/productCategories/ProductCategory";
import Categories from "./components/category/Categories";
import SideBarMob from "./components/sideBar/sideBarMob/SideBarMob";
import AddReview from "./components/addReview/AddReview";
import BaseDataContex from "./components/contexApi/baseApiCall/BaseApiCall";
import LoadingComponent from "./components/loadingComponent/LoadingComponent";
import StoreDetail from './pages/store/StoreDetail';
import SellOptions from './components/sell/SellOptions';
import Sell from './components/sell/Sell';
import MallSeller from './components/mallSeller/MallSeller';
import OtpSeller from './components/mallSeller/OtpSeller';
import LoginSeller from './components/mallSeller/LoginSeller';
import SkeletonCard from './components/skeleton/SkeletonCard';

import Khalti from './components/Khalti';
function App() {
  const AuthenticatedRoute = () => {
    const value = useContext(BaseDataContex);
    if (value.category === null) {
      return (
        <React.Fragment>
          <SideBarMob />
          <Navbar />
          <Mobheader />
          <SkeletonCard />;
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <SideBarMob />
          <Navbar />
          <Mobheader />
          <Categories />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Product/:productId" component={ProductDetail} />
            <Route exact path="/product-tag/:title" component={ProductTagAll} />
            <Route
              exact
              path="/category/:categoriesName"
              component={ProductCategory}
            />
            <Route exact path="/sell" component={Sell} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/add-review" component={AddReview} />
            <Route exact path="/delivery" component={DeliveryAddress} />
            <Route exact path="/store/:storeId" component={StoreDetail} />
            <Route exact path="*" component={Home} />
          </Switch>
          <Footer />
        </React.Fragment>
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Switch>
    <Route exact path="/mall" component={MallSeller}/>
      <Route exact path="/sell-options" component={SellOptions}/>
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/verify" component={OtpVerify} />
      <Route exact path="/otp-seller" component={OtpSeller}/>
      <Route exact path="/login-seller" component={LoginSeller}/>
      <Route exact path="/khalti" component={Khalti}/>
      <Route component={AuthenticatedRoute} />
     
    </Switch>
  );
}

export default App;
