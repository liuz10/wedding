/**
 * Wedding RSVP – Google Apps Script Backend
 *
 * Sheet columns (Row 1):
 *   Timestamp | Name | Email | Attendance | Guests | Arrival Date | Dietary Restrictions | Source
 */

// ── Configuration ────────────────────────────────────────────────────────────
var SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Replace with your Sheet ID
var SHEET_NAME = 'RSVPs';                   // Tab name inside the spreadsheet
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Handles HTTP POST requests from the RSVP form.
 * @param {GoogleAppsScript.Events.DoPost} e
 * @returns {GoogleAppsScript.Content.TextOutput}
 */
function doPost(e) {
  try {
    validateConfig();
    var sheet = getOrCreateSheet();
    var payload = parsePayload(e);

    var timestamp = new Date().toISOString();
    var name = sanitize(payload.name);
    var email = sanitize(payload.email);
    var attendance = sanitize(payload.attendance);
    var guests = sanitize(payload.guests);
    var arrivalDate = sanitize(payload.arrivalDate);
    var dietary = sanitize(payload.dietary);
    var source = sanitize(payload.source || 'website');

    if (!name || !email || !attendance) {
      throw new Error('Missing required fields: name, email, and attendance are required.');
    }

    sheet.appendRow([
      timestamp,
      name,
      email,
      attendance,
      guests,
      arrivalDate,
      dietary,
      source,
    ]);

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
  return buildResponse({
    result: 'ok',
    message: 'Wedding RSVP endpoint is live.',
    sheet: SHEET_NAME,
  });
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Returns the target sheet, creating it with a header row if it doesn't exist.
 * @returns {GoogleAppsScript.Spreadsheet.Sheet}
 */
function getOrCreateSheet() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Timestamp',
      'Name',
      'Email',
      'Attendance',
      'Guests',
      'Arrival Date',
      'Dietary Restrictions',
      'Source',
    ]);
    sheet.getRange(1, 1, 1, 8).setFontWeight('bold');
  }

  return sheet;
}

/**
 * Supports FormData posts (e.parameter) and JSON body posts (e.postData.contents).
 * @param {GoogleAppsScript.Events.DoPost} e
 * @returns {Object}
 */
function parsePayload(e) {
  var fromForm = e && e.parameter ? e.parameter : {};
  var raw = e && e.postData && e.postData.contents ? e.postData.contents : '';
  var fromJson = {};

  if (raw) {
    try {
      fromJson = JSON.parse(raw);
    } catch (_ignore) {
      fromJson = {};
    }
  }

  return {
    name: firstDefined(fromForm.name, fromJson.name),
    email: firstDefined(fromForm.email, fromJson.email),
    attendance: firstDefined(fromForm.attendance, fromJson.attendance),
    guests: firstDefined(fromForm.guests, fromJson.guests),
    arrivalDate: firstDefined(fromForm.arrivalDate, fromJson.arrivalDate),
    dietary: firstDefined(fromForm.dietary, fromJson.dietary),
    source: firstDefined(fromForm.source, fromJson.source),
  };
}

/**
 * Returns the first non-null/undefined value.
 * @returns {*}
 */
function firstDefined() {
  for (var i = 0; i < arguments.length; i += 1) {
    if (arguments[i] !== undefined && arguments[i] !== null) {
      return arguments[i];
    }
  }
  return '';
}

/**
 * Validate required script configuration.
 */
function validateConfig() {
  if (!SHEET_ID || SHEET_ID === 'YOUR_GOOGLE_SHEET_ID_HERE') {
    throw new Error('SHEET_ID is not configured. Replace YOUR_GOOGLE_SHEET_ID_HERE first.');
  }
}

/**
 * Wraps a JSON payload in a TextOutput.
 * @param {Object} payload
 * @param {boolean} [isError]
 * @returns {GoogleAppsScript.Content.TextOutput}
 */
function buildResponse(payload, isError) {
  var body = Object.assign({}, payload, {
    status: isError ? 'error' : 'ok',
  });
  var output = ContentService
    .createTextOutput(JSON.stringify(body))
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
