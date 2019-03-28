import React from 'react';
import { List, Button } from 'antd';
import { observer } from 'mobx-react';


@observer
class ListComponent extends React.Component {


  constructor(props) {
    super(props);
    this.filter = this.props.stores.filter;
    this.data = this.props.stores.dataListComponent.data;
  }

  componentDidMount = () => {
    //llamar al store de consulta de datos para llenar data.
  }

  state = { visible: false }

  render() {
      return(
        <div>
          <List
            itemLayout="horizontal"
            dataSource={this.data}
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

