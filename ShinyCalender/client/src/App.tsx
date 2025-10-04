import { useState, useEffect } from "react";

interface User { id: number; name: string; }

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");

  const loadUsers = async () => {
    const res = await fetch("/users");
    setUsers(await res.json());
  };

  useEffect(() => { loadUsers(); }, []);

  const addUser = async () => {
    if (!name.trim()) return;
    await fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setName("");
    loadUsers();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>React + Node + SQLite</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <button onClick={addUser}>Add</button>
      <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
    </div>
  );
}

export default App;
