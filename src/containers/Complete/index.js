import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addTask, completeTask} from '../../redux/action';
import {Done} from '../../utils/constants/Text';

//Component for the completed tasks screen
const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state?.task?.add);
  const completed = useSelector(state => state?.task?.complete);
  const [taskList, setTaskList] = useState(tasks);
  const [compTask, setCompTask] = useState(completed);

  useEffect(() => {
    dispatch(completeTask(compTask));
  }, [dispatch, compTask]);

  useEffect(() => {
    dispatch(addTask(taskList));
  }, [dispatch, taskList, compTask]);

  //Render function for showing completed task in flatlist
  const renderTask = ({item, index}) => {
    return (
      <View style={styles.task}>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={item?.done ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => onInComplete(index)}
          value={item?.done}
        />
        <Text>{item?.task}</Text>
        <Button
          title={`${Done.remove}`}
          onPress={() => handleDeleteTask(index)}
        />
      </View>
    );
  };

  //Function for making task incomplete on toggle
  const onInComplete = index => {
    setTaskList([...taskList, {task: compTask[index].task, done: false}]);
    handleDeleteTask(index);
  };

  //Function for removing/delete task from the list
  const handleDeleteTask = index => {
    const newTasks = [...compTask];
    newTasks.splice(index, 1);
    setCompTask(newTasks);
  };

  return (
    <View style={styles.mainBox}>
      <View style={styles.container}>
        <FlatList
          data={compTask}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => renderTask({item, index})}
        />
        <TouchableOpacity
          style={styles.complete}
          onPress={() => navigation.navigate(`${Done.home}`)}>
          <Text>{`${Done.incomplete}`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
//Styles for the component
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  mainBox: {
    flex: 1,
  },
  complete: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: 'yellow',
  },
  input: {
    height: 50,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    width: 300,
  },
  submit: {
    backgroundColor: 'cadetblue',
    marginBottom: 10,
    padding: 10,
    borderRadius: 50,
    width: 200,
  },
  addTask: {
    alignItems: 'center',
  },
  centerText: {
    textAlign: 'center',
  },
  task: {
    borderWidth: 1,
    padding: 5,
    margin: 5,
    backgroundColor: 'lightgreen',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default Home;
