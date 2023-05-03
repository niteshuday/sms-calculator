/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * Please do not modify this function
 */

var gsm7bitChars = "`@£$¥èéùìòÇ\\nØø\\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !\\\"#¤%&'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà";
var gsm7bitExChar = "\\^{}\\\\\\[~\\]|€";
var gsm7bitRegExp = RegExp("^[" + gsm7bitChars + "]*$");
var gsm7bitExRegExp = RegExp("^[" + gsm7bitChars + gsm7bitExChar + "]*$");
var gsm7bitExOnlyRegExp = RegExp("^[\\" + gsm7bitExChar + "]*$");
var GSM_7BIT = 'GSM_7BIT';
var GSM_7BIT_EX = 'GSM_7BIT_EX';
var UTF16 = 'UTF16';
/**
 * 
 * @type type
 */
var messageLength = {
    GSM_7BIT: 160,
    GSM_7BIT_EX: 160,
    UTF16: 70
};
/**
 * if message length is more then one then charge international count.
 * @type type
 */
var multiMessageLength = {
    GSM_7BIT: 153,
    GSM_7BIT_EX: 153,
    UTF16: 67
};
/**
 * Detect Encoding of text message .
 * @param {type} text
 * @returns {GSM_7BIT|String|UTF16|GSM_7BIT_EX}
 */
function detectEncoding(text) {
    switch (false) {
        case text.match(gsm7bitRegExp) == null:
            return GSM_7BIT;
        case text.match(gsm7bitExRegExp) == null:
            return GSM_7BIT_EX;
        default:
            return UTF16;
    }
}
/**
 * This method is use when found any special character in a message .
 * @param {type} text
 * @returns {Number|chars.length}
 */
function countGsm7bitEx(text) {
    var char2, chars;
    chars = (function () {
        var i, length, results;
        results = [];
        for (i = 0, length = text.length; i < length; i++) {
            char2 = text[i];
            if (char2.match(gsm7bitExOnlyRegExp) != null) {
                results.push(char2);
            }
        }
        return results;
    }).call(this);
    return chars.length;
}
/**
 * get SMS count.
 * @param {type} text
 * @returns {Array|getCount.array}
 */
function getSMSCount(text) {
    var encoding, length, messages, per_message, remaining;
    encoding = detectEncoding(text);
    length = text.length;
    if (encoding === GSM_7BIT_EX) {
        length += countGsm7bitEx(text);
    }
    per_message = messageLength[encoding];
    if (length > per_message) {
        per_message = multiMessageLength[encoding];
    }
    messages = Math.ceil(length / per_message);
    remaining = (per_message * messages) - length;
    if (remaining == 0 && messages == 0) {
        remaining = per_message;
    }
    var array = [];
    array.push(length); // [0]: length of character.
    array.push(remaining); // [1]: remaining length in a message.
    array.push(messages); // [2]: message cost count.
    array.push(encoding); // [3]: message encoding.
    array.push(per_message);// [4]: max character length of per message.
    return array;
}

function smsCount(textAreaId) {
    var obj = getSMSCount(textAreaId.value);
    document.getElementById("showmsgcountelement").innerHTML=obj[0] + ' Characters, Remaining: ' + obj[1] + ', Cost: ' + obj[2] + ' SMS';
   document.getElementById("showmsgcountelement").style.backgroundColor="#598a24";
    if (obj[2] > 6) {
         document.getElementById("showmsgcountelement").innerHTML="Message limit exceed";
          document.getElementById("showmsgcountelement").style.backgroundColor="#8a2424e6";
    }
    
}


(function() {
  document.getElementById('messagebody').focus();
//  document
})();
