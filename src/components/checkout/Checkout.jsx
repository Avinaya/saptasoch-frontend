import React from "react";
import "./Checkout.scss";
import BasketItem from "./../cart/BasketItem";
import {useStateValue} from "./../contexApi/stateProvider/StateProvider";
import { useState } from 'react';
import CheckOutSummary from "./../checkout/CheckoutSumarry";
import SideBar from "react-sidebar";
import DeliveryAddress from "./../deliveryAddress/DeliveryAddress";
import SignUp from "./../signup/SignUp";
import Login from "./../login/Login";
import Cart from "./../cart/Cart";

function Checkout(){
  const viewHeight = window.outerHeight;
  const[{deliveryAddress}]=useStateValue();
    const [{basket},dispatch]=useStateValue();
  const totalQuantity=basket.reduce((totalItem,basket) => totalItem + basket.productQuantity, 0);
  const totalSalePrice=basket.reduce((totalSale,basket) => totalSale + (basket.salePrice*basket.productQuantity) , 0);
  const [sideBarOpen,setSideBarOpen]=useState(false);
  const [totalPrice,setTotalPrice]=useState(0);
  const removeAnItem =(value) =>{
    console.log("productName",value);
    dispatch({
        type:"REMOVE_FROM_BASKET",
        id:value,
        
      }
     
      
      );
}
const updateAnItem=(i,q)=>{
  console.log("id id",i);
  console.log("quantity is",q);
  dispatch({
    type:"UPDATE_FROM_BASKET",
    item:{
      id:i,
      productQuantity:q
    }
    
  }
  );
}
const  onSetSidebarOpen=(open) => {
  setSideBarOpen(open);
}

const sidebarStyles = {
  sidebar: {
    width: 350,
    height:viewHeight,
    background: "white",
   float:"right",
   position: "fixed",
   zIndex:999
   
 
    
  }
};
    return(

   
        <div className="checkout">
            <div className="checkout-tools">
                <div className="checkout-tools-main checkout-tools-main-order">
               <div className="checkout-tools-main-order-details">
                   <div className="checkout-tools-main-order-details-delivery">
                       <span>Delivery/Pickup Options</span>
                   </div>

                   <div className="checkout-tools-main-order-details-set">
                   {deliveryAddress?.length === 0 ||deliveryAddress==null  ? (
                       <div className="checkout-tools-main-order-details-set-location checkout-tools-main-order-details-set-location-info">
                        <div className="checkout-tools-main-order-details-set-location-info-me">
                        <span>Deliver to me</span>

                        <SideBar 
                      sidebar={
                        <div className="sideBar">
                          <div className="sideTop">
                            <span>Address Form</span>
                            <a className="float-right" onClick={() => onSetSidebarOpen(false)}>close</a>
                          </div>
                        
                        <div className="del">
                        <DeliveryAddress/>
                        </div>
                        </div>}
                      open={sideBarOpen}
                      onSetOpen={onSetSidebarOpen}
                      styles={sidebarStyles}
                         >
                           
                           
      
      </SideBar>
                  <a onClick={() => onSetSidebarOpen(true)}>Select Delivery Address</a>
      
                     
                        </div>
                        <div className="checkout-tools-main-order-details-set-location-info-hi">
                            <span>Hi,Yogendra please Click on Add Address to specify a Delivery address</span>
                        </div>
                        <div className="checkout-tools-main-order-details-set-location-info-your">
                            <div className="checkout-tools-main-order-details-set-location-info-your-d">
                            <span>Your items will be delivered within 7 days. Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis non nihil explicabo itaque atque eveniet animi amet cumque quos ut porro culpa architecto, ad autem unde dolore soluta sapiente quisquam.</span>
                            </div>
                        </div>
                       </div>) :(
                          <div className="checkout-tools-main-order-details-set-location checkout-tools-main-order-details-set-location-user">
                          <div className="checkout-tools-main-order-details-set-location-user-me">
                          <span>Deliver to me</span>
                         
                          <SideBar 
                         sidebar={
                          <div className="sideBar">
                            <div className="sideTop">
                              <span>Address Form</span>
                              <a className="checkout-tools-main-order-details-set-location-user-me-a" onClick={() => onSetSidebarOpen(false)}>close</a>
                            </div>
                          
                          <div className="del">
                          <DeliveryAddress/>
                          </div>
                          </div>}
                         open={sideBarOpen}
                         onSetOpen={onSetSidebarOpen}
                         styles={sidebarStyles}
                           >
                             
                             
                         
                         </SideBar>
                         <a className="checkout-tools-main-order-details-set-location-user-me-b" onClick={() => onSetSidebarOpen(true)}>Change Address</a>
                         
                         
                          </div>
                          <div className="checkout-tools-main-order-details-set-location-user-hi">
                              <span>{deliveryAddress.contactPerson}</span>
                          </div>
                          <div className="checkout-tools-main-order-details-set-location-user-hi">
                            
                              <span>{deliveryAddress.street},{deliveryAddress.city},{deliveryAddress.state},{deliveryAddress.district}</span>
                              
                          </div>
                          <div className="checkout-tools-main-order-details-set-location-user-hi">
                              <span>{deliveryAddress.contactNo}</span>
                          </div>
                         </div>
                       )}

                       <div className="checkout-tools-main-order-details-set-location checkout-tools-main-order-details-set-location-pickup">
                        <div className="checkout-tools-main-order-details-set-location-pickup-help">
                            <span>Pickup From a Store</span>
                            <a>Select Pickup Location</a>

                        </div>
                        <div className="checkout-tools-main-order-details-set-location-pickup-select">
                        <span>Select a pickup location from your area with our locations.</span>
                        </div>
                        <div className="checkout-tools-main-order-details-set-location-pickup-from">
                        <div className="checkout-tools-main-order-details-set-location-pickup-from-y">
                        <span>Pickup is nice from our store too.Enjoy,shopping. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod enim et impedit, perferendis expedita inventore corrupti minus nisi quaerat. Ea quibusdam enim cumque beatae quia iusto delectus nobis laboriosam explicabo?</span>
                        </div>
                        </div>

                       </div>
                       
                   
                       </div>
                       <div className="it">  
         <div className="cart-tool-parent-item-itemdetails-main cart-tool-parent-item-itemdetails-main-name">
        <div className="cart-tool-parent-item-itemdetails-main-name-details">
    <span>Item Details</span>
        </div>
        <div className="cart-tool-parent-item-itemdetails-main-name-quantity">
          <span>Quantity</span>
        </div>
        <div className="cart-tool-parent-item-itemdetails-main-name-price">
          <span>Item Price</span>
        </div>
        <div className="cart-tool-parent-item-itemdetails-main-name-action">
          <span className="float-right">Action</span>
        </div>
        </div>
                         <div className="basket">
                       {
          basket.map((item,index) => (
           
            <BasketItem
            key={index}
            id={item.id}
            image={item.productImage}
            productName={item.productName}
            quantity={item.productQuantity}
            salePrice={item.salePrice}
            discountValue={item.discountValue}
            onDelete={removeAnItem}
            update={updateAnItem}
            />
           

          ))
        }


                   </div>
                   </div>
               </div>
             

                </div>
                <div className="checkout-tools-main checkout-tools-main-payment">
                  
                <CheckOutSummary total={totalSalePrice}/>
                </div>

            </div>

        </div>
    );
}

export default Checkout;