import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import {
    Form, Icon, Input, Button,
  } from 'antd';
import LoginUserDTO from '../../../dto/LoginUserDTO';


  @observer
  class LoginForm extends React.Component {

    constructor(props) {
      super(props);
      this.loginStore = this.props.stores.loginStore;
    };
    
    handleSubmit = (e) => {

      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          const loginUserDTO = new LoginUserDTO(values.userName,values.password); 
          this.loginStore.validateLoginUser(loginUserDTO);
        }
      });

    }
  
    render() {

      const { getFieldDecorator } = this.props.form;
 
      if (this.loginStore.validateUserSuccess) {
        return <Redirect to = '/main' />
      }
      
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
            <Button 
              style={{ backgroundColor: '#026F35', color: '#fff' }}  
              htmlType="submit" 
              className="login-form-button">

                Ingresar

            </Button>
            <br/>
            <a > 
            <Link 
              to = "/login/register"
              style={{ color: '#026F35' }}>

                Registrar nuevo usuario!

            </Link>
            </a>
          </Form.Item>

        </Form>
        
      );
    }
  }
  
  const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

  export default WrappedNormalLoginForm;
  
  