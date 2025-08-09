// import { useState } from "react";

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();

  const cart = fakeCart;
  return (
    <div>
      <h2 className="font-bold text-xl">Ready to order? Lets go!</h2>

      <Form
        method="POST"
        action="/order/new"
        className="py-3 mb-5 flex flex-col gap-4 items-start justify-center"
      >
        <div className="flex items-center gap-4">
          <label className="font-semibold w-32">First Name</label>
          <input className="input w-64" type="text" name="customer" required />
        </div>

        <div className="flex items-center gap-4">
          <label className="font-semibold w-32">Phone number</label>
          <input className="input w-64" type="tel" name="phone" required />
          {formErrors?.phone && (
            <p className="text-red-500 text-sm">{formErrors.phone}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <label className="font-semibold w-32">Address</label>
          <input className="input w-64" type="text" name="address" required />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-sky-500"
          />
          <label htmlFor="priority">Want to give your order priority?</label>
        </div>

        <input type="hidden" name="cart" value={JSON.stringify(cart)} />

        <Button disabled={isSubmitting}>
          {isSubmitting ? "Creating order" : "Order now"}
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

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
