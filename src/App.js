import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

import "./App.css";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Charte from "./components/Charte";
import Menu from "./components/Menu";
import Error404 from "./pages/Error404";
import ProtectedRoute from "./utils/ProtectedRoute";
import Poll from "./pages/Poll";
import PermForm from "./pages/PermForm";
import Badge from "./pages/Badge";
import { createGlobalStyle } from "styled-components";
import PermGen from "./pages/PermGen";
import Shotgun from "./pages/Shotgun";
import AppAssistancy from "./pages/AppAssistancy";
import AppPrivacy from "./pages/AppPrivacy";

React.lazy(() => import("./pages/Admin"));

const PUBLIC_URL = process.env.PUBLIC_URL;
// Create a `GlobalStyles` component.
// I usually already have this, to include a CSS
// reset, set border-box, and other global concerns.
const GlobalStyles = createGlobalStyle`
	html {
		--color-primary: #000000;
		--color-secondary: #AA9675;
		--color-third: #1D1D1B;
		--color-light: #75A5D1;
		--color-warning: #858585;
		--color-important: #858585;
		--color-font: #FAFAFA;
	}
`;

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={PUBLIC_URL}>
        <CssBaseline />
        <GlobalStyles />
        <React.Suspense fallback={<div>Loading</div>}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/badge" exact component={Badge} />
            <Route path="/shotgun" exact component={Shotgun} />
            <Route path="/login" exact component={Login} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/charte" exact component={Charte} />
            <Route path="/menu" component={Menu} />
            <Route path="/perm/gen/:id" exact component={PermGen} />
            <ProtectedRoute only="member" path="/admin" component={Admin} />
            <ProtectedRoute path="/poll/:id" exact component={Poll} />
            <ProtectedRoute path="/perm/form" exact component={PermForm} />
            <Route path="/app/assistancy" exact component={AppAssistancy} />
            <Route path="/app/privacy" exact component={AppPrivacy} />
            <Route component={Error404} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
