import React from 'react';
import { List, Button } from 'antd';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';


@observer
class ListComponent extends React.Component {


  constructor(props) {
    super(props);
    this.filter = this.props.stores.filter;
    this.data = this.props.stores.dataListComponent.data;
  }

  componentDidMount = () => {
    
    if (this.data.length === 0) {
      this.filter.getProgramsData();
    }
    
  }

  getProgramsDataList = () => {

    if (this.filter.programsData && this.data.length === 0) {
      
      this.filter.programsData.forEach(program => {

        const item = { 'title': program.nombre, 'url': '/main/programs/inps' };
        this.data.push(item);
        
      });
      sessionStorage.setItem('data', JSON.stringify(this.data));
    
    }    
  }

  state = { visible: false }

  render() {
    this.getProgramsDataList();
    
      return(
        <div>
          <List
            itemLayout="horizontal"
            dataSource={ this.data }
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={<Link to={item.url}><center>{item.title}</center></Link>}
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
              <Link to = '/main/programs/save/program'>Agregar Programa</Link>
            </Button>
            <Button 
              type="primary"
              style={{ backgroundColor: '#026F35', color: '#fff' }}
              
            >
              <Link to = '/main/programs/save/program'>Borrar Programa</Link>
            </Button>

          </center>
        </div>
        
        
      );
    
  }

}

export default ListComponent;

