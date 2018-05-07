import React from 'react';
import AuthForm from './AuthForm'


class RegisterForm extends React.Component {
  render(){
    return (
      <div>
        <h3>Signup</h3>
        <AuthForm { ...this.props } url="http://localhost:3000/users" />
      </div>
    )
  }
}

export default RegisterForm
