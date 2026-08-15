const PRODUCT_OPTIONS = ["백팩", "토트백", "지갑", "액세서리"];

const MOOD_OPTIONS = ["스트리트", "클래식", "모던", "볼드", "미니멀"];

const QUICK_PURPOSE_OPTIONS = [
  "편하게 구경해보고 싶어요.",
  "어느 때나 잘 들 수 있는 가방을 찾고 있어요.",
  "신상품을 보고 싶어요.",
  "패션 포인트로 쓸 수 있는 가방이 필요해요.",
];

function VisitCardStep2({
  visitCardData,
  updateVisitCardData,
  onNext,
  onPrevious,
}) {
  const toggleArrayValue = (field, value) => {
    const currentValues = visitCardData[field];
    const isSelected = currentValues.includes(value);

    const nextValues = isSelected
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    updateVisitCardData({
      [field]: nextValues,
    });
  };

  const handlePurposeChange = (event) => {
    updateVisitCardData({
      shoppingPurpose: event.target.value,
    });
  };

  const handleQuickPurposeClick = (purpose) => {
    updateVisitCardData({
      shoppingPurpose: purpose,
    });
  };

  const canMoveToNext =
    visitCardData.moods.length > 0 &&
    visitCardData.shoppingPurpose.trim().length > 0;

  const handleNext = () => {
    if (!canMoveToNext) {
      return;
    }

    onNext();
  };

  return (
    <div className="visit-step visit-step-two">
      <button
        type="button"
        className="visit-back-button"
        aria-label="이전 단계로 이동"
        onClick={onPrevious}
      >
        ‹
      </button>

      <div className="visit-progress">
        <span className="visit-progress-bar visit-progress-step-two" />
      </div>

      <p className="visit-step-label">STEP 2</p>

      <h1 className="visit-step-title">
        오늘 찾는 제품과
        <br />
        원하는 무드를 알려주세요.
      </h1>

      <div className="visit-divider" />

      <section className="visit-choice-section">
        <h2 className="visit-choice-title">오늘 찾는 제품</h2>

        <div className="visit-chip-list">
          {PRODUCT_OPTIONS.map((product) => {
            const isSelected = visitCardData.products.includes(product);

            return (
              <button
                type="button"
                key={product}
                className={`visit-choice-chip ${
                  isSelected ? "is-selected" : ""
                }`}
                aria-pressed={isSelected}
                onClick={() => toggleArrayValue("products", product)}
              >
                {product}
              </button>
            );
          })}
        </div>
      </section>

      <section className="visit-choice-section">
        <h2 className="visit-choice-title">
          오늘의 무드
          <span className="visit-required-star" aria-label="필수 입력">
            *
          </span>
        </h2>

        <div className="visit-chip-list">
          {MOOD_OPTIONS.map((mood) => {
            const isSelected = visitCardData.moods.includes(mood);

            return (
              <button
                type="button"
                key={mood}
                className={`visit-choice-chip ${
                  isSelected ? "is-selected" : ""
                }`}
                aria-pressed={isSelected}
                onClick={() => toggleArrayValue("moods", mood)}
              >
                {mood}
              </button>
            );
          })}
        </div>
      </section>

      <section className="visit-choice-section">
        <label className="visit-choice-title" htmlFor="shopping-purpose">
          오늘의 쇼핑 목적
          <span className="visit-required-star" aria-label="필수 입력">
            *
          </span>
        </label>

        <textarea
          id="shopping-purpose"
          className="visit-purpose-input"
          value={visitCardData.shoppingPurpose}
          placeholder="자유롭게 입력해주세요."
          maxLength={200}
          required
          aria-required="true"
          onChange={handlePurposeChange}
        />
      </section>

      <section className="visit-quick-section">
        <h2 className="visit-choice-title">빠른 입력 추천</h2>

        <div className="visit-quick-list">
          {QUICK_PURPOSE_OPTIONS.map((purpose) => {
            const isSelected = visitCardData.shoppingPurpose === purpose;

            return (
              <button
                type="button"
                key={purpose}
                className={`visit-quick-button ${
                  isSelected ? "is-selected" : ""
                }`}
                onClick={() => handleQuickPurposeClick(purpose)}
              >
                {purpose}
              </button>
            );
          })}
        </div>
      </section>

      <button
        type="button"
        className="visit-next-button"
        disabled={!canMoveToNext}
        onClick={handleNext}
      >
        다음으로 이동
      </button>
    </div>
  );
}

export default VisitCardStep2;
