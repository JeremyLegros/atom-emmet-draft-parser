"use strict";
// TODO : tried with regular expressions, keept for maybe fine tunning later
// TODO : javascript DOC
// TODO : level up regular expressions
var regx_HtmlComment = /<!\-\-.*?\-\->/g;
var regx_InvisibleSeparators = /(\r[\n ])|(\n[ ])|( )|(\n)/g;
var regx_BeginBySpaces = /(^ {1,})(.*)/g;
var regx_BetweenParenthesis = /(\(.*?\))/g;
var regx_ParenthesisOpened = /(\()/g;
var regx_GtEndOfLine = /(\>)([^\r])/g;
var regx_Plus = /(\+)/g;
var regx_SomethingPlus = /(\+)(. *?[^\(])/g;
var regx_SomethingPlusSomething = /(.*?[^\)])(\+)(. *?[^\(])/g;
var regx_Line = /(^.+$)/g;
var regx_Tab = /(\t)/g;
var regx_EmptyLine = /(^\r)/g;
var regx_DoubleOpenedParenthesis = /(^.*?)(\(\()(.*?$)/g;
var regx_CommercialAND = /(&)/g;
var regx_EmmetText = /\{(.*?)\}/g;

module.exports=
{ 
  cout:
  /**
   * Alias for console.log
   * @param {*} string 
   */ 
  function cout (string){ console.log(string)},

  supprHtmlComments: 
  /**
   * needed for emmet abbreviation in html
   * @param   {string}  
   * @returns {string}
   */ 
  function s_supprHtmlComments (string) 
  { return string.replace(regx_HtmlComment, '');},


  supprSeparators:
  /**
   * removes \n, \r, spaces...
   * @param   {string}  
   * @returns {string}
   */   
  function s_supprSeparators (string) 
  { return string.replace(/\s/g, '')},


  getTextAbbreviation: 
  /**
   * return the content of the text abbreviation, the index of the closing bracket, and true if it is a comment
   * @param {*} string 
   * @param {*} indexOfBracket 
   * @returns {}
   */
  function getTextAbbreviation (string, indexOfBracket) 
  { let i = indexOfBracket; // don't take any chances with the parameters
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

  minifyAnythingButText: 
  /**
   * doesn't parse the text
   * @param   {string}  
   * @returns {string}
   */ 
  function s_minifyAnythingButText (string)
  { let sRes = '';
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

  minify: 
  /**
   * TODO : need automats ?
   * @param   {string}  
   * @returns {string}
   */ 
  function s_minify (string)
  { return this.minifyAnythingButText(string)},

  replaceTabsBySpaces: 
  /**
   * quick formating
   * @param   {string}  
   * @returns {string}
   */ 
  function s_replaceTabsBySpaces(string)
  { return string.replace(regx_Tab, '  ')},

  indent: 
  /**
   * quick formating
   * @param   {string}  
   * @param   {number}
   * @returns {string}
   */ 
  function s_indent(string, nbTimes = 1)
  { if (nbTimes <= 0) return string;
    if (nbTimes == 1) return '  ' + string;
    let sRes = '';
    while (nbTimes != 0) {
      sRes += '  '
      nbTimes--;
    }
    return (sRes + string);
  },
  lookAhead: 
  /** return the next character from the index
   * 
   * @param   {string}  
   * @param   {number}
   * @returns {string}
   */ 
  function s_lookAhead (string, index) 
  { if (index < string.length - 1) return string[index + 1]
    return null;
  },

  lookBefore: 
  /**
   * return the previous character from the index
   * @param   {string}  
   * @param   {number}
   * @returns {string}
   */ 
  function s_lookBefore (string, index) 
  { if (index > 0) return string[index - 1]
    return null;
  },

  isRussianDollParenthesis: 
  /** 
   * check if the parenthesis is inside another parenthesis
   * @param   {string}  
   * @param   {number}
   * @returns {string}
   */ 
  function s_isRussianDollParenthesis (string, index) 
  { let i = index;
    let len = string.length
    for (i; i <
      len; i++) {
      if (string[i] == '(') return true;
    }
    return false;
  },
  beautify: 
  /**
   * rmk : maybe could have be done with a split to use regx
   * @param   {string}  
   * @returns {string}
   */ 
  function s_beautify (string)
  { let sRes = '';
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

  supprEmptyLine: 
  /**
   * 
   * @param   {string}  
   * @returns {string}
   */ 
  function s_supprEmptyLine (string)
  { return string.replace(regx_EmptyLine, '')
  },

  movePlusCharNextLine: 
  /** FIXME: need to take in account the order for \r, must be used on the previous or next character
   * 
   * @param   {string}  
   * @returns {string}
   */
  function s_movePlusCharNextLine (string)
  { return string.replace(regx_Plus, '\r$1\r');
  },


  mvParenthesisToNextLine: 
  /** FIXME: need to take in account the order for \r, must be used on the previous or next character
   * move parenthesis to the next line if the parenthesis isn't the first character
   * @param   {string}  
   * @returns {string}
   */
  function s_mvParenthesisToNextLine (string)
  { if (string.search((/^\(/)) == -1)
      return string.replace(regx_ParenthesisOpened, '\r$1')
    return string.replace(regx_DoubleOpenedParenthesis, string);
  },


  mvDoubleParenthesisToNextLine: 
  /** FIXME: need to take in account the order for \r, must be used on the previous or next character
   * move double parenthesis to the next line
   * @param   {string}  
   * @returns {string}
   */
  function mvDoubleParenthesisToNextLine (string)
  { return string.replace(/(.*?)(\(\()(.*?$)/g, "$1\n$2$3");
  },


  indentLines: 
  /** FIXME: need to take in account the order for \r, must be used on the previous or next character
   * 
   * @param   {string}  
   * @returns {string}
   */
  function indentLines(string)
  { return string.replace(regx_Line, "  $1")
  },

  replaceComANDwithFirstClass: 
  /** FIXME: need to take in account the order for \r, must be used on the previous or next character
   * 
   * @param   {string}  
   * @returns {string}
   */
  function s_replaceComANDwithFirstClass(string)
  { //let parentClass= string.exec((^\..*?)([."])); // unfinished //return string.replace(regx_CommercialAND, "")
    return ""
  }
}
