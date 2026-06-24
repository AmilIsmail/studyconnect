<main>
  <Routes>
    <Route
      path="/"
      element={
        <Home
          onLogin={() => navigate("/login")}
          onRegister={() => navigate("/register")}
        />
      }
    />

    <Route
      path="/login"
      element={
        <Login
          onLogin={() => navigate("/dashboard")}
          onBack={() => navigate("/")}
        />
      }
    />

    <Route
      path="/register"
      element={
        <Register
          onRegister={() => navigate("/dashboard")}
          onBack={() => navigate("/")}
        />
      }
    />

    <Route
      path="/dashboard"
      element={
        <Dashboard
          onSearch={() => navigate("/search")}
          onRequests={() => navigate("/requests")}
          onChat={() => navigate("/chat")}
          onLogout={() => navigate("/")}
        />
      }
    />

    <Route
      path="/requests"
      element={
        <Requests
          onBack={() => navigate("/dashboard")}
          onChat={() => navigate("/chat")}
        />
      }
    />

    <Route
      path="/chat"
      element={<Chat onBack={() => navigate("/dashboard")} />}
    />

    <Route
      path="/search"
      element={
        <>
          <button
            type="button"
            className="secondary-btn"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>

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
            <h2>Available Modules</h2>

            {filteredModules.length === 0 && (
              <p>No exact match found. Here are some suggestions:</p>
            )}

            <div className="grid-container">
              {visibleModules.map((module) => (
                <ModuleCard
                  key={module.id}
                  name={module.name}
                  faculty={module.faculty}
                  program={module.program}
                  semester={module.semester}
                  onShowSuggestions={() => setSelectedModule(module)}
                />
              ))}
            </div>

            {suggestionModules.length > 3 && !showAllModules && (
              <button type="button" onClick={() => setShowAllModules(true)}>
                Show More Modules
              </button>
            )}

            {showAllModules && (
              <button type="button" onClick={() => setShowAllModules(false)}>
                Show Less
              </button>
            )}
          </section>

          {selectedModule && (
            <section>
              <h2>Suggested Partners for {selectedModule.name}</h2>

              <div className="grid-container">
                {suggestedPartners.length > 0 ? (
                  suggestedPartners.map((partner) => (
                    <PartnerCard
                      key={partner.id}
                      name={partner.name}
                      program={partner.program}
                      semester={partner.semester}
                      format={partner.format}
                      module={partner.module}
                    />
                  ))
                ) : (
                  <p>No suggestions available for this module yet.</p>
                )}
              </div>
            </section>
          )}
        </>
      }
    />
  </Routes>
</main>