interface PartnerCardProps {
  name: string;
  program: string;
  semester: number;
  format: string;
  module: string;
  onSendRequest?: () => void;
  requestLoading?: boolean;
  requestSent?: boolean;
}

function PartnerCard({
  name,
  program,
  semester,
  format,
  module,
  onSendRequest,
  requestLoading = false,
  requestSent = false,
}: PartnerCardProps) {
  return (
    <article className="group-card">
      <h3>{name}</h3>
      <p><strong>Program:</strong> {program}</p>
      <p><strong>Semester:</strong> {semester}</p>
      <p><strong>Preferred Format:</strong> {format}</p>
      <p><strong>Module:</strong> {module}</p>

      {onSendRequest && (
        <button type="button" onClick={onSendRequest} disabled={requestLoading || requestSent}>
          {requestSent ? "Request sent" : requestLoading ? "Sending..." : "Send Request"}
        </button>
      )}
    </article>
  );
}

export default PartnerCard;
