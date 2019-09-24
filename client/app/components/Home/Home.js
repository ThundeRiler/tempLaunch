import React, { Component } from 'react';


// RegExpression format provided
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

// Check if it is html text
const isHTML = (str) => {
  var a = document.createElement('div');
  a.innerHTML = str;
  for (var c = a.childNodes, i = c.length; i--; ) {
    if (c[i].nodeType == 1) return true; 
  }

  return false;
}


// Validate check provided
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}


class testForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      mobileNumber: "",
      companyName: "",
      companyNotes: "",
      errors: {
        emailAddress: '',
        mobileNumber: '',
        companyNotes: '',
      },
    };
    this.submitEvent = this.submitEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
  };

  // Fire every time we enter a character into one of the inputs on our form
  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    // types of Errors
    switch (name) {
      case 'emailAddress':
        errors.emailAddress =
          validEmailRegex.test(value)
            ? ''
            : 'Email address is not valid';
        break;
      case 'mobileNumber':
        errors.mobileNumber =
          value.length < 10 || value.length > 10
            ? 'Mobile number must be 10 numbers long'
            : '';
        break;
      case 'companyNotes':
        console.log(isHTML(value))
        isHTML(value)
            ? 'Transfer sthe data format: https://www.textfixer.com/html/convert-text-html.php'
            : '';
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value }, () => {
      console.log(errors)
    })
  }


  // Submit Form
  submitEvent(e) {
    e.preventDefault()
    // Validate check
    if (validateForm(this.state.errors)) {
      console.info('Valid Form')
    } else {
      console.error('Invalid Form')
    }

    // Send data to server
    let postdata = {
      'personName': this.firstName.value + ' ' + this.lastName.value,
      'emailAddress': this.emailAddress.value,
      'mobileNumber': this.mobileNumber.value,
      'companyName': this.companyName.value,
      'companyNotes': this.companyNotes.value,
    };
    fetch('/api/testapi', {
      method: 'POST',
      body: JSON.stringify(postdata),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  };

  backOnclick(e) {
    e.preventDefault()
    window.location.href = '/';
  };



  render() {
    const { errors } = this.state;
    return (
      <form>
        <label>
          First Name:
              <input type="text" ref={(c) => this.firstName = c} name="firstName" />
        </label>
        <label>
          Last Name:
              <input type="text" ref={(c) => this.lastName = c} name="lastName" />
        </label><br />
        <label>
          Email Address:
              <input type="text" ref={(c) => this.emailAddress = c} name="emailAddress" onChange={this.handleChange} noValidate />
        </label><br />
        {errors.emailAddress.length > 0 &&
          <span className='errors'>{errors.emailAddress}</span>}
        <label>
          Mobile Number:
              <input type="text" ref={(c) => this.mobileNumber = c} name="mobileNumber" onChange={this.handleChange} noValidate />
        </label><br />
        {errors.mobileNumber.length > 0 &&
          <span className='errors'>{errors.mobileNumber}</span>}
        <label>
          Company Name:
              <input type="text" ref={(c) => this.companyName = c} name="companyName" />
        </label><br />
        
        <label>
          Company Notes:
              <textarea type="text" ref={(c) => this.companyNotes = c} name="companyNotes" onChange={this.handleChange} placeholder="Transfer plain text to HTML format."  noValidate />
        </label><br />
        {errors.companyNotes.length > 0 &&
          <span className='errors'>{errors.companyNotes}</span>}

        <button onClick={this.submitEvent} type="submit" >
          Submit
            </button>
        <button onClick={this.backOnclick.bind(this)} >
          Redo
            </button><br />
      </form>
    );
  }
}

export default testForm;
