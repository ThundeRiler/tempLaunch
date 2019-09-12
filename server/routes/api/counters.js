const Counter = require('../../models/Counter');

// Pipedrive token
const Pipedrive = require('pipedrive');
const pipedrive = new Pipedrive.Client('3a7f85236ff8b8c18b1afdb49dd826341316617e', { strictMode: true });

module.exports = (app) => {

  app.post('/api/testapi', (req, res) => {
    let title = req.body.personName;
    let loanAmount = req.body.loanAmount;
    let dateOfBirth = req.body.dateOfBirth;
    console.log(title,loanAmount,dateOfBirth)
    pipedrive.Deals.add({'title':title, 'value':loanAmount},function(err,addData){
      if (err) throw err;
      console.log('Product 1 was added to deal 1', addData);
    });
  });


};
