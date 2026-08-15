const AGE_GROUP_OPTIONS = ["10대", "20대", "30대", "40대", "50대", "60대+"];
const GENDER_OPTIONS = ["여성", "남성", "기타"];

function VisitCardStep1({ visitCardData, updateVisitCardData, onNext }) {
  const handleNicknameChange = (event) => {
    updateVisitCardData({
      nickname: event.target.value,
    });
  };

  const handleSingleChoice = (field, value) => {
    updateVisitCardData({
      [field]: visitCardData[field] === value ? "" : value,
    });
  };

  const canMoveToNext = visitCardData.nickname.trim().length > 0;

  const handleNext = () => {
    if (!canMoveToNext) {
      return;
    }

    onNext();
  };

  return (
    <div className="visit-step visit-profile-step">
      <div className="visit-progress visit-profile-progress">
        <span className="visit-progress-bar visit-progress-step-one" />
      </div>

      <p className="visit-step-label">STEP 1</p>

      <h1 className="visit-step-title">본인을 소개해주세요.</h1>
      <p className="visit-step-description">
        고객님께 꼭 맞는 Visit Card를 만들기 위한 정보입니다.
      </p>

      <div className="visit-divider" />

      <section className="visit-profile-field">
        <label className="visit-profile-label" htmlFor="visit-nickname">
          닉네임
          <span className="visit-required-star" aria-label="필수 입력">
            *
          </span>
        </label>

        <input
          id="visit-nickname"
          type="text"
          className="visit-profile-input"
          value={visitCardData.nickname}
          placeholder="닉네임을 입력해주세요."
          maxLength={20}
          required
          aria-required="true"
          onChange={handleNicknameChange}
        />
      </section>

      <section className="visit-profile-field">
        <h2 className="visit-profile-label">연령대</h2>

        <div className="visit-profile-options age-options">
          {AGE_GROUP_OPTIONS.map((ageGroup) => {
            const isSelected = visitCardData.ageGroup === ageGroup;

            return (
              <button
                type="button"
                key={ageGroup}
                className={`visit-profile-option ${
                  isSelected ? "is-selected" : ""
                }`}
                aria-pressed={isSelected}
                onClick={() => handleSingleChoice("ageGroup", ageGroup)}
              >
                {ageGroup}
              </button>
            );
          })}
        </div>
      </section>

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
                onClick={() => handleSingleChoice("gender", gender)}
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
