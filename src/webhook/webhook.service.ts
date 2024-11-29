import { BadRequestException, Injectable } from '@nestjs/common';
import { GoogleApiService } from 'src/google-api/google-api.service';
import { MailerService } from 'src/mailer/mailer.service';
import { Row } from 'src/row/entity/row.entity';
import { RowService } from 'src/row/row.service';

@Injectable()
export class WebhookService {

    constructor(
        private readonly rowService: RowService,
        private readonly mailerService: MailerService,
        private readonly googleApiService: GoogleApiService,
    ) {}

    async triggerChange(row: Row): Promise<void> {
        if(!row) {
            throw new BadRequestException("Request row is empty");
        }

        await this.rowService.save(row);

        if(this.rowService.getNumberOfChanges() === Number(process.env.CHANGES_UNTIL_EMAIL)) {
            const emails = await this.googleApiService.getEmails("1DGIlELSdAHtNPQv6av9JnVdxCAayy9Zx9LNoVMTEwAY");
            if(emails) {
                await this.mailerService.sendEmails(emails, this.rowService.getChanges());
            }
            this.rowService.clearChanges();
        }
    }
}

