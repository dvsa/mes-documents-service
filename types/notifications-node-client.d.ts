export class NotifyClient {
    constructor(...args: any[]);
    apiClient: any;
    getAllTemplates(templateType: any): any;
    getNotificationById(notificationId: any): any;
    getNotifications(templateType: any, status: any, reference: any, olderThanId: any): any;
    getReceivedTexts(olderThan: any): any;
    getTemplateById(templateId: any): any;
    getTemplateByIdAndVersion(templateId: any, version: any): any;
    prepareUpload(pdf_data: any): any;
    previewTemplateById(templateId: any, personalisation: any): any;
    sendEmail(templateId: any, emailAddress: any, options: any): any;
    sendLetter(templateId: any, options: any): any;
    sendPrecompiledLetter(reference: any, pdf_file: any, postage: any): any;
    sendSms(templateId: any, phoneNumber: any, options: any): any;
    setProxy(url: any): void;
}
