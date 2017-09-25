import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-one-time-password-42ab3.cloudfunctions.net';
export default class SIgnUpForm extends Component {

// es17 way of calling state without using a constructor
  state = { phone: '' };
// by calling handle submit using an arrow function
// i dont have to use bind(this) as a call back function
// by using async with await i dont have chain my post and each axios request
// will wait for the other one and we are still using promises
  handleSubmit = async () => {
    try {
      await axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone });
      await axios.post(`${ROOT_URL}/RequestOneTimePassword`, { phone: this.state.phone });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <View>
        <View style={{ marginBottom: 10 }} >
        <FormLabel> Enter Phone number </FormLabel>
        <FormInput
          value={this.state.phone}
          onChangeText={phone => this.setState({ phone })}
        />
        </View>
        <Button onPress={this.handleSubmit} title="Submit" />
      </View>
    );
  }
}
