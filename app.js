const { request, response } = require('express')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json());

const { Todo } = require("./models")

app.get("/todos", async (request, response) => {
    console.log("Todo list")
    try{
        const todo = await Todo.findAll({order: [["id","ASC"]]});
        return response.json(todo)
        }
        catch(error){
        console.log(error);
        return response.status(422).json(error);
        }
});
app.get("/todos/:id", async function (request, response) {
    try {
      const todo = await Todo.findByPk(request.params.id);
      return response.json(todo);
    } catch (error) {
      console.log(error);
      return response.status(422).json(error);
    }
  });
  
app.post("/todos", async (request, response) => {
    console.log("Creating a todo", request.body)
    try {
        const todo = await Todo.addTodo({ title: request.body.title, dueDate: request.body.dueDate, completed: false })
        return response.json(todo)
    }   catch (error) {
        console.log(error)
        return response.status(422).json(error)
    } 
});
app.put("/todos/:id/markAsCompleted", async (request, response) => {
    console.log("We have to update to todo with ID:", request.params.id)
    const todo= await Todo.findByPk(request.params.id)
    try{
        const updatedTodo = await todo.markAsCompleted()
        return response.json(updatedTodo)
    }   catch (error) {
        console.log(error)
        return response.status(422).json(error)
    }
    
});
app.delete("/todos/:id", async(request, response) => {
    console.log("Delete a todo by ID: ", request.params.id)
    try{
        const deleted = await Todo.destroy({where: {id: request.params.id} });
          
          response.send(deleted ? true : false);
    
        }
        catch(error){
        console.log(error);
        return response.status(422).json(error);
        }
});

module.exports = app;