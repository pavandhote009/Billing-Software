import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
// import ReceiptPopUp from "../ReceiptPopUp/ReceiptPopUp";
import { createOrder, deleteOrder } from "../../Service/Orderservice";
import toast from "react-hot-toast";
import { AppConstants } from "../../Util/constants";
import { verifyPayment, createRazorpayOrder } from "../../Service/PaymentService";
import { VscClearAll } from "react-icons/vsc";

function CartSummary({
  customerName,
  setCustomerName,
  mobileNumber,
  setMobileNumber,
  clearCart,
}) {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [showPopup, setShowPopup] = React.useState(false);
  const [orderDetails, setOrderDetails] = React.useState(null);
  const { cartItems } = useContext(AppContext);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = totalAmount * 0.1;
  const grandTotal = totalAmount + tax;

  const clearAll = () => {
    setCustomerName("");
    setMobileNumber("");
    clearCart();
  };

  const placeOrder = () => {
    setShowPopup(true);
    clearAll();
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const deleteOrderOnFailure = async (orderId) => {
    try {
      await deleteOrder(orderId);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const completePayment = async (paymentMode) => {
    if (!customerName || !mobileNumber) {
      toast.error("Please enter customer details");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    setIsProcessing(true);

    const orderData = {
      customerName,
      phoneNumber: mobileNumber,
      cartItems,
      paymentMethod: paymentMode.toUpperCase(),
      subtotal: totalAmount,
      tax,
      grandTotal,
    };

    try {
      const response = await createOrder(orderData);
      const savedData = response.data;

      if (response.status === 201 && paymentMode === "cash") {
        toast.success("Cash Received");
        setOrderDetails(savedData);
      } else if (response.status === 201 && paymentMode === "upi") {
        const razorpayLoaded = await loadRazorpayScript();
        if (!razorpayLoaded) {
          toast.error("Failed to load payment gateway");
          await deleteOrderOnFailure(savedData.orderId);
          return;
        }

        const razorpayResponse = await createRazorpayOrder({
          amount: grandTotal,
          currency: "INR",
        });

        const options = {
          key: AppConstants.RAZORPAY_KEY_ID,
          amount: razorpayResponse.data.amount,
          currency: razorpayResponse.data.currency,
          name: "Ecommerce",
          order_id: razorpayResponse.data.id,
          description: "Order payment",
          handler: async function (response) {
            await verifyPaymentHandler(response, savedData);
          },
          prefill: {
            name: customerName,
            contact: mobileNumber,
          },
          theme: {
            color: "#3399cc",
          },
          modal: {
            ondismiss: async function () {
              await deleteOrderOnFailure(savedData.orderId);
              toast.error("Payment Cancelled");
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", async function (response) {
          await deleteOrderOnFailure(savedData.orderId);
          toast.error("Payment Failed");
          console.error(response);
        });
        rzp.open();
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Payment Processing Failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const verifyPaymentHandler = async (response, savedOrder) => {
    const paymentData = {
      razorPayOrderId: response.razorpay_order_id,
      razorpayPaymentId: response.razorpay_payment_id,
      razorPaySignature: response.razorpay_signature,
      orderId: savedOrder.orderId,
    };
    try {
      const paymentResponse = await verifyPayment(paymentData);
      if (paymentResponse.status === 200) {
        toast.success("Payment Successful");
        setOrderDetails({
          ...savedOrder,
          paymentDetails: {
            razorPayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorPaySignature: response.razorpay_signature,
          },
        });
      } else {
        toast.error("Payment verification failed");
        console.error("Payment verification failed:", paymentResponse);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="px-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="space-y-1">
        <div className="flex justify-between border-b border-gray-100 animate-fade-in-up delay-200">
          <span className="text-gray-100">Subtotal</span>
          <span className="font-medium">${totalAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between border-b border-gray-100 animate-fade-in-up delay-300">
          <span className="text-gray-100">Tax (10%)</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mt-2 animate-fade-in-up delay-400">
          <span className="text-lg font-semibold">Grand Total</span>
          <span className="text-lg font-bold text-blue-600 animate-pulse">
            ${grandTotal.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="flex gap-2 mb-2">
        <button
          onClick={() => completePayment("cash")}
          disabled={isProcessing}
          className="px-4 py-2 rounded-md border bg-green-500 hover:bg-green-600 font-semibold cursor-pointer transition-all duration-200 flex-1"
        >
          {isProcessing ? "Processing..." : "Cash"}
        </button>
        <button
          onClick={() => completePayment("upi")}
          disabled={isProcessing}
          className="px-4 py-2 rounded-md border cursor-pointer bg-blue-500 hover:bg-blue-700 font-semibold transition-all duration-200 flex-1"
        >
          {isProcessing ? "Processing..." : "UPI"}
        </button>
      </div>

      <div className="flex gap-3 mt-3">
        <button
          onClick={placeOrder}
          disabled={isProcessing || !orderDetails}
          className="px-4 py-2 rounded-md border cursor-pointer bg-amber-500 hover:bg-amber-700 font-semibold transition-all duration-200 flex-1"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default CartSummary;
