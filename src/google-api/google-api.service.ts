import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';

export class GoogleApiService {
  private driveClient: any;

  constructor() {
    this.initDriveClient();
  }

  private initDriveClient() {
    const base64Key = process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64;
    
    if (!base64Key) {
      throw new Error('Service account key not found in environment variables');
    }

    const decodedKey = Buffer.from(base64Key, 'base64').toString('utf8');
    const keyFilePath = path.join(__dirname, 'service_account_key.json');

    fs.writeFileSync(keyFilePath, decodedKey);

    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    this.driveClient = google.drive({ version: 'v3', auth });
  }

  async getEmails(fileId: string): Promise<string[]> {
    try {
      const res = await this.driveClient.permissions.list({
        fileId: fileId,
        fields: 'permissions(emailAddress)',
      });

      const emails = res.data.permissions;
      if (emails) {
        return emails.map((permission: any) => permission.emailAddress);
      }

      return [];
    } catch (error) {
      console.error('Error retrieving permissions:', error);
      throw new Error('Failed to fetch permissions');
    }
  }
}

