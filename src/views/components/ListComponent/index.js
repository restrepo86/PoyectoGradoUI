import React from 'react';
import { List, Button } from 'antd';
import { observer } from 'mobx-react';
import { Link, Redirect } from 'react-router-dom';


@observer
class ListComponent extends React.Component {


  constructor(props) {
    super(props);
    this.filter = this.props.stores.programs;
    this.data = this.props.stores.dataListComponent.data;
    this.dataListComponent = this.props.stores.dataListComponent;
  }

  componentDidMount = () => {
    
    this.filter.setSaveSuccess(false);
    if (this.data.length === 0) {
      this.filter.getProgramsData();
    }
    
  }

  getProgramsDataList = () => {
    
    if (this.filter.programsData && this.data.length === 0) {   
      
      const programs = this.filter.programsData.map(program => ({ 'title': program.nombre, 'programData': program }));
      this.data = this.data.concat(programs);
      localStorage.setItem('data', JSON.stringify(this.data)); 
    }    
  }

  clickProgramAction = (item) => {

    this.dataListComponent.setProgramClickData(item);
    this.dataListComponent.setProgramClickSuccess(true);
    
  }

  state = { visible: false }

  render() {

    this.getProgramsDataList();
    if (this.dataListComponent.programClickSuccess) {
      return <Redirect to='/main/programs/inps' />
    }
    
      return(
        <div>
          <List
            itemLayout="horizontal"
            dataSource={ this.data }
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <center>
                      <Button
                        onClick={() => this.clickProgramAction(item)}
                      >
                        {item.title}
                      </Button>
                    </center>
                  }
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
              <Link to='/main/programs/save/program'>Agregar Programa</Link>
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

