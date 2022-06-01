import React from "react";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./apollo";
import { AppBar, Paper, Container, Toolbar, Typography } from "@mui/material";
import { Dashboard } from "pages";

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Paper>
        <AppBar position="static">
          <Container>
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Wise Challenge
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
      </Paper>
      <Container
        sx={{
          p: 2,
        }}
      >
        <Dashboard />
      </Container>
    </ApolloProvider>
  );
};

export default App;
