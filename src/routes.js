const express = require('express')
const TaskController = require('./app/controllers/TaskController')

const routes = express.Router()

routes.get('/', (req, res) => {
  res.json({
    routes: [
      {
        method: 'GET',
        url: '/tasks',
        query: 'location',
        examples: ['/tasks', '/tasks?location=ufal']
      },
      {
        method: 'GET',
        url: '/tasks/:id',
        query: 'location',
        examples: ['/tasks/1', '/tasks/1?location=ufal']
      },
      {
        method: 'POST',
        url: '/tasks',
        body: {
          title: 'texto',
          description: 'texto',
          place: 'texto'
        },
        examples: ['/tasks']
      },
      {
        method: 'DELETE',
        url: '/tasks/:id',
        examples: ['/tasks/1']
      }
    ]
  })
})
routes.post('/tasks', TaskController.save)
routes.get('/tasks', TaskController.findAll)
routes.delete('/tasks/:id', TaskController.remove)
routes.get('/tasks/:id', TaskController.findById)

module.exports = routes
