const Counter = require('../../models/Counter');

// Pipedrive token
const Pipedrive = require('pipedrive');
const pipedrive = new Pipedrive.Client('3f6c992201a9747280b3f2e2a03671531101128e', { strictMode: true });

module.exports = (app) => {


  app.post('/api/testapi', (req, res) => {
    let personName = req.body.personName;
    let emailAddress = req.body.emailAddress;
    let mobileNumber = req.body.mobileNumber;
    let companyName = req.body.companyName;
    let companyNotes = req.body.companyNotes;

    
    // Set up organization, person and deal
    // Add a new organization
    const pipedriveOrganizations = new Promise((resolve, reject) => {
      pipedrive.Organizations.add({'name': companyName}, function(err,addDataOrganizations){
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
          pipedrive.Deals.add({'title':companyName + ' Deal', 'person_id': person_orgDict.personID, 'org_id': person_orgDict.organizationID},function(err,addDataPersons){
            var deal_person_orgDict = {'organizationID': person_orgDict.organizationID, 'personID': person_orgDict.personID, 'dealID': addDataPersons.id};
            if (err) throw err;
            resolve(deal_person_orgDict)
            reject('there is a reject at Deal');
            console.log('Product 1 was added to deal 1');
          });
        }).catch((error) => {
          console.error(error);});
        /*pipedriveDeals.then((deal_person_orgDict) => {
          pipedrive.Notes.add({'content': companyNotes}, function(resolve, reject){

          })
        })*/
      });
    });
  });
};
