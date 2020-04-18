// 'use babel';
//
// import AtomEmmetdraftParser from '../lib/atom-emmet-draft-parser';
//
// // Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
// //
// // To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// // or `fdescribe`). Remove the `f` to unfocus the block.
//
// describe('AtomEmmetdraftParser', () => {
//   let workspaceElement, activationPromise;
//
//   beforeEach(() => {
//     workspaceElement = atom.views.getView(atom.workspace);
//     activationPromise = atom.packages.activatePackage('atom-emmet-draft-parser');
//   });
//
//   describe('when the atom-emmet-draft-parser:minify event is triggered', () => {
//     it('hides and shows the modal panel', () => {
//       // Before the activation event the view is not on the DOM, and no panel
//       // has been created
//       expect(workspaceElement.querySelector('.atom-emmet-draft-parser')).not.toExist();
//
//       // This is an activation event, triggering it will cause the package to be
//       // activated.
//       atom.commands.dispatch(workspaceElement, 'atom-emmet-draft-parser:minify');
//
//       waitsForPromise(() => {
//         return activationPromise;
//       });
//
//       runs(() => {
//         expect(workspaceElement.querySelector('.atom-emmet-draft-parser')).toExist();
//
//         let atomEmmetdraftParserElement = workspaceElement.querySelector('.atom-emmet-draft-parser');
//         expect(atomEmmetdraftParserElement).toExist();
//
//         let atomEmmetdraftParserPanel = atom.workspace.panelForItem(atomEmmetdraftParserElement);
//         expect(atomEmmetdraftParserPanel.isVisible()).toBe(true);
//         atom.commands.dispatch(workspaceElement, 'atom-emmet-draft-parser:minify');
//         expect(atomEmmetdraftParserPanel.isVisible()).toBe(false);
//       });
//     });
//
//     it('hides and shows the view', () => {
//       // This test shows you an integration test testing at the view level.
//
//       // Attaching the workspaceElement to the DOM is required to allow the
//       // `toBeVisible()` matchers to work. Anything testing visibility or focus
//       // requires that the workspaceElement is on the DOM. Tests that attach the
//       // workspaceElement to the DOM are generally slower than those off DOM.
//       jasmine.attachToDOM(workspaceElement);
//
//       expect(workspaceElement.querySelector('.atom-emmet-draft-parser')).not.toExist();
//
//       // This is an activation event, triggering it causes the package to be
//       // activated.
//       atom.commands.dispatch(workspaceElement, 'atom-emmet-draft-parser:minify');
//
//       waitsForPromise(() => {
//         return activationPromise;
//       });
//
//       runs(() => {
//         // Now we can test for view visibility
//         let atomEmmetdraftParserElement = workspaceElement.querySelector('.atom-emmet-draft-parser');
//         expect(atomEmmetdraftParserElement).toBeVisible();
//         atom.commands.dispatch(workspaceElement, 'atom-emmet-draft-parser:minify');
//         expect(atomEmmetdraftParserElement).not.toBeVisible();
//       });
//     });
//   });
//   //
//   // describe('when the atom-emmet-draft-parser:beautify event is triggered', () => {
//   //   it('hides and shows the modal panel', () => {
//   //     // Before the activation event the view is not on the DOM, and no panel
//   //     // has been created
//   //     expect(workspaceElement.querySelector('.atom-emmet-draft-parser')).not.toExist();
//   //
//   //     // This is an activation event, triggering it will cause the package to be
//   //     // activated.
//   //     atom.commands.dispatch(workspaceElement, 'atom-emmet-draft-parser:beautify');
//   //
//   //     waitsForPromise(() => {
//   //       return activationPromise;
//   //     });
//   //
//   //     runs(() => {
//   //       expect(workspaceElement.querySelector('.atom-emmet-draft-parser')).toExist();
//   //
//   //       let atomEmmetdraftParserElement = workspaceElement.querySelector('.atom-emmet-draft-parser');
//   //       expect(atomEmmetdraftParserElement).toExist();
//   //
//   //       let atomEmmetdraftParserPanel = atom.workspace.panelForItem(atomEmmetdraftParserElement);
//   //       expect(atomEmmetdraftParserPanel.isVisible()).toBe(true);
//   //       atom.commands.dispatch(workspaceElement, 'atom-emmet-draft-parser:beautify');
//   //       expect(atomEmmetdraftParserPanel.isVisible()).toBe(false);
//   //     });
//   //   });
//   //
//   //   it('hides and shows the view', () => {
//   //     // This test shows you an integration test testing at the view level.
//   //
//   //     // Attaching the workspaceElement to the DOM is required to allow the
//   //     // `toBeVisible()` matchers to work. Anything testing visibility or focus
//   //     // requires that the workspaceElement is on the DOM. Tests that attach the
//   //     // workspaceElement to the DOM are generally slower than those off DOM.
//   //     jasmine.attachToDOM(workspaceElement);
//   //
//   //     expect(workspaceElement.querySelector('.atom-emmet-draft-parser')).not.toExist();
//   //
//   //     // This is an activation event, triggering it causes the package to be
//   //     // activated.
//   //     atom.commands.dispatch(workspaceElement, 'atom-emmet-draft-parser:beautify');
//   //
//   //     waitsForPromise(() => {
//   //       return activationPromise;
//   //     });
//   //
//   //     runs(() => {
//   //       // Now we can test for view visibility
//   //       let atomEmmetdraftParserElement = workspaceElement.querySelector('.atom-emmet-draft-parser');
//   //       expect(atomEmmetdraftParserElement).toBeVisible();
//   //       atom.commands.dispatch(workspaceElement, 'atom-emmet-draft-parser:beautify');
//   //       expect(atomEmmetdraftParserElement).not.toBeVisible();
//   //     });
//   //   });
//   // });
//   //
//   //
//   // describe('when the atom-emmet-draft-parser:deleteHtmlComments event is triggered', () => {
//   //   it('hides and shows the modal panel', () => {
//   //     // Before the activation event the view is not on the DOM, and no panel
//   //     // has been created
//   //     expect(workspaceElement.querySelector('.atom-emmet-draft-parser')).not.toExist();
//   //
//   //     // This is an activation event, triggering it will cause the package to be
//   //     // activated.
//   //     atom.commands.dispatch(workspaceElement, 'atom-emmet-draft-parser:deleteHtmlComments');
//   //
//   //     waitsForPromise(() => {
//   //       return activationPromise;
//   //     });
//   //
//   //     runs(() => {
//   //       expect(workspaceElement.querySelector('.atom-emmet-draft-parser')).toExist();
//   //
//   //       let atomEmmetdraftParserElement = workspaceElement.querySelector('.atom-emmet-draft-parser');
//   //       expect(atomEmmetdraftParserElement).toExist();
//   //
//   //       let atomEmmetdraftParserPanel = atom.workspace.panelForItem(atomEmmetdraftParserElement);
//   //       expect(atomEmmetdraftParserPanel.isVisible()).toBe(true);
//   //       atom.commands.dispatch(workspaceElement, 'atom-emmet-draft-parser:deleteHtmlComments');
//   //       expect(atomEmmetdraftParserPanel.isVisible()).toBe(false);
//   //     });
//   //   });
//   //
//   //   it('hides and shows the view', () => {
//   //     // This test shows you an integration test testing at the view level.
//   //
//   //     // Attaching the workspaceElement to the DOM is required to allow the
//   //     // `toBeVisible()` matchers to work. Anything testing visibility or focus
//   //     // requires that the workspaceElement is on the DOM. Tests that attach the
//   //     // workspaceElement to the DOM are generally slower than those off DOM.
//   //     jasmine.attachToDOM(workspaceElement);
//   //
//   //     expect(workspaceElement.querySelector('.atom-emmet-draft-parser')).not.toExist();
//   //
//   //     // This is an activation event, triggering it causes the package to be
//   //     // activated.
//   //     atom.commands.dispatch(workspaceElement, 'atom-emmet-draft-parser:deleteHtmlComments');
//   //
//   //     waitsForPromise(() => {
//   //       return activationPromise;
//   //     });
//   //
//   //     runs(() => {
//   //       // Now we can test for view visibility
//   //       let atomEmmetdraftParserElement = workspaceElement.querySelector('.atom-emmet-draft-parser');
//   //       expect(atomEmmetdraftParserElement).toBeVisible();
//   //       atom.commands.dispatch(workspaceElement, 'atom-emmet-draft-parser:deleteHtmlComments');
//   //       expect(atomEmmetdraftParserElement).not.toBeVisible();
//   //     });
//   //   });
//   // });
//   //
//   //
//
//
//
//
//
//
//
//
//
//
//
//
//
// });
