import Main from './components/main/Main';
import UserGuard from './components/user-guard/UserGuard';

export default function App() {
    return <UserGuard><Main /></UserGuard>;
}
