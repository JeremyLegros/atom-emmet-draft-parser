"use strict";
let regx_occurenceHtmlComment = /<!\-\-.*?\-\->/g;
let regx_occurenceInvisibleSeparators = /(\r[\n ])|(\n[ ])|( )|(\n)/g;
let regx_occurenceBeginBySpaces = /(^ {1,})(.*)/g;
let regx_occurenceBetweenParenthesis = /(\(.*?\))/g;
let regx_occurenceGtEndOfLine = /(\>)([^\r])/g;
let regx_occurencePlus = /\+/g;
let regx_occurenceLines = /^.+\r/g;
let regx_occurenceTab = /\t/g;

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
  movePlusCharNexLine: function movePlusCharNexLine(string) {
    return string.replace(regx_occurencePlus, '\n+')
  },

  /**
   *  quick formating
   */
  replaceTabsBySpaces: function replaceTabsBySpaces(string) {
    return string.replace(regx_occurenceTab, '  ')
  },
  /**
   *  make emmet expression more readable
   */
  beautify: function beautify(string) {
    return this.movePlusCharNexLine(this.replaceTabsBySpaces(string))
  }
}
