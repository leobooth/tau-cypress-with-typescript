// in TypeScript, global modules need to either import or export something
// the easiest way to solve this is to add a global export
 export {}

//import { Placeholders } from "../typings/placeholders";
declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Get a Todo label based on the text it contains
             * @param todoText text displayed in the todo label
             * @example
             * // this command
             * cy.getTodoLabel("todo1")
             * // will select this element
             * <label data-testid="todo-item-label">todo1</label>
             */
            // getTodoLabel(todoText: Placeholders): Chainable<any>
            getTodoLabel(todoText: string): Chainable<any>
        }
    }
}

Cypress.Commands.add('getTodoLabel', 
    // (todoText: Placeholders) => {
    (todoText: string) => {
        Cypress.log( {
            displayName: 'getTodoLabel',
            message: todoText,
            consoleProps() {
                return {
                    selector: todoText,
                }
            }
        });

        cy.get("[data-testid='todo-item-label']").contains(todoText);
    }
);