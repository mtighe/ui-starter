import React from "react";
import { signin, signup, signinGoogle } from "./FirebaseProvider";
import { Box, Text, Button, Card, Label, Input } from "theme-ui";
import { useForm, useField, splitFormProps } from "react-form";

const validatePresence = (message) => (value) => (value ? false : message);

const InputField = React.forwardRef((props, ref) => {
  const [field, fieldOptions, rest] = splitFormProps(props);

  const {
    meta: { error, isTouched, isValidating },
    getInputProps,
  } = useField(field, fieldOptions);

  return (
    <>
      <Input {...getInputProps({ ref, ...rest })} />{" "}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
});

const SignInForm = () => {
  const {
    Form,
    values,
    meta: { canSubmit },
  } = useForm();

  return (
    <Card>
      <Text variant="heading">Sign In</Text>
      <Form>
        <Box my={2}>
          <Label>Email</Label>
          <InputField
            field="email"
            validate={validatePresence("Email Required")}
            validatePristine
          />
        </Box>
        <Box my={2}>
          <Label>Password</Label>
          <InputField
            field="password"
            validate={validatePresence("Password Required")}
            validatePristine
          />
        </Box>
      </Form>
      <Box>
        <Button
          variant={canSubmit ? "primary" : "outline"}
          my={2}
          mr={2}
          disabled={!canSubmit}
          onClick={() => signin(values["email"], values["password"])}
        >
          Sign In
        </Button>
        <Button
          variant={canSubmit ? "primary" : "outline"}
          my={2}
          mr={2}
          disabled={!canSubmit}
          onClick={() => signup(values["email"], values["password"])}
        >
          Sign Up
        </Button>
        <Button variant="primary" my={2} onClick={signinGoogle}>
          Sign In with Google
        </Button>
      </Box>
    </Card>
  );
};

export default SignInForm;
