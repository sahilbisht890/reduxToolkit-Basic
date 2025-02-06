import { useState , useRef } from "react";
import { IconTrashFilled , IconEdit } from "@tabler/icons-react";
import { useDispatch , useSelector } from "react-redux";
import { addTodo , deleteTodo , editTodo} from "../store/features/todo";
const Todo = () => {
  const {tasks } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [isEdit , setIsEdit] = useState(false);
  const [editId , setEditId] = useState(null);

  const addTask = () => {
    const input = inputRef.current.value;
    if (input.trim() === "") return;
     dispatch(addTodo(input));
     inputRef.current.value = ''
  };

  const deleteTask = (id) => {
    dispatch(deleteTodo(id));
  };

  const editTask = (task , index) => {
    inputRef.current.value = task.text ;
    setEditId(index);
    setIsEdit(true);
  };


  const handleAddAndEdit = () => {
    if(!isEdit){
        addTask();
     }else {
        const input = inputRef.current.value ;
         dispatch(editTodo({index : editId , text : input }));  
         inputRef.current.value = ''
         setIsEdit(false);
         setEditId(null);
     }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-6xl text-gray-700 font-bold text-center mb-7">Todo List</h2>
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          ref={inputRef}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter a todo"
        />
        <button
          onClick={handleAddAndEdit}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
        >
          {isEdit  ? "Update" : "Add"}
        </button>
      </div>
      <ul>
        {tasks.map((todo, index) => (
          <li
            key={index}
            className={`flex justify-between items-center p-2 border-3 border-gray-500 mb-4 rounded font-semibold ${editId === index  ? 'non-clickable' : 'clickable'}`}
          >
            <span className="text-xl">{todo.text}</span>
            <div className="flex gap-2">
              <button
                onClick={() => editTask(todo ,index)}
                className="text-gray-800 hover:underline cursor-pointer hover:scale-125 font-semibold text-base"
              >
                <IconEdit/>
              </button>
              <button
                onClick={() => deleteTask(todo.id)}
                className="text-red-700 hover:underline cursor-pointer hover:scale-125 font-semibold text-base"
              >
                <IconTrashFilled/>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
