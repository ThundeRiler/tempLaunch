import React, { Component } from 'react';

// RegExpression format provided
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

// Validate check provided
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}


class testForm extends Component {

    constructor(props){
      super(props);
      this.state = {
        firstName : "",
        lastName : "",
        dateOfBirth : "",
        emailAddress : "",
        mobileNumber : "",
        addressLine1 : "",
        addressLine2 : "",
        addressSuburb : "",
        addressState : "",
        postcode : "",
        companyName : "",
        companyABN : "",
        loanPurpose : "",
        loanAmount : "",
        loanTerm : "",
        errors : {
          emailAddress: '',
          mobileNumber: '',
          loanTerm: 3,
          loanAmount:50000,
          companyABN: 0,
          
        },
      };
      this.submitEvent = this.submitEvent.bind(this);
      this.handleChange = this.handleChange.bind(this);
    };

    // Fire every time we enter a character into one of the inputs on our form
    handleChange (event) {
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
        case 'companyABN': 
          errors.companyABN = 
            value.length > 11 || value.length < 11
              ? 'Please input correct company ABN'
              : '';
          break;
        case 'loanTerm': 
          errors.loanTerm = 
            value < 3 || value > 24
              ? 'The loan term should be in 3 - 24 months'
              : '';
          break;
        case 'loanAmount': 
          errors.loanAmount = 
            value < 50000 || value > 2000000
              ? 'The loan amount should be in $5,000 - $2,000,000'
              : '';
          break;
        default:
          break;
      }
      this.setState({errors, [name]: value}, ()=> {
        console.log(errors)
      })
    }


    // Submit Form
    submitEvent(e) {
        e.preventDefault()
        // Validate check
        if(validateForm(this.state.errors)) {
          console.info('Valid Form')
        }else{
          console.error('Invalid Form')
        }
        // Send data to server
        let postdata = {'personName': this.firstName.value + ' ' + this.lastName.value,
                        'dateOfBirth': this.dateOfBirth.value,
                        'emailAddress': this.emailAddress.value,
                        'mobileNumber': this.mobileNumber.value,
                        'addressLine': this.addressLine1.value + ', ' + this.addressLine2.value,
                        'addressSuburb': this.addressSuburb.value,
                        'addressState': this.addressState.value,
                        'postcode': this.postcode.value,
                        'companyName': this.companyName.value,
                        'loanPurpose': this.loanPurpose.value,
                        'companyABN': this.companyABN.value,
                        'loanAmount': this.loanAmount.value,
                        'loanTerm': this.loanTerm.value,
                      };
        console.log(postdata);
        fetch('/api/testapi', {
          method: 'POST', 
          body: JSON.stringify(postdata),
          headers:{
              'Content-Type': 'application/json'
          }
        })
    }
    
    backOnclick(e){
      e.preventDefault()
      console.log('lol')
      window.location.href='/';
    }
  
    render() {
      const {errors} = this.state;
      return (
        <form>
            <label>
              First Name:
              <input type="text" ref={(c) => this.firstName = c} name="firstName" />
            </label><br />
            <label>
              Last Name:
              <input type="text" ref={(c) => this.lastName = c} name="lastName" />
            </label><br />
            <label>
              Date of Birth:
              <input type="date" id="start" name="dateOfBirth" 
              ref={(c) => this.dateOfBirth = c} min="1800-01-01" max="2019-12-31" />
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
              Address:
              <input type="text" ref={(c) => this.addressLine1 = c} name="addressLine1" />
              <input type="text" ref={(c) => this.addressLine2 = c} name="addressLine2" />
            </label><br />
            <label>
              Suburb
              <input type="text" ref={(c) => this.addressSuburb = c} name="addressSuburb" />
           </label><br />
            <label>
              State/Territory
              <select ref={(c) => this.addressState = c}  onChange= {this.handleChange} >
                <option value="null"> </option>
                <option value="Australian Capital Territory">Australian Capital Territory</option>
                <option value="New South Wales">New South Wales</option>
                <option value="Northern Territory">Northern Territory</option>
                <option value="Queensland">Queensland</option>
                <option value="South Australia">South Australia</option>
                <option value="Tasmania">Tasmania</option>
                <option value="Victoria">Victoria</option>
                <option value="Western Australia">Western Australia</option>
              </select>
            </label><br />
            <label>
              Postcode
              <input type="file" ref={(c) => this.postcode = c} name="postcode" />
            </label><br />
            <label>
              Company:
              <input type="text" ref={(c) => this.companyName = c} name="companyName" />
            </label><br />
            <label>
              Company ABN:
              <input type="text" ref={(c) => this.companyABN = c} name="companyABN" onChange={this.handleChange} noValidate />
            </label><br />
            {errors.companyABN.length > 0 && 
                <span className='errors'>{errors.companyABN}</span>}
            <label>
              Loan Purpose:
              <input type="text" ref={(c) => this.loanPurpose = c} name="loanPurpose" />
            </label><br />
            <label>
              Loan Amount:
              <input type="text" ref={(c) => this.loanAmount = c} name="loanAmount" 
              placeholder = "$50,000 - $2,000,000" onChange={this.handleChange} noValidate/>
            </label><br />
            {errors.loanAmount.length > 0 && 
                <span className='errors'>{errors.loanAmount}</span>}
            <label>
              Loan Term:
              <input type="text" ref={(c) => this.loanTerm = c} name="loanTerm" 
              placeholder = "3 - 24 Months" onChange={this.handleChange} noValidate/>
            </label><br />
            {errors.loanTerm.length > 0 && 
                <span className='errors'>{errors.loanTerm}</span>}
           
            <button onClick={this.submitEvent} type="submit" >
              Submit
            </button>
            <button onClick = {this.backOnclick.bind(this)} >
              Back
            </button><br />
        </form>
      );
    }
  }

export default testForm;
