import { Injectable } from '@nestjs/common';
import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';

@Injectable()
export class MailerService {

    async sendEmails(addresses: string[], data: any[]): Promise<void> {
        const mailerSend = new MailerSend({
            apiKey: process.env.MAILERSEND_API_KEY!,
        });

        const sentFrom = new Sender(`you@${process.env.MAILERSEND_DOMAIN}`);

        for(let i = 0; i < addresses.length; i++) {
            const recipients = [
                new Recipient(addresses[i])
            ];

            const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setReplyTo(sentFrom)
            .setSubject(`Last ${process.env.CHANGES_UNTIL_EMAIL} changes in Google Spreadsheet`)
            .setHtml(await this.convertToHtmlList(data))

            await mailerSend.email.send(emailParams);}
    }

    async convertToHtmlList(data: any[]): Promise<string> {
        let htmlOutput = "<ul>";

        data.forEach((item: any) => {
            htmlOutput += `<li>${JSON.stringify(item)}</li>`;
        });

        htmlOutput += "</ul>";

        return htmlOutput;
    }
}
