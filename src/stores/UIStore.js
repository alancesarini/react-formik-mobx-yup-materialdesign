import { observable, computed, action, decorate } from 'mobx'

export class UIStore {
  showModal = false

  toggleModal = () => {
    this.showModal = !this.showModal
  }

  get modalState () {
    return this.showModal
  }
}

decorate(UIStore, {
  showModal: observable,
  toggleModal: action,
  modalState: computed
})

