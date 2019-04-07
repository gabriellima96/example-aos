const GoogleMapsService = require('./GoogleMapsService')
const tasks = [
  {
    id: 1,
    title: 'Discutir novas funcionalidades da aplicação',
    description: 'Listar novas funcionalidades na reunião no coworking',
    place: {
      address:
        'Edifício Itália, JTR - R. Comerc. José Pontes de Magalhães, 70 - 506 a 509 - Jatiúca, Maceió - AL, 57036-290, Brazil',
      types: ['point_of_interest', 'establishment']
    }
  }
]

class TaskService {
  save (task) {
    task.id = new Date().getTime()
    tasks.push(task)
    return task
  }

  async saveAndFindDetailsPlace (task, place) {
    task.place = {}
    if (place) {
      task.place.address = place
      task.place = await GoogleMapsService.findDetailsPlace(place)
    }

    return this.save(task)
  }

  findById (id) {
    const task = tasks.filter(task => task.id === id).shift()
    if (task && task.place) {
      delete task.place.realtime
    }
    return task
  }

  removeById (id) {
    const task = this.findById(id)
    if (!task) return null
    return tasks.splice(task, 1)
  }

  async findByIdAndCalculateDistanceAndDuration (id, originLocation) {
    const task = this.findById(id)
    if (!task) return null

    if (!originLocation) return task

    const distanceAndDuration = await GoogleMapsService.findDistanceAndDuration(
      originLocation,
      task.place.address
    )

    task.place.realtime = distanceAndDuration

    return task
  }

  async findAllAndCalculateDistanceAndDuration (originLocation) {
    if (!originLocation) {
      return tasks.map(task => {
        delete task.place.realtime
        return task
      })
    }

    for (let i = 0; i < tasks.length; i++) {
      tasks[i].place.realtime = await GoogleMapsService.findDistanceAndDuration(
        originLocation,
        tasks[i].place.address
      )
    }

    return tasks
  }
}

module.exports = new TaskService()
