/** @jsx jsx */
import { jsx } from "theme-ui";
import { ThemeProvider } from "theme-ui";
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
  useUser,
  signout,
} from "./FirebaseProvider";
import SignInForm from "./SignInForm";

import { Box, Flex, Text, Button } from "theme-ui";

const Home = () => {
  const user = useUser();

  return (
    <Box>
      <Text
        variant="heading"
        sx={{ fontSize: 4, color: "primary" }}
        fontSize={3}
      >
        UI Starter Kit{" "}
      </Text>
      <Text>Everything you need to get started?</Text>
      <SignedIn>
        <Text>(Logged in as {user ? user.email : null})</Text>
        <Button variant="primary" my={2} onClick={signout}>
          Sign Out
        </Button>
      </SignedIn>
    </Box>
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
              <SignedOut>
                <SignInForm />
              </SignedOut>
              <SignedIn>
                <Redirect to="/" />
              </SignedIn>
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
