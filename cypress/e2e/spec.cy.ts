/// <reference types="cypress">

import * as todos from "@fixtures/todos.json";

function addTodo(todoText: string) {
    let todo1 = cy.get("[data-testid='text-input']");
    todo1.click();
    todo1.type(todoText);
    todo1.type("{enter}");
}

function removeTodo(todoText: string) {
    let todoItem = cy.get("[data-testid='todo-item-label']").contains(todoText);
    //todoItem.trigger('mouseover');
    todoItem.realHover();
    let todoItemRemoveButton = 
        cy.get("[data-testid='todo-item-label']").contains(todoText)
          .siblings("[data-testid='todo-item-button']");
    todoItemRemoveButton.click({force: true});
}

it('add and remove a single todo item using todo item remove button', () => {
    cy.visit("https://todomvc.com/examples/react/dist/");
    addTodo("1234");

    let todo1Label = cy.get("[data-testid='todo-item-label']").contains("1234");
    todo1Label.should("be.visible");
    removeTodo("1234");
});

it('add multiple todo items in sequence', () => {
    cy.visit("https://todomvc.com/examples/react/dist/");

    todos.list.forEach((list) => {
        addTodo(list.name);
    });

    todos.list.forEach((list) => {
        let todo1Label = cy.get("[data-testid='todo-item-label']").contains(list.name);
        todo1Label.should("be.visible");
    })

    cy.get("[data-testid='todo-item-label']").then(($todoLabels) => {
        console.log($todoLabels.length);
        for (let index=0; index < $todoLabels.length; index++) {
            assert.equal($todoLabels[index].innerHTML, todos.list[index].name);
            assert.equal(index, todos.list[index].order);
        }
    });

    todos.list.forEach(list => {
        removeTodo(list.name);
    });
});

