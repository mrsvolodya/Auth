// import { useAuth } from "../../components/AuthContent";

import { useCallback, useState } from "react";
import { useAuth } from "../../components/AuthContent";
import { EmailForm } from "../../components/ProfileComponents/EmailForm";
import { NameForm } from "../../components/ProfileComponents/NameForm";
import { PasswordForm } from "../../components/ProfileComponents/PasswordForm";
import { userService } from "../../services/userService";
import {
  EmailFormValues,
  NameFormValues,
  PasswordFormValues,
} from "../../types/users";
import { getErrorMessage } from "../../utils/getErrorMessage";

export function ProfilePage() {
  const { currentUser } = useAuth();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  const toggleSection = useCallback((section: string) => {
    setActiveSection((prev) => (prev === section ? null : section));
  }, []);

  const handleNameSubmit = async ({ firstName, lastName }: NameFormValues) => {
    try {
      await userService.updateName({ firstName, lastName });
      setMessage("Name updated successfully");
    } catch (error) {
      setMessage(getErrorMessage(error, "Failed to update name"));
    }
  };

  const handlePasswordSubmit = async ({
    oldPassword,
    newPassword,
    confirmPassword,
  }: PasswordFormValues) => {
    try {
      await userService.updatePassword({
        oldPassword,
        newPassword,
        confirmPassword,
      });
      setMessage("Password updated successfully");
    } catch (error) {
      setMessage(getErrorMessage(error, "Failed to update password"));
    }
  };

  const handleEmailSubmit = async ({ newEmail, password }: EmailFormValues) => {
    console.log("Updating email", newEmail, password);
    try {
      await userService.updateEmail({ newEmail, password });
      setMessage("Email updated successfully. Notification sent to old email.");
    } catch (error) {
      setMessage(getErrorMessage(error, "Failed to update email"));
    }
  };

  if (!currentUser) {
    return (
      <div className="m-8 text-xl text-red-500 text-center">No user data</div>
    );
  }

  return (
    <div className="m-8 max-w-md mx-auto">
      <h1 className="text-4xl font-bold mb-4 text-white">Profile</h1>
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="text-lg mb-6 rounded-xl shadow-lg">
          <p className="mb-2">
            <span className="font-semibold">Email: </span> {currentUser.email}
          </p>
          <p className="mb-2">
            <span className="font-semibold">First Name: </span>
            {currentUser.firstName}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Last Name: </span>
            {currentUser.lastName}
          </p>
          <p>
            <span className="font-semibold">ID: </span> {currentUser.id}
          </p>
        </div>

        <div className="mb-4">
          <button
            onClick={() => toggleSection("name")}
            className="w-full text-left text-xl font-semibold text-white bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-all duration-200"
            aria-expanded={activeSection === "name"}
          >
            Change Name {activeSection === "name" ? "▲" : "▼"}
          </button>

          {activeSection === "name" && (
            <NameForm
              initialFirstName={currentUser.firstName}
              initialLastName={currentUser.lastName}
              onSubmit={handleNameSubmit}
            />
          )}
        </div>
        <div className="mb-4">
          <button
            onClick={() => toggleSection("password")}
            className="w-full text-left text-xl font-semibold text-white bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-all duration-200"
            aria-expanded={activeSection === "password"}
          >
            Change Password {activeSection === "password" ? "▲" : "▼"}
          </button>
          {activeSection === "password" && (
            <PasswordForm onSubmit={handlePasswordSubmit} />
          )}
        </div>
        <div className="mb-4">
          <button
            onClick={() => toggleSection("email")}
            className="w-full text-left text-xl font-semibold text-white bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-all duration-200"
            aria-expanded={activeSection === "email"}
          >
            Change Email {activeSection === "email" ? "▲" : "▼"}
          </button>
          {activeSection === "email" && (
            <EmailForm onSubmit={handleEmailSubmit} />
          )}
        </div>
        {message && (
          <div
            className={`mt-4 p-2 rounded text-center text-white ${
              message.includes("successfully") ? "bg-green-600" : "bg-red-600"
            } transition-all duration-300`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
