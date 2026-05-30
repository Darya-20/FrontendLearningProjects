import { BrowserRouter, Routes, Route } from 'react-router';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import Search from './pages/Search/Search';
import SearchResults from './pages/SearchResults/SearchResults';

import './styles/style.css';
import './styles/fonts.css';

function App() {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/search" element={<Search />} />
                <Route path="/search-results" element={<SearchResults />} />
            </Routes>

            <Footer />
        </BrowserRouter>
    );
}

export default App;
