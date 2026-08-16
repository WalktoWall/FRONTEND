const GENDER_OPTIONS = ["여성", "남성", "기타"];

function VisitCardStep1({ visitCardData, updateVisitCardData, onNext }) {
  const handleGenderSelect = (gender) => {
    updateVisitCardData({
      gender: visitCardData.gender === gender ? "" : gender,
    });
  };

  const canMoveToNext = Boolean(visitCardData.gender);

  const handleNext = () => {
    if (canMoveToNext) {
      onNext();
    }
  };

  return (
    <div className="visit-step visit-profile-step">
      <div className="visit-progress visit-profile-progress">
        <span className="visit-progress-bar visit-progress-step-one" />
      </div>

      <p className="visit-step-label">STEP 1</p>

      <h1 className="visit-step-title">
        본인 정보를 간단하게
        <br />
        입력해주세요.
      </h1>

      <div className="visit-divider" />

      <section className="visit-profile-field">
        <h2 className="visit-profile-label">성별</h2>

        <div className="visit-profile-options gender-options">
          {GENDER_OPTIONS.map((gender) => {
            const isSelected = visitCardData.gender === gender;

            return (
              <button
                type="button"
                key={gender}
                className={`visit-profile-option ${
                  isSelected ? "is-selected" : ""
                }`}
                aria-pressed={isSelected}
                onClick={() => handleGenderSelect(gender)}
              >
                {gender}
              </button>
            );
          })}
        </div>
      </section>

      <button
        type="button"
        className="visit-next-button visit-profile-next"
        disabled={!canMoveToNext}
        onClick={handleNext}
      >
        다음으로 이동
      </button>
    </div>
  );
}

export default VisitCardStep1;
