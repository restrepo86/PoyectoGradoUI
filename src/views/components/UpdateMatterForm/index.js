import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import UpdateMatterRequestDTO from '../../../dto/UpdateMatterRequestDTO';

@observer
class UpdateMatterForm extends React.Component {

  
  constructor(props) {
    super(props);
    this.matters = this.props.stores.matters;
    this.matterUpdateSelected = this.matters.matterUpdateSelected
  };

  
  
  handleSubmit = (e) => {

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
    console.log('values update subject', values);
        
      if (!err) {
        
        const updateMatterRequestDTO = new UpdateMatterRequestDTO(
            this.matterUpdateSelected.componenteDeFormacion.nombre, //values.componenteDeFormacion, se debe consultar los componentes de formacion para actualizar en el plan de estudio segun el elegido a actualizar en el formulario
            values.nombre,
            values.creditos,
            values.horasTeoricas,
            values.horasLaboratorio,
            values.horasPracticas,
            values.trabajoIndependienteEstudiante,
            values.nivel
        );
        
        this.matters.updateMatterData('353454'/**ProgramId */, this.matterUpdateSelected.inp, updateMatterRequestDTO);

      }
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    const Option = Select.Option;
    if (this.matters.updateSuccess) {
      return <Redirect to='/main/programs/inps/studyplan' />
    }

    console.log('matterUpdateSelected', this.matterUpdateSelected);
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">

            <Form.Item label="Código">
              {getFieldDecorator('codigo', {
                initialValue: this.matterUpdateSelected.codigo,
                rules: [{ required: true, message: 'Por favor ingrese el codigo de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Componente de Formación">
              {getFieldDecorator('componenteFormacion', {
                  initialValue: this.matterUpdateSelected.componenteDeFormacion.nombre
              })(
               
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
                initialValue: this.matterUpdateSelected.nombre,
                rules: [{ required: true, message: 'Por favor ingrese el nombre de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Horas Teóricas">
              {getFieldDecorator('horasTeoricas', {
                initialValue: this.matterUpdateSelected.horasTeoricas,
                rules: [{ required: true, message: 'Por favor ingrese las horas teóricas de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Horas Laboratorio">
              {getFieldDecorator('horasLaboratorio', {
                initialValue: this.matterUpdateSelected.horasLaboratorio,
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
                initialValue: this.matterUpdateSelected.semestre,
                rules: [{ required: true, message: 'Por favor ingrese el nivel al que pertenece la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Créditos">
              {getFieldDecorator('creditos', {
                initialValue: this.matterUpdateSelected.creditos,
                rules: [{ required: true, message: 'Por favor ingrese los créditos de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Button 
                type="primary"
                htmlType="submit" 
                className="login-form-button"
                style={{ backgroundColor: '#026F35', color: '#fff' }}
                onClick={() => this.handleSubmit}
            >
                Actualizar Asignatura
            </Button>

        </Form>

      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(UpdateMatterForm);

export default WrappedNormalLoginForm;