import { useState } from "react";
import "./App.css";
import { Todo, actions } from "./store";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const { add, remove, done, edit } = actions;
  const [todo, setTodo] = useState<Todo>({
    title: "",
    id: Date.now(),
    done: false,
  });

  const todos = useSelector((state: { todos: Todo[] }) => state?.todos || []);
  const [editItem, setEditItem] = useState<Todo>({} as Todo);
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <input
          value={todo.title}
          type="text"
          onChange={(e) =>
            setTodo((prev) => ({
              ...prev,
              title: e.target.value,
              id: Date.now(),
            }))
          }
        />
        <button
          onClick={() => {
            if (todo.title) {
              dispatch(add(todo));
              setTodo((prev) => ({ ...prev, title: "" }));
            }
          }}
        >
          Add
        </button>

        <div>
          <h1>Todos: </h1>
          {todos
            .filter((i) => !i.done)
            .map((item) => (
              <div key={item.id}>
                {item.title}{" "}
                <button
                  onClick={() => {
                    setEditItem(item);
                  }}
                >
                  edit
                </button>
                <button onClick={() => dispatch(done(item))}>done</button>
                {editItem?.id === item.id && (
                  <div>
                    <input
                      value={editItem.title}
                      type="text"
                      onChange={(e) =>
                        setEditItem((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                    <button
                      onClick={() => {
                        if (editItem?.title) {
                          dispatch(edit(editItem));
                          setEditItem({} as Todo);
                        }
                      }}
                    >
                      save
                    </button>
                  </div>
                )}
              </div>
            ))}
        </div>

        <div>
          <h1>Done: </h1>
          {todos
            .filter((i) => i.done)
            .map((item) => (
              <div key={item.id}>
                {item.title}{" "}
                <button onClick={() => dispatch(remove(item))}>delete</button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
