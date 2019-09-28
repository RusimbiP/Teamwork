// Start our app!
import app from './app';
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`Teamwork running. PORT ${server.address().port}`);
});
