import mongoose from "mongoose";



const SalesTransactionSchema = new mongoose.Schema({
    customerID: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    organisationID: { type: mongoose.Schema.Types.ObjectId, ref: "Organisation", required: true },
    payDate: { type: Date, required: true },
    razorpay_signature: { type: String },
    razorpay_order_id: { type: String },
    razorpay_payment_id: { type: String },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    mode: { type: String, enum: ['cash', 'online'], default: 'cash' },
    amount: { type: Number },

  }, { timestamps: true });
  
  SalesTransactionSchema.index({ organisationID: 1, customerID: 1 }); // For efficient querying
  


export default mongoose.model("salesTransactions", SalesTransactionSchema);
