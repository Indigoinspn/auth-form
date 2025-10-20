import { Counter, StyledText, TimerWrapper } from './Timer.styles';

interface TimerProps {
  timeLeft: number;
}

export const Timer = ({ timeLeft }: TimerProps) => {
  return (
    <TimerWrapper>
      <StyledText>Time left </StyledText>
      <Counter>{timeLeft}s</Counter>
    </TimerWrapper>
  );
};

Timer.displayName = 'Code duration timer';
