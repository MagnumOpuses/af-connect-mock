![alt text][logo]

[logo]: https://github.com/MagnumOpuses/project-meta/blob/master/img/jobtechdev_black.png "JobTech dev logo"

[A JobTech Project](https://www.jobtechdev.se)

# AF Connect Mock

AF Connect Mock is an service that mocks various sources of data.

This website's runtime environment is [Node.js](https://nodejs.org/) and is built using the web application framework is [Express](https://expressjs.com/).

The web pages/views are rendered using the [EJS](https://ejs.co/) template engine.

Operating this mocking service in development mode utilizes [Nodemon](https://nodemon.io/) to automatically restart the server upon source code changes.

## Versions, current dev state and future

No versions yet.

## Getting started
- Cretate self signed Certificate and private key.
- Create .env file in project root directory
##### Run with docker (Quick start)
- Create docker image
 From project root directory: docker build -t af-connect-mock:latest .
 Run docker image:
  docker run -p 9999:9999 -p 9998:9998 -e PKEY=/dist/cert_and_key/privatekey.pem -e \
   SSLCERT=/dist/cert_and_key/certificate.crt -t jobtechdev/af-connect-mock

### Prerequisites

You need Administrative privilege to make this change.

### Installation

Acquire the source code from this repository and install all dependencies using [NPM](https://www.npmjs.com/).

```bash
git clone https://github.com/MagnumOpuses/af-connect-mock.git
cd af-connect-mock
npm install
```

#### Customized configuration

Listed below are methods of overriding the default configuration with custom properties.

_Read move about environment configuration here: [dotenv](https://github.com/motdotla/dotenv)_

##### Provide custom properties via configuration file

1. Create an `.env` file at the root of the `af-connect-mock` directory with the following content.

   This `.env` file is ignored by the rules set in `.gitignore`, therefore in this file you may freely customizable the deployment to your own needs.

   ```
   PORT=9998,
   SSL_PORT=9999,
   pkey="./private.key",
   sslcert="./certificate.crt"
   ```

## Test

Execute all test cases to ensure that all its features work as intended.

```
npm test
```

## Deployment

### Deploy the site with Docker

```
...
```

### Deploy the site in development mode

In development mode the [Nodemon](https://nodemon.io/) will automatically detect changes to the source code and restart the server.

```
npm run dev
```

## Built with

- [Node.js v10.15.3](https://nodejs.org/) (Runtime environment)
- [NPM v6.4.1](https://www.npmjs.com/) (Node package manager)
- [Express v4.17.1](https://expressjs.com/) (Web application framework)
- [Nodemon v2.0.1](https://nodemon.io/) (Change monitor)
- [EJS v3.0.1](https://ejs.co/) (Template engine)

## Contributing

We would love if you'd like to help us build and improve this product for the benefit of everyone. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org/) code of conduct.

Any contributions, feedback and suggestions are more than welcome.

Please read our guidelines for contribution [here](CONTRIBUTING_TEMPLATE.md).

## License

[Apache License 2.0](LICENSE.md)

## Acknowledgments

No acknowledgments yet.
