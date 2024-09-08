import nc from "next-connect";
import { createOrder } from "../../controllers/razorpayController";

const handler = nc();
handler.post(createOrder);

export default handler;
