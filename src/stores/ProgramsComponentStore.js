import { observable } from "mobx";

class ProgramsComponentStore {

    @observable programClickData;
    @observable programClickSuccess = false;

    setProgramClickData = (programClickData) => {
        this.programClickData = programClickData;
    };

    setProgramClickSuccess = (programClickSuccess) => {
        this.programClickSuccess = programClickSuccess;
    };

}

export default ProgramsComponentStore;