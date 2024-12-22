import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import HomePage from "./pages/HomePage";
import { CATEGORIES } from "./constants"; 

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              News App
            </Link>
          </Typography>
          {CATEGORIES.map((category) => (
            <Button color="inherit" key={category} component={Link} to={`/category/${category}`}>
              {category}
            </Button>
          ))}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:category" />
      </Routes>
    </Router>
  );
}

export default App;
