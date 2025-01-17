import React, {Component} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';

import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

import global from '../styles/global';

const initialState = {desc: '', date: new Date(), showDatePicker: false};

export default class AddTask extends Component {
  state = {
    ...initialState,
  };

  handleSave = () => {
    const newTask = {
      desc: this.state.desc,
      date: this.state.date,
    };

    // if exists props on save ..... exec onSave of newTask
    this.props.onSave && this.props.onSave(newTask);
    this.setState({...initialState});
  };

  getDatePicker = () => {
    let datePicker = (
      <DateTimePicker
        value={this.state.date}
        onChange={(_, date) => this.setState({date, showDatePicker: false})}
        mode="date"
      />
    );

    const dateString = moment(this.state.date).format(
      'dddd, D [de] MMMM [de] YYYY'
    );
    // Check if should be visible, if yes add a Component inside of view in datepicker (Everything inside a "()" )
    if (Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity
            onPress={() => this.setState({showDatePicker: true})}>
            <Text style={styles.date}>{dateString}</Text>
          </TouchableOpacity>
          {this.state.showDatePicker && datePicker}
        </View>
      );
    }

    return datePicker;
  };
  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={this.props.onCancel}
        animationType="slide">
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.header}>Nova Tarefa </Text>
          <TextInput
            style={styles.input}
            placeholder="Informe a Descrição"
            onChangeText={desc => this.setState({desc})}
            value={this.state.desc}
          />
          {this.getDatePicker()}
          <View style={styles.buttons}>
            <TouchableOpacity onPress={this.props.onCancel}>
              <Text style={styles.button}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleSave}>
              <Text style={styles.button}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    backgroundColor: '#FFF',
  },
  header: {
    fontFamily: global.colors.fontFamily,
    backgroundColor: global.colors.today,
    color: global.colors.secondary,
    textAlign: 'center',
    padding: 15,
    fontSize: 18,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  input: {
    fontFamily: global.fontFamily,
    height: 40,
    margin: 15,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 6,
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: global.colors.today,
  },
  date: {
    fontFamily: global.fontFamily,
    fontSize: 20,
    marginLeft: 15,
  },
});
