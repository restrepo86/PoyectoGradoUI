import React from 'react';
import { List, Button } from 'antd';
import { observer } from 'mobx-react';
import { Link, Redirect } from 'react-router-dom';


@observer
class ProgramsComponent extends React.Component {


  constructor(props) {
    super(props);
    this.registerProgramStore = this.props.stores.programs;
    this.programsComponentStore = this.props.stores.programsComponentStore;
  }

  componentDidMount = () => {
    
    this.registerProgramStore.setSaveSuccess(false);
    if (!this.registerProgramStore.programsData) {
      this.registerProgramStore.getProgramsData();
    }
    
  }

  clickProgramAction = (item) => {

    this.programsComponentStore.setProgramClickData(item);
    this.programsComponentStore.setProgramClickSuccess(true);
    
  }

  state = { visible: false }

  render() {

    if (this.programsComponentStore.programClickSuccess) {
      return <Redirect to='/main/programs/inps' />
    }
    
      return(
        <div>
          <List
            itemLayout="horizontal"
            dataSource={ this.registerProgramStore.programsData }
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

export default ProgramsComponent;
