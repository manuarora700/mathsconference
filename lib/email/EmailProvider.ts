class Email {
  to: string;
  subject: string;
  body: string;
  attachments?: any[];

  constructor(to: string, subject: string, body: string, attachments: any[]) {
    this.to = to;
    this.subject = subject;
    this.body = body;
    this.attachments = attachments;
  }
}

interface EmailProvider {
  sendEmail(email: Email): Promise<boolean>;
}

export { Email };

export default EmailProvider;
