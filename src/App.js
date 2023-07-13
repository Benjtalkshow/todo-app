// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import Todo from "./components/Todo";
import './App.css';

function App() {
  const dataFromLocalStorage = JSON.parse(localStorage.getItem('Task'));
  const [todo, setTodo] = useState("");
  const [allTodos, setAllTodos] = useState(dataFromLocalStorage || []);

  const inputTodo = (event) => {
    setTodo(event.target.value);
  };

  const addTodo = () => {
    if(todo !== "") {
      setAllTodos([...allTodos, todo]);
    };
    setTodo("");
  };

  const deleteTodo = (id) => {
    const filterItems = allTodos.filter((todoItem, index) => {
return index !== id;
    });
    setAllTodos(filterItems);
  };

  const updateTodo = (id) => {
    const filterItems = allTodos.filter((todoItem, index) => {
return index == id;
    });
    setTodo(filterItems);
    deleteTodo(id);
  };

  useEffect(() => {
    localStorage.setItem('Task', JSON.stringify(allTodos))}, [allTodos]);

  return (
    <div className="container-fluid">
      <div className='row'>
        <div className='col-sm-6 mx-auto bg-white rounded-4 p-3 mt-5'>
          <h2 className='text-center mb-4'> My Todo App</h2>
          <div className='d-flex gap-4 mb-4'>
            <input
             type='text'
              name='add-to-do'
               className='form-control shadow-none text-capitalize'
               placeholder='Enter New Task'
               value={todo}
               onChange={inputTodo} />
              <button onClick={addTodo} className='btn btn-warning px-3 fw-bold shadow-none'>Add</button>
          </div>
          <ul className='list-group'>
              {allTodos && allTodos.map((todoItem, index) => {
              return <Todo 
              todoItem={todoItem}
              key={index}
              id={index}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo} />
              })}
               </ul>
        </div>
      </div>
      <div className="col-sm-6 mx-auto p-2 mt-5">
  <p className="text-center text-white">
    Developed By <a href="https://www.linkedin.com/in/nnaji-benjamin-542773182/" target="_blank" rel='noreferrer'>Nnaji Benjamin</a> One <i class="fa-solid fa-heart fa-shake" style={{color: "#ff0000"}}></i>
  </p>
</div>



    </div>
  );
}

export default App;
