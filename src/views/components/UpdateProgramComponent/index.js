import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import ProgramUpdateRequestDTO from '../../../dto/ProgramUpdateRequestDTO';

@observer
class UpdateProgramComponent extends React.Component {

  
  constructor(props) {
    super(props);
    this.programStore = this.props.stores.programs ? this.props.stores.programs : null;
    this.programsData = this.programStore == null ? null : this.programStore.programsData;
  };

  componentDidMount() {
    if (this.programsData == null) {
      window.location.href = "/";
    }
  }; 
  
  handleSubmit = (e) => {

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

        const programSelected =   
          this.programsData.filter(program => program.programData.id === values.updateProgramId)[0];

        const programUpdateRequestDTO = new ProgramUpdateRequestDTO(programSelected.programData.codigoSnies, values.newProgramName);
        this.programStore.updateProgramsData(values.updateProgramId, programUpdateRequestDTO);
      }
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    const Option = Select.Option;
    if (this.programStore.updateSuccess) {
      return <Redirect to='/main/programs' />
    }

    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">

          <Form.Item
            label='Elija el programa que desea actualizar'
          >
            {getFieldDecorator('updateProgramId', {
              rules: [{ required: true, message: 'Por favor elija el programa que desea actualizar!' }],
            })(
              <Select>
                { 
                  this.programsData == null ? [] : this.programsData.map(program => 
                  <Option value={program.programData.id}>{program.title}</Option>
                )}
              </Select>
            )}
          </Form.Item>

          <Form.Item
            label='Ingrese el nuevo nombre del programa'
          >
            {getFieldDecorator('newProgramName', {
              rules: [{ required: true, message: 'Por favor ingrese el nuevo nombre del programa a actualizar!' }],
            })(
              <Input placeholder="Nuevo nombre programa" />
            )}
          </Form.Item>

          <Button 
            type="primary"
            htmlType="submit" 
            className="login-form-button"
            style={{ backgroundColor: '#026F35', color: '#fff' }}
            onClick={() => this.handleSubmit}
          >
            Actualizar Programa
          </Button>

        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(UpdateProgramComponent);

export default WrappedNormalLoginForm;