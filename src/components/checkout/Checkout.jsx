import React from "react";
import "./Checkout.scss";
import BasketItem from "./../cart/BasketItem";
import { useStateValue } from "./../contexApi/stateProvider/StateProvider";
import { useState ,useEffect } from "react";
import CheckOutSummary from "./../checkout/CheckoutSumarry";
import SideBar from "react-sidebar";
import DeliveryAddress from "./../deliveryAddress/DeliveryAddress";
import { Link, Redirect } from "react-router-dom";
import {getCartByUserId} from "../../service/cartService/CartService";
import {deleteCartByCartId} from "../../service/cartService/CartService";
import { useLocation ,useHistory} from "react-router-dom";


function Checkout(props) {
  const viewHeight = window.outerHeight;
  const productArray=[];
  const history=useHistory();
  
  const [{ deliveryAddress }] = useStateValue();
  const c=localStorage.getItem("delivery");
  const [{ basket }, dispatch] = useStateValue();
  const user=JSON.parse( localStorage.getItem("user"));
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [cart,setCart]=useState([]);
  const [userTotalQuantity,setUserTotalQuantity]=useState();
  const [userTotalSalePrice,setUserTotalSalePrice]=useState();
  const location =useLocation();

  const totalSalePrice = basket.reduce(
    (totalSale, basket) =>
      totalSale + basket.salePrice * basket.productQuantity,
    0
  );

  const removeAnItem = (value) => {
    console.log("productName", value);
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: value,
    });
  };
  useEffect(() => {
    console.log("delivery",c);
    console.log("user",user);
    if(user!=null){
      
    getCartByUserId(user.id).then(response=>{
      setCart(response.data);
      const data1=response.data;
      setUserTotalQuantity(data1.reduce((totalItem1,data1) => totalItem1 + data1.quantity, 0));
      setUserTotalSalePrice(data1.reduce((totalSale1,data1) => totalSale1 + (data1.price) , 0));
      console.log("sab data",response.data);
      });
    // if(location.state!=undefined){
    //   setCart(location.state.cart);
    //   const data1=location.state.cart;
    //   setUserTotalQuantity(data1.reduce((totalItem1,data1) => totalItem1 + data1.quantity, 0));
    //   setUserTotalSalePrice(data1.reduce((totalSale1,data1) => totalSale1 + (data1.price) , 0));
    //   console.log("sab location",location);
    // }
    // else{
    //   history.push('/cart');
     
    // }
   
    
      
    }
    else{
      setCart(null);
    }
    
  }, [removeAnItem,location.state]);

  

  // const mediaQueryChanged= (value) =>{
  //   setSideBarDocked(mql.matches);
  //   setSideBarOpen(false);
  // }

  const updateAnItem = (i, q) => {
    console.log("id id", i);
    console.log("quantity is", q);
    dispatch({
      type: "UPDATE_FROM_BASKET",
      item: {
        id: i,
        productQuantity: q,
      },
    });
  };
  const onSetSidebarOpen = (open) => {
    setSideBarOpen(open);
  };

  const sidebarStyles = {
    sidebar: {
      width: 295,
      height: viewHeight,
      background: "white",
      float: "right",
      position: "fixed",
      zIndex: 999,
    },
  };
  async function deleteCart(c){
    return await deleteCartByCartId(c);
  }
  
  const incrementQuantity = (i) => {
    setUserTotalQuantity(userTotalQuantity+1);
    setUserTotalSalePrice(userTotalSalePrice+i);
  }
  const decrementQuantity= (d) => {
    setUserTotalQuantity(userTotalQuantity-1);
    setUserTotalSalePrice(userTotalSalePrice-d);
  }
  const AddToSavedForLater=(i,r,p,it)=>{
   
    dispatch({
      type:"ADD_TO_SAVE",
      item:{
        id:i,
        productImage:r,
        productName:p,
        itemPrice:it
      }
      
    }
    );
  }
  return (
    <div>
      <div className="title">
        <Link className="link" to="/">
          <span className="title-log">Sapta</span>
          <span className="title-log-1">Bazar</span>
        </Link>
        <div>
          <span className="title-check">Checkout</span>
        </div>
      </div>

      <div className="checkout">
        <div className="checkout-tools">
          <div className="checkout-tools-main checkout-tools-main-order">
            <div className="checkout-tools-main-order-details">
              <div className="checkout-tools-main-order-details-delivery">
                <span>Delivery/Pickup Options</span>
              </div>

              <div className="checkout-tools-main-order-details-set">
                {deliveryAddress?.length === 0 || deliveryAddress == null ? (
                  <div className="checkout-tools-main-order-details-set-location checkout-tools-main-order-details-set-location-info">
                    <div className="checkout-tools-main-order-details-set-location-info-me">
                      <span>Deliver to me</span>

                      <SideBar
                        className="hey"
                        sidebar={
                          <div className="sideBar">
                            <div className="sideTop">
                              <span>Address Form</span>
                              <button
                                className="ram"
                                onClick={() => onSetSidebarOpen(false)}
                              >
                                close
                              </button>
                            </div>

                            <div className="del">
                              <DeliveryAddress data={onSetSidebarOpen} />
                            </div>
                          </div>
                        }
                        open={sideBarOpen}
                        // docked={sideBarDocked}
                        // matchMedia={mediaQueryChanged}
                        onSetOpen={onSetSidebarOpen}
                        styles={sidebarStyles}
                      ></SideBar>
                      <span
                        className="checkout-tools-main-order-details-set-location-info-me-c"
                        onClick={() => onSetSidebarOpen(true)}
                      >
                        Select Delivery Address
                      </span>
                    </div>
                    <div className="checkout-tools-main-order-details-set-location-info-hi">
                      <span>
                        Hi,Yogendra please Click on Add Address to specify a
                        Delivery address
                      </span>
                    </div>
                    <div className="checkout-tools-main-order-details-set-location-info-your">
                      <div className="checkout-tools-main-order-details-set-location-info-your-d">
                        <span>
                          Your items will be delivered within 7 days. Lorem
                          ipsum dolor sit amet consectetur adipisicing elit.
                          Blanditiis non nihil explicabo itaque atque eveniet
                          animi amet cumque quos ut porro culpa architecto, ad
                          autem unde dolore soluta sapiente quisquam.
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="checkout-tools-main-order-details-set-location checkout-tools-main-order-details-set-location-user">
                    <div className="checkout-tools-main-order-details-set-location-user-me">
                      <span>Deliver to me</span>

                      <SideBar
                        sidebar={
                          <div className="sideBar">
                            <div className="sideTop">
                              <span>Address Form</span>
                              <button
                                className="ram"
                                onClick={() => onSetSidebarOpen(false)}
                              >
                                close
                              </button>
                            </div>

                            <div className="del">
                              <DeliveryAddress data={onSetSidebarOpen} />
                            </div>
                          </div>
                        }
                        open={sideBarOpen}
                        // docked={sideBarDocked}
                        onSetOpen={onSetSidebarOpen}
                        styles={sidebarStyles}
                      ></SideBar>
                      <span
                        className="checkout-tools-main-order-details-set-location-user-me-b"
                        onClick={() => onSetSidebarOpen(true)}
                      >
                        Change Address
                      </span>
                    </div>
                    <div className="checkout-tools-main-order-details-set-location-user-hi">
                      <span>{deliveryAddress.contactPerson}</span>
                    </div>
                    <div className="checkout-tools-main-order-details-set-location-user-hi">
                      <span>
                        {deliveryAddress.street},{deliveryAddress.city},
                        {deliveryAddress.state},{deliveryAddress.district}
                      </span>
                    </div>
                    <div className="checkout-tools-main-order-details-set-location-user-hi">
                      <span>{deliveryAddress.contactNo}</span>
                    </div>
                  </div>
                )}

                <div className="checkout-tools-main-order-details-set-location checkout-tools-main-order-details-set-location-pickup">
                  <div className="checkout-tools-main-order-details-set-location-pickup-help">
                    <span>Pickup From a Store</span>
                    <span className="checkout-tools-main-order-details-set-location-pickup-help-d">
                      Select Pickup Location
                    </span>
                  </div>
                  <div className="checkout-tools-main-order-details-set-location-pickup-select">
                    <span>
                      Select a pickup location from your area with our
                      locations.
                    </span>
                  </div>
                  <div className="checkout-tools-main-order-details-set-location-pickup-from">
                    <div className="checkout-tools-main-order-details-set-location-pickup-from-y">
                      <span>
                        Pickup is nice from our store too.Enjoy,shopping. Lorem
                        ipsum dolor, sit amet consectetur adipisicing elit. Quod
                        enim et impedit, perferendis expedita inventore corrupti
                        minus nisi quaerat. Ea quibusdam enim cumque beatae quia
                        iusto delectus nobis laboriosam explicabo?
                      </span>
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
         user!= null ? (
          cart.map((item,index) => (
           productArray.push({
             productId:item.productId,
             totalQuantity:item.quantity
           }),
             
            <BasketItem
            
              
            
            key={index}
            id={item.productId}
            cartId={item.cartId}
            image={item.thumbnail}
            productName={item.productName}
            quantity={item.quantity}
            salePrice={item.price/item.quantity}
            
            onDelete={deleteCart}
            increment={incrementQuantity}
            // price={updatePrice}
            decrement={decrementQuantity}
            addToSave={AddToSavedForLater}
            />
           

          ))
         )  : (
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
            addToSave={AddToSavedForLater}
            />
           

          ))
         )
            
          
        }
                  
                </div>
              </div>
            </div>
          </div>
          <div className="checkout-tools-main checkout-tools-main-payment">
            {
              cart!=null ? (
                <CheckOutSummary total={userTotalSalePrice} pro={productArray} />
              ) : (
                <CheckOutSummary total={totalSalePrice} />
              )
            }
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
