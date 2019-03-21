import React from 'react';
import { List, Button } from 'antd';
import { observer } from 'mobx-react';

const data = [

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

@observer
class ListComponent extends React.Component {


  constructor(props) {
    super(props);
    this.filter = this.props.stores.filter;
  }

  state = { visible: false }

  render() {
      return(
        <div>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={<a href={item.url}><center>{item.title}</center></a>}
                />
              </List.Item>
            )}
          />
          <br/>
          <center>
            <Button 
              type="primary"
              style={{ backgroundColor: '#026F35', color: '#fff' }}
              onClick={() => window.location.href = '/main/programs/save/program'}
            >
              Agregar Programa
            </Button>
          </center>
        </div>
        
        
      );
    
  }

}

export default ListComponent;

