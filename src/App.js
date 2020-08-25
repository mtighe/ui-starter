import React, { useState } from "react";
import { ThemeProvider } from "emotion-theming";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import theme from "./theme";
import SessionProvider, {
  SignedIn,
  SignedOut,
  login,
  signup,
  logout,
  signinGoogle,
  useUser,
} from "./FirebaseProvider";

import { Box, Flex, Text, Button, Card } from "rebass";
import { Label, Input } from "@rebass/forms";

const useInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const inputProps = { value, onChange: (e) => setValue(e.target.value) };
  return [inputProps, value, setValue];
};

const Home = () => {
  const user = useUser();

  return (
    <Box>
      <Text variant="heading" fontSize={3}>
        UI Starter Kit
      </Text>
      <Text>Everything you need to get started?</Text>
      <SignedOut>
        <Text>(Logged in as {user ? user.email : null})</Text>
        <Button variant="primary" my={2} onClick={logout}>
          Logout
        </Button>
      </SignedOut>
    </Box>
  );
};

const Signin = () => {
  const [emailProps, email] = useInput();
  const [passwordProps, password] = useInput();

  return (
    <>
      <Text>Sign In</Text>
      <SignedIn>
        <Redirect to="/" />
      </SignedIn>
      <SignedOut>
        <Card>
          <Box my={2}>
            <Label>Email</Label>
            <Input {...emailProps} />
          </Box>
          <Box my={2}>
            <Label>Password</Label>
            <Input type="password" {...passwordProps} />
          </Box>
          <Box>
            <Button
              variant="primary"
              my={2}
              mr={2}
              onClick={() => login(email, password)}
            >
              Sign In
            </Button>
            <Button
              variant="primary"
              my={2}
              mr={2}
              onClick={() => signup(email, password)}
            >
              Sign Up
            </Button>
            <Button variant="primary" my={2} onClick={signinGoogle}>
              Sign In with Google
            </Button>
          </Box>
        </Card>
      </SignedOut>
    </>
  );
};

function App() {
  return (
    <SessionProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <Flex>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
          </Flex>
          <Switch>
            <Route path="/login">
              <Signin />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </ThemeProvider>
      </Router>
    </SessionProvider>
  );
}

export default App;
