import React from 'react';
import { Button, Form, Input } from 'antd';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import ProgramRequestDTO from '../../../dto/ProgramRequestDTO';

@observer
class RegisterProgram extends React.Component {

  
  constructor(props) {
    super(props);
    this.registerProgramStore = this.props.stores.programs;
  }

  
  
  handleSubmit = (e) => {

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      
      if (!err) {
        const programRequestDTO = new ProgramRequestDTO(values.siniesCode, values.programName, values.siniesCode);
        this.registerProgramStore.saveProgramData(programRequestDTO);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    if (this.registerProgramStore.saveSuccess) {
      return <Redirect to='/main/programs' />
    }
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">

          <Form.Item>
            {getFieldDecorator('programName', {
              rules: [{ required: true, message: 'Por favor ingrese el nombre del programa!' }],
            })(
              <Input placeholder="Nombre Programa" />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('siniesCode', {
              rules: [{ required: true, message: 'Por favor ingrese el codigo SNIES!' }],
            })(
              <Input placeholder="Código Snies" />
            )}
          </Form.Item>

          <Button 
            type="primary"
            htmlType="submit" 
            className="login-form-button"
            style={{ backgroundColor: '#026F35', color: '#fff' }}
            onClick={() => this.handleSubmit}
          >
            Agregar
          </Button>

        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(RegisterProgram);

export default WrappedNormalLoginForm;