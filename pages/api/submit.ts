import mail from "@/lib/email";
import { Email } from "@/lib/email/EmailProvider";
import nodemailer from "nodemailer";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Set desired value here
    },
  },
};

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    // Parse the request body
    const {
      email,
      subject,
      name,
      abstract,
      keywords,
      affiliation,
      designation,
      mobile,
      countrycode,
      drone,
      drone2,
      myfile,
      specialRequirements,
      terms,
    } = req.body;

    const submissionID = "JECRC-" + new Date().getTime();

    // Create a transporter object with your email provider settings

    // Create the mail options
    const mailOptions: Email = {
      to: `${email}, aiamms@jecrcu.edu.in`,
      subject: "PDF Attachment",
      body: `Please find the attached PDF file.
        name: ${name},<br />
        subject: ${subject},<br />
        abstract: ${abstract},<br />
        keywords: ${keywords},<br />
        affiliation: ${affiliation},<br />
        designation: ${designation},<br />
        mobile: ${mobile},<br />
        countrycode: ${countrycode},<br />
        drone: ${drone},<br />
        drone2: ${drone2},<br />
        specialRequirements: ${specialRequirements},<br />
        terms: ${terms}<br />

        submissionID: ${submissionID}<br />
      `,
      attachments: [
        {
          filename: "file.pdf",
          content: Buffer.from(
            myfile.split("data:application/pdf;base64,")[1],
            "base64"
          ),
        },
      ],
    };

    try {
      // Send the email
      await mail.sendEmail(mailOptions);

      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Failed to send email." });
    }
  } else {
    res.status(404).json({ message: "Invalid request method." });
  }
}
