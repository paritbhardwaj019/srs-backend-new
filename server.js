import mongoose from 'mongoose';
import server from './app.js'; // Import the updated server object with Socket.IO

const username = encodeURIComponent('adityamohite2221');
const password = encodeURIComponent('1QaX1M8fRZrh4Kum');

mongoose
  .connect('mongodb+srv://adityamohite2221:1QaX1M8fRZrh4Kum@srs-database.zmyhd58.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`Listening on port ${port}`)); // Use the server object instead of app

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down the server.');
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
