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
        visible, onCancel, onCreate, form,
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
              {getFieldDecorator('codigo', {
                rules: [{ required: true, message: 'Por favor ingrese el codigo de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Componente de Formación">
              {getFieldDecorator('componenteFormacion') (
               
                  <Select>
                    <Option value="cienciabasicadeingenieria">Ciencia básica de Ingenieria</Option>
                    <Option value="formacioncomplementaria">Formacion complementaria</Option>
                    <Option value="ingenieriaaplicada">Ingeniería aplicada</Option>
                    <Option value="cienciabasica">Ciencia básica</Option>
                    <Option value="optativainterdisciplinaria">Optativa interdisciplinaria</Option>
                  </Select>
              
              )}
            </Form.Item>

            <Form.Item label="Nombre">
              {getFieldDecorator('nombre', {
                rules: [{ required: true, message: 'Por favor ingrese el nombre de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Horas Teóricas">
              {getFieldDecorator('horasTeoricas', {
                rules: [{ required: true, message: 'Por favor ingrese las horas teóricas de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Horas Laboratorio">
              {getFieldDecorator('horasLaboratorio', {
                rules: [{ required: true, message: 'Por favor ingrese las horas de laboratorio de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Horas Prácticas">
              {getFieldDecorator('horasPracticas', {
                rules: [{ required: false, message: 'Por favor ingrese las horas prácticas de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Horas Trabajo Independiente del Estudiante">
              {getFieldDecorator('trabajoIndependienteEstudiante', {
                rules: [{ required: true, message: 'Por favor ingrese las horas de trabajo independiente del estudiante de la asignatura!' }],  
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Nivel">
              {getFieldDecorator('nivel', {
                rules: [{ required: true, message: 'Por favor ingrese el nivel al que pertenece la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Créditos">
              {getFieldDecorator('creditos', {
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

    render() {
      const {
        visibleSubject, onCancel, onCreateSubjectUpdate, form, nameSubject, subjectData
      } = this.props;
      const { getFieldDecorator } = form;
      const Option = Select.Option;

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

            <Form.Item label="Componente de Formación">
              {getFieldDecorator('componenteFormacion', {
                  initialValue: 'subjectData.componenteDeFormacion.nombre',
              })(
               
                  <Select>
                    <Option value="cienciabasicadeingenieria">Ciencia básica de Ingenieria</Option>
                    <Option value="formacioncomplementaria">Formacion complementaria</Option>
                    <Option value="Ingenieria aplicada">Ingeniería aplicada</Option>
                    <Option value="cienciabasica">Ciencia básica</Option>
                    <Option value="optativainterdisciplinaria">Optativa interdisciplinaria</Option>
                  </Select>
              
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
                initialValue: 'FALTAN',
                rules: [{ required: false, message: 'Por favor ingrese las horas prácticas de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Horas Trabajo Independiente del Estudiante">
              {getFieldDecorator('trabajoIndependienteEstudiante', {
                initialValue: 'FALTAN',
                rules: [{ required: true, message: 'Por favor ingrese las horas de trabajo independiente del estudiante de la asignatura!' }],  
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Nivel">
              {getFieldDecorator('nivel', {
                initialValue: subjectData.semestre,
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
  }
  

  state = {
    visible: false,
    visibleSubject: false,
    nameSubject: '', 
    subjectData: {}
  }

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  handleCreate = () => {
    
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      console.log('values', values)
      if (err) {
        return;
      }
      const asignaturaRequestDTO = 
        new AsignaturaRequestDTO(
          values.codigo, 
          values.componenteFormacion, 
          values.nombre, values.creditos, 
          values.horasTeoricas, 
          values.horasLaboratorio, 
          values.nivel,
          values.horasPracticas,
          values.trabajoIndependienteEstudiante);

      this.matters.saveMatterData(this.inpComponentStore.inpData.programId, this.inpComponentStore.inpData.inp, asignaturaRequestDTO);

      form.resetFields();
      this.setState({ visible: false });

    });
  }

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
        '', //values.componenteDeFormacion, se debe consultar los componentes de formacion para actualizar en el plan de estudio segun el elegido a actualizar en el formulario
        values.nombre,
        values.creditos,
        values.horasTeoricas,
        values.horasLaboratorio,
        values.horasPracticas,
        values.trabajoIndependienteEstudiante,
        values.nivel
      );
      
      this.matters.updateMatterData(this.inpComponentStore.inpData.programId, this.inpComponentStore.inpData.inp, updateMatterRequestDTO);

      form.resetFields();
      this.setState({ visible: false });

    });

  };

  openModal = (propiedadesAsignatura) => {
    console.log('propiedadesAsignatura', propiedadesAsignatura);
    this.showModalSubject();
    this.setState({ nameSubject: propiedadesAsignatura.nombre, subjectData: propiedadesAsignatura });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  componentDidMount = () => {
    this.matters.getMattersData(this.inpComponentStore.inpData.programId, this.inpComponentStore.inpData.inp);
    this.matters.setDeleteSuccess(false);
    this.matters.setUpdateSuccess(false);
  }

  createAsignatureCardsBySemesters = (asignatura) => {
    
    return asignatura
      .map(asignatura => ({ ...asignatura, keyIndex: `semestre${asignatura.semestre}` }))
      .map((asignatura, index) => {
        const cardAsignatura = { key: index, name: asignatura.semestre };
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
          <Link to='/main/programs/inps/studyplan/subject/update'>
            <Button 
              type="primary" 
              style={{ backgroundColor: '#026F35', color: '#fff' }}
              onClick={this.showModal}
            >
              Actualizar Asignatura
            </Button>
          </Link>
          <Link to='/main/programs/inps/studyplan/subject/delete'>
            <Button 
              type="primary" 
              style={{ backgroundColor: '#026F35', color: '#fff' }}
            >
              Borrar Asignatura
            </Button>
          </Link>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
          <SubjectDetail 
            wrappedComponentRef={this.saveFormRef}
            visibleSubject={this.state.visibleSubject}
            nameSubject={this.state.nameSubject}
            subjectData={this.state.subjectData}
            onCancel={this.handleCancelSubject}
            onCreateSubjectUpdate={this.handleUpdate}
          />
        </center>

      </div>
    );
  }

}


export default DetailStudyPlan;