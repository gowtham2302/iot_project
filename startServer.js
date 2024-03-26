const { exec } = require('child_process');

// Command to start your Node.js server
const serverCommand = 'node your-server-file.js';

exec(serverCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error starting server: ${error}`);
    return;
  }
  console.log(`Server started successfully: ${stdout}`);
});
