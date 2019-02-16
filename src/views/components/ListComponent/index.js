import React from 'react';
import { List } from 'antd';

const data = [

  {
    title: 'Ingeniería de Sistemas',
    url: '/main/programs/engineer/system/study/plan',
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

