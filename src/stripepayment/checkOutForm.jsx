import { PaymentElement } from "@stripe/react-stripe-js";

const CheckOutForm = () => {
  return (
    <form>
      <PaymentElement />
      <button>Submit</button>
    </form>
  );
};

export default CheckOutForm;
