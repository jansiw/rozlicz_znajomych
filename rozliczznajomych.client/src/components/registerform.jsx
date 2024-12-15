/* eslint-disable react/prop-types */
const RegisterForm = ({user, onSubmit,isLogin}) => {
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
                <button type="submit">{isLogin ? "Zaloguj sie" : "Zarejestruj sie"}</button>
            </form>
        </div>
    )
}
export default RegisterForm