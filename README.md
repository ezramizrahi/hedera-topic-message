<br />
<p align="center">
  <h3 align="center">Hedera Consensus Service - Topic Creation and Message Publishing</h3>
</p>



## Table of Contents

* [About](#about)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Installation](#installation)
* [Contact](#contact)



## About

Testing part of the [Hedera](https://docs.hedera.com/guides/docs/sdks) Consensus Service. Submit form data using React and an Express server. On upload, a topic is created along with a message published to that topic.

Within the Hedera Consensus Service, client applications submit a message (a string of bytes) and give the message a topic (an ID number). This message can include relevant details of a transaction, such as a bid on a financial asset, or in this case, confirmation that a form has been submitted. The topic (the ID) will allow messages with the same topic to be classified together. Read more here: [Hedera Hashgraph Consensus Service White Paper](https://hedera.com/hh-consensus-service-whitepaper.pdf).

### Built With

* [React](https://reactjs.org/)
* [Express](https://expressjs.com/)
* [Multer](https://github.com/expressjs/multer)
* [Hedera Hashgraph JavaScript SDK](https://docs.hedera.com/guides/docs/sdks)
* [Semantic UI React](https://react.semantic-ui.com/)

## Getting Started

To get a local copy up and running follow these simple steps:

### Installation

1. Sign up for a Testnet account to get an ID and keys from [Hedera](https://hedera.com/).

2. Clone the repo

3. Install the packages
```sh
npm install
```
5. Add your account id and keys in the `server.js` file

6. Navigate to the `src` folder and start the server
```bash
node server.js
```

7. Start the React frontend
```bash
npm start
```

8. Submit some form data

9. Receive a topic ID confirmation

## Contact

Ezra Mizrahi - ezra.mizrahi@hey.com
