/**
 * Thiru Aavinan Technologies — website enquiries → Google Sheet
 *
 * Paste this whole file into Extensions → Apps Script of your enquiries
 * Google Sheet, then Deploy → New deployment → Web app
 * (Execute as: Me · Who has access: Anyone). Copy the Web app URL into
 * SHEET_URL in assets/js/main.js. Full steps: README.md → "Enquiry form".
 */

const SHEET_NAME = 'Enquiries';
const HEADERS = ['Date & time', 'Name', 'Phone', 'Interested in', 'Message', 'Language'];
const MAX_LEN = 1000; // longest text we keep from any one field

function doPost(e) {
  const p = (e && e.parameter) || {};
  const sheet = getSheet_();
  sheet.appendRow([
    new Date(),
    clean_(p.name),
    clean_(p.phone),
    clean_(p.interest),
    clean_(p.message),
    clean_(p.language),
  ]);
  return ContentService.createTextOutput('ok');
}

function getSheet_() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

// Keep text short, and stop a value starting with = + - @ from being run as a formula.
function clean_(value) {
  let text = String(value || '').slice(0, MAX_LEN).trim();
  if (/^[=+\-@]/.test(text)) text = "'" + text;
  return text;
}
