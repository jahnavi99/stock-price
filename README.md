# stock-price
Clone the Repo, by using the following command in gitbash
- git clone https://github.com/jahnavi99/stock-price.git

Install Node.js using https://nodejs.org/en/download/package-manager/current, based on your system configuration. Use the following commands in gitbash or windows powershell(for windows) system.
- cd stock-price
- cd frontend
- npm install

This will install all the required node modules for frontend part.

Use the following commands in gitbash or windows powershell(for windows) system.
- cd ..
- cd backend
- npm install

This will install all the required node modules for backend part.

Download and Install MongoDB, https://www.mongodb.com/try/download/community. Make sure the server is up.

- MongoDB Compass also gets installed, make the new connection mongodb://localhost:27017/ and connect.
  
Once the set up is ready open the gitbash or powershell, go to the project directory.

- cd stock-price/frontend
- npm run dev

This will run the frontend part in port 3000

Open new gitbash terminal or powershell, go to the project directory

- cd stock-price/backend
- npm run build # this will build the backend part
- npm start

Backend part runs in port 3001.

Open any web browser and enter http://localhost:3000/
The project will be up and running.

