import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Login from "../components/Login";
import { AuthContext } from "../context/AuthContext";

describe("Login", () => {
  it("calls login with email and password on submit", async () => {
    const user = userEvent.setup();
    const mockLogin = vi.fn().mockResolvedValue(undefined);

    render(
      <MemoryRouter>
        <AuthContext.Provider
          value={{
            user: null,
            token: null,
            login: mockLogin,
            register: vi.fn(),
            logout: vi.fn(),
          }}
        >
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>,
    );

    await user.clear(screen.getByLabelText(/email/i));
    await user.type(screen.getByLabelText(/email/i), "test@htwg-konstanz.de");

    await user.clear(screen.getByLabelText(/password/i));
    await user.type(screen.getByLabelText(/password/i), "test1234");

    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(mockLogin).toHaveBeenCalledWith("test@htwg-konstanz.de", "test1234");
  });
});
