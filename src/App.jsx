import { useState } from "react";

const EMPTY_FORM = { place: "", name: "", age: "" };

function App() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [rows, setRows] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const clearForm = () => setForm(EMPTY_FORM);

  const handleAdd = (e) => {
    e.preventDefault();
    const place = form.place.trim();
    const name = form.name.trim();
    const age = form.age.trim();
    if (!place || !name || !age) return;

    setRows((prev) => [...prev, { id: Date.now() + Math.random(), place, name, age }]);
    clearForm();
  };

  const removeRow = (id) => setRows((prev) => prev.filter((r) => r.id !== id));

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 py-4">
      <div className="card shadow-sm border-0 form-card">
        <div className="card-body p-4">
          <div className="text-center mb-3">
            <h1 className="h3 title mb-1">Add People to Table</h1>
            <p className="text-muted small mb-0">Enter Place, Name, and Age, then click Add.</p>
          </div>

          <form onSubmit={handleAdd}>
            <div className="row g-3">
              <div className="col-12 col-md-4">
                <label htmlFor="place" className="form-label">Place</label>
                <input
                  id="place"
                  type="text"
                  name="place"
                  className="form-control form-control-sm"
                  placeholder="e.g. Mumbai"
                  value={form.place}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12 col-md-4">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="form-control form-control-sm"
                  placeholder="e.g. Akash"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12 col-md-4">
                <label htmlFor="age" className="form-label">Age</label>
                <input
                  id="age"
                  type="number"
                  name="age"
                  min="0"
                  className="form-control form-control-sm"
                  placeholder="e.g. 24"
                  value={form.age}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="d-flex gap-2 mt-3">
              <button type="submit" className="btn btn-primary btn-sm">Add</button>
              <button type="button" className="btn btn-light border btn-sm" onClick={clearForm}>
                Clear
              </button>
            </div>
          </form>

          <div className="mt-3">
            {rows.length === 0 ? (
              <div className="empty-box text-center">No entries yet. Add your first row!</div>
            ) : (
              <div className="student-table table-responsive">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Place</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th><span className="visually-hidden">Action</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.id}>
                        <td>{r.place}</td>
                        <td>{r.name}</td>
                        <td>{r.age}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-remove btn-sm"
                            onClick={() => removeRow(r.id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
