import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
const AddEventPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    start: "",
    end: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddEvent = async () => {
    if (!formData.title || !formData.start || !formData.end) {
      alert("Please fill in all fields.");
      return;
    }

    const newEvent = {
      title: formData.title,
      start: new Date(formData.start),
      end: new Date(formData.end),
    };
    try {
      const res = await axiosInstance.post("api/event/", {
        title: newEvent.title,
        start: newEvent.start,
        end: newEvent.end,
      });

      console.log("New Event:", newEvent);
      alert(`Event "${newEvent.title}" added successfully!`);

      navigate("/home");
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return (
    <div>
      <h2>Add New Event</h2>
      <form>
        <div>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Start:
            <input
              type="datetime-local"
              name="start"
              value={formData.start}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            End:
            <input
              type="datetime-local"
              name="end"
              value={formData.end}
              onChange={handleChange}
            />
          </label>
        </div>
      </form>
      <button onClick={handleAddEvent}>Add Event</button>
    </div>
  );
};

export default AddEventPage;
