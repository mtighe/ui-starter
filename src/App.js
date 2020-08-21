import React from "react";
import { ThemeProvider } from "emotion-theming";
import theme from "./theme";

import { Box, Text } from "rebass";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Text variant="heading" fontSize={3}>
          UI Starter Kit
        </Text>
        <Text>Everything you need to get started?</Text>
      </Box>
    </ThemeProvider>
  );
}

export default App;
