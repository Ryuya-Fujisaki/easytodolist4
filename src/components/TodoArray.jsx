const TodoArray = ({todos, setTodos}) => {

  const handleCompleteTodo = (index) => {
    // 新しい配列に今の配列を代入する。
    const newTodos = [...todos];
    // splice構文は一つ目の引数の順番の要素を二つ目の要素の数だけ削除する設定が可能。
    // newTodos配列のindex番目の要素を1つ削除する。
    newTodos.splice(index, 1);
    // setTodos関数でnewTodosステートに更新。
    setTodos(newTodos);
  }
  
  return (
    <div className="array">
      <ul>
        {/* map関数では、一つ目の引数は実際の入力値を、二つ目の引数は順番をとる。 */}
        {todos.map((todo, index) => (
            <li style={{display: 'flex', margin: '0 10px 5px 0'}} key={todo}>
                <span style={{marginRight: '5px'}}>{todo.title}</span>
                {/* 関数にindexのような引数を渡す場合はアロー関数で定義する必要がある。 */}
                <button onClick={()=>{handleCompleteTodo(index)}}>完了</button>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoArray;