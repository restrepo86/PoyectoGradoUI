import { observable } from "mobx";

class ListComponentStore {

    @observable data = localStorage.getItem('data') ? JSON.parse( localStorage.getItem('data')) : 
    
      [

        {
          title: 'Ingeniería de Sistemas',
          url: '/main/programs/engineer/systems',
        },
        {
          title: 'Ingeniería Electrónica',
          url: '/main/programs/engineer/electronic',
        },
        {
          title: 'Derecho',
          url: '/main/programs/law',
        },
        
      
      ];

}

export default ListComponentStore;