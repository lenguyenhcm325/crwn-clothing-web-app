// import "./payment-form.styles";
import { FormEvent } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from "./payment-form.styles";
import { CardElement, useElements, useStripe  } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

// import Button from "../button/button.component";
import { BUTTON_TYPES_CLASSES } from "../button/button.component";


const ifValidCardElement = (card) 


const PaymentForm = () => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const stripe = useStripe();
  const elements = useElements();
  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret },
    } = response;

    const cardDetails = elements.getElement(CardElement);

    if (cardDetails === null) return;
    setIsProcessingPayment(true);
    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        },
      },
    });
    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful");
      }
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentButton
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPES_CLASSES.inverted}
        >
          Pay now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
