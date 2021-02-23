import React, { useReducer, useState } from 'react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css'
import { Header, Button, Form, Message, Icon, Segment, Card, List } from 'semantic-ui-react';
import './App.css';


const formReducer = (state, event) => {
  if (event.reset) {
    return {
      subscription: '',
      name: ''
    }
  }
  return {
    ...state,
    [event.name]: event.value
  }
};

function App() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [responseData, setResponseData] = useState('');

  // submit the form
  const handleSubmit = event => {

    event.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    data.append('formData', formData);
    axios({
      method: 'POST',
      url: 'http://localhost:5000/upload',
      data: data
    }).then((res) => {
      console.log(res.data);
      setResponseData(res.data);
    });

    setTimeout(() => {
      setSubmitting(false);
    }, 3000)
  };

  // handle input change
  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  return (
    <div className="wrapper">
      <Segment>
        <Header as='h1'>Hedera Hashgraph Topic and Message Test</Header>
        {submitting &&
          <div>
            <Message info>
              <Message.Header>You're submitting the following data:</Message.Header>
              <List>
                {Object.entries(formData).map(([name, value]) => (
                  <List.Item key={name}>{value.toString()}</List.Item>
                ))}
              </List>
            </Message>
          </div>
        }
        <Form onSubmit={handleSubmit}>
          <Form.Field disabled={submitting}>
            <label>
              <p>Name</p>
              <input name="name" onChange={handleChange} value={formData.name || ''}/>
            </label>
          </Form.Field>
          <Form.Field label="Subscription" control="select" disabled={submitting} onChange={handleChange} value={formData.subscription || ''}>
            <option value="">--Please choose an option--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </Form.Field>
          <Button type="submit" disabled={submitting}>Submit</Button>
        </Form>
      </Segment>
      {responseData?.message &&
        <Message success>
          <Icon name='check circle' />
          Success! You've created a topic and published a message to the topic. {responseData.message}.
        </Message>
      }
    </div>
  );
}

export default App;
