import React, { useState } from 'react';
import '../App.css';

type setTodo = (todos: string) => string;

type InputFormProps = {
    setTodos: React.Dispatch<React.SetStateAction<{ id: number; title: string; }[]>>;
};

const InputForm: React.FC<InputFormProps> = ({ setTodos }) => {
    // const [todoId, setTodoId] = useState(todos.length + 1)
    const [todoTitle, setTodoTitle] = useState('')

    const handleAddFormChanges = (e: React.ChangeEvent<HTMLInputElement>) => { setTodoTitle(e.target.value) }

    const handleAddTodo = () => {
        // todoTitle が入力なしの場合実行しない
        if (todoTitle === '') return
        // setTodos([...todos, {id: todoId, title: todoTitle}])
        setTodos((prev) => {
            const newTodos = [...prev, { id: prev.length + 1, title: todoTitle }]
            return newTodos
        })
        // setTodoId(todoId + 1)
        setTodoTitle('')
    }
    return (
        // CSS IN JS によりスタイリングの影響をコンポーネント内で完結できるものは完結する。
        <div style={{ position: 'relative' }}>
            <input
                type="text"
                // label="タイトル"
                value={todoTitle}
                onChange={handleAddFormChanges}
                placeholder="ここにTODOを入力し作成ボタンを押す"
                style={{
                    position: 'absolute',
                    top: '10px',
                    left: '100px',
                    width: '400px',
                    height: '1.6em',
                    outline: 'none',
                    marginRight: '10px',
                    borderStyle: 'none',
                    backgroundColor: '#ebebeb',
                    boxShadow: '-4px -4px 8px #fff, 4px 4px 8px rgb(0 0 0 / 36%)',
                }}
            />
            <button
                onClick={handleAddTodo}
                style={{
                    position: 'absolute',
                    top: '11px',
                    left: '520px',
                }}
            >作成
            </button>
        </div>
    )
}

export default InputForm;