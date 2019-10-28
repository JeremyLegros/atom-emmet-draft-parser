"use strict";
// tried with regular expressions at first, maybe still needed for fine tunning later
// TODO : javascript DOC
var regx_occurenceHtmlComment = /<!\-\-.*?\-\->/g;
var regx_occurenceInvisibleSeparators = /(\r[\n ])|(\n[ ])|( )|(\n)/g;
var regx_occurenceBeginBySpaces = /(^ {1,})(.*)/g;
var regx_occurenceBetweenParenthesis = /(\(.*?\))/g;
var regx_occurenceParenthesisOpened = /(\()/g;
var regx_occurenceGtEndOfLine = /(\>)([^\r])/g;
var regx_occurencePlus = /(\+)/g;
var regx_occurenceSomethingPlus = /(\+)(. *?[^\(])/g;
var regx_occurenceSomethingPlusSomething = /(.*?[^\)])(\+)(. *?[^\(])/g;
var regx_occurenceLine = /(^.+$)/g;
var regx_occurenceTab = /(\t)/g;
var regx_occurenceEmptyLine = /(^\r)/g;
var regx_occurenceDoubleOpenedParenthesis = /(^.*?)(\(\()(.*?$)/g;
var regx_occurenceCommercialAND = /(&)/g;
var regx_occurenceEmmetText = /\{(.*?)\}/g;

module.exports = {
  /**
   *  for quick test purposes
   */
  cout: function cout(string) {
    console.log(string)
  },

  /**
   * needed for emmet abbreviation in html
   */
  supprHtmlComments: function supprHtmlComments(string) {
    return string.replace(regx_occurenceHtmlComment, '');
  },

  /**
   *  removes \n, \r, spaces...
   */
  supprSeparators: function supprSeparators(string) {
    return string.replace(/\s/g, '')
  },

  /**
   * return the content of the text abbreviation, the index of the closing bracket, and true if it is a comment
   */
  getTextAbbreviation: function getTextAbbreviation(string, indexOfBracket) {
    let i = indexOfBracket; // don't take any chances with the parameters
    let len = string.length;
    let sRes = '';
    let isComment = false;
    let done= false;
    let ch = ''
    if (string[i + 1] == '}') {
      return {
        string: '{}',
        index: i + 1,
        isComment: isComment
      }
    }
    while (i < len) { // works as a smarter "while (true)"
      ch = string[i];
      if (ch == '}') {
        sRes += ch;
        break;
      }
      sRes += ch;
      i++;
    }
    return {
      string: sRes,
      index: i,
      isComment: (sRes.search(/<!--.*?-->/g) != -1)
    }
  },

  /**
   * doesn't parse the text {}
   */
  uglifyAnythingButText: function uglifyAnythingButText(string) {
    let sRes = '';
    let len = string.length;
    let oText = ''
    let ch = ''
    for (var i = 0; i < len; i++) {
      ch = string[i]
      if (ch == '{') { // {...}
        oText = this.getTextAbbreviation(string, i);
        sRes += oText.string;
        i = oText.index;
      } else {
        sRes += this.supprSeparators(ch)
      }
    }
    return sRes;
  },

  /**
   *  need automats
   */
  uglify: function uglify(string) {
    return this.uglifyAnythingButText(string)
  },

  /**
   *  quick formating
   */
  replaceTabsBySpaces: function replaceTabsBySpaces(string) {
    return string.replace(regx_occurenceTab, '  ')
  },

  indent: function indent(string, nbTimes = 1) {
    if (nbTimes <= 0) return string;
    if (nbTimes == 1) return '  ' + string;
    let sRes = '';
    while (nbTimes != 0) {
      sRes += '  '
      nbTimes--;
    }
    return sRes + string;
  },
  /**
   * return the next character from the index
   */
  lookAhead: function lookAhead(string, index) {
    if (index < string.length - 1) return string[index + 1]
    else
      return null;
  },


  /**
   * return the previous character from the index
   */
  lookBefore: function lookBefore(string, index) {
    if (index > 0) return string[index - 1]
    else
      return null;
  },

  /**
   * check if the parenthesis is inside another parenthesis
   */
  isRussianDollParenthesis: function isRussianDollParenthesis(string, index) {
    let i = index;
    let len = string.length
    for (i; i <
      len; i++) {
      if (string[i] == '(') return true;
    }
    return false;
  },
  /**
   *
   * rmk : maybe could have be done with a split to use regx
   */
  beautify: function beautify(string) {
    let sRes = '';
    let indentLevel = 0;
    let len = string.length;
    // let nextChar = null;
    // let prevChar = null;
    let char = '';
    let oText = '';
    for (var i = 0; i <
      len; i++) {
      char = string[i];
      // prevChar = this.lookBefore(string, i);
      // nextChar = this.lookAhead(string, i);
      switch (char) {
        case '{':
          oText = this.getTextAbbreviation(string, i);
          if (oText.isComment) {
            sRes += '\r' + this.indent(oText.string, indentLevel) + '\r' + this.indent('',indentLevel);
            i = oText.index
          }
          else {
            sRes += char;
          }
          break;
        case '(':
          indentLevel++;
          sRes += '\n' + this.indent(char, indentLevel);
          break;
        case ')':
          sRes += '\n' + this.indent(char, indentLevel);
          indentLevel--;
          break;
        default:
          sRes += char;
      }
    }
    return sRes;
  },

  supprEmptyLine: function supprEmptyLine(string) {
    return string.replace(regx_occurenceEmptyLine, '')
  },


  // FIXME: need to take in account the order for \r, must be used on the previous or next character
  /**
   *  quick formating
   */
  movePlusCharNextLine: function movePlusCharNexLine(string) {
    return string.replace(regx_occurencePlus, '\r$1\r');
  },


  // FIXME: need to take in account the order for \r, must be used on the previous or next character
  /**
   * move parenthesis to the next line if
   * the parenthesis isn't the first character
   */
  mvParenthesisToNextLine: function mvParenthesisToNextLine(string) {
    if (string.search((/^\(/)) == -1) {
      return string.replace(regx_occurenceParenthesisOpened, '\r$1')
    } else
      return string.replace(regx_occurenceDoubleOpenedParenthesis, string);
  },

  // FIXME: need to take in account the order for \r, must be used on the previous or next character
  /**
   *  move double parenthesis to the next line
   */
  mvDoubleParenthesisToNextLine: function mvDoubleParenthesisToNextLine(string) {
    return string.replace(/(.*?)(\(\()(.*?$)/g, "$1\n$2$3");
  },

  // FIXME: need to take in account the order for \r, must be used on the previous or next character
  indentLines: function indentLines(string) {
    return string.replace(regx_occurenceLine, "  $1")
  },

  // FIXME: need to take in account the order for \r, must be used on the previous or next character
  replaceComANDwithFirstClass: function replaceComANDwithFirstClass(string) { //let parentClass= string.exec((^\..*?)([."])); // unfinished
    //return string.replace(regx_occurenceCommercialAND, "")
    return string
  }

}
