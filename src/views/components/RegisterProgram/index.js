import React from 'react';
import { Button, Form, Input } from 'antd';
import { observer } from 'mobx-react';
import ProgramRequestDTO from '../../../dto/ProgramRequestDTO';

@observer
class RegisterProgram extends React.Component {


  constructor(props) {
    super(props);
    this.filter = this.props.stores.filter;
  }

  handleSubmit = (e) => {
    console.log(this.props.form)
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const programRequestDTO = new ProgramRequestDTO(values.programName, values.siniesCode);
        console.log(programRequestDTO);
        this.filter.saveProgramData(programRequestDTO);
        //window.location.href = "/main";
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
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
              rules: [{ required: true, message: 'Por favor ingrese el codigo SINIES!' }],
            })(
              <Input placeholder="Código Sinies" />
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