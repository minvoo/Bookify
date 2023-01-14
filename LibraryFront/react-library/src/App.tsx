import "./App.css";
import { Footer } from "./layouts/Footer/Footer";
import { Navbar } from "./layouts/Navbar/Navbar";
import { HomePage } from "./layouts/HomePage/HomePage";
import { SearchBooksPage } from "./layouts/SearchBooksPage/SearchBooksPage";
import { Route, Switch, Redirect } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
      <Route path='/' exact><Redirect to ='/home'/></Route>
      <Route path='/home' exact><HomePage /></Route>
      <Route path='/search'><SearchBooksPage /></Route>
      </Switch>
      <Footer />
    </>
  );
}