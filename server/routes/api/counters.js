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
    const pipedriveModule = new Promise((resolve,reject) =>{
      // Add a new deal 
      pipedrive.Deals.add({'title':companyName, 'value':loanAmount},function(err,addDataDeals){
        if (err) throw err;
        console.log('Product 1 was added to deal 1');
        pipedrive.Persons.add({'name':personName, 'email':emailAddress, 'phone': mobileNumber},function(err,addDataPersons){
          // Add a new person
          if (err) throw err;
          var idDealsPersons = {'dealID': addDataDeals.id,'personID':addDataPersons.id};
          resolve(idDealsPersons);
          console.log('Create a new person');
        });
      });
      
    })
    pipedriveModule.then((idDealsPersons) => {
      pipedrive.Activities.add({'subject': 'Send an email to manager.', 
                                'done': 0, 
                                'type': 'email',
                                'deal_id':idDealsPersons.dealID,
                                'person_id':idDealsPersons.personID},function(err,addDataActivities){
        if (err) throw err;
        console.log('Create a new Activities', addDataActivities);
      });
    })
    
  });

};
