/**
 * Wedding RSVP – Google Apps Script Backend
 *
 * Deploy as a Web App:
 *   1. Open https://script.google.com and create a new project.
 *   2. Paste this entire file into the editor.
 *   3. Replace SHEET_ID with your Google Sheet ID (the long string in the Sheet URL).
 *   4. Click "Deploy" → "New deployment" → Type: "Web app".
 *   5. Set "Execute as" to yourself and "Who has access" to "Anyone".
 *   6. Copy the deployment URL and add it to your .env file as VITE_GOOGLE_SCRIPT_URL.
 *
 * The Sheet should have these columns in Row 1:
 *   Timestamp | Name | Email | Attendance | Guests | Dietary Restrictions
 */

// ── Configuration ────────────────────────────────────────────────────────────
var SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Replace with your Sheet ID
var SHEET_NAME = 'RSVPs';                    // Tab name inside the spreadsheet
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Handles HTTP POST requests from the RSVP form.
 * @param {GoogleAppsScript.Events.DoPost} e
 * @returns {GoogleAppsScript.Content.TextOutput}
 */
function doPost(e) {
  try {
    var sheet = getOrCreateSheet();

    var timestamp  = new Date().toISOString();
    var name       = sanitize(e.parameter.name);
    var email      = sanitize(e.parameter.email);
    var attendance = sanitize(e.parameter.attendance);
    var guests     = sanitize(e.parameter.guests);
    var dietary    = sanitize(e.parameter.dietary);

    sheet.appendRow([timestamp, name, email, attendance, guests, dietary]);

    return buildResponse({ result: 'success' });
  } catch (err) {
    return buildResponse({ result: 'error', error: err.message }, true);
  }
}

/**
 * Handles HTTP GET requests (used to verify the deployment is live).
 * @returns {GoogleAppsScript.Content.TextOutput}
 */
function doGet() {
  return buildResponse({ result: 'ok', message: 'Wedding RSVP endpoint is live.' });
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Returns the target sheet, creating it with a header row if it doesn't exist.
 * @returns {GoogleAppsScript.Spreadsheet.Sheet}
 */
function getOrCreateSheet() {
  var ss    = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Attendance', 'Guests', 'Dietary Restrictions']);
    sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
  }

  return sheet;
}

/**
 * Wraps a JSON payload in a TextOutput with CORS headers.
 * @param {Object} payload
 * @param {boolean} [isError]
 * @returns {GoogleAppsScript.Content.TextOutput}
 */
function buildResponse(payload, isError) {
  var output = ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * Strips leading/trailing whitespace and returns an empty string for undefined values.
 * @param {string|undefined} value
 * @returns {string}
 */
function sanitize(value) {
  return (value || '').toString().trim();
}
