import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./checkOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PROMISE);

export default function Stripe() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: import.meta.env.VITE_STRIPE_SECERT_KEY,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckOutForm />
    </Elements>
  );
}
