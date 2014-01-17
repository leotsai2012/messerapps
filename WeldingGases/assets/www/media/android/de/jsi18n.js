/* gettext library */

var catalog = new Array();

function pluralidx(n) {
  var v=(n != 1);
  if (typeof(v) == 'boolean') {
    return v ? 1 : 0;
  } else {
    return v;
  }
}
catalog['Added to basket'] = 'Hinzugef\u00fcgt';
catalog['Enter e-mail'] = 'E-Mail eingeben';
catalog['Send'] = 'Senden';
catalog['Welding'] = 'Schweißen';
catalog['Barcode not valid !'] = 'Barkode wurde nicht wiedererkannt';
catalog['Basket still empty'] = 'Ihr Warenkorb ist noch lehr';
catalog['Call'] = 'Rufe an';
catalog['Description'] = 'Beschreibung';
catalog['Directions'] = 'Richtung';
catalog['E-Mail  transmittion failed'] = 'E-mail Versand fehlgeschlagen';
catalog['E-Mail succesfully transmitted'] = 'E-mail erfolgreich verschickt';
catalog['Email sent'] = 'E-Mailversand erfolgreich.';
catalog['Failed to authenticate the user'] = 'Anmeldungsversuch fehlgeschlagen';
catalog['Fuel Oil EL'] = 'Leichtes \u00d6l';
catalog['Less'] = 'Weniger';
catalog['Material'] = 'Material';
catalog['Materialnumber'] = 'Materialnummer';
catalog['Methane'] = 'Methan';
catalog['More'] = 'Mehr';
catalog['Name field is empty'] = 'Name fehlt';
catalog['No valid E-Mail address'] = 'Keine g\u00fcltige E-mail Adresse';
catalog['No valid telephone number'] = 'Keine g\u00fcltige Telefonnummer';
catalog['Please authenticate first!'] = 'Zuerst anmelden';
catalog['Failed to send to your email address'] = 'E-Mailversand fehlgeschlagen.';
catalog['Submission failed - no internet connection'] = 'E-mail Versand fehlgeschlagen - keine Internetverbindung';
catalog['Transmission failed'] = 'E-mail Versand fehlgeschlagen';
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


function interpolate(fmt, obj, named) {
  if (named) {
    return fmt.replace(/%\(\w+\)s/g, function(match){return String(obj[match.slice(2,-2)])});
  } else {
    return fmt.replace(/%s/g, function(match){return String(obj.shift())});
  }
}

/* formatting library */

var formats = new Array();

formats['DATETIME_FORMAT'] = 'j. F Y H:i:s';
formats['DATE_FORMAT'] = 'j. F Y';
formats['DECIMAL_SEPARATOR'] = ',';
formats['MONTH_DAY_FORMAT'] = 'j. F';
formats['NUMBER_GROUPING'] = '3';
formats['TIME_FORMAT'] = 'H:i:s';
formats['FIRST_DAY_OF_WEEK'] = '1';
formats['TIME_INPUT_FORMATS'] = ['%H:%M:%S', '%H:%M'];
formats['THOUSAND_SEPARATOR'] = '.';
formats['DATE_INPUT_FORMATS'] = ['%d.%m.%Y', '%d.%m.%y', '%Y-%m-%d', '%y-%m-%d'];
formats['YEAR_MONTH_FORMAT'] = 'F Y';
formats['SHORT_DATE_FORMAT'] = 'd.m.Y';
formats['SHORT_DATETIME_FORMAT'] = 'd.m.Y H:i:s';
formats['DATETIME_INPUT_FORMATS'] = ['%d.%m.%Y %H:%M:%S', '%d.%m.%Y %H:%M', '%d.%m.%Y', '%Y-%m-%d %H:%M:%S', '%Y-%m-%d %H:%M', '%Y-%m-%d'];

function get_format(format_type) {
    var value = formats[format_type];
    if (typeof(value) == 'undefined') {
      return msgid;
    } else {
      return value;
    }
}