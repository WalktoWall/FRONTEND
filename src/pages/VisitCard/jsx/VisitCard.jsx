import { useState } from "react";
import { useNavigate } from "react-router-dom";

import VisitCardStep1 from "./VisitCardStep1";
import VisitCardStep2 from "./VisitCardStep2";
import VisitCardStep3 from "./VisitCardStep3";
import VisitCardStep4 from "./VisitCardStep4";

import BottomNav from "../../../components/jsx/BottomNav";
import "../css/VisitCard.css";

const VISIT_CARD_STORAGE_KEY = "wtw-visit-card";

const formatVisitDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};

function VisitCard() {
  const navigate = useNavigate();

  // 현재 화면 단계
  const [currentStep, setCurrentStep] = useState(1);

  // Visit Card 전체 입력값
  const [visitCardData, setVisitCardData] = useState({
    gender: "",
    region: "",
    store: "",
    storeType: "",
    products: [],
    moods: [],
    shoppingPurpose: "",
    visitTime: "",
    visitTimeUndecided: false,
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
    setCurrentStep((previousStep) => Math.min(previousStep + 1, 4));
  };

  // 이전 단계
  const goToPreviousStep = () => {
    setCurrentStep((previousStep) => Math.max(previousStep - 1, 1));
  };

  // Visit Card 생성 완료
  const handleVisitCardComplete = () => {
    const completedVisitCardData = {
      ...visitCardData,
      visitDate: formatVisitDate(new Date()),
    };

    localStorage.setItem(
      VISIT_CARD_STORAGE_KEY,
      JSON.stringify(completedVisitCardData),
    );

    navigate("/home", {
      state: {
        visitCardData: completedVisitCardData,
      },
    });
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
            onNext={goToNextStep}
          />
        );

      case 4:
        return (
          <VisitCardStep4
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
