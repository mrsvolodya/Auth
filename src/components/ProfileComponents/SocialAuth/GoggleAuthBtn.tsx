import { GoogleAuth } from "../../GoogleAuth";

type GoogleAuthBtnProps = {
  onSuccess: () => void;
  onError: (error: string) => void;
};

export function GoogleAuthBtn({ onSuccess, onError }: GoogleAuthBtnProps) {
  return (
    <div>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            Or sign up with Google
          </span>
        </div>
      </div>

      <GoogleAuth
        mode="signup"
        redirectPath={"/profile"}
        onSuccess={onSuccess}
        onError={onError}
      />
    </div>
  );
}
