import React from 'react';
import { List, Button, Card, Icon, Tooltip } from 'antd';
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
    if (!this.registerProgramStore.programsData 
      || this.registerProgramStore.updateSuccess 
      || this.registerProgramStore.deleteSuccess) {

      this.registerProgramStore.getProgramsData();
      this.registerProgramStore.setUpdateSuccess(false);
      this.registerProgramStore.setDeleteProgramSuccess(false);

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
                <center>
                <Card 
                  title={item.title} 
                  extra={
                    <a
                      onClick = {(e) => {e.stopPropagation();}}
                    >
                      <Link to = '/main/programs/update/program'>
                        <Tooltip placement="top" title={"Editar Programa"}>
                          <Icon type="edit" />
                        </Tooltip>
                      </Link>
                    </a>
                  }
                  onClick = {() => this.clickProgramAction(item)}
                  hoverable = "true"
                >
                    Codigo SNIES: {item.programData.codigoSnies}
                </Card>
                </center>
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
              <Link to = '/main/programs/update/program'>Actualizar Programa</Link>
            </Button>
            <Button 
              type="primary"
              style={{ backgroundColor: '#026F35', color: '#fff' }}
              
            >
              <Link to = '/main/programs/delete'>Borrar Programa</Link>
            </Button>

          </center>
        </div>
        
        
      );
    
  }

}

export default ProgramsComponent;

