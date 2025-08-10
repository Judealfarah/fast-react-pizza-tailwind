import DeleteItem from "./DeleteItem";
import { formatCurrency } from "../../utils/helpers";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { useSelector } from "react-redux";
import { getCurrentQuantity } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const currentQuantity = useSelector(getCurrentQuantity(pizzaId));

  return (
    <li className="py-3">
      <p className="mb-1">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-end space-x-5">
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />
        <DeleteItem pizzaId={pizzaId}>Delete</DeleteItem>
      </div>
    </li>
  );
}

export default CartItem;
