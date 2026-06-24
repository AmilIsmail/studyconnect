import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SearchFilters from "../components/SearchFilters";

describe("SearchFilters", () => {
  it("calls setter when module search changes", async () => {
    const setModuleSearch = vi.fn();

    render(
      <SearchFilters
        faculty=""
        setFaculty={vi.fn()}
        program=""
        setProgram={vi.fn()}
        semester=""
        setSemester={vi.fn()}
        moduleSearch=""
        setModuleSearch={setModuleSearch}
      />,
    );

    await userEvent.type(screen.getByPlaceholderText(/Web Applications/i), "DB");
    expect(setModuleSearch).toHaveBeenCalled();
  });
});
