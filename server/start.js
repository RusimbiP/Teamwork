// Start our app!
import app from './app';
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`Teamwork running. PORT ${server.address().port}`);
});
  /**
                                   .-"""-.
                                / .===. \
                                \/ 6 6 \/
                                ( \___/ )
    _________________________ooo__\_____/______________________________
  /                                                                   \
  | This project is Protected by Andela Honor code; third EPIC value |
  \_______________________________________ooo_________________________/
                                  |  |  |
                                  |_ | _|
                                  |  |  |
                                  |__|__|
                                  /-'Y'-\
                                (__/ \__)
  */