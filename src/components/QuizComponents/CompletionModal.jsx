import React from "react";
import {
  CompletionModalOverlay,
  ModalContent,
  ModalTitle,
  ModalText,
  ModalStats,
  ModalStatItem,
  ModalStatValue,
  ModalStatLabel,
  ActionButtons,
  ActionButton,
} from "./QuizStyles.jsx";

const CompletionModal = ({
  showModal,
  onClose,
  title,
  elapsedTime,
  completedCountries,
  totalCountries,
  guessedCountries,
  formatTime,
  onPlayAgain,
}) => {
  if (!showModal) return null;

  return (
    <CompletionModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>🎉 Quiz Complete!</ModalTitle>
        <ModalText>
          Congratulations! You've completed the {title.toLowerCase()}!
        </ModalText>
        
        <ModalStats>
          <ModalStatItem>
            <ModalStatValue>{formatTime(elapsedTime)}</ModalStatValue>
            <ModalStatLabel>Total Time</ModalStatLabel>
          </ModalStatItem>
          
          <ModalStatItem>
            <ModalStatValue>{completedCountries}/{totalCountries}</ModalStatValue>
            <ModalStatLabel>Countries</ModalStatLabel>
          </ModalStatItem>
          
          <ModalStatItem>
            <ModalStatValue color="var(--success-color)">
              {guessedCountries.length > 0 
                ? Math.round((guessedCountries.filter(c => c.attempts === 1).length / guessedCountries.length) * 100)
                : 0}%
            </ModalStatValue>
            <ModalStatLabel>First Try Success</ModalStatLabel>
          </ModalStatItem>
          
          <ModalStatItem>
            <ModalStatValue color="var(--success-color)">
              {guessedCountries.filter(c => c.attempts === 1).length}
            </ModalStatValue>
            <ModalStatLabel>Perfect</ModalStatLabel>
          </ModalStatItem>
          
          <ModalStatItem>
            <ModalStatValue color="var(--warning-color)">
              {guessedCountries.filter(c => c.attempts > 1 && c.attempts < 4).length}
            </ModalStatValue>
            <ModalStatLabel>Good</ModalStatLabel>
          </ModalStatItem>
          
          <ModalStatItem>
            <ModalStatValue color="var(--error-color)">
              {guessedCountries.filter(c => c.attempts >= 4).length}
            </ModalStatValue>
            <ModalStatLabel>Missed</ModalStatLabel>
          </ModalStatItem>
        </ModalStats>
        
        <ActionButtons>
          <ActionButton $primary onClick={onPlayAgain}>
            🎯 Play Again
          </ActionButton>
          <ActionButton onClick={onClose}>
            ✅ Close
          </ActionButton>
        </ActionButtons>
      </ModalContent>
    </CompletionModalOverlay>
  );
};

export default CompletionModal;
