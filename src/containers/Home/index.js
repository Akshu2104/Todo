import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addTask, completeTask} from '../../redux/action';
import {Main} from '../../utils/constants/Text';

//Home component for main screen
const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const input = useSelector(state => state.task.add);
  const completed = useSelector(state => state.task.complete);
  const [flag, setFlag] = useState(0);
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [compTask, setCompTask] = useState([]);

  useEffect(() => {
    if (input !== undefined) {
      setTaskList(input);
    }
  }, [input]);

  useEffect(() => {
    if (completed !== undefined) {
      setCompTask(completed);
    }
  }, [completed]);

  useEffect(() => {
    dispatch(addTask(taskList));
  }, [dispatch, taskList]);

  useEffect(() => {
    dispatch(completeTask(compTask));
  }, [dispatch, compTask]);

  //Render component of the flatlist for incomplete task list
  const renderTask = ({item, index}) => {
    return (
      <View style={styles.task}>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={item?.done ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => onComplete(index)}
          value={item.done}
        />
        <Text>{item.task}</Text>
        <Button
          title={`${Main.remove}`}
          onPress={() => handleDeleteTask(index)}
        />
      </View>
    );
  };

  //Function for making task done/completed on toggle
  const onComplete = index => {
    setCompTask([...compTask, {task: taskList[index].task, done: true}]);
    handleDeleteTask(index);
  };

  //Function to remove task from list on clicking remove
  const handleDeleteTask = index => {
    const newTasks = [...taskList];
    newTasks.splice(index, 1);
    setTaskList(newTasks);
  };

  //Function to show new task add component on hiting + new task button
  const newTask = () => {
    setFlag(1);
  };

  //Function for adding new task on hiting add button
  const onAdd = () => {
    if (task.trim() !== '') {
      setTaskList([...taskList, {task: task, done: false}]);
      setTask('');
      setFlag(0);
    }
  };

  return (
    <View style={styles.mainBox}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.complete} onPress={() => newTask()}>
          <Text>{`${Main.new}`}</Text>
        </TouchableOpacity>
        {flag === 1 && (
          <View style={styles.addTask}>
            <TextInput
              style={styles.input}
              onChangeText={text => setTask(text)}
              value={task}
              placeholder={`${Main.new_task}`}
            />
            <TouchableOpacity
              style={styles.submit}
              onPress={() => {
                onAdd();
              }}>
              <Text style={styles.centerText}>{`${Main.add}`}</Text>
            </TouchableOpacity>
          </View>
        )}
        <FlatList
          data={taskList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => renderTask({item, index})}
        />
        <TouchableOpacity
          style={styles.complete}
          onPress={() => navigation.navigate(`${Main.complete}`)}>
          <Text>{`${Main.completed}`}</Text>
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
    margin: 10,
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
    backgroundColor: '#f57676',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default Home;
