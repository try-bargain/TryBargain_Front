import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import MyInfoPage from "./pages/MyInfoPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ChatListPage from "./pages/ChatPage";
import ChatRoomPage from "./pages/ChatPage/ChatRoom/ChatRoom";

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<HomePage/>}/>
            <Route path="product/:id" element={<DetailPage/>}/>
            <Route path="login" element={<LoginPage/>}/>
            <Route path="register" element={<RegisterPage/>}/>
            <Route path="myinfo" element={<MyInfoPage/>}/>
            <Route path="chat" element={<ChatListPage/>}/>
            <Route path="chatRoom/:id" element={<ChatRoomPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
