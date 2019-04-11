import React from "react";
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { List, Card, Button } from "antd";
import "./index.css";

const data = [
  {
    title: "INP 1"
  },
  {
    title: "INP 2"
  },
  {
    title: "INP 3"
  },
  {
    title: "INP 4"
  }
];

@observer
class InpsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.dataListComponent = this.props.stores.dataListComponent;
    this.studyPlan = this.props.stores.studyPlan;
  }

  componentDidMount = () => {
    this.dataListComponent.setProgramClickSuccess(false);
    const sniesCode = this.dataListComponent.programClickData.programData.codigoSnies;
    this.studyPlan.getStudyPlanData(sniesCode);
  }


    render = () => {
      console.log('program ', this.dataListComponent.programClickData)
      
      this.studyPlanData = sessionStorage.getItem('studyPlanData') ? JSON.parse(sessionStorage.getItem('studyPlanData')) : [];
      console.log('this.studyPlanData', this.studyPlanData);
        return(
            <List
            grid={{ gutter: 10, column: 3 }}
            dataSource={this.studyPlanData}
            renderItem={item => (
              <List.Item>
                <Button 
                    style={{ 
                        backgroundColor: '#026F35', 
                        color: '#fff',
                        height: 'auto'    
                    }}
                >
                  <Link to="/main/programs/inps/studyplan">
                    <Card title={item.inp}>
                      {`Creditos: ${item.creditos}`}<br />
                      {`Fecha de Registro: ${(item.fechaDeRegistro).substring(0, 10)}`}<br />
                      {`Fecha de Modificación: ${(item.fechaDeModificacion).substring(0, 10)}`}<br />
                    </Card>
                  </Link>
                </Button>
              </List.Item>
            )}
          />

        );
    }


}

export default InpsComponent;

