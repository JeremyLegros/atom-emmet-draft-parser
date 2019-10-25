"use strict";
// TODO: write the grammar with automats
// & functions don't act as expected
// TODO: parse the & as the block name
// TODO: not parsing the interior of {} : really need automats
let regx_occurenceHtmlComment = /<!\-\-.*?\-\->/g;
let regx_occurenceInvisibleSeparators = /(\r[\n ])|(\n[ ])|( )|(\n)/g;
let regx_occurenceBeginBySpaces = /(^ {1,})(.*)/g;
let regx_occurenceBetweenParenthesis = /(\(.*?\))/g;
let regx_occurenceParenthesisOpened = /(\()/g;
let regx_occurenceGtEndOfLine = /(\>)([^\r])/g;
let regx_occurencePlus = /(\+)/g;
let regx_occurenceSomethingPlus = /(\+)(. *?[^\(])/g;
let regx_occurenceSomethingPlusSomething = /(.*?[^\)])(\+)(. *?[^\(])/g;
let regx_occurenceLine = /(^.+$)/g;
let regx_occurenceTab = /(\t)/g;
let regx_occurenceEmptyLine = /(^\r)/g;
let regx_occurenceDoubleOpenedParenthesis = /(^.*?)(\(\()(.*?$)/g;
let regx_occurenceCommercialAND = /(&)/g;
let regx_occurenceEmmetText = /\{(.*?)\}/g;

module.exports = {
  /**
   * needed to quick tests
   */
  supprHtmlComments: function supprHtmlComments(string) {
    return string.replace(regx_occurenceHtmlComment, '');
  },

  /**
   *  removes \n, \r, spaces...
   */
  supprInvisibleSeparators: function supprInvisibleSeparators(string) {
    return string.replace(/\s/g, '')
  },

  /**
   *  need automats
   */
  uglify: function uglify(string) {
    return this.supprInvisibleSeparators(string)
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
    return string.replace(regx_occurenceEmptyLine,'')
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
