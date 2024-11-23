import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

const EditEventPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const event = location.state?.event;

  if (!event) {
    return <p>No event data found.</p>;
  }

  const [formData, setFormData] = useState({
    title: event.title,
    start: event.start,
    end: event.end,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    const updatedEvent = {
      id: event.id,
      title: formData.title,
      start: new Date(formData.start),
      end: new Date(formData.end),
    };
    try {
      const res = await axiosInstance.put(`api/events/${event.id}/`, {
        id: updatedEvent.id,
        title: updatedEvent.title,
        start: updatedEvent.start,
        end: updatedEvent.end,
      });
      console.log("Updated Event:", updatedEvent);
      alert(`Event "${updatedEvent.title}" updated successfully!`);

      navigate("/home");
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete(`api/events/${event.id}/`);
      alert(`Deleting event: ${event.title}`);
      navigate("/home");
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return (
    <div>
      <h2>Edit Event</h2>
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
      <button onClick={handleSave}>Save Changes</button>
      <button onClick={handleDelete} style={{ marginLeft: "10px" }}>
        Delete Event
      </button>
    </div>
  );
};

export default EditEventPage;
