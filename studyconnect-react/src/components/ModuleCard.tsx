interface ModuleCardProps {
  name: string;
  faculty: string;
  program: string;
  semester: number;
  onShowSuggestions: () => void;
}

function ModuleCard({
  name,
  faculty,
  program,
  semester,
  onShowSuggestions,
}: ModuleCardProps) {
  return (
    <article className="group-card">
      <h3>{name}</h3>
      <p><strong>Faculty:</strong> {faculty}</p>
      <p><strong>Program:</strong> {program}</p>
      <p><strong>Semester:</strong> {semester}</p>

      <button type="button" onClick={onShowSuggestions}>
        Show Suggestions
      </button>
    </article>
  );
}

export default ModuleCard;