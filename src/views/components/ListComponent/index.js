import React from 'react';
import { List, Button } from 'antd';

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

class ListComponent extends React.Component {

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
              >
                Agregar Programa
              </Button>
            </center>
          </div>
          
          
        );
      
    }

}

export default ListComponent;

