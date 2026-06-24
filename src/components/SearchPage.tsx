import { useEffect, useMemo, useState } from "react";
import { apiRequest, authHeader } from "../api/api";
import type { Module, Partner } from "../types";
import { useAuth } from "../context/AuthContext";
import ModuleCard from "./ModuleCard";
import PartnerCard from "./PartnerCard";
import SearchFilters from "./SearchFilters";

function SearchPage() {
  const { token } = useAuth();
  const [modules, setModules] = useState<Module[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [faculty, setFaculty] = useState("");
  const [program, setProgram] = useState("");
  const [semester, setSemester] = useState("");
  const [moduleSearch, setModuleSearch] = useState(localStorage.getItem("moduleSearch") ?? "");
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [showAllModules, setShowAllModules] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [requestError, setRequestError] = useState("");
  const [sendingPartnerId, setSendingPartnerId] = useState<number | null>(null);
  const [sentPartnerIds, setSentPartnerIds] = useState<number[]>([]);

  useEffect(() => {
    localStorage.setItem("moduleSearch", moduleSearch);
  }, [moduleSearch]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError("");

      try {
        const [moduleData, partnerData] = await Promise.all([
          apiRequest<Module[]>("/modules"),
          apiRequest<Partner[]>("/partners"),
        ]);
        setModules(moduleData);
        setPartners(partnerData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not load study data");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredModules = useMemo(() => {
    return modules.filter((module) => {
      return (
        module.faculty.toLowerCase().includes(faculty.toLowerCase()) &&
        module.program.toLowerCase().includes(program.toLowerCase()) &&
        (semester === "" || module.semester === Number(semester)) &&
        module.name.toLowerCase().includes(moduleSearch.toLowerCase())
      );
    });
  }, [modules, faculty, program, semester, moduleSearch]);

  const visibleModules = showAllModules ? filteredModules : filteredModules.slice(0, 3);
  const suggestedPartners = selectedModule
    ? partners.filter((partner) => partner.module === selectedModule.name)
    : [];


  const sendRequest = async (partner: Partner) => {
    setSendingPartnerId(partner.id);
    setRequestMessage("");
    setRequestError("");

    try {
      await apiRequest("/requests", {
        method: "POST",
        headers: authHeader(token),
        body: JSON.stringify({
          partnerName: partner.name,
          module: partner.module,
          semester: partner.semester,
          message: `Hi ${partner.name}, would you like to study ${partner.module} together?`,
        }),
      });

      setSentPartnerIds((ids) => [...ids, partner.id]);
      setRequestMessage(`Request sent to ${partner.name}. You can check it on the Requests page.`);
    } catch (err) {
      setRequestError(err instanceof Error ? err.message : "Could not send request");
    } finally {
      setSendingPartnerId(null);
    }
  };

  if (loading) {
    return <p className="status-message">Loading study data...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <>
      <SearchFilters
        faculty={faculty}
        setFaculty={setFaculty}
        program={program}
        setProgram={setProgram}
        semester={semester}
        setSemester={setSemester}
        moduleSearch={moduleSearch}
        setModuleSearch={setModuleSearch}
      />

      <section>
        <h2>Matching Modules</h2>
        {filteredModules.length === 0 && <p>No modules found. Try another search.</p>}
        <div className="grid-container">
          {visibleModules.map((module) => (
            <ModuleCard
              key={module.id}
              {...module}
              onShowSuggestions={() => setSelectedModule(module)}
            />
          ))}
        </div>

        {filteredModules.length > 3 && (
          <button type="button" onClick={() => setShowAllModules((value) => !value)}>
            {showAllModules ? "Show fewer" : "Show all modules"}
          </button>
        )}
      </section>

      {selectedModule && (
        <section>
          <h2>Suggested Partners for {selectedModule.name}</h2>
          {requestMessage && <p className="status-message">{requestMessage}</p>}
          {requestError && <p className="error-message">{requestError}</p>}
          {suggestedPartners.length === 0 && <p>No partners found for this module yet.</p>}
          <div className="grid-container">
            {suggestedPartners.map((partner) => (
              <PartnerCard
                key={partner.id}
                {...partner}
                onSendRequest={() => sendRequest(partner)}
                requestLoading={sendingPartnerId === partner.id}
                requestSent={sentPartnerIds.includes(partner.id)}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

export default SearchPage;
