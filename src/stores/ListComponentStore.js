import { observable } from "mobx";

class ListComponentStore {

    @observable data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];


}

export default ListComponentStore;