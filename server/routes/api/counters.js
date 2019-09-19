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

    console.log(postcode)

    //Set up organization, person and deal
    // Add a new organization
    const pipedriveOrganizations = new Promise((resolve, reject) => {
      pipedrive.Organizations.add({'name': companyName}, function(err,addDataOrganizations){
        var organizationID = addDataOrganizations.id;
        if (err) throw err;
        resolve(organizationID);
        console.log('Create a new Organization')
      });
    });

    pipedriveOrganizations.then((organizationID) => {
      // Add a new person
      const pipedrivePersons = new Promise((resolve, reject) => {
        pipedrive.Persons.add({'name':personName, 'email':emailAddress, 'phone': mobileNumber, 'org_id': organizationID},function(err,addDataPersons){
          var person_orgDict = {'organizationID': organizationID, 'personID': addDataPersons.id};
          if (err) throw err;
          resolve(person_orgDict);
          console.log('Create a new person');
        });
      });

      pipedrivePersons.then((person_orgDict) => {const pipedriveDeals = new Promise ((resolve, reject) => {
        // Add a new Deal
        pipedrive.Deals.add({'title':companyName, 'value':loanAmount, 'person_id': person_orgDict.personID, 'org_id': person_orgDict.organizationID},function(err,addDataPersons){
          var deal_person_orgDict = {'organizationID': person_orgDict.organizationID, 'personID': person_orgDict.personID, 'dealID': addDataPersons.id};
          if (err) throw err;
          resolve(deal_person_orgDict)
          console.log('Product 1 was added to deal 1');
        });

        pipedrive.files.add({'file_path': postcode, 'deal_id': deal_person_orgDict.dealID},function (err,addDataFiles){
          if (err) throw err;
          console.log('Add a file for a deal');
        });

        });
      });
    });



    
    
    // Pipedrive module
<<<<<<< HEAD
    /*const pipedriveModule = new Promise((resolve,reject) =>{
      // Add a new deal 
      pipedrive.Deals.add({'title':companyName, 'value':loanAmount},function(err,addDataDeals){
=======
    const pipedrivePersons = new Promise((resolve,reject) =>{
    // Add a new person  
      pipedrive.Persons.add({'name':personName, 'email':emailAddress, 'phone': mobileNumber},function(err,addDataPersons){
        var personID = addDataPersons.id;
>>>>>>> 82e1cf8c367802f46ed256ba67c7fa64b2b2f3dc
        if (err) throw err;
        resolve(personID)
      console.log('Create a new person');
      });
    })

<<<<<<< HEAD
=======
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
>>>>>>> 82e1cf8c367802f46ed256ba67c7fa64b2b2f3dc
    pipedriveModule.then((idDealsPersons) => {
      pipedrive.Activities.add({'subject': 'Send an email to manager.', 
                                'done': 0, 
                                'type': 'email',
                                'deal_id':idDealsPersons.dealID,
                                'person_id':idDealsPersons.personID},function(err,addDataActivities){
        if (err) throw err;
        console.log('Create a new Activities', addDataActivities);
      });
<<<<<<< HEAD
    })*/
=======
    }) *///
>>>>>>> 82e1cf8c367802f46ed256ba67c7fa64b2b2f3dc
    
  });

};
