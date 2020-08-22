import React from "react";
import { ThemeProvider } from "emotion-theming";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import theme from "./theme";

import { Box, Flex, Text } from "rebass";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Flex>
          <Link to="/">Home</Link>
          <Link to="login">Login</Link>
        </Flex>
        <Switch>
          <Route path="/login">
            <Text>Login</Text>
          </Route>
          <Route path="/">
            <Box>
              <Text variant="heading" fontSize={3}>
                UI Starter Kit
              </Text>
              <Text>Everything you need to get started?</Text>
            </Box>
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
