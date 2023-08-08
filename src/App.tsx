import React, { useState } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import TodoArray from './components/TodoArray';

const App = () => {
  const [todos, setTodos] = useState<{ id: number; title: string; }[]>([])
  return (
    <div className="App">
      <InputForm setTodos={setTodos} />
      <TodoArray todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
