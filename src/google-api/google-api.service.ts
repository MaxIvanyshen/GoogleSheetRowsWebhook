import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as fs from 'fs';

@Injectable()
export class GoogleApiService {
  private driveClient: any;

  constructor() {
    this.initDriveClient();
  }

  private initDriveClient() {
    const keyFilePath = 'service_account_key.json';

    if (!fs.existsSync(keyFilePath)) {
      throw new Error('Service account key file not found');
    }

    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    this.driveClient = google.drive({ version: 'v3', auth });
  }

  async getEmails(fileId: string): Promise<string []> {

    try {
      const res = await this.driveClient.permissions.list({
        fileId: fileId,
        fields: 'permissions(emailAddress)',
      });

      const emails = await res.data.permissions;
      if(emails) {
          let addresses = [];
          for(let i = 0; i < emails.length; i++) {
              addresses.push(emails[i].emailAddress);
          }

          return addresses;
      }
      return [];
    } catch (error) {
      console.error('Error retrieving permissions:', error);
      throw new Error('Failed to fetch permissions');
    }
  }
}

