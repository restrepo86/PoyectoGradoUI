import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import ProgramUpdateRequestDTO from '../../../dto/ProgramUpdateRequestDTO';

@observer
class UpdateProgramComponent extends React.Component {

  
  constructor(props) {
    super(props);
    this.programStore = this.props.stores.programs;
  };

  
  
  handleSubmit = (e) => {

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const programUpdateRequestDTO = new ProgramUpdateRequestDTO(values.updateProgramCodeSnies, values.newProgramName);
        this.programStore.updateProgramsData(values.updateProgramCodeSnies, programUpdateRequestDTO);
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
            {getFieldDecorator('updateProgramCodeSnies', {
              rules: [{ required: true, message: 'Por favor elija el programa que desea actualizar!' }],
            })(
              <Select>
                {this.programStore.programsData.map(program => 
                  <Option value={program.programData.codigoSnies}>{program.title}</Option>
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