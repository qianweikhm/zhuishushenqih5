import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Home from './views/home'
import Bookshelf from './views/bookshelf'
import Classific from './views/classific'
import ClassificDetail from './views/classific/detail'
import BookCity from './views/bookcity'
import My from './views/my'
import BookIndex from './views/book'
import BookDetail from './views/book/detail'
import BookSearch from './views/book/search'
import Catalogue from './views/catalogue'
function App() {

  return (
    <Router>
      <Switch>
        <Route exact path='/bookshelf' component={Bookshelf} />
        <Route exact path='/classific' component={Classific} />
        <Route exact path='/classific/detail' component={ClassificDetail} />
        <Route exact path='/bookcity' component={BookCity} />
        <Route exact path='/book/index' component={BookIndex} />
        <Route exact path='/book/detail' component={BookDetail} />
        <Route exact path='/book/search' component={BookSearch} />
        <Route exact path='/my' component={My} />
        <Route exact path='/book/catalogue' component={Catalogue} />
        <Redirect to='/bookcity' />
      </Switch>
    </Router>
  )
}

export default App
