
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Auth, CheckAuth, CreateMember, Dashboard, Member, MemberDetail } from './pages';
import { Layout } from './components';

function App() {

  const location = useLocation();

  const isHomePage = location.pathname === '/' || location.pathname.includes('check-auth');

  return(
    <>
      {!isHomePage ? (
        <Layout>
          <Routes>
            <Route path="/dashboard" Component={Dashboard} />
            <Route path="/members" Component={Member} />
            <Route path="/members/create" Component={CreateMember} />
            <Route path="/members/:id/update" Component={CreateMember} />
            <Route path="/members/:id" Component={MemberDetail} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/" Component={Auth} />
          <Route path="/check-auth/:token" Component={CheckAuth} />
        </Routes>
      )}
    </>
  )
}

export default App;
