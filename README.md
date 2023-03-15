<h1 align="center">
  RENTALX
</h1>

<p align="center">
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-extra-libs">Extra Libs</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-project">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-business-rules">Business Rules</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

<br>

## 🚀 Technologies

This project was developed with the following technologies:

- NodeJs
- Typescript

## 📚 Extra Libs

This project uses the following libs:

- jest
- prettier
- ts-jest
- ts-node-dev
- tsconfig-paths
- typescript
- aws-sdk
- bcryptjs
- class-transformer
- cors
- csv-parse
- dayjs
- dotenv
- express
- express-async-errors
- handlebars
- jsonwebtoken
- mime
- multer
- nodemailer
- pg
- rate-limiter-flexible
- redis
- reflect-metadata
- supertest
- swagger-ui-express
- tsyringe
- typeorm
- uuid

## 💻 Project

Ignite Shop is a shop platform integrated with Stripe. This project was developed during RocketSeat's Ignite React course.

## How to use?

Download this repositorie and with your teminal, enter in the directory

1. Run the command `npm install` to install the dependencies
2. Setup .env file using .env.example
3. And to start the application, run the command `npm run dev`

## 🔖 Business Rules

**RF** => Functional requirements
**RN** => Non-functional requirements
**RN** => Business rule

### Car registration

**RF**
-> It must be possible to register a car.

**RN**
N/A

**RN**
-> It must not be possible to register a car with an existing license plate.
-> It should not be possible to change the license plate of an already registered car.
-> The car must be registered with availability, by default.
-> The user responsible for the registration must be an admin user.

### Car listing

**RF**
-> It should be possible to list all available cars.
-> It should be possible to list all available cars by category name.
-> It should be possible to list all available cars by brand name.
-> It should be possible to list all available cars by car name.

**RN**
N/A

**RN**
-> The user does not need to be logged in the system.

### Specification Registration in the car

**RF**
-> It must be possible to register a specification for a car.

**RN**
N/A

**RN**
-> It must not be possible to register a specification for an unregistered car.
-> It must not be possible to register an existing specification for the same car.
-> The user responsible for the registration must be an admin user.

### Registration of car images

**RF**
-> It must be possible to register the image of the car.

**RN**
-> Use the multer to upload the files.

**RN**
-> The user can register more than one image for the same car
-> The user responsible for the registration must be an admin user.

### Car rental

**RF**
-> It must be possible to register a lease.

**RN**
N/A

**RN**
-> The rental must have a minimum duration of 24 hours.
-> It should not be possible to register a new lease if there is already one open for the same user.
-> It should not be possible to register a new lease if there is already one open for the same car.
-> The user must be logged in the application
-> When making a rental, the status of the car must be changed to unavailable

### Car return

**RF**
-> It must be possible to return a car

**RN**
-> If the car is returned with less than 24 hours, the full daily rate will be charged.
-> When making the return, the car must be released for another rental.
-> When making the return, the user must be released for another rental.
-> When making the return, the total rent must be calculated.
-> If the return time is longer than the expected delivery time, a fine will be charged proportional to the days of delay.
-> If there is a fine, it must be added to the total rent.
-> User must be logged in the application

### Rental listing for user

**RF**
-> It must be possible to search for all rentals for the user

**RN**
-> The user must be logged in the application

### Recover Password

**RF**
-> It must be possible for the user to recover the password by informing the e-mail
-> The user should receive an email with the step-by-step instructions for password recovery
-> User should be able to enter a new password

**RN**
-> User needs to enter a new password
-> The link sent to recovery must expire in 3 hours