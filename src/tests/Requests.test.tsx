import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Requests from "../components/Requests";
import { AuthContext } from "../context/AuthContext";

const mockFetch = vi.fn();

describe("Requests", () => {
  beforeEach(() => {
    mockFetch.mockReset();
    vi.stubGlobal("fetch", mockFetch);

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: 1,
          senderName: "Anna",
          module: "Web Applications",
          semester: 3,
          message: "Lernen?",
          status: "open",
        },
      ],
    });
  });

  it("sends a PUT request when declining a study request", async () => {
    const user = userEvent.setup();

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "updated" }),
    });

    render(
      <MemoryRouter>
        <AuthContext.Provider
          value={{
            user: { id: 1, name: "Test", email: "test@htwg-konstanz.de", program: "AI" },
            token: "abc",
            login: vi.fn(),
            register: vi.fn(),
            logout: vi.fn(),
          }}
        >
          <Requests />
        </AuthContext.Provider>
      </MemoryRouter>,
    );

    expect(await screen.findByText(/Anna/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /decline/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/requests/1"),
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify({ status: "declined" }),
        }),
      );
    });
  });
});
