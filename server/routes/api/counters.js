const Counter = require('../../models/Counter');

// Pipedrive token
const Pipedrive = require('pipedrive');
const pipedrive = new Pipedrive.Client('3a7f85236ff8b8c18b1afdb49dd826341316617e', { strictMode: true });

module.exports = (app) => {

  app.post('/api/testapi', (req, res) => {
    let personName = req.body.personName;
    let dateOfBirth = req.body.dateOfBirth;
    let emailAddress = req.body.emailAddress;
    let mobileNumber = req.body.mobileNumber;
    let addressLine = req.body.addressLine;
    let addressSuburb = req.body.addressSuburb;
    let addressState = req.body.addressState;
    let postcode = req.body.postcode;
    let companyName = req.body.companyName;
    let companyABN = req.body.companyABN;
    let loanAmount = req.body.loanAmount;
    let loanTerm = req.body.loanTerm;
    let loanPurpose = req.body.loanPurpose;
    
    // Pipedrive module
    const pipedrivePersons = new Promise((resolve,reject) =>{
    // Add a new person  
      pipedrive.Persons.add({'name':personName, 'email':emailAddress, 'phone': mobileNumber},function(err,addDataPersons){
        var personID = addDataPersons.id;
        if (err) throw err;
        resolve(personID)
      console.log('Create a new person');
      });
    })

        //Merge a Person and Organization

         // Add a new deal after the person has been created
      pipedrivePersons.then((personID) => {const pipedriveDeals = new Promise((resolve, reject) => {
      pipedrive.Deals.add({'title':companyName + '&' + personName, 'value':loanAmount, 'person_id': personID},function(err,addDataDeals){
        if (err) throw err;
       console.log('Person Information was assigned to the deal');
      });

      })
    })

    /* Adding an Actiity to the Deals
    pipedriveModule.then((idDealsPersons) => {
      pipedrive.Activities.add({'subject': 'Send an email to manager.', 
                                'done': 0, 
                                'type': 'email',
                                'deal_id':idDealsPersons.dealID,
                                'person_id':idDealsPersons.personID},function(err,addDataActivities){
        if (err) throw err;
        console.log('Create a new Activities', addDataActivities);
      });
    }) *///
    
  });

};
