import React from 'react';
import { observer } from 'mobx-react';
import { Table, pagination, Form, Input, Modal, Button } from 'antd';
import CardMatter from '../CardMatter';
import AsignaturaRequestDTO from '../../../dto/AsignaturaRequestDTO';


const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(

  class extends React.Component {
    render() {
      const {
        visible, onCancel, onCreate, form,
      } = this.props;
      const { getFieldDecorator } = form;
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
              {getFieldDecorator('componenteFormacion', {
                rules: [{ required: true, message: 'Por favor ingrese el componente de formación!' }],
              })(
                <Input />
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

            <Form.Item label="Semestre">
              {getFieldDecorator('semestre', {
                rules: [{ required: true, message: 'Por favor ingrese el semestre al que pertenece la asignatura!' }],
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

const columnsNames = [{
  dataIndex: 'semestre1',
  title: 'Semestre 1',
  key: "1",
}, {
  dataIndex: 'semestre2',
  title: 'Semestre 2',
  key: "2",
}, {
  dataIndex: 'semestre3',
  title: 'Semestre 3',
  key: "3",
}, {
  dataIndex: 'semestre4',
  title: 'Semestre 4',
  key: "4",
}, {
  dataIndex: 'semestre5',
  title: 'Semestre 5',
  key: "5",
}, {
  dataIndex: 'semestre6',
  title: 'Semestre 6',
  key: "6",
}, {
  dataIndex: 'semestre7',
  title: 'Semestre 7',
  key: "7",
}, {
  dataIndex: 'semestre8',
  title: 'Semestre 8',
  key: "8",
}, {
  dataIndex: 'semestre9',
  title: 'Semestre 9',
  key: "9",
}, {
  dataIndex: 'semestre10',
  title: 'Semestre 10',
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
      
      if (err) {
        return;
      }

      const asignaturaRequestDTO = 
        new AsignaturaRequestDTO(values.codigo, values.componenteFormacion, values.nombre, values.creditos, values.horasTeoricas, values.horasLaboratorio, values.semestre);
      this.matters.saveMatterData(this.inpComponentStore.inpData.programid, this.inpComponentStore.inpData.inp, asignaturaRequestDTO);

      form.resetFields();
      this.setState({ visible: false });

    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  componentDidMount = () => {
    this.matters.getMattersData(this.inpComponentStore.inpData.programid, this.inpComponentStore.inpData.inp);
  }

  createAsignatureCardsBySemesters = (asignatura) => {
    
    return asignatura
      .map(asignatura => ({ ...asignatura, keyIndex: `semestre${asignatura.semestre}` }))
      .map((asignatura, index) => {
        const cardAsignatura = { key: index, name: asignatura.semestre };
        cardAsignatura[asignatura.keyIndex] = <CardMatter {...asignatura} />;
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
    return semesters.concat(semesters).concat(semesters);
    
  };

  mattersBySemester = (datosAsignaturas) => {

    const matersCard = this.createAsignatureCardsBySemesters(datosAsignaturas)
    const asigantureObject = matersCard.map(asignatureCard => this.filterBySemestre(asignatureCard));
    return this.orderBySemester(asigantureObject);
  };

  render() {
    
    const datasource = sessionStorage.getItem('mattersData') ? JSON.parse(sessionStorage.getItem('mattersData')) : [];

    console.log('mattersData', this.matters.mattersData)
    return (
      <div>

        <Table
          columns={columnsNames}
          dataSource={this.mattersBySemester(datasource)}
          scroll={{ x: 1300 }}
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
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </center>

      </div>
    );
  }

}


export default DetailStudyPlan;