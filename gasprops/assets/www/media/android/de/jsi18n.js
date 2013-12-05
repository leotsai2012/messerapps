/* gettext library */

var catalog = new Array();

function pluralidx(count) { return (count == 1) ? 0 : 1; }

catalog['NC'] = 'Faktor nicht bekannt';
catalog['Barcode not valid !'] = 'Barkode wurde nicht wiedererkannt';
catalog['Basket still empty'] = 'Ihr Warenkorb ist noch lehr';
catalog['Call'] = 'Rufe an';
catalog['Description'] = 'Beschreibung';
catalog['Directions'] = 'Richtung';
catalog['E-Mail  transmittion failed'] = 'E-mail Versand fehlgeschlagen';
catalog['E-Mail succesfully transmitted'] = 'E-mail erfolgreich verschickt';
catalog['Email sent'] = 'E-mail gesendet';
catalog['Failed to authenticate the user'] = 'Anmeldungsversuch fehlgeschlagen';
catalog['Fuel Oil EL'] = 'Leichtes \u00d6l';
catalog['Less'] = 'Weniger';
catalog['Material'] = 'Material';
catalog['Materialnumber'] = 'Materialnummer';
catalog['Methane'] = 'Methan';
catalog['Welding'] = 'Schweißen';
catalog['More'] = 'Mehr';
catalog['Name field is empty'] = 'Name fehlt';
catalog['Not a valid Email adress'] = 'Keine g\u00fcltige E-mail Adresse';
catalog['No a valid Email adress'] = 'Keine g\u00fcltige E-mail Adresse';
catalog['No valid telephone number'] = 'Keine g\u00fcltige Telefonnummer';
catalog['Please authenticate first!'] = 'Zuerst anmelden';
catalog['Send to my email address'] = 'Senden';
catalog['Send to your email address'] = 'E-Mail Versand erfolgreich';
catalog['Send to'] = 'E-Mail Versand an: ';
 
catalog['Not a valid Email adress'] = 'Keine gültige E-Mail ';
catalog['Submission failed - no internet connection'] = 'E-mail Versand fehlgeschlagen - keine Internetverbindung';
catalog['Transmission failed'] = 'E-Mail Versand fehlgeschlagen';
catalog['User is authenticated'] = 'Sie sind jetzt angemeldet';
catalog['position data stored for future reference'] = 'Ihre Standortdaten sind auf Ihr Telefon gespeichert';
catalog['position data stored'] = 'Ihr Standort wurde lokal gespeichert';
catalog['qty'] = 'Anz.';
catalog['retrieve position data'] = 'Gespeicherter Standort wird verwendet';
catalog['retrieved stored position data from last session'] = 'Ihre gespeicherte Standortdaten werden verwendet';
catalog['stored user data'] = 'Lokal gespeicherte Benutzerinfo';


function gettext(msgid) {
  var value = catalog[msgid];
  if (typeof(value) == 'undefined') {
    return msgid;
  } else {
    return (typeof(value) == 'string') ? value : value[0];
  }
}

function ngettext(singular, plural, count) {
  value = catalog[singular];
  if (typeof(value) == 'undefined') {
    return (count == 1) ? singular : plural;
  } else {
    return value[pluralidx(count)];
  }
}

function gettext_noop(msgid) { return msgid; }

function pgettext(context, msgid) {
  var value = gettext(context + '' + msgid);
  if (value.indexOf('') != -1) {
    value = msgid;
  }
  return value;
}

function npgettext(context, singular, plural, count) {
  var value = ngettext(context + '' + singular, context + '' + plural, count);
  if (value.indexOf('') != -1) {
    value = ngettext(singular, plural, count);
  }
  return value;
}

function interpolate(fmt, obj, named) {
  if (named) {
    return fmt.replace(/%\(\w+\)s/g, function(match){return String(obj[match.slice(2,-2)])});
  } else {
    return fmt.replace(/%s/g, function(match){return String(obj.shift())});
  }
}

/* formatting library */

var formats = new Array();

formats['DATETIME_FORMAT'] = 'N j, Y, P';
formats['DATE_FORMAT'] = 'N j, Y';
formats['DECIMAL_SEPARATOR'] = '.';
formats['MONTH_DAY_FORMAT'] = 'F j';
formats['NUMBER_GROUPING'] = '0';
formats['TIME_FORMAT'] = 'P';
formats['FIRST_DAY_OF_WEEK'] = '0';
formats['TIME_INPUT_FORMATS'] = ['%H:%M:%S', '%H:%M'];
formats['THOUSAND_SEPARATOR'] = ',';
formats['DATE_INPUT_FORMATS'] = ['%Y-%m-%d', '%m/%d/%Y', '%m/%d/%y', '%b %d %Y', '%b %d, %Y', '%d %b %Y', '%d %b, %Y', '%B %d %Y', '%B %d, %Y', '%d %B %Y', '%d %B, %Y'];
formats['YEAR_MONTH_FORMAT'] = 'F Y';
formats['SHORT_DATE_FORMAT'] = 'm/d/Y';
formats['SHORT_DATETIME_FORMAT'] = 'm/d/Y P';
formats['DATETIME_INPUT_FORMATS'] = ['%Y-%m-%d %H:%M:%S', '%Y-%m-%d %H:%M:%S.%f', '%Y-%m-%d %H:%M', '%Y-%m-%d', '%m/%d/%Y %H:%M:%S', '%m/%d/%Y %H:%M:%S.%f', '%m/%d/%Y %H:%M', '%m/%d/%Y', '%m/%d/%y %H:%M:%S', '%m/%d/%y %H:%M:%S.%f', '%m/%d/%y %H:%M', '%m/%d/%y'];

function get_format(format_type) {
    var value = formats[format_type];
    if (typeof(value) == 'undefined') {
      return msgid;
    } else {
      return value;
    }
}