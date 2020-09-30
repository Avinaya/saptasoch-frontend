import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

function ProductCatProductsPage(props) {
  const history = useHistory();

  let pageNo = queryString.parse(history.location.search).page;

  const [currentPage, setCurrentPage] = useState(1);

  function page() {
    const pageNo = [];
    for (let i = 1; i <= props.data.totalPages; i++) {
      pageNo.push(i);
    }
    return pageNo;
  }

  const handleClick = (val) => (event) => {
    event.preventDefault();
    let currentUrlParams = new URLSearchParams(history.location.search);
    currentUrlParams.set("page", val);
    history.push(history.location.pathname + "?" + currentUrlParams.toString());

    setCurrentPage(val);
  };

  return (
    <div className="productCatProductsPage"
    style={props.data.totalPages===1?{display:"none"}:{}}
    >
      {console.log("currentPage", currentPage)}
      <div aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item enable">
            <span
              class="page-link productCatProductsPage-link productCatProductsPage-button "
              tabindex="-1"
              style={
                currentPage === 1
                  ? {
                      pointerEvents: "none",
                      color: "#b5b5b5",
                      backgroundColor: "white",
                    }
                  : {}
              }
            >
              Previous
            </span>
          </li>

          {console.log("pageNo", pageNo)}

          {page().map((val, index) => {
            return (
              <li key={index} class="page-item">
                <span
                  class="page-link"
                  onClick={handleClick(val)}
                  style={
                    parseInt(pageNo) === parseInt(val)
                      ? { backgroundColor: "#016fed", color: "white" }
                      : {}
                  }
                >
                  {val}
                </span>
              </li>
            );
          })}

          <li class="page-item">
            <span
              class="page-link productCatProductsPage-link productCatProductsPage-button "
              style={
                props.data.totalPages === currentPage
                  ? {
                      pointerEvents: "none",
                      color: "#b5b5b5",
                      backgroundColor: "white",
                    }
                  : {}
              }
            >
              Next
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProductCatProductsPage;
