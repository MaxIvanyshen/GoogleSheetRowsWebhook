# Viso Test Task

### Google Sheets Script
Webhook works by having google sheets app script send a request to my REST API
Here's the code of the script:
```javascript
function onEdit(e) {
  if (!e || !e.range) {
    console.error('The onEdit function was triggered without a valid event object.');
    return;
  }

  const range = e.range;
  const sheet = range.getSheet();
  const row = range.getRow();

  let lastColumn = sheet.getLastColumn();
  let cols;

  if (lastColumn < 1) {
    console.warn('Sheet has no columns with data. Sending an empty row.');
    cols = [""];
  } else {
    cols = sheet.getRange(row, 1, 1, lastColumn).getValues()[0];
  }

  const webhookUrl = 'https://viso-test-task-0c774ec5f306.herokuapp.com/webhook';

  const payload = {
    index: row,
    cols: cols,
  };

  try {
    const response = UrlFetchApp.fetch(webhookUrl, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload),
    });
    console.log('Webhook sent successfully:', response.getContentText());
  } catch (error) {
    console.error('Error sending webhook:', error.message);
  }
}
```

### Swagger UI
Swagger is accessble by going to the ['/api'](https://viso-test-task-0c774ec5f306.herokuapp.com/api) route of the application.
