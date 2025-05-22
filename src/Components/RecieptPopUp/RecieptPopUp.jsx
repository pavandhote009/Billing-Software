import React from "react";

function RecieptPopUp({ orderDetails, onClose, onPrint }) {
  if (!orderDetails) return null;

  const {
    customerName = "N/A",
    phoneNumber = "N/A",
    cartItems = [],
    grandTotal = 0,
    tax = 0,
    subtotal = 0,
    paymentMethod = "N/A",
  } = orderDetails;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 print:hidden">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 relative animate-fade-in-up">
        <h2 className="text-2xl font-bold text-center mb-4">Receipt</h2>

        <div className="mb-4">
          <p><span className="font-semibold">Customer:</span> {customerName}</p>
          <p><span className="font-semibold">Phone:</span> {phoneNumber}</p>
          <p><span className="font-semibold">Payment:</span> {paymentMethod}</p>
        </div>

        <div className="border-t pt-2 space-y-2">
          {Array.isArray(cartItems) && cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No items in cart.</p>
          )}
        </div>

        <div className="border-t mt-3 pt-2 text-sm space-y-1">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (10%):</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Grand Total:</span>
            <span className="text-blue-600">₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
          >
            Close
          </button>
          <button
            onClick={onPrint}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecieptPopUp;
