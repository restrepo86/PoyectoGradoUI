import { observable } from "mobx";

class ListComponentStore {

    @observable data = sessionStorage.getItem('data') ? JSON.parse( sessionStorage.getItem('data')) : [];


}

export default ListComponentStore;