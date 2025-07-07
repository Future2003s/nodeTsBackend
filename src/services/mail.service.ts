"use strict";

import ErrorResponse from "~/response/error.response";
import { sendMail } from "~/utils/sendMail";

export interface TypeRequestBodyMail {
  emailType: "thankyou" | "confirmed" | "delivering" | "";
  customerInfo: {
    name: string;
    email: string;
  };
  shippingInfo?: {
    recipientName: string;
    address: string;
    phone: string;
  };
  order: {
    products: {
      id: string;
      name: string;
      price: number;
      quantity: number;
    }[];
    totalValue: number;
  };
}

class MailService {
  public static async sendMail(data: TypeRequestBodyMail) {
    const result = await sendMail(data);
    if (!result) {
      throw new ErrorResponse(400, "SEND MAIL ERROR");
    }
    return result;
  }
}

export default MailService;
