import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./store";
import type { ProductItem } from "./productSlice";
import "./ProductList.css";
import { addItem } from "./cartSlice";
import CartItem from "./CartItem";

const ProductList = (props: { handleHomeClick: () => void }) => {
  const productList = useAppSelector((state) => state.product.listProduct);
  const cartList = useAppSelector((state) => state.cart.listCart);
  const [showCart, setShowCart] = useState(false);
  const dispatch = useAppDispatch();
  const productCategory = productList.map((e) => e.category);

  const styleObj = {
    backgroundColor: "#4CAF50",
    color: "#fff!important",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignIems: "center",
    fontSize: "20px",
  };
  const styleObjUl = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "1100px",
  };
  const styleA = {
    color: "white",
    fontSize: "30px",
    textDecoration: "none",
  };

  const handlePlantsClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleCartClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handleAddToCart = (plant: ProductItem) => {
    dispatch(
      addItem({
        name: plant.name,
        cost: plant.cost,
        description: plant.description,
        image: plant.image,
        price: plant.cost,
        quantity: 1,
      })
    );
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  return (
    <div>
      <div className="navbar" style={styleObj}>
        <div className="tag">
          <div className="luxury">
            <img
              src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
              alt=""
            />
            <a href="/" onClick={() => props.handleHomeClick()}>
              <div>
                <h3 style={{ color: "white" }}>Paradise Nursery</h3>
                <i style={{ color: "white" }}>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>
        <div style={styleObjUl}>
          <div>
            {" "}
            <a href="#" onClick={(e) => handlePlantsClick(e)} style={styleA}>
              Plants
            </a>
          </div>
          <div>
            {" "}
            <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
              <h1 className="cart cart_quantity_count">{cartList.length}</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                id="IconChangeColor"
                height="68"
                width="68"
              >
                <rect width="156" height="156" fill="none"></rect>
                <circle cx="80" cy="216" r="12"></circle>
                <circle cx="184" cy="216" r="12"></circle>
                <path
                  d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                  fill="none"
                  stroke="#faf9f9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  id="mainIconPathAttribute"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      {!showCart ? (
        <div className="product-grid">
          {productCategory.map((category, index) => (
            <div key={index}>
              <h1 className="product-category">{category}</h1>
              <div className="product-list">
                {productList.map((plant, plantIndex) => {
                  const isAdded = cartList.find((e) => e.name === plant.name);
                  return plant.category === category ? (
                    <div className="product-card" key={plantIndex}>
                      <div className="product-title">
                        <p>{plant.name}</p>
                      </div>
                      <img
                        className="product-image"
                        src={plant.image}
                        alt={plant.name}
                      />
                      <div className="product-description">
                        <p>{plant.description}</p>
                      </div>
                      <div className="product-price">
                        <p>${plant.cost}</p>
                      </div>
                      <button
                        disabled={isAdded ? true : false}
                        className={`product-button ${
                          isAdded ? "added-to-cart" : ""
                        }`}
                        onClick={() => handleAddToCart(plant)}
                      >
                        {isAdded ? "Added to Cart" : "Add to Cart"}
                      </button>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
};

export default ProductList;
