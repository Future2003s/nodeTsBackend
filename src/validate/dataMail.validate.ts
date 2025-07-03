"use strict";
import { z } from "zod";

interface TypeInputSendMail {
  customerEmail: string;
  customerName: string;
  emailBody: string;
  emailType: string;
  products: string;
}

const mailSchema = z.object({});
