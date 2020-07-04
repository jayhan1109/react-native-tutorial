import React, { useState } from "react";
import { StyleSheet, View, Button, FlatList } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (goalTitle) => {
    setCourseGoals([
      ...courseGoals,
      { key: Math.random().toString(), value: goalTitle },
    ]);

    setIsAddMode(false);
  };

  const removeGoalHandler = (goalId) => {
    setCourseGoals((goals) => {
      return goals.filter((goal) => goal.key !== goalId);
    });
  };

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput
        onCancel={cancelGoalAdditionHandler}
        onAddGoal={addGoalHandler}
        visible={isAddMode}
      />
      <FlatList
        data={courseGoals}
        renderItem={(items) => (
          <GoalItem
            id={items.item.key}
            onDelete={removeGoalHandler}
            title={items.item.value}
          />
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
