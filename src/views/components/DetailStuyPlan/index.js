import React from 'react';
import { observer } from 'mobx-react';
import CardMatter from '../CardMatter';
import NewSubject from '../Modal/NewSubject';
import AsignaturaRequestDTO from '../../../dto/AsignaturaRequestDTO';
import SubjectDetailReadOnly from '../Modal/SubjectDetailReadOnly';
import { 
  Table, 
  pagination, 
  Button, 
} from 'antd';
  
const columnsNames = [{
  dataIndex: 'semestre1',
  title: 'Nivel 1',
  key: "1",
  align: 'center'
}, {
  dataIndex: 'semestre2',
  title: 'Nivel 2',
  key: "2",
  align: 'center'
}, {
  dataIndex: 'semestre3',
  title: 'Nivel 3',
  key: "3",
  align: 'center'
}, {
  dataIndex: 'semestre4',
  title: 'Nivel 4',
  key: "4",
  align: 'center'
}, {
  dataIndex: 'semestre5',
  title: 'Nivel 5',
  key: "5",
  align: 'center'
}, {
  dataIndex: 'semestre6',
  title: 'Nivel 6',
  key: "6",
  align: 'center'
}, {
  dataIndex: 'semestre7',
  title: 'Nivel 7',
  key: "7",
  align: 'center'
}, {
  dataIndex: 'semestre8',
  title: 'Nivel 8',
  key: "8",
  align: 'center'
}, {
  dataIndex: 'semestre9',
  title: 'Nivel 9',
  key: "9",
  align: 'center'
}, {
  dataIndex: 'semestre10',
  title: 'Nivel 10',
  key: "10",
  align: 'center'
}];

@observer
class DetailStudyPlan extends React.Component {

  constructor(props) {
    super(props);
    this.matters = this.props.stores.matters;
    this.process = this.props.stores.process;
    this.inpComponentStore = this.props.stores.inpComponentStore;
    this.trainingComponentStore = this.props.stores.trainingComponentStore;
    this.requirementStore = this.props.stores.requirementStore;
    this.stepChangeControlStore = this.props.stores.stepChangeControlStore;

  }
  

  state = {
    visible: false,
    visibleOnlyReadSubject: false,
    visibleSubject: false,
    nameSubject: '', 
    subjectData: {},
    trainingComponentsData: []
  }

  showModal = () => {
    this.setState({ visible: true, trainingComponentsData: this.trainingComponentStore.trainingComponentsData });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    
    const form = this.formRefAddSubject.props.form;
    form.validateFields((err, values) => {

      if (err) {
        return;
      }
      const asignaturaRequestDTO = 
        new AsignaturaRequestDTO(
          values.codigoAgregar, 
          values.componenteDeFormacionNombreAgregar, 
          values.nombreAgregar, 
          values.creditosAgregar, 
          values.horasTeoricasAgregar, 
          values.horasLaboratorioAgregar, 
          values.nivelAgregar,
          values.horasPracticasAgregar,
          values.trabajoIndependienteEstudianteAgregar,
          values.requisitoNivel,
          values.tie);

      this.matters.saveMatterData(this.inpComponentStore.inpData.programId, this.inpComponentStore.inpData.inp, asignaturaRequestDTO, this.programId);

      form.resetFields();
      this.setState({ visible: false });

    });
  };


  showOnlyReadModalSubject = () => {
    this.setState({ visibleOnlyReadSubject: true });
  };

  handleCancelOnlyReadSubject = () => {
    this.setState({ visibleOnlyReadSubject: false });
  };

  openReadOnlyModal = (propiedadesAsignatura) => {
    this.showOnlyReadModalSubject();
    this.setState({ nameSubject: propiedadesAsignatura.nombre, subjectData: propiedadesAsignatura, trainingComponentsData: this.trainingComponentStore.trainingComponentsData });
  };

  saveFormRefAddSubject = (formRefAddSubject) => {
    this.formRefAddSubject = formRefAddSubject;
  }


  componentDidMount = () => {

    this.matters.getMattersData(this.inpComponentStore.inpData.programId, this.inpComponentStore.inpData.inp);

    this.matters.setDeleteSuccess(false);
    this.matters.setUpdateSuccess(false);
    
    if (!this.trainingComponentStore.trainingComponentsData) {
      this.trainingComponentStore.getTrainingComponents();
    }
   
  }

  createAsignatureCardsBySemesters = (asignatura) => {
    
    return asignatura
      .map(asignatura => ({ ...asignatura, keyIndex: `semestre${asignatura.nivel}` }))
      .map((asignatura, index) => {
        const cardAsignatura = { key: index, name: asignatura.nivel };
        cardAsignatura[asignatura.keyIndex] = 
        <span onClick = {() => this.openReadOnlyModal({...asignatura})}>
            <CardMatter {...asignatura} />
        </span>
        return cardAsignatura;
      });
  };

  filterBySemestre = (asignaturaCard) => {

    const asignatureObject = {};
    const property = `semestre${asignaturaCard.name}`;
    asignatureObject[property] = asignaturaCard[property];

    return asignatureObject;
  };

  groupBySemester = (datosAsignaturas, semesterNumber) => {
    return datosAsignaturas.filter(asignatura => asignatura[`semestre${semesterNumber}`]);
  };

  buildSemesters = (semesterNumber, semester, semesterOrdered, totalSemester) => {
    for (let idx = 0; idx < totalSemester; idx++) {
      if (semester[idx] && semesterOrdered[idx]) {
        semesterOrdered[idx][`semestre${semesterNumber}`] = semester[idx][`semestre${semesterNumber}`];
      }
    }
    return semesterOrdered;
  };

  orderBySemester = (datosAsignaturas) => {
    
    const totalSemester = 10;
    const semesterOrdered = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    
    for (let idx = 1; idx <= totalSemester; idx++) {
      const semester = this.groupBySemester(datosAsignaturas, idx);
      if (semester) {
        this.buildSemesters(idx, semester, semesterOrdered, totalSemester);
      }
    }

    return semesterOrdered.filter(semesterData => Object.keys(semesterData).length > 0);
    
  };

  mattersBySemester = (datosAsignaturas) => {

    const matersCard = this.createAsignatureCardsBySemesters(datosAsignaturas)
    const asigantureObject = matersCard.map(asignatureCard => this.filterBySemestre(asignatureCard));
    return this.orderBySemester(asigantureObject);
  };

  render() {

    return (
      <div>
        
        <Table
          columns={columnsNames}
          dataSource={this.mattersBySemester(this.matters.mattersData)}
          scroll={{ x: 2300 }}
          size="small"
          pagination={pagination}
          align={"center"}
        />
        <br/>
        <center>
          <Button 
            type="primary"
            onClick={this.showModal}
          >
            Agregar Asignatura
          </Button>
          <NewSubject
            wrappedComponentRef={this.saveFormRefAddSubject}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            trainingComponentsData={this.state.trainingComponentsData}
          />
          <SubjectDetailReadOnly
            visibleSubject={this.state.visibleOnlyReadSubject}
            nameSubject={this.state.nameSubject}
            subjectData={this.state.subjectData}
            onCancel={this.handleCancelOnlyReadSubject}
            trainingComponentsData={this.state.trainingComponentsData}
            mattersStore={this.matters}
            programId={this.inpComponentStore.inpData.programId}
            inp={this.inpComponentStore.inpData.id}
            requirementStore={this.requirementStore}
            process={this.process}
            {...this.props}
            stepChangeControlStore={this.stepChangeControlStore}
          />
        </center>

      </div>
    );
  }

}


export default DetailStudyPlan;