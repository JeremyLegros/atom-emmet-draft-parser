'use babel';
const regx = require('./regularExpressions.js');
import AtomEmmetRoughParserView from './atom-emmet-rough-parser-view';
import { CompositeDisposable } from 'atom';

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
      let sRes = regx.supprInvisibleSeparators(sSelection);
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
