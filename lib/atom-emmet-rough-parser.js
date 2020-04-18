'use babel'; // in case
const regx = require('./regularExpressions.js');
// for development purposes, my github repository is not in /.atom ( but a shortcut is)
const originalDev = false;//  TODO: put the value in package settings somehow
const emmet = originalDev?require('../../../.atom/packages/emmet/node_modules/emmet/lib/emmet.js'):require('../../emmet/node_modules/emmet/lib/emmet.js');

import AtomEmmetdraftParserView from './atom-emmet-draft-parser-view';
import {
  CompositeDisposable
} from 'atom';


// copy paste of the default profile of the emmet repositorie,
// as it is not a substantial portion of the software, it should be permitted
// MIT licence
const profile = {
  tag_case: 'asis',
  attr_case: 'asis',
  attr_quotes: 'double',

  // Each tag on new line
  tag_nl: 'decide',

  // With tag_nl === true, defines if leaf node (e.g. node with no children)
  // should have formatted line breaks
  tag_nl_leaf: false,

  place_cursor: true,

  // Indent tags
  indent: true,

  // How many inline elements should be to force line break
  // (set to 0 to disable)
  inline_break: 3,

  // Produce compact notation of boolean attribues:
  // attributes where name and value are equal.
  // With this option enabled, HTML filter will
  // produce <div contenteditable> instead of <div contenteditable="contenteditable">
  compact_bool: true,

  // Use self-closing style for writing empty elements, e.g. <br /> or <br>
  self_closing_tag: false,

  // Profile-level output filters, re-defines syntax filters
  filters: 'html,bem',

  // Additional filters applied to abbreviation.
  // Unlike "filters", this preference doesn't override default filters
  // but add the instead every time given profile is chosen
  extraFilters: ''
};

export default {

  atomEmmetdraftParserView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomEmmetdraftParserView = new AtomEmmetdraftParserView(state.atomEmmetdraftParserViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomEmmetdraftParserView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that uglifies
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-emmet-draft-parser:minify': () => this.minify()
    }));

    // Register command that beautify
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-emmet-draft-parser:beautify': () => this.beautify()
    }));

    // Register command that minify then expand emmet abbreviations
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-emmet-draft-parser:compile': () => this.compile()
    }));

    // Register command that delete html comments
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-emmet-draft-parser:deleteHtmlComments': () => this.deleteHtmlComments()
    }));

  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomEmmetdraftParserView.destroy();
  },

  serialize() {
    return {
      atomEmmetdraftParserViewState: this.atomEmmetdraftParserView.serialize()
    };
  },

  minify() {
    console.log('Emmet-draft-Parser uglified selected text!');
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      let sSelection = editor.getSelectedText();
      let sRes = regx.minify(sSelection);
      editor.insertText(sRes)
    }
  },

  beautify() {
    console.log('Emmet-draft-Parser beautified selected text!');
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      let sSelection = editor.getSelectedText();
      let sRes = regx.beautify(sSelection);
      editor.insertText(sRes)
    }
  },
  compile() {
    console.log('Emmet-draft-Parser compiled selected text!');
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      let sSelection = editor.getSelectedText();
      let sRes = regx.minify(sSelection);
      sRes = emmet.expandAbbreviation(sRes, emmet.syntax, profile, emmet.contextNode)
      editor.insertText(sRes);
    }
  },

  deleteHtmlComments() {
    console.log('Emmet-draft-Parser deleted all selected comments!');
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      let sSelection = editor.getSelectedText();
      let sRes = regx.supprHtmlComments(sSelection);
      editor.insertText(sRes)
    }
  }
};
