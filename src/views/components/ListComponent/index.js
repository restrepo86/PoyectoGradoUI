import React from 'react';
import { List } from 'antd';

const data = [

  {
    title: 'Ingeniería de Sistemas',
    url: '/programs/engineer/systems',
  },
  {
    title: 'Ingeniería Electrónica',
    url: '/programs/engineer/electronic',
  },
  {
    title: 'Derecho',
    url: '/programs/law',
  },

];

class ListComponent extends React.Component {

    render() {
        return(
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
        );
      
    }

}

export default ListComponent;

