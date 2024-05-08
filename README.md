# Nature's Call, a NYC Bathroom Locator App
<!-- ![Optional description of the image](server-side/client/src/images/DarkModeLogo.png) -->
![Optional description of the image](server-side/client/src/images/Demo.gif)
📹 Demo video [demo video](https://streamable.com/nmahe1) 




## 🛠 Technologies Used

![PostgreSQL Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/45px-Postgresql_elephant.svg.png) ![React Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/45px-React-icon.svg.png)![Node.js Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/45px-Node.js_logo.svg.png) ![Express Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Expressjs.png/45px-Expressjs.png) ![JavaScript Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/45px-Unofficial_JavaScript_logo_2.svg.png) 

  
## ✨ Features & Achievements

- **Nearby Bathrooms Based on User's Location**: Integrated the powerful Google Places API to showcase nearby bathroom locations based on users' input addresses.
- **Comprehensive Bathroom Details**: Delivered a holistic view for users, offering in-depth information on amenities, reviews, ratings, and more.
- **Profile Page for Funsies**: Look at your created bathrooms and reviews! Also change your pfp!
- **User Authentication**: Implemented a robust authentication system leveraging bcrypt for secure password hashing and cookies for sessions, enabling users to create accounts and sign in securely.
- **Periodic Bathroom Updating**: Implemented Express.js's CronJob Feature for routinely bathroom updating.
- **Directions/ETA, and Bathroom Markers**: Implemented with React's Google package.


## 🔧 Getting Started

1. First, clone the repository by running the following commands:
    ```bash
    git init
    git clone https://github.com/Hackerdude374/Natures-Call.git
    ```

2. Navigate to the main branch:
    ```bash
    git checkout main
    ```

3. Ensure you are on the correct branch (it should output main):
    ```bash
    git branch
    ```

4. Setting up the Backend:
    - Navigate to the server-side directory:
        ```bash
        cd Natures-Call/server-side
        ```
    - Install all required packages:
        ```bash
        npm i --force
        ```
    - Create an .ENV file to connect to the database:
        - NOTE: Please contact us to authenticate you and provide you the details for the fields in this file.
            ```plaintext
            DB_USER=
            DB_HOST=
            DB_NAME=
            DB_PASSWORD=
            DB_PORT=
            SESSION_SECRET=
            API_KEY=
            ```

5. After that, simply run this to start the backend express server:
    ```bash
    npm start
    ```

6. Now you should be done with backend, Lets set up the Frontend:
    - Navigate to the frontend directory:
        ```bash
        cd Natures-call/server-side/client
        ```
    - Install all required packages:
        ```bash
        npm i --force
        ```
    - Start the website:
        ```bash
        npm run dev
        ```

7. Create a .env file in this format (NOTE: Please contact us for a Google Maps/Places API key, or you can purchase one yourself):
    ```plaintext
    VITE_GOOGLE_MAPS_API_KEY=
    ```
