const express = require('express');
const app = express();
app.set('port', (process.env.PORT || 5000));
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port
//app.listen(process.env.PORT || 8080);
app.get('/', function(request, response) {
  response.render('/index');
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});