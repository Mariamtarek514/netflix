import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [rememberLogin, setRemeberLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { logIn } = useAuth();
  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      console.error(error.code);
    }
  };
  return (
    <>
      <div className="h-screen w-full">
        <img
          className="absolute hidden h-full w-full object-cover sm:block"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/c906271d-7184-4eec-83c9-b6d4c1a068ec/6deb5ef0-79a9-44d4-97b6-934a7b64c1e3/EG-en-20231127-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="netflix background"
        />
        <div className="fixed inset-0 bg-black/60"></div>
        {/* form */}
        <div className="fixed z-20 w-full px-4 py-24">
          <div className="mx-auto h-[600px] max-w-[450px] rounded-lg bg-black/70">
            <div className="mx-auto max-w-[320px] py-16">
              <h1 className="font-nsans-light text-[2rem]">Login</h1>
              <form
                className="flex w-full flex-col py-4"
                onSubmit={handleFormSubmit}
              >
                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  className="my-2 rounded bg-neutral-700 p-3  focus:border-b-2 focus:border-yellow-600 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="password"
                  autoComplete="current-password"
                  className="my-2 rounded bg-neutral-700 p-3  focus:border-b-2 focus:border-yellow-600 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button className="my-6 rounded bg-red-600 py-3 font-nsans-bold">
                  Login
                </button>
                <div className="flex items-center justify-between text-gray-500">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="h-4 w-4 accent-neutral-500"
                      checked={rememberLogin}
                      onChange={() => setRemeberLogin(!rememberLogin)}
                    />
                    <label htmlFor="remember">Remember me</label>
                  </div>
                  <p>Need help?</p>
                </div>
                <p className="mt-10 space-x-2">
                  <span className="text-gray-500">New to Netflix?</span>
                  <Link to="/signup">Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
