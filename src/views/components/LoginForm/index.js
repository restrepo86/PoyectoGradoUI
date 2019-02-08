import React from 'react';
import {
    Form, Icon, Input, Button,
  } from 'antd';
  
  class LoginForm extends React.Component {
    handleSubmit = (e) => {
      console.log(this.props.form)
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          window.location.href = "/main";
        }
      });
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Por favor ingrese un nombre de usuario!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Usuario" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Por favor ingrese la contraseña!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Contraseña" />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="#026F35" htmlType="submit" className="login-form-button">
              Ingresar
            </Button>
            <br/>
            <a href="">Registrar nuevo usuario!</a>
          </Form.Item>
        </Form>
        
      );
    }
  }
  
  const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

  export default WrappedNormalLoginForm;
  
  