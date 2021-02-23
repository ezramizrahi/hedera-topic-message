const { Client, TopicCreateTransaction, TopicMessageSubmitTransaction } = require("@hashgraph/sdk");
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
app.use(cors());

// leaving this here in case i add a file upload
const upload = multer({ dest: '../public/uploads/' });

// keys
const operatorAccount = '';
const operatorPrivateKey = '';
if (operatorAccount == null || operatorPrivateKey == null ) {
  throw new Error('Environment variables operatorAccount and operatorPrivateKey must be present');
};

// set up Testnet Client
const client = Client.forTestnet();
client.setOperator(operatorAccount, operatorPrivateKey);

app.post('/upload', upload.none(), async (req, res) => {
  try {
    if (req) {
      // create topic transaction
      const createResponse = await new TopicCreateTransaction().execute(client);
      // create receipt
      const createReceipt = await createResponse.getReceipt(client);
      console.log(`topic id = ${createReceipt.topicId}`);

      // send a message
      const sendResponse = await new TopicMessageSubmitTransaction({
        topicId: createReceipt.topicId,
        message: 'submitting form data',
      }).execute(client);
      const sendReceipt = await sendResponse.getReceipt(client);
      console.log(`topic sequence number = ${sendReceipt.topicSequenceNumber}`);

      res.send({
        status: true,
        message: `Your topicId is: ${createReceipt.topicId}`,
      });
    } else {
      res.status(400).send({
        status: false,
        data: 'No file found.',
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(5000, () => console.log('The server is running on port 5000...'));
