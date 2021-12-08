import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';

TodoItem.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

function TodoItem({item, onPress, editTodo, deleteTodo}) {
  return (
    <TouchableOpacity style={styles.taskWrapper} onPress={onPress}>
      <View style={{maxWidth: 200}}>
        <Text>{item.name}</Text>
        <Text>{item.createdAt}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button
          title="Edit"
          onPress={editTodo}
          color="#d4af37"
          style={styles.button}
        />
        <Button
          title="Del"
          onPress={deleteTodo}
          color="red"
          style={styles.button}
        />
      </View>
    </TouchableOpacity>
  );
}

export default TodoItem;

const styles = StyleSheet.create({
  taskWrapper: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#FFFFFF',
    borderBottomWidth: 0.5,
    width: '100%',
    alignItems: 'stretch',
    minHeight: 40,
  },
  task: {
    paddingBottom: 20,
    paddingLeft: 10,
    marginTop: 6,
    borderColor: '#F0F0F0',
    borderBottomWidth: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    // width: 10,
    // maxHeight: 10,
    // padding: 16,
  },
});
