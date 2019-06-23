import React from 'react';
import { observer } from 'mobx-react';
import { Table, pagination, Form, Input, Modal, Button, Select } from 'antd';
import { Link } from 'react-router-dom';
import CardMatter from '../CardMatter';
import AsignaturaRequestDTO from '../../../dto/AsignaturaRequestDTO';
import UpdateMatterRequestDTO from '../../../dto/UpdateMatterRequestDTO';


const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(

  class extends React.Component {

    render() {

      const {
        visible, onCancel, onCreate, form, trainingComponentsData
      } = this.props;

      const { getFieldDecorator } = form;
      const Option = Select.Option;

      return (
        <Modal
          visible={visible}
          title="Agregue una nueva asignatura"
          okText="Agregar"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">

            <Form.Item label="Código">
              {getFieldDecorator('codigoAgregar', {
                rules: [{ required: true, message: 'Por favor ingrese el codigo de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Nombre">
              {getFieldDecorator('nombreAgregar', {
                rules: [{ required: true, message: 'Por favor ingrese el nombre de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Componente de Formación">
              {getFieldDecorator('componenteDeFormacionNombreAgregar')(
               
                <Select>
                  {trainingComponentsData.map(trainingComponent =>
                    <Option value={trainingComponent.nombre}>{trainingComponent.nombre}</Option>
                  )}
              </Select>
              
              )}
            </Form.Item>

            <Form.Item label="Horas Teóricas">
              {getFieldDecorator('horasTeoricasAgregar', {
                rules: [{ required: true, message: 'Por favor ingrese las horas teóricas de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Horas Laboratorio">
              {getFieldDecorator('horasLaboratorioAgregar', {
                rules: [{ required: true, message: 'Por favor ingrese las horas de laboratorio de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Horas Prácticas">
              {getFieldDecorator('horasPracticasAgregar', {
                rules: [{ required: false, message: 'Por favor ingrese las horas prácticas de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Horas Trabajo Independiente del Estudiante">
              {getFieldDecorator('trabajoIndependienteEstudianteAgregar', {
                rules: [{ required: true, message: 'Por favor ingrese las horas de trabajo independiente del estudiante de la asignatura!' }],  
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Nivel">
              {getFieldDecorator('nivelAgregar', {
                rules: [{ required: true, message: 'Por favor ingrese el nivel al que pertenece la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Créditos">
              {getFieldDecorator('creditosAgregar', {
                rules: [{ required: true, message: 'Por favor ingrese los créditos de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>
            
          </Form>
        </Modal>
      );
    }
  }
);


const SubjectDetail = Form.create({ name: 'form_in_modal' })(

  class extends React.Component {

    deleteSubject = (subjectId, mattersStore, programId, inp) => {
      mattersStore.deleteMatterData(programId, inp, subjectId);
    };

    render() {

      const {
        visibleSubject, 
        onCancel, 
        onCreateSubjectUpdate, 
        form, 
        nameSubject, 
        subjectData, 
        trainingComponentsData,
        mattersStore,
        programId, 
        inp
      } = this.props;

      const { getFieldDecorator } = form;
      const Option = Select.Option;
      const trainingComponentSubject =  { ... subjectData.componenteDeFormacion };

      return (
        <Modal
          
          style={{ backgroundColor: '#026F35', color: '#fff' }}
          visible={visibleSubject}
          title={nameSubject}
          okText="Actualizar"
          onCancel={onCancel}
          onOk={onCreateSubjectUpdate}
          
        >
          <Form layout="vertical">

            <Form.Item label="Código">
              {getFieldDecorator('codigo', {
                initialValue: subjectData.codigo,
                rules: [{ required: true, message: 'Por favor ingrese el codigo de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Nombre">
              {getFieldDecorator('nombre', {
                initialValue: subjectData.nombre,
                rules: [{ required: true, message: 'Por favor ingrese el nombre de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Componente de Formación">
              {getFieldDecorator('componenteFormacion', {
                  initialValue: trainingComponentSubject.nombre,
              })(
               
                <Select>
                  {trainingComponentsData.map(trainingComponent =>
                    <Option value={trainingComponent.nombre}>{trainingComponent.nombre}</Option>
                  )}
                </Select>
              
              )}
            </Form.Item>

            <Form.Item label="Horas Teóricas">
              {getFieldDecorator('horasTeoricas', {
                initialValue: subjectData.horasTeoricas,
                rules: [{ required: true, message: 'Por favor ingrese las horas teóricas de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Horas Laboratorio">
              {getFieldDecorator('horasLaboratorio', {
                initialValue: subjectData.horasLaboratorio,
                rules: [{ required: true, message: 'Por favor ingrese las horas de laboratorio de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Horas Prácticas">
              {getFieldDecorator('horasPracticas', {
                initialValue: subjectData.horasPracticas,
                rules: [{ required: false, message: 'Por favor ingrese las horas prácticas de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Horas Trabajo Independiente del Estudiante">
              {getFieldDecorator('trabajoIndependienteEstudiante', {
                initialValue: subjectData.horasIndependientesDelEstudiante,
                rules: [{ required: true, message: 'Por favor ingrese las horas de trabajo independiente del estudiante de la asignatura!' }],  
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Nivel">
              {getFieldDecorator('nivel', {
                initialValue: subjectData.nivel,
                rules: [{ required: true, message: 'Por favor ingrese el nivel al que pertenece la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Créditos">
              {getFieldDecorator('creditos', {
                initialValue: subjectData.creditos,
                rules: [{ required: true, message: 'Por favor ingrese los créditos de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <center>
              <Button
                onClick = {() => this.deleteSubject(subjectData.codigo, mattersStore, programId, inp)}
              >
                Eliminar
              </Button>
            </center>

          </Form>
        </Modal>
      );
    }
  }
);

  
const columnsNames = [{
  dataIndex: 'semestre1',
  title: 'Nivel 1',
  key: "1",
}, {
  dataIndex: 'semestre2',
  title: 'Nivel 2',
  key: "2",
}, {
  dataIndex: 'semestre3',
  title: 'Nivel 3',
  key: "3",
}, {
  dataIndex: 'semestre4',
  title: 'Nivel 4',
  key: "4",
}, {
  dataIndex: 'semestre5',
  title: 'Nivel 5',
  key: "5",
}, {
  dataIndex: 'semestre6',
  title: 'Nivel 6',
  key: "6",
}, {
  dataIndex: 'semestre7',
  title: 'Nivel 7',
  key: "7",
}, {
  dataIndex: 'semestre8',
  title: 'Nivel 8',
  key: "8",
}, {
  dataIndex: 'semestre9',
  title: 'Nivel 9',
  key: "9",
}, {
  dataIndex: 'semestre10',
  title: 'Nivel 10',
  key: "10",
}];

@observer
class DetailStudyPlan extends React.Component {

  constructor(props) {
    super(props);
    this.matters = this.props.stores.matters;
    this.process = this.props.stores.process;
    this.inpComponentStore = this.props.stores.inpComponentStore;
    this.trainingComponentStore = this.props.stores.trainingComponentStore;

  }
  

  state = {
    visible: false,
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
      console.log('values', values)
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
          values.trabajoIndependienteEstudianteAgregar);

      this.matters.saveMatterData(this.inpComponentStore.inpData.programId, this.inpComponentStore.inpData.inp, asignaturaRequestDTO, this.programId);

      form.resetFields();
      this.setState({ visible: false });

    });
  };

  showModalSubject = () => {
    this.setState({ visibleSubject: true });
  };

  handleCancelSubject = () => {
    this.setState({ visibleSubject: false });
  };

  handleUpdate = () => {

    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      console.log('valuesUpdate', values)
      if (err) {
        return;
      }
      const updateMatterRequestDTO = new UpdateMatterRequestDTO(
        values.componenteFormacion, 
        values.nombre,
        values.creditos,
        values.horasTeoricas,
        values.horasLaboratorio,
        values.horasPracticas,
        values.trabajoIndependienteEstudiante,
        values.nivel
      );
      
      this.matters.updateMatterData(this.inpComponentStore.inpData.programId, this.inpComponentStore.inpData.inp, updateMatterRequestDTO, values.codigo);

      form.resetFields();
      this.setState({ visibleSubject: false });

    });

  };

  openModal = (propiedadesAsignatura) => {
    console.log('propiedadesAsignatura', propiedadesAsignatura);
    this.showModalSubject();
    this.setState({ nameSubject: propiedadesAsignatura.nombre, subjectData: propiedadesAsignatura, trainingComponentsData: this.trainingComponentStore.trainingComponentsData });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

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
          <Button
            style={{ 
              height: 'auto'    
            }}
            onClick = {() => this.openModal({...asignatura})}
          >
            <CardMatter {...asignatura} />
          </Button>;
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
    const semesterOrdered = [];
    for (let idx = 1; idx <= totalSemester; idx++) {
      const semester = this.groupBySemester(datosAsignaturas, idx);
      if (semester) {
        semesterOrdered[idx - 1] = {};
        this.buildSemesters(idx, semester, semesterOrdered, totalSemester);
      }
    }
    const semesters = semesterOrdered.filter(semesterData => Object.keys(semesterData).length > 0);
    return semesters;
    
  };

  mattersBySemester = (datosAsignaturas) => {

    const matersCard = this.createAsignatureCardsBySemesters(datosAsignaturas)
    const asigantureObject = matersCard.map(asignatureCard => this.filterBySemestre(asignatureCard));
    return this.orderBySemester(asigantureObject);
  };

  render() {
    console.log('mattersData', this.matters.mattersData);
    return (
      <div>
        
        <Table
          rowKey={record => record.uid}
          columns={columnsNames}
          dataSource={this.mattersBySemester(this.matters.mattersData)}
          scroll={{ x: 2300 }}
          size="small"
          pagination={pagination}
        />
        <br/>
        <center>
          <Button 
            type="primary" 
            style={{ backgroundColor: '#026F35', color: '#fff' }}
            onClick={this.showModal}
          >
            Agregar Asignatura
          </Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRefAddSubject}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            trainingComponentsData={this.state.trainingComponentsData}
          />
          <SubjectDetail 
            wrappedComponentRef={this.saveFormRef}
            visibleSubject={this.state.visibleSubject}
            nameSubject={this.state.nameSubject}
            subjectData={this.state.subjectData}
            onCancel={this.handleCancelSubject}
            onCreateSubjectUpdate={this.handleUpdate}
            trainingComponentsData={this.state.trainingComponentsData}
            mattersStore={this.matters}
            programId={this.inpComponentStore.inpData.programId}
            inp={this.inpComponentStore.inpData.inp}
          />
        </center>

      </div>
    );
  }

}


export default DetailStudyPlan;