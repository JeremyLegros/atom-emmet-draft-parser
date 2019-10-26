"use strict";
// TODO: write the grammar with automats
// & functions don't act as expected
// TODO: parse the & as the block name
// TODO: not parsing the interior of {} : really need automats
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

  cout: function cout(string) {
    console.log(string)
  },
  /**
   * needed to quick tests
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
 * doesn't parse the text {}
 */
  supprSeparatorsKeepText: function supprSeparatorsKeepText(string) {
    let sRes = '';
    let strLength= string.length;
    for (var i= 0; i < strLength; i++) {
      if (string[i] == '{') { // {...}
        while (i< strLength) { // works as a smarter "while (true)"
          if (string[i] == '}')
          {sRes += string[i];break;}
          sRes += string[i];
          i++;
        }
      }
      else
     {sRes += this.supprSeparators(string[i])}
    }
    return sRes;
  },

  /**
   *  need automats
   */
  uglify: function uglify(string) {
    return this.supprSeparatorsKeepText(string)
  },

  /**
   *  quick formating
   */
  movePlusCharNextLine: function movePlusCharNexLine(string) {
    return string.replace(regx_occurencePlus, '\r$1\r');
  },

  /**
   *  quick formating
   */
  replaceTabsBySpaces: function replaceTabsBySpaces(string) {
    return string.replace(regx_occurenceTab, '  ')
  },

  /**
   *  small beautify function
   */
  beautify: function beautify(string) {
    let res;
    res = this.replaceTabsBySpaces(string);
    res = this.mvDoubleParenthesisToNextLine(res);
    // res = this.movePlusCharNextLine(res);
    res = this.mvParenthesisToNextLine(res); // overkill of \r
    res = this.supprEmptyLine(res);
    // res = this.indentLines(res); // FIXME: tests work but not in the function..;
    return res;
  },

  supprEmptyLine: function supprEmptyLine(string) {
    return string.replace(regx_occurenceEmptyLine, '')
  },

  /**
   * move parenthesis to the next line if
   * the parenthesis isn't the first character
   */
  // position for the character could be better
  mvParenthesisToNextLine: function mvParenthesisToNextLine(string) {
    if (string.search((/^\(/)) == -1) {
      return string.replace(regx_occurenceParenthesisOpened, '\r$1')
    } else
      return string.replace(regx_occurenceDoubleOpenedParenthesis, string);
  },

  /**
   *  move double parenthesis to the next line
   */
  mvDoubleParenthesisToNextLine: function mvDoubleParenthesisToNextLine(string) {
    return string.replace(/(.*?)(\(\()(.*?$)/g, "$1\n$2$3");
  },

  indentLines: function indentLines(string) {
    return string.replace(regx_occurenceLine, "  $1")
  },

  replaceComANDwithFirstClass: function replaceComANDwithFirstClass(string) { //let parentClass= string.exec((^\..*?)([."])); // unfinished
    //return string.replace(regx_occurenceCommercialAND, "")
    return string
  },

}
