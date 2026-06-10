interface SearchFiltersProps {
  faculty: string;
  setFaculty: (value: string) => void;
  program: string;
  setProgram: (value: string) => void;
  semester: string;
  setSemester: (value: string) => void;
  moduleSearch: string;
  setModuleSearch: (value: string) => void;
}

function SearchFilters({
  faculty,
  setFaculty,
  program,
  setProgram,
  semester,
  setSemester,
  moduleSearch,
  setModuleSearch,
}: SearchFiltersProps) {
  return (
    <section>
      <article>
        <h2>Search Modules</h2>

        <label>Faculty</label>
        <input
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
          placeholder="e.g. Informatics"
        />

        <label>Program</label>
        <input
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          placeholder="e.g. Applied Informatics"
        />

        <label>Semester</label>
        <input
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          placeholder="e.g. 3"
        />

        <label>Module</label>
        <input
          value={moduleSearch}
          onChange={(e) => setModuleSearch(e.target.value)}
          placeholder="e.g. Web Applications"
        />
      </article>
    </section>
  );
}

export default SearchFilters;