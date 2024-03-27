import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header/Navbar";
import "./App.css";
import ComposePage from "./Pages/ComposePage";
import ArticlePage from "./Pages/ArticlePage";
import HomePage from "./Pages/HomePage";
import ProfilePage from "./Pages/ProfilePage";
import AuthPage from "./Pages/AuthPage";
import ArticleEdit from "./Pages/ArticleEdit";
function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/Compose">
          <ComposePage />
        </Route>
        <Route path="/Article/:id">
          <ArticlePage />
        </Route>
        <Route path="/Profile">
          <ProfilePage />
        </Route>
        <Route path="/Auth/:Method">
          <AuthPage />
        </Route>
        <Route path="/Edit/:id">
          <ArticleEdit />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
