const Counter = require('../../models/Counter');

// Pipedrive token
const Pipedrive = require('pipedrive');
const pipedrive = new Pipedrive.Client('3a08f52c091b8b3c1d8201867c20b15f10b805b4', { strictMode: true });

module.exports = (app) => {


  app.post('/api/testapi', (req, res) => {
    let personName = req.body.personName;
    let dateOfBirth = req.body.dateOfBirth;
    let emailAddress = req.body.emailAddress;
    let mobileNumber = req.body.mobileNumber;
    let addressLine = req.body.addressLine;
    let addressSuburb = req.body.addressSuburb;
    let addressState = req.body.addressState;
    //let formData = req.files;
    let companyName = req.body.companyName;
    let companyABN = req.body.companyABN;
    let loanAmount = req.body.loanAmount;
    let loanTerm = req.body.loanTerm;
    let loanPurpose = req.body.loanPurpose;

    
    // Set up organization, person and deal
    // Add a new organization
    const pipedriveOrganizations = new Promise((resolve, reject) => {
      pipedrive.Organizations.add({'name': companyName}, function(err,addDataOrganizations){
        console.log(addDataOrganizations)
        var organizationID = addDataOrganizations.id;
        if (err) throw err;
        resolve(organizationID);
        console.log('Create a new Organization',)
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

      pipedrivePersons.then((person_orgDict) => {
        const pipedriveDeals = new Promise ((resolve, reject) => {
        // Add a new Deal
          pipedrive.Deals.add({'title':companyName, 'value':loanAmount, 'person_id': person_orgDict.personID, 'org_id': person_orgDict.organizationID},function(err,addDataPersons){
            var deal_person_orgDict = {'organizationID': person_orgDict.organizationID, 'personID': person_orgDict.personID, 'dealID': addDataPersons.id};
            if (err) throw err;
            resolve(deal_person_orgDict)
            reject('there is a reject at Deal');
            console.log('Product 1 was added to deal 1');
          });
        }).catch((error) => {
          console.error(error);});

        pipedriveDeals.then((deal_person_orgDict) => {
          const pipedriveFiles = new Promise((resolve, reject) => {
            pipedrive.Files.add({'file': formData.files, 'deal_id': deal_person_orgDict.dealID},function (err,addDataFiles){
              if (err) throw err;
              console.log('Add a file for a deal');
            });
          })
        })

      });

    });



    
    
    // Pipedrive module
    /*const pipedriveModule = new Promise((resolve,reject) =>{
      // Add a new deal 
      pipedrive.Deals.add({'title':companyName, 'value':loanAmount},function(err,addDataDeals){
        if (err) throw err;
        resolve(personID)
      console.log('Create a new person');
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
    })*/
    
  });

};
