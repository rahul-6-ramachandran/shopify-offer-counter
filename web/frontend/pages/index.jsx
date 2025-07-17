import { useEffect, useState, useCallback } from "react";
import {
  Card,
  Page,
  Layout,
  Spinner,
  Button,
  Modal,
  TextField,
} from "@shopify/polaris";
import { useAuthenticatedFetch } from "../hooks/useAuthenticatedFetch";

export default function Timers() {
  const fetch = useAuthenticatedFetch();
  const [timers, setTimers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalActive, setModalActive] = useState(false);
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const toggleModal = useCallback(() => setModalActive((active) => !active), []);

  const loadTimers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/timers");
      const data = await res.json();
      setTimers(data);
    } catch (err) {
      console.error("Failed to load timers:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/timers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, startTime, endTime }),
    });

    if (res.ok) {
      toggleModal();
      setTitle("");
      setStartTime("");
      setEndTime("");
      loadTimers(); 
    } else {
      console.error("Failed to create timer");
    }
  };

  useEffect(() => {
    loadTimers();
  }, []);

  return (
    <Page
      title="Countdown Timers"
      primaryAction={{
        content: "Create Timer",
        onAction: toggleModal,
      }}
    >
      <Layout>
        <Layout.Section>
          {loading ? (
            <Spinner accessibilityLabel="Loading timers" size="large" />
          ) : timers.length === 0 ? (
            <p>No timers created yet.</p>
          ) : (
            timers.map((timer) => (
              <Card title={timer.title} key={timer._id} sectioned>
                <p>Start: {new Date(timer.startTime).toLocaleString()}</p>
                <p>End: {new Date(timer.endTime).toLocaleString()}</p>
              </Card>
            ))
          )}
        </Layout.Section>
      </Layout>

      <Modal
        open={modalActive}
        onClose={toggleModal}
        title="Create New Countdown Timer"
        primaryAction={{
          content: "Create",
          onAction: handleSubmit,
        }}
        secondaryActions={[{ content: "Cancel", onAction: toggleModal }]}
      >
        <Modal.Section>
          <TextField label="Title" value={title} onChange={setTitle} autoComplete="off" />
          <TextField
            type="datetime-local"
            label="Start Time"
            value={startTime}
            onChange={setStartTime}
          />
          <TextField
            type="datetime-local"
            label="End Time"
            value={endTime}
            onChange={setEndTime}
          />
        </Modal.Section>
      </Modal>
    </Page>
  );
}
