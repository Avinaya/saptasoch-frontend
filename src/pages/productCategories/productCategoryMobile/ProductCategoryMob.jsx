import React, { useState } from "react";
import "./ProductCategoryMob.scss";
import SideBar from "react-sidebar";
import ProductCategoryMobFilter from './ProductCategoryMobFilter';


function ProductCategoryMob() {
  const viewHeight = window.outerHeight;
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const onSetSidebarOpen = (open) => {
    setSideBarOpen(open);
  };

  const sidebarStyles = {
    sidebar: {
      width: "100%",
      height: viewHeight,
      background: "white",
      float: "right",
      position: "fixed",
      zIndex: 9999,
    },
  };
  return (
    <React.Fragment>
      <div className="productCategory-mob">
        <SideBar
          className="filterSideBar"
          sidebar={
            <div className="sideBar">
              <div className="filterSideBar-top">
                <span>Filter</span>
                <button className="ram" onClick={() => onSetSidebarOpen(false)}>
                  close
                </button>
              </div>

              <div className="filterSideBar-body">
                <ProductCategoryMobFilter/>
              </div>
            </div>
          }
          open={sideBarOpen}
          // docked={sideBarDocked}
          // matchMedia={mediaQueryChanged}
          onSetOpen={onSetSidebarOpen}
          styles={sidebarStyles}
        />
        <div className="productCategory-mob-item">
          <span onClick={() => onSetSidebarOpen(true)}>Filter</span>
        </div>
        <div className="productCategory-mob-item">|</div>
        <div className="productCategory-mob-item">Sort</div>
      </div>
    </React.Fragment>
  );
}

export default ProductCategoryMob;
