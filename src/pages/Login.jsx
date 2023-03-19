import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envie o email e a senha para a API ou faça outra ação aqui
    console.log(`Email: ${email}, Senha: ${password}`);
  };

  return (
    <div className="flex h-screen bg-blue-500">
      <div className="m-auto w-1/3 text-white flex flex-wrap justify-center shadow-lg rounded-lg bg-white">
        <form onSubmit={handleSubmit} className="m-5 w-10/12">
          <h1 className="w-full text-4xl tracking-widest text-center my-6 text-cyan-900 font-bold">
            Faça login no Codevizion
          </h1>
          <div className="w-full my-6">
            <input
              className="p-2 rounded-md bg-gray-200 border border-gray-300 text-gray-800 w-full"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="w-full my-6">
            <input
              className="p-2 rounded-md bg-gray-200 border border-gray-300 text-gray-800 w-full"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="w-full my-6">
            <button
              type="submit"
              className="p-2 rounded-md bg-blue-700 text-white w-full"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
