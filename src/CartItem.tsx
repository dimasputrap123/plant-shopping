import "./CartItem.css";
import { removeItem, updateQuantity, type CartItem } from "./cartSlice";
import { useAppDispatch, useAppSelector } from "./store";

const CartItem = (props: { onContinueShopping: () => void }) => {
  const cart = useAppSelector((state) => state.cart.listCart);
  const dispatch = useAppDispatch();
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.cost * item.quantity;
    });
    return total;
  };
  const handleDecrement = (item: CartItem) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.name));
    } else {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    }
  };
  const handleIncrement = (item: CartItem) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };
  const calculateTotalCost = (item: CartItem) => {
    return item.cost * item.quantity;
  };
  const handleRemove = (item: CartItem) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={props.onContinueShopping}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={() => {
            alert("Coming Soon");
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
