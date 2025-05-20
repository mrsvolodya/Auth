import { useAuth } from "../../components/AuthContent";

export function ProfilePage() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <div className="m-8 text-xl text-red-500">No user data</div>;
  }

  return (
    <div className="m-8">
      <h1 className="text-4xl font-bold mb-4">Profile</h1>
      <div className="text-lg bg-gray-800 p-6 rounded-xl shadow-lg max-w-md">
        <p className="mb-2">
          <span className="font-semibold">Email:</span> {currentUser.email}
        </p>
        <p>
          <span className="font-semibold">ID:</span> {currentUser.id}
        </p>
      </div>
    </div>
  );
}
