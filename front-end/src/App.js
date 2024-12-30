import Header from './Components/Header';
import Branch from './Components/Branch';
import NewBranch from './Components/NewBranch';
import EditBranch from './Components/EditBranch';
import History from './Components/History';
import ViewBranch from './Components/ViewBranch';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';


function App() {
  const location = useLocation();
  const newHeader = ['/','/newBranch','/history/','/viewBranch/','/editBranch/'].some(path => location.pathname.startsWith(path));

  return (
    <>
      {newHeader && <Header />}

      <Routes>
        <Route path="/" element={<Branch />} />
        <Route path="/newBranch" element={<NewBranch />} />
        <Route path="/history/:branchCode" element={<History />} />
        <Route path="/viewBranch/:branchCode" element={<ViewBranch />} />
        <Route path="/editBranch/:branchCode" element={<EditBranch />} />
      </Routes>
    </>
  );
}

export default App;
