import React from 'react';
import { Button, Form, Input } from 'antd';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import ProgramUpdateRequestDTO from '../../../dto/ProgramUpdateRequestDTO';

@observer
class UpdateProgramComponent extends React.Component {

  
  constructor(props) {
    super(props);
    this.programStore = this.props.stores.programs;
  }

  
  
  handleSubmit = (e) => {

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      
      if (!err) {
        const programUpdateRequestDTO = new ProgramUpdateRequestDTO(values.siniesCode, values.programName);
        this.programStore.updateProgram(this.programStore.programUpdateDataRequest.programId, programUpdateRequestDTO);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    if (this.programStore.updateSuccess) {
      return <Redirect to='/main/programs' />
    }
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">

          <Form.Item>
            {getFieldDecorator('programNam', {
              rules: [{ required: true, message: 'Por favor ingrese el nombre del programa!' }],
            })(
              <Input placeholder="Nombre Programa" defaultValue={this.programStore.programUpdateDataRequest.programName} />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('siniesCode', {
              rules: [{ required: true, message: 'Por favor ingrese el codigo SNIES!' }],
            })(
              <Input placeholder="Código Snies" defaultValue={this.programStore.programUpdateDataRequest.sniesCode} />
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