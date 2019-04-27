import { observable } from "mobx";

class ProgramsComponentStore {

    @observable data = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
    @observable programClickData;
    @observable programClickSuccess = false;

    setProgramClickData = (programClickData) => {
        this.programClickData = programClickData;
    }

    setProgramClickSuccess = (programClickSuccess) => {
        this.programClickSuccess = programClickSuccess;
    }

}

export default ProgramsComponentStore;