import GithubLogo from "../../../../assets/GithubLogo.svg";
export function GitHubLoginButton() {
  const loginWithGitHub = () => {
    const clientID = import.meta.env.VITE_GITHUB_CLIENT_ID;
    console.log({ clientID });
    const redirectURI = "http://localhost:5173/auth/github/callback";
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}`;
  };

  return (
    <div className="bg-black h-full p-2 rounded-md flex items-center justify-center cursor-pointer hover:bg-black/80 mb-2 space-x-8">
      <img src={GithubLogo} alt="Git Hub logo" className="w-5 h-5" />
      <button
        className="text-white text-center cursor-pointer"
        onClick={loginWithGitHub}
      >
        Login with GitHub
      </button>
    </div>
  );
}
