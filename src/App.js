import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import HomePage from './Components/Home.Page';
import RQSuperHeroesPage from './Components/RQSuperHeroes.Page';
import {QueryClientProvider, QueryClient} from 'react-query';
import SuperHeroesPage from './Components/SuperrHeroes.Page';
import {ReactQueryDevtools} from 'react-query/devtools'
import RQSuperHeroPage from './Components/RQSuperHero.Page';
import ParallelQueryPage from './Components/ParallelQuery.Page';
import DynamicParallelPage from './Components/DynamicParallel.Page';
import DependentQueriesPage from './Components/DependentQueries.Page';
import PaginatedQueriesPage from './Components/PaginatedQueries.Page';
import InfiniteQueriesPage from './Components/InfiniteQueries.Page';


const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
   <Router>
     <div>
       <nav>
         <ul>
           <li>
             <Link to='/'>Home</Link>
           </li>
           <li>
             <Link to='/super-heroes'>Traditional Super Heroes</Link>
           </li>
           <li>
             <Link to='/rq-super-heroes'>RQ Super Heroes</Link>
           </li>
         </ul>
       </nav>
       <Switch>
       <Route path='/rq-inifinite'>
           <InfiniteQueriesPage/>
        </Route>
       <Route path='/rq-paginated'>
           <PaginatedQueriesPage/>
        </Route>
       <Route path='/rq-dependent'>
            <DependentQueriesPage email='sam@gmail.com'/>
        </Route>
       <Route path='/rq-dynamic-parallel'>
            <DynamicParallelPage heroIds={[1, 3]}/>
        </Route>
       <Route path='/rq-parallel'>
            <ParallelQueryPage/>
          </Route>
         <Route path='/rq-super-heroes/:heroId'>
            <RQSuperHeroPage/>
          </Route>
         <Route path='/super-heroes'>
          <SuperHeroesPage/>
         </Route>
         <Route path='/rq-super-heroes'>
            <RQSuperHeroesPage/>
         </Route>
         <Route path='/'>
           <HomePage/>
         </Route>
       </Switch>
     </div>
   </Router>
   <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
   </QueryClientProvider>
  );
}

export default App;
