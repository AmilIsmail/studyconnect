interface PartnerCardProps {
  name: string;
  program: string;
  semester: number;
  format: string;
  module: string;
}

function PartnerCard({
  name,
  program,
  semester,
  format,
  module,
}: PartnerCardProps) {
  return (
    <article className="group-card">
      <h3>{name}</h3>
      <p><strong>Program:</strong> {program}</p>
      <p><strong>Semester:</strong> {semester}</p>
      <p><strong>Preferred Format:</strong> {format}</p>
      <p><strong>Module:</strong> {module}</p>
    </article>
  );
}

export default PartnerCard;