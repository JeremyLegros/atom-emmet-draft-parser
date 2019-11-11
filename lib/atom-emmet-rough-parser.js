'use babel'; // in case
const regx = require('./regularExpressions.js');
// for development purposes, my github repository is not in /.atom ( but a shortcut is)
const originalDev = false;//  TODO: put the value in package settings somehow
const emmet = originalDev?require('../../../.atom/packages/emmet/node_modules/emmet/lib/emmet.js'):require('../../emmet/node_modules/emmet/lib/emmet.js');

import AtomEmmetRoughParserView from './atom-emmet-rough-parser-view';
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

  atomEmmetRoughParserView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomEmmetRoughParserView = new AtomEmmetRoughParserView(state.atomEmmetRoughParserViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomEmmetRoughParserView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that uglifies
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-emmet-rough-parser:uglify': () => this.uglify()
    }));

    // Register command that beautify
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-emmet-rough-parser:beautify': () => this.beautify()
    }));

    // Register command that uglify then expand emmet abbreviations
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-emmet-rough-parser:compile': () => this.compile()
    }));

    // Register command that delete html comments
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-emmet-rough-parser:deleteHtmlComments': () => this.deleteHtmlComments()
    }));

  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomEmmetRoughParserView.destroy();
  },

  serialize() {
    return {
      atomEmmetRoughParserViewState: this.atomEmmetRoughParserView.serialize()
    };
  },

  uglify() {
    console.log('Emmet-Rough-Parser uglified selected text!');
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      let sSelection = editor.getSelectedText();
      let sRes = regx.uglify(sSelection);
      editor.insertText(sRes)
    }
  },

  beautify() {
    console.log('Emmet-Rough-Parser beautified selected text!');
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      let sSelection = editor.getSelectedText();
      let sRes = regx.beautify(sSelection);
      editor.insertText(sRes)
    }
  },
  compile() {
    console.log('Emmet-Rough-Parser compiled selected text!');
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      let sSelection = editor.getSelectedText();
      let sRes = regx.uglify(sSelection);
      sRes = emmet.expandAbbreviation(sRes, emmet.syntax, profile, emmet.contextNode)
      editor.insertText(sRes);
    }
  },

  deleteHtmlComments() {
    console.log('Emmet-Rough-Parser deleted all selected comments!');
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      let sSelection = editor.getSelectedText();
      let sRes = regx.supprHtmlComments(sSelection);
      editor.insertText(sRes)
    }
  }
};
