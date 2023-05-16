# management_exus

After cloning the project run
  1. npm install
  2. npm start

-- To deploy the app using Docker and NGINX: -- 
Run 
  npm run build

Made a **Dockerfile** in the root directory
Inside it we have to set the:
 - base image
 - working directory
 - copy package.json
 - run "npm install" to install all dependencies
 - expose the port, e.g. "3000"
 - run npm start
 - setup NGINX 
 
Create **nginx.conf** in the root directory - inside it setup server attributes

Make a **docker-compose.yml** file in the root directory with:
 - build
 - ports
 - environment
 - volumes
 
After we made those files we have to run:
 - docker-compose build [--no-cache] 
 - docker-compose up (to start the services)
 
