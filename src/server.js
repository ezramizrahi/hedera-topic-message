const { Client, TopicCreateTransaction, TopicMessageSubmitTransaction } = require("@hashgraph/sdk");
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
app.use(cors());

var upload = multer({ dest: '../public/uploads/' });

// keys
const operatorAccount = '0.0.368448';
const operatorPrivateKey = '302e020100300506032b65700422042045cc6cee2b457e9390c82f6e133f729d570d88f1f570084fef934f691beb490f';
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
