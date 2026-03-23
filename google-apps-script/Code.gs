/**
 * Wedding RSVP – Google Apps Script Backend
 *
 * Sheet columns (Row 1):
 *   Timestamp | Name | Email | Attendance | Guests | Arrival Date | Dietary Restrictions | Source
 */

// ── Configuration ────────────────────────────────────────────────────────────
var SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Replace with your Sheet ID
var SHEET_NAME = 'RSVPs';                   // Tab name inside the spreadsheet
var PASSPHRASE_SHEET_NAME = 'Passphrases';  // Tab name for access passphrases
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Handles HTTP POST requests from the RSVP form.
 * @param {GoogleAppsScript.Events.DoPost} e
 * @returns {GoogleAppsScript.Content.TextOutput}
 */
function doPost(e) {
  try {
    validateConfig();
    var payload = parsePayload(e);
    var route = sanitize(payload.route);

    if (route === 'validate-passphrase') {
      return buildResponse(validatePassphraseResult(payload.answer));
    }

    var sheet = getOrCreateSheet();

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
function doGet(e) {
  try {
    validateConfig();

    var params = e && e.parameter ? e.parameter : {};
    var route = sanitize(params.route);
    var callback = sanitize(params.callback);

    if (route === 'validate-passphrase') {
      var validationResult = validatePassphraseResult(params.answer);
      return buildResponse(validationResult, false, callback);
    }

    var hasPayload =
      hasValue(params.name) ||
      hasValue(params.email) ||
      hasValue(params.attendance);

    if (hasPayload) {
      var sheet = getOrCreateSheet();
      var timestamp = new Date().toISOString();
      var name = sanitize(params.name);
      var email = sanitize(params.email);
      var attendance = sanitize(params.attendance);
      var guests = sanitize(params.guests);
      var arrivalDate = sanitize(params.arrivalDate);
      var dietary = sanitize(params.dietary);
      var source = sanitize(params.source || 'website-get');

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

      return buildResponse({ result: 'success', message: 'RSVP stored via GET fallback.' });
    }

    return buildResponse({
      result: 'ok',
      message: 'Wedding RSVP endpoint is live.',
      sheet: SHEET_NAME,
    });
  } catch (err) {
    return buildResponse({ result: 'error', error: err.message }, true);
  }
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
    route: firstDefined(fromForm.route, fromJson.route),
    answer: firstDefined(fromForm.answer, fromJson.answer),
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
 * Returns true if value is non-empty after sanitize.
 * @param {string|undefined} value
 * @returns {boolean}
 */
function hasValue(value) {
  return sanitize(value) !== '';
}

/**
 * Returns the passphrase tab, creating it with a header row if it doesn't exist.
 * @returns {GoogleAppsScript.Spreadsheet.Sheet}
 */
function getOrCreatePassphraseSheet() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(PASSPHRASE_SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(PASSPHRASE_SHEET_NAME);
    sheet.appendRow(['Passphrase']);
    sheet.getRange(1, 1, 1, 1).setFontWeight('bold');
  }

  return sheet;
}

/**
 * Normalizes a passphrase for matching.
 * Accepts forms like "Nana", "hi, nana", or "Hi, Nana!".
 * @param {string|undefined} value
 * @returns {string}
 */
function normalizePassphrase(value) {
  var text = sanitize(value).toLowerCase();
  text = text.replace(/^hi,\s*/i, '');
  text = text.replace(/[!?.]+$/g, '');
  return sanitize(text);
}

/**
 * Validates the submitted answer against Passphrases!A2:A.
 * @param {string|undefined} rawAnswer
 * @returns {GoogleAppsScript.Content.TextOutput}
 */
function validatePassphraseResult(rawAnswer) {
  var normalizedAnswer = normalizePassphrase(rawAnswer);
  if (!normalizedAnswer) {
    return { result: 'success', valid: false };
  }

  var sheet = getOrCreatePassphraseSheet();
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    throw new Error('Passphrases tab is empty. Add at least one passphrase in column A.');
  }

  var values = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  var isValid = false;
  for (var i = 0; i < values.length; i += 1) {
    var candidate = normalizePassphrase(values[i][0]);
    if (candidate && candidate === normalizedAnswer) {
      isValid = true;
      break;
    }
  }

  return { result: 'success', valid: isValid };
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
function buildResponse(payload, isError, callbackName) {
  var body = Object.assign({}, payload, {
    status: isError ? 'error' : 'ok',
  });
  var responseText = JSON.stringify(body);
  if (callbackName) {
    var sanitizedCallback = callbackName.replace(/[^\w$.]/g, '');
    if (sanitizedCallback) {
      responseText = sanitizedCallback + '(' + responseText + ')';
    }
  }
  var output = ContentService
    .createTextOutput(responseText)
    .setMimeType(
      callbackName ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON
    );
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
