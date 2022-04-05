import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';

class Form extends Component {
  state = { 
    data: {},
    errors: {},
  }; 
  // username = React.createRef();

  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, { // can also destructure here c result = to c { error } =
      abortEarly: false
    });
    if (!result.error) return null; //then use !error instead of !result.error

    const errors = {};
    for (let item of result.error.details)
      errors[item.path[0]] = item.message;
    return errors;


    // old before Joi
    // const errors = {};

    // const { data } = this.state;
    // if (data.username.trim() === '')
    //   errors.username = 'Username is required.';
    // if (data.password.trim() === '')
    //   errors.password = 'Password is required.'

    // return Object.keys(errors).length === 0 ? null : errors;
  };

  validateProperty = ({ name, value}) => {
    const obj = { [name]: value }; //js computed property
    const schema = { [name]: this.schema[name] };
    const {error} = Joi.validate(obj, schema);
    if (error) return error.details[0].message;
    return null;
    // last two lines can also be written as return error ? error.details[0].message : null;
  }

  // validateProperty = input => { // can also destructure to ({ name, value})
    
    // old code before Joi
    // if (input.name === 'username') {
    //   if (input.value.trim() === '') return 'Username is required.';

    // }
    // if (input.name === 'password') {
    //   if (input.value.trim() === '') return 'Password is required.';

    // }
  // };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    // console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;

    // const username = this.username.current.value;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input}) => { // can also replace e with ({ currentTarget: input }) set it's name to input // before hC = e => {}
    const errors = {...this.state.errors};
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = {...this.state.data}
    // data[e.currentTarget.name] = e.currentTarget.value; // then here change e.currentTarget to input (Before)
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">{label}</button>
    )
  };

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select 
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderInput (name, label, type = 'text') {
    const { data, errors } = this.state;
    
    return (
      <Input 
      type={type}
      name={name} 
      value={data[name]} 
      label={label}
      onChange={this.handleChange} 
      error={errors[name]}
    />
    )
  };
  
}
 
export default Form;