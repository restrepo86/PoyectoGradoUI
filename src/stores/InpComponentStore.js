import { observable } from "mobx";

class InpComponentStore {

    @observable inpData = {};

    setInpData = (inpData) => {
        this.inpData = inpData;
    };

}

export default InpComponentStore;