import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../components/AuthContent";
import { usePageError } from "../../hooks/usePageError";
import { useEffect, useState } from "react";
import { User } from "../../types/users";
import { AxiosError } from "axios";
import { userService } from "../../services/userService";

export function UsersPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = usePageError("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    userService
      .getAll()
      .then(setUsers)
      .catch(async (error: AxiosError) => {
        if (error.response?.status !== 401) {
          setError(error.message);
          return;
        }

        await logout();

        navigate("/login", {
          state: {
            from: location,
            replace: true,
          },
        });
      });
  }, []);

  return (
    <div>
      <h3 className="text-2xl p-4">Users</h3>
      <ul className="p-4">
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>

      {error && <p className="text-xl p-4 text-red-500">{error}</p>}
    </div>
  );
}
