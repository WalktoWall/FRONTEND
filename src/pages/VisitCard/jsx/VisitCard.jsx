import { useState } from "react";

import VisitCardStep1 from "./VisitCardStep1";
import VisitCardStep2 from "./VisitCardStep2";
import VisitCardStep3 from "./VisitCardStep3";

import BottomNav from "../../../components/jsx/BottomNav";
import "../css/VisitCard.css";

function VisitCard() {
  // 현재 화면 단계
  const [currentStep, setCurrentStep] = useState(1);

  // Visit Card 전체 입력값
  const [visitCardData, setVisitCardData] = useState({
    region: "",
    store: "",
    products: [],
    moods: [],
    shoppingPurpose: "",
    visitTime: "",
    consultationType: "",
    consultationDelay: "",
  });

  // 각 단계에서 입력한 값을 저장하는 함수
  const updateVisitCardData = (newData) => {
    setVisitCardData((previousData) => ({
      ...previousData,
      ...newData,
    }));
  };

  // 다음 단계
  const goToNextStep = () => {
    setCurrentStep((previousStep) => Math.min(previousStep + 1, 3));
  };

  // 이전 단계
  const goToPreviousStep = () => {
    setCurrentStep((previousStep) => Math.max(previousStep - 1, 1));
  };

  // Visit Card 생성 완료
  const handleVisitCardComplete = () => {
    console.log("완성된 Visit Card 정보:", visitCardData);

    // 추후 결과 화면 또는 홈 화면으로 이동하는 코드를 작성합니다.
  };

  // 현재 단계에 맞는 화면 표시
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <VisitCardStep1
            visitCardData={visitCardData}
            updateVisitCardData={updateVisitCardData}
            onNext={goToNextStep}
          />
        );

      case 2:
        return (
          <VisitCardStep2
            visitCardData={visitCardData}
            updateVisitCardData={updateVisitCardData}
            onNext={goToNextStep}
            onPrevious={goToPreviousStep}
          />
        );

      case 3:
        return (
          <VisitCardStep3
            visitCardData={visitCardData}
            updateVisitCardData={updateVisitCardData}
            onPrevious={goToPreviousStep}
            onComplete={handleVisitCardComplete}
          />
        );

      default:
        return null;
    }
  };

  return (
    <main className="page-with-bottom-nav visit-card-page">
      <section className="page-scroll-content visit-card-content">
        {renderCurrentStep()}
      </section>

      <BottomNav />
    </main>
  );
}

export default VisitCard;
