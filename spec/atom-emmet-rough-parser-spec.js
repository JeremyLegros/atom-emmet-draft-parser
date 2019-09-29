// 'use babel';
//
// import AtomEmmetRoughParser from '../lib/atom-emmet-rough-parser';
//
// // Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
// //
// // To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// // or `fdescribe`). Remove the `f` to unfocus the block.
//
// describe('AtomEmmetRoughParser', () => {
//   let workspaceElement, activationPromise;
//
//   beforeEach(() => {
//     workspaceElement = atom.views.getView(atom.workspace);
//     activationPromise = atom.packages.activatePackage('atom-emmet-rough-parser');
//   });
//
//   describe('when the atom-emmet-rough-parser:uglify event is triggered', () => {
//     it('hides and shows the modal panel', () => {
//       // Before the activation event the view is not on the DOM, and no panel
//       // has been created
//       expect(workspaceElement.querySelector('.atom-emmet-rough-parser')).not.toExist();
//
//       // This is an activation event, triggering it will cause the package to be
//       // activated.
//       atom.commands.dispatch(workspaceElement, 'atom-emmet-rough-parser:uglify');
//
//       waitsForPromise(() => {
//         return activationPromise;
//       });
//
//       runs(() => {
//         expect(workspaceElement.querySelector('.atom-emmet-rough-parser')).toExist();
//
//         let atomEmmetRoughParserElement = workspaceElement.querySelector('.atom-emmet-rough-parser');
//         expect(atomEmmetRoughParserElement).toExist();
//
//         let atomEmmetRoughParserPanel = atom.workspace.panelForItem(atomEmmetRoughParserElement);
//         expect(atomEmmetRoughParserPanel.isVisible()).toBe(true);
//         atom.commands.dispatch(workspaceElement, 'atom-emmet-rough-parser:uglify');
//         expect(atomEmmetRoughParserPanel.isVisible()).toBe(false);
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
//       expect(workspaceElement.querySelector('.atom-emmet-rough-parser')).not.toExist();
//
//       // This is an activation event, triggering it causes the package to be
//       // activated.
//       atom.commands.dispatch(workspaceElement, 'atom-emmet-rough-parser:uglify');
//
//       waitsForPromise(() => {
//         return activationPromise;
//       });
//
//       runs(() => {
//         // Now we can test for view visibility
//         let atomEmmetRoughParserElement = workspaceElement.querySelector('.atom-emmet-rough-parser');
//         expect(atomEmmetRoughParserElement).toBeVisible();
//         atom.commands.dispatch(workspaceElement, 'atom-emmet-rough-parser:uglify');
//         expect(atomEmmetRoughParserElement).not.toBeVisible();
//       });
//     });
//   });
//   //
//   // describe('when the atom-emmet-rough-parser:beautify event is triggered', () => {
//   //   it('hides and shows the modal panel', () => {
//   //     // Before the activation event the view is not on the DOM, and no panel
//   //     // has been created
//   //     expect(workspaceElement.querySelector('.atom-emmet-rough-parser')).not.toExist();
//   //
//   //     // This is an activation event, triggering it will cause the package to be
//   //     // activated.
//   //     atom.commands.dispatch(workspaceElement, 'atom-emmet-rough-parser:beautify');
//   //
//   //     waitsForPromise(() => {
//   //       return activationPromise;
//   //     });
//   //
//   //     runs(() => {
//   //       expect(workspaceElement.querySelector('.atom-emmet-rough-parser')).toExist();
//   //
//   //       let atomEmmetRoughParserElement = workspaceElement.querySelector('.atom-emmet-rough-parser');
//   //       expect(atomEmmetRoughParserElement).toExist();
//   //
//   //       let atomEmmetRoughParserPanel = atom.workspace.panelForItem(atomEmmetRoughParserElement);
//   //       expect(atomEmmetRoughParserPanel.isVisible()).toBe(true);
//   //       atom.commands.dispatch(workspaceElement, 'atom-emmet-rough-parser:beautify');
//   //       expect(atomEmmetRoughParserPanel.isVisible()).toBe(false);
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
//   //     expect(workspaceElement.querySelector('.atom-emmet-rough-parser')).not.toExist();
//   //
//   //     // This is an activation event, triggering it causes the package to be
//   //     // activated.
//   //     atom.commands.dispatch(workspaceElement, 'atom-emmet-rough-parser:beautify');
//   //
//   //     waitsForPromise(() => {
//   //       return activationPromise;
//   //     });
//   //
//   //     runs(() => {
//   //       // Now we can test for view visibility
//   //       let atomEmmetRoughParserElement = workspaceElement.querySelector('.atom-emmet-rough-parser');
//   //       expect(atomEmmetRoughParserElement).toBeVisible();
//   //       atom.commands.dispatch(workspaceElement, 'atom-emmet-rough-parser:beautify');
//   //       expect(atomEmmetRoughParserElement).not.toBeVisible();
//   //     });
//   //   });
//   // });
//   //
//   //
//   // describe('when the atom-emmet-rough-parser:deleteHtmlComments event is triggered', () => {
//   //   it('hides and shows the modal panel', () => {
//   //     // Before the activation event the view is not on the DOM, and no panel
//   //     // has been created
//   //     expect(workspaceElement.querySelector('.atom-emmet-rough-parser')).not.toExist();
//   //
//   //     // This is an activation event, triggering it will cause the package to be
//   //     // activated.
//   //     atom.commands.dispatch(workspaceElement, 'atom-emmet-rough-parser:deleteHtmlComments');
//   //
//   //     waitsForPromise(() => {
//   //       return activationPromise;
//   //     });
//   //
//   //     runs(() => {
//   //       expect(workspaceElement.querySelector('.atom-emmet-rough-parser')).toExist();
//   //
//   //       let atomEmmetRoughParserElement = workspaceElement.querySelector('.atom-emmet-rough-parser');
//   //       expect(atomEmmetRoughParserElement).toExist();
//   //
//   //       let atomEmmetRoughParserPanel = atom.workspace.panelForItem(atomEmmetRoughParserElement);
//   //       expect(atomEmmetRoughParserPanel.isVisible()).toBe(true);
//   //       atom.commands.dispatch(workspaceElement, 'atom-emmet-rough-parser:deleteHtmlComments');
//   //       expect(atomEmmetRoughParserPanel.isVisible()).toBe(false);
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
//   //     expect(workspaceElement.querySelector('.atom-emmet-rough-parser')).not.toExist();
//   //
//   //     // This is an activation event, triggering it causes the package to be
//   //     // activated.
//   //     atom.commands.dispatch(workspaceElement, 'atom-emmet-rough-parser:deleteHtmlComments');
//   //
//   //     waitsForPromise(() => {
//   //       return activationPromise;
//   //     });
//   //
//   //     runs(() => {
//   //       // Now we can test for view visibility
//   //       let atomEmmetRoughParserElement = workspaceElement.querySelector('.atom-emmet-rough-parser');
//   //       expect(atomEmmetRoughParserElement).toBeVisible();
//   //       atom.commands.dispatch(workspaceElement, 'atom-emmet-rough-parser:deleteHtmlComments');
//   //       expect(atomEmmetRoughParserElement).not.toBeVisible();
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
