// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mail from "@/lib/email";
import { Email } from "@/lib/email/EmailProvider";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: any, res: any) {
  const mailOptions: Email = {
    to: "mannuarora7000@gmail.com",
    subject: "PDF Attachment",
    body: "Please find the attached PDF file.",
    attachments: [],
  };

  try {
    // Send the email
    await mail.sendEmail(mailOptions);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email." });
  }
}
