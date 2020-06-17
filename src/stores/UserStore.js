import { observable, computed, action, decorate } from 'mobx'

export class UserStore {
  users = []

  user = null

  edU = null

  page = 1

  addUser = (user) => {
    this.users.push(user)
  }

  deleteUser = (userId) => {
    this.users = this.users.filter(user => user.id !== userId)
  }

  updateUser = (user) => {
    const index = this.users.findIndex(u => u.id === user.id)

    if(!index) {
      return
    }

    this.users[index] = user
  }

  removeAll = () => {
    this.users = []
  }

  setCurrentUser = (userId) => {
    this.user = this.users.find(u => u.id === userId)
  }

  setEditingUser = (user) => {
    this.edU = user
  }

  setPage = (pageNumber) => {
    this.page = pageNumber
  }

  get totalUsers () {
    return this.users.length
  }

  get currentUser () {
    return this.user
  }

  get editingUser () {
    return this.edU
  }

  get pageNumber () {
    return this.page
  }
}

decorate(UserStore, {
  users: observable,
  edU: observable,
  page: observable,
  setCurrentUser: action,
  setEditingUser: action,
  setPage: action,
  addUser: action,
  deleteUser: action,
  updateUser: action,
  removeAll: action,
  totalUsers: computed,
  currentUser: computed,
  editingUser: computed,
  pageNumber: computed
})

