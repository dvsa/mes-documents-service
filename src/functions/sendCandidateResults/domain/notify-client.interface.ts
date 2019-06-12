
export interface INotifyClient {
  sendEmail(templateId: string, emailAddress: string, options: any): Promise<any>;

  sendLetter(templateId: string, options: any): Promise<any>;
}
