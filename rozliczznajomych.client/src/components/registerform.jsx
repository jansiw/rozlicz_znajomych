/* eslint-disable react/prop-types */
import CircularProgress from '@mui/material/CircularProgress';
const RegisterForm = ({user, onSubmit,isLogin, isloading}) => {
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="username"
                    value={user.username}
                    onChange={(e) => user.setUsername(e.target.value)}
                    required
                ></input><br/>
                <input
                    type="password"
                    placeholder="password"
                    value={user.password}
                    onChange={(e) => user.setPassword(e.target.value)}
                    required>
                </input><hr />
                {isloading ? <CircularProgress/>:<button type="submit">{isLogin ? "Zaloguj sie" : "Zarejestruj sie"}</button>}
            </form>
        </div>
    )
}
export default RegisterForm