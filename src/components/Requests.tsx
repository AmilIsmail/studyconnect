import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest, authHeader } from "../api/api";
import { useAuth } from "../context/AuthContext";
import type { StudyRequest } from "../types";

function Requests() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<StudyRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRequests() {
      try {
        const data = await apiRequest<StudyRequest[]>("/requests", {
          headers: authHeader(token),
        });
        setRequests(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load requests");
      } finally {
        setLoading(false);
      }
    }

    loadRequests();
  }, [token]);

  const updateStatus = async (id: number, status: string) => {
    await apiRequest(`/requests/${id}`, {
      method: "PUT",
      headers: authHeader(token),
      body: JSON.stringify({ status }),
    });
    setRequests((items) => items.map((item) => item.id === id ? { ...item, status } : item));
    if (status === "accepted") navigate("/chat");
  };

  if (loading) return <p className="status-message">Loading requests...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <section>
      <article>
        <h1>Study Requests</h1>
        {requests.map((request) => (
          <div className="group-card" key={request.id}>
            <h3>Study Request</h3>
            <p><strong>From:</strong> {request.senderName}</p>
            {request.partnerName && <p><strong>To:</strong> {request.partnerName}</p>}
            <p><strong>Module:</strong> {request.module}</p>
            <p><strong>Semester:</strong> {request.semester}</p>
            <p><strong>Message:</strong> {request.message}</p>
            <p><strong>Status:</strong> {request.status}</p>

            <div className="button-row">
              <button type="button" onClick={() => updateStatus(request.id, "accepted")}>Accept and Chat</button>
              <button type="button" className="secondary-btn" onClick={() => updateStatus(request.id, "declined")}>Decline</button>
            </div>
          </div>
        ))}

        <Link className="button-link secondary-btn" to="/dashboard">Back to Dashboard</Link>
      </article>
    </section>
  );
}

export default Requests;
