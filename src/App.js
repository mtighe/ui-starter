/** @jsx jsx */
import { jsx } from "theme-ui";
import { ThemeProvider, Box, Flex, Text, Button } from "theme-ui";
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
import SignInForm from "./components/SignInForm";

const AuthRoute = ({ signedIn, signedOut, ...rest }) => (
  <Route {...rest}>
    <SignedIn>{signedIn}</SignedIn>
    <SignedOut>{signedOut}</SignedOut>
  </Route>
);

const SignedInRoute = ({ children, ...rest }) => (
  <AuthRoute {...rest} signedIn={children} signedOut={<Redirect to="/" />} />
);

const SignedOutRoute = ({ children, ...rest }) => (
  <AuthRoute {...rest} signedIn={<Redirect to="/" />} signedOut={children} />
);

const LoggedOutHome = () => (
  <Box>
    <Text sx={{ fontSize: 3, color: "primary" }} fontSize={3}>
      Logged out. Sign in!
    </Text>
  </Box>
);

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
            <SignedOutRoute path="/login">
              <SignInForm />
            </SignedOutRoute>
            <AuthRoute
              path="/"
              signedIn={<Home />}
              signedOut={<LoggedOutHome />}
            />
          </Switch>
        </ThemeProvider>
      </Router>
    </SessionProvider>
  );
}

export default App;
