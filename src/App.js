import React, { useEffect, useState, useRef } from "react";
import { Button, Container, Typography, Box, Paper } from "@mui/material";


function App() {
  const [counter, setCounter] = useState(0);
  const channel = useRef(null)

  useEffect(() => {
    // create channel
    channel.current = new BroadcastChannel('counter');

    const handleMessage = (event) => {
      // handling message and ensuring we get the proper data
      if (event.data && typeof event.data === 'number') {
        setCounter(event.data);
      }
    }

    if (channel.current) {
      // add event listener to channel message events
      channel.current.addEventListener('message', handleMessage)
    }

    return () => {
      channel.current.close();
    }
  }, [])


  const incrementCounter = () => {
    const newCounter = counter + 1
    setCounter(newCounter);

    try {
      if (channel.current) {
        channel.current.postMessage(newCounter)
      }
    }
    catch (err) {
      console.log(err)
    }
  };

  const decrementCounter = () => {
    const newCounter = counter - 1
    setCounter(newCounter);

    try {
      if (channel.current) {
        channel.current.postMessage(newCounter)
      }
    }
    catch (err) {
      console.log(err)
    }
  };


  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Sync Counter Across Tabs
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" color="textSecondary">
            Current Counter: {counter}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={incrementCounter}
            sx={{ padding: "10px 20px" }}
          >
            Increment
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={decrementCounter}
            sx={{ padding: "10px 20px" }}
          >
            Decrement
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default App;