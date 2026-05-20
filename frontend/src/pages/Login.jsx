import "./Login.css";

function Login() {
  return (

    <div className="login-container">

      <form className="login-form">

        <h1>Iniciar sesión</h1>

        <input
          type="email"
          placeholder="Email"
        />

        <input
          type="password"
          placeholder="Contraseña"
        />

        <button>
          Ingresar
        </button>

      </form>

    </div>
  );
}

export default Login;