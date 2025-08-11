import { useState } from "react";

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const {
    status,
    address,
    position,
    username,
    error: addressError,
  } = useSelector((state) => state.user);
  const isLoadingAddress = status === "loading";
  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrice);
  const priorityPrice = withPriority ? totalPrice * 0.2 : 0;
  const totalCartPrice = totalPrice + priorityPrice;
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div>
      <h2 className="font-bold text-xl">Ready to order? Lets go!</h2>

      <Form
        method="POST"
        action="/order/new"
        className="py-3 mb-5 flex flex-col gap-4 items-start justify-start"
      >
        <div className="flex items-center gap-4">
          <label className="font-semibold w-32">First Name</label>
          <input
            className="input w-96"
            type="text"
            defaultValue={username}
            name="customer"
            required
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="font-semibold w-32">Phone number</label>
          <input className="input w-96" type="tel" name="phone" required />
          {formErrors?.phone && (
            <p className="text-red-500 text-sm">{formErrors.phone}</p>
          )}
        </div>

        <div className="relative mb-5 flex gap-2">
          <label className="font-semibold w-32">Address</label>
          <div className="grow">
            <input
              className="input w-96"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {!position.latitude && !position.longitude && (
              <span className="absolute right-0">
                <button
                  className="inline-block tracking-wide px-3 py-1.5 bg-sky-300 hover:text-slate-200 rounded-full uppercase hover:bg-sky-500 transition-colors"
                  disabled={isLoadingAddress}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  Get address
                </button>
              </span>
            )}

            {addressError && (
              <p className="text-red-500 bg-red-100 rounded-md text-sm">
                {addressError}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            onChange={() => setWithPriority(!withPriority)}
            className="h-6 w-6 accent-sky-500"
          />
          <label htmlFor="priority">Want to give your order priority?</label>
        </div>

        <input type="hidden" name="cart" value={JSON.stringify(cart)} />

        <Button disabled={isSubmitting}>
          {isSubmitting
            ? "Creating order"
            : `Order now ${formatCurrency(totalCartPrice)}`}
        </Button>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const errors = {};
  if (!isValidPhone(order.phone)) errors.phone = "Invalid phone number";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
