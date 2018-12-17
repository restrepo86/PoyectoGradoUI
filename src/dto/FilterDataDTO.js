import Dto from './Dto';
import { observable } from 'mobx';

class FilterDataDTO extends Dto {

  @observable cedula;

  constructor() {
    super();
    this.initialize();
  }

  initialize = () => {
    this.cedula = '';
  }

  setData = ({ cedula }) => {
    this.cedula = cedula;
  };

  getData = () => {
    const { cedula } = this;
    return Object.assign({}, { cedula });
  }

}

export default FilterDataDTO;
