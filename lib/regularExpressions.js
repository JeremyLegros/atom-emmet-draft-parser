"use strict";
// TODO: write the grammar with automats
// & functions don't act as expected
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
let regx_emptyLine = /(\r\n$)/g;
let regx_occurenceDoubleOpenedParenthesis = /(^.*?)(\(\()(.*?$)/g;

module.exports = {
  /**
   * needed to quick tests
   */
  supprHtmlComments: function supprHtmlComments(string) {
    return string.replace(regx_occurenceHtmlComment, '');
  },

  /**
   *  removes \n, \r, \ , a.k.a emmet uglify
   */
  supprInvisibleSeparators: function supprInvisibleSeparators(string) {
    return string.replace(regx_occurenceInvisibleSeparators, '')
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
    res = this.movePlusCharNextLine(res);
    // res = this.mvParenthesisToNextLine(res);// overkill of \r
    // res = this.indentLines(res); // FIXME: tests work but not in the function..;
    return res;
  },

  /**
   * move parenthesis to the next line if the line
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
  }

}
