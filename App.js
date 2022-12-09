
import "./App.css";
import React from "react";
import Title from "./components/Title";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";

/*Collection: Firestore'da bir koleksiyon oluşturmak için kullanılan bir işlevdir. Bir koleksiyon, Firestore veritabanının bir alt kapsamıdır ve koleksiyonun içinde birden çok belge (veri nesneleri) içerebilir.
Query: Firestore'daki belgeleri sorgulamak için kullanılan bir işlevdir. Belgeleri sorgulayarak arama, filtreleme ve sıralama işlemleri yapılabilir.
OnSnapshot: Firestore veritabanındaki değişiklikleri takip etmek için kullanılan bir işlevdir. Bir koleksiyon veya belge için izleme başlatıldığında, Firestore veritabanı koleksiyon veya belgeye herhangi bir değişiklik yaptığında çalıştırılacak bir işlev sağlar.
Doc: Firestore veritabanındaki bir belgeyi almak için kullanılan bir işlevdir. Bu işlev, belgenin kimliği (ID) veya sorgu (query) üzerinden belgeyi almak için kullanılır.
UpdateDoc: Firestore veritabanındaki bir belgeyi güncellemek için kullanılan bir işlevdir. Bu işlev, belgenin kimliği (ID) veya sorgu (query) üzerinden belgeyi güncellemek için kullanılır.
DeleteDoc: Firestore veritabanındaki bir belgeyi silmek için kullanılan bir işlevdir. Bu işlev, belgenin kimliği (ID) veya sorgu (query) üzerinden belgeyi silmek için kullanılır. */

import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [todos, setTodos] = React.useState([]);

  React.useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  const handleEdit = async (todo, title) => {
    await updateDoc(doc(db, "todos", todo.id), { title: title });
  };
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };
  return (
    <div className="App">
      <div>
        <Title />
      </div>
      <div>
        <AddTodo />
      </div>
      <div className="todo_container">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}
export default App;
