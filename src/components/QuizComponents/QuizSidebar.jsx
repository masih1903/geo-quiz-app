import {
  Sidebar,
  StatsCard,
  StatTitle,
  StatValue,
  ProgressBar,
  ProgressFill,
  QuestionText,
  CountryDisplay,
} from "./QuizStyles.jsx";

const QuizSidebar = ({
  currentCountry,
  quizActive,
  elapsedTime,
  guesses,
  completedCountries,
  totalCountries,
  guessedCountries,
  formatTime,
}) => {
  const progressPercentage = totalCountries > 0 ? (completedCountries / totalCountries) * 100 : 0;

  return (
    <Sidebar>
      {currentCountry && quizActive && (
        <StatsCard>
          <StatTitle>🎯 Current Question</StatTitle>
          <div style={{ textAlign: 'center' }}>
            <QuestionText style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
              Find this country:
            </QuestionText>
            <CountryDisplay style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)' }}>
              {currentCountry.name}
            </CountryDisplay>
          </div>
        </StatsCard>
      )}

      {(quizActive || completedCountries > 0) && (
        <StatsCard>
          <StatTitle>⏱️ Timer</StatTitle>
          <StatValue>
            {formatTime(elapsedTime)}
          </StatValue>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-2)' }}>
            <span style={{ color: 'var(--gray-600)', fontSize: 'var(--text-sm)' }}>
              {quizActive ? 'Quiz in Progress' : 'Quiz Completed'}
            </span>
            {quizActive && currentCountry && (
              <span style={{ color: 'var(--primary-color)', fontSize: 'var(--text-sm)', fontWeight: '600' }}>
                Attempt: {(guesses[currentCountry.cca2] || 0) + 1}/4
              </span>
            )}
          </div>
        </StatsCard>
      )}

      <StatsCard>
        <StatTitle>📊 Progress</StatTitle>
        <StatValue>{completedCountries}/{totalCountries}</StatValue>
        <ProgressBar>
          <ProgressFill $percentage={progressPercentage} />
        </ProgressBar>
        <p style={{ color: 'var(--gray-600)', fontSize: 'var(--text-sm)', margin: 0 }}>
          {Math.round(progressPercentage)}% Complete
        </p>
      </StatsCard>

      <StatsCard>
        <StatTitle>⭐ Performance</StatTitle>
        <StatValue>
          {guessedCountries.length > 0 
            ? Math.round((guessedCountries.filter(c => c.attempts === 1).length / guessedCountries.length) * 100)
            : 0}%
        </StatValue>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-2)' }}>
          <span style={{ color: 'var(--gray-600)', fontSize: 'var(--text-sm)' }}>First Try Success</span>
          <span style={{ color: 'var(--success-color)', fontSize: 'var(--text-sm)', fontWeight: '600' }}>
            {guessedCountries.filter(c => c.attempts === 1).length} perfect
          </span>
        </div>
      </StatsCard>

      <StatsCard>
        <StatTitle>🎯 Accuracy</StatTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-3)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'var(--text-lg)', fontWeight: '700', color: 'var(--success-color)' }}>
              {guessedCountries.filter(c => c.attempts === 1).length}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-600)' }}>Perfect</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'var(--text-lg)', fontWeight: '700', color: 'var(--warning-color)' }}>
              {guessedCountries.filter(c => c.attempts > 1 && c.attempts < 4).length}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-600)' }}>Good</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'var(--text-lg)', fontWeight: '700', color: 'var(--error-color)' }}>
              {guessedCountries.filter(c => c.attempts >= 4).length}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-600)' }}>Missed</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'var(--text-lg)', fontWeight: '700', color: 'var(--primary-color)' }}>
              {totalCountries - completedCountries}
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-600)' }}>Remaining</div>
          </div>
        </div>
      </StatsCard>
    </Sidebar>
  );
};

export default QuizSidebar;
