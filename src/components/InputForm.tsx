import React, { useEffect, useState } from 'react';
import { db, addTodoToFirestore } from './FireBase';
import { collection, getDocs } from 'firebase/firestore';
import '../App.css';

type Todo = {
    id: number;
    title: string;
};

type InputFormProps = {
    setTodos: React.Dispatch<React.SetStateAction<{ id: number; title: string; }[]>>;
};

const InputForm: React.FC<InputFormProps> = ({ setTodos: setParentTodos }) => {

    const [todoTitle, setTodoTitle] = useState('')
    const [todos, setTodos] = useState<Todo[]>([]);

    const handleAddFormChanges = (e: React.ChangeEvent<HTMLInputElement>) => { setTodoTitle(e.target.value) }

    const handleAddTodo = async () => {
        if (todoTitle === '') return;

        // Firestoreにデータを追加
        await addTodoToFirestore(todoTitle);

        // todoTitleをクリア
        setTodoTitle('');

        setTodos(prevTodos => [
            ...prevTodos,
            { id: prevTodos.length + 1, title: todoTitle }
        ]);
    }

    useEffect(() => {
        // Firestoreからデータを取得してtodosステートを更新
        const fetchData = async () => {
            try {
                const todoCollection = collection(db, 'todo');
                const querySnapshot = await getDocs(todoCollection);
                const todosData: Todo[] = [];
                querySnapshot.forEach(doc => {
                    const todoData = doc.data();
                    todosData.push({ id: parseInt(doc.id), title: todoData.title });
                });
                setTodos(todosData);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchData();
    }, []);

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
            <div style={{ position: 'absolute', top: '50px', left: '100px' }}>
                {/* todosをマップして表示 */}
                {todos.map(todo => (
                    <div key={todo.id}>{todo.title}</div>
                ))}
            </div>
        </div>
    )
}

export default InputForm;