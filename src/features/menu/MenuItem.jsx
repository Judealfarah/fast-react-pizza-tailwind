import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  getCurrentQuantity,
  getTotalQuantity,
} from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantity(id));
  const isInCart = currentQuantity > 0;

  console.log(currentQuantity);
  function handleAddToCart() {
    const newPizza = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice: unitPrice,
      totalPrice: unitPrice,
    };

    dispatch(addItem(newPizza));
  }

  return (
    <li className="flex gap-4 pb-3 pr-3">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col">
        <p className="text-lg text-sky-600">{name}</p>
        <p className="italic capitalize text-sm">{ingredients.join(", ")}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="uppercase text-sm font-medium text-sky-800">
              Sold out
            </p>
          )}

          {isInCart && (
            <div className="flex gap-4 items-center">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id}></DeleteItem>
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button onClick={handleAddToCart}>Add to cart</Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
