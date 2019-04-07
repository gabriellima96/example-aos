const TaskService = require('../services/TaskService')

class TaskController {
  async save (req, res) {
    const { title, description, place } = req.body

    const task = await TaskService.saveAndFindDetailsPlace(
      {
        title,
        description
      },
      place
    )

    return res.status(201).json(task)
  }

  async findAll (req, res) {
    const { location } = req.query
    const tasks = await TaskService.findAllAndCalculateDistanceAndDuration(
      location
    )
    return res.json(tasks)
  }

  remove (req, res) {
    const id = req.params.id
    return TaskService.removeById(+id)
      ? res.status(204).json()
      : res.status(404).json()
  }

  async findById (req, res) {
    const { id } = req.params
    const { location } = req.query
    const task = await TaskService.findByIdAndCalculateDistanceAndDuration(
      +id,
      location
    )
    return task ? res.json(task) : res.status(404).json()
  }
}

module.exports = new TaskController()
