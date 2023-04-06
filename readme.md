<h1 align="center" style="margin-top: 0px;">Ecommerce Backend Project :computer:</h1>

### This project is a backend application built with [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), and [Mongoose](https://mongoosejs.com/).

## Documentation of API's you can use:
### [Documentation](https://documenter.getpostman.com/view/22932465/2s93RZM9x2)


## Getting Started

To get started with this project, clone the repository and install the dependencies:

```
git clone https://github.com/RzayevGara/NodeJS-Ecommerce-Backend.git
```
```
npm install
```

## Then, create a .env file and add your environment variables:
```
PORT = 3000
MONGO_URI = your mongodb uri
SECRET_TOKEN = secret token for generate jwt token
REFRESH_TOKEN = refresh token for generate reftesh token
NODEMAILER_USERNAME = your e-mail address to send e-mails to users with nodemailer
NODEMAILER_PASS = create `App Passwords` in your email adress
STRIPE_SECRET_KEY = stripe secret key
```

## You can start the application with the following command:
```
npm start
```

## You can create, edit and delete Products and Users using AdminJS dashboard.
AdminJS Dashboard: ```https://{your_url}/admin```

## Used in this Project:
```
- Node JS
- Express JS
- MongoDB + Mongoose
- AdminJS
- jsonwebtoken
- Stripe (Payment)
- Nodemailer
```
