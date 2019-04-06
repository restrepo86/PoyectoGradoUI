import React from 'react';
import {
    Form, 
    Input, 
    Tooltip, 
    Icon, 
    Cascader, 
    Select, 
    Checkbox, 
    Button, 
    AutoComplete,
    DatePicker
  } from 'antd';
  
  const { Option } = Select;
  const AutoCompleteOption = AutoComplete.Option;
  
  
  class RegistrationForm extends React.Component {
    state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
  
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
  
    handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
  
    compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    }
  
    validateToNextPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    }
  
    handleWebsiteChange = (value) => {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
      }
      this.setState({ autoCompleteResult });
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;
      const { autoCompleteResult } = this.state;
  
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
      const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '57',
      })(
        <Select style={{ width: 70 }}>
          <Option value="57">+57</Option>
        </Select>
      );
  
      const websiteOptions = autoCompleteResult.map(website => (
        <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
      ));
  
      return (

        <Form onSubmit={this.handleSubmit}>
  
          <br/>
          <br/>

          <Form.Item
            {...formItemLayout}
            label="Nombre"
          >
            {getFieldDecorator('nombre', {
              rules: [{ required: true, message: 'Por favor ingrese su nombre!' }],
            })(
              <AutoComplete
                dataSource={websiteOptions}
                onChange={this.handleWebsiteChange}
                placeholder="Ingrese su nombre"
              >
                <Input />
              </AutoComplete>
            )}
          </Form.Item>
          
          <Form.Item
            {...formItemLayout}
            label="Primer Apellido"
          >
            {getFieldDecorator('apellidoUno', {
              rules: [{ required: true, message: 'Por favor ingrese su primer apellido!' }],
            })(
              <AutoComplete
                dataSource={websiteOptions}
                onChange={this.handleWebsiteChange}
                placeholder="Ingrese su primer apellido"
              >
                <Input />
              </AutoComplete>
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Segundo Apellido"
          >
            {getFieldDecorator('apellidoDos', {
              rules: [{ required: false }],
            })(
              <AutoComplete
                dataSource={websiteOptions}
                onChange={this.handleWebsiteChange}
                placeholder="Ingrese su segundo apellido"
              >
                <Input />
              </AutoComplete>
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Fecha de Nacimiento"
            hasFeedback
            validateStatus="success"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Correo Electrónico"
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'La dirección de correo ingresada no es valida!',
              }, {
                required: true, message: 'Por favor ingrese su direccion de correo electrónico!',
              }],
            })(
              <Input />
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Contraseña"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Por favor ingrese una contraseña!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="password" />
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Confirme su Contraseña"
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Por favor ingrese nuevamente su contraseña!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="contraseña" onBlur={this.handleConfirmBlur} />
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label={(
              <span>
                Usuario&nbsp;
                <Tooltip title="Ingresa un usuario facil de recordar">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
          >
            {getFieldDecorator('usuario', {
              rules: [{ required: true, message: 'Por favor ingrese un usuario!', whitespace: true }],
            })(
              <Input />
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Direccion"
          >
            {getFieldDecorator('address', {
              rules: [{ required: true, message: 'Por favor ingrese su dirección!' }],
            })(
              <Input />
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Celular"
          >
            {getFieldDecorator('celular', {
              rules: [{ required: true, message: 'Por favor ingrese su celular!' }],
            })(
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            )}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator('acepto', {
              valuePropName: 'checked',
            })(
              <Checkbox>He leído y acepto términos y <a href="" style={{ color: '#026F35' }}>condiciones</a></Checkbox>
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button 
              style={{ backgroundColor: '#026F35', color: '#fff' }} 
              htmlType="submit">
              Registrar Usuario
            </Button>
          </Form.Item>
        </Form>
      );
    }
  }
  
  const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);
  
export default WrappedRegistrationForm;