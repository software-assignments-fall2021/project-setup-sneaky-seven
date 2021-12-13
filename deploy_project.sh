#!/bin/bash

echo -e "1. cd ~/project-setup-sneaky-seven\n"
cd ~/project-setup-sneaky-seven

# restore all local changes &&  pull the latest changes 
echo -e "2. git restore . &&  git pull\n"
git restore .
git pull 


# restart backend server
echo -e "3. cd back-end\n" 
cd back-end

echo -e "4. npm install\n"
npm install 


# build frontend 
echo -e "5. cd ../front-end\n"
cd ../front-end

echo -e "6. npm install\n" 
npm install

echo -e "7. build the frontend by 'npm run build'\n" 
npm run build 


echo -e "8. copy the build folder to /usr/share/nginx, build folder will locate under /usr/share/nginx/build\n" 
sudo cp -r /home/circleci/project-setup-sneaky-seven/front-end/build /usr/share/nginx


echo -e "9. check nginx config is valid\n"
sudo nginx -t 

echo -e "10. restart nginx\n" 
echo "Sneaky7Seven" | sudo -S systemctl restart nginx