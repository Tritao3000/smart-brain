import React, { useEffect, useState } from "react";

import styled from "styled-components";

const BirdGame = ({
  GAME_WIDTH,
  GAME_HEIGHT,
  BIRD_SIZE,
  GRAVITY,
  JUMP_HEIGHT,
  OBSTACLE_WIDTH,
  OBSTACLE_GAP,
}) => {
  const [birdPosition, setBirdPosition] = useState(GAME_WIDTH / 2);
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [obstacleHeight, setObstacleHeight] = useState(GAME_WIDTH / 2.5);
  const [obstacleLeft, setObstacleLeft] = useState(GAME_WIDTH - OBSTACLE_WIDTH);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const bottomObstacleHeight = GAME_HEIGHT - OBSTACLE_GAP - obstacleHeight;

  useEffect(() => {
    if (gameHasStarted) {
      document.getElementById("high-score").style.display = "none";
      document.getElementById("game-over").style.display = "none";
      document.getElementById("score").style.display = "block";
    } else {
      if (score > highScore) {
        setHighScore(score);
      }
      document.getElementById("score").style.display = "none";
      document.getElementById("high-score").style.display = "block";
    }
  }, [gameHasStarted]);
  useEffect(() => {
    let timeId;
    if (gameHasStarted && birdPosition < GAME_HEIGHT - BIRD_SIZE) {
      timeId = setInterval(() => {
        setBirdPosition((birdPosition) => birdPosition + GRAVITY);
      }, 24);
    }
    return () => {
      clearInterval(timeId);
    };
  }, [birdPosition, gameHasStarted]);

  useEffect(() => {
    let obstacleId;
    if (gameHasStarted && obstacleLeft >= -OBSTACLE_WIDTH) {
      obstacleId = setInterval(() => {
        setObstacleLeft((obstacleLeft) => obstacleLeft - 0.01 * GAME_WIDTH);
      }, 24);

      return () => {
        clearInterval(obstacleId);
      };
    } else {
      setObstacleLeft(GAME_WIDTH - OBSTACLE_WIDTH);
      setObstacleHeight(
        Math.floor(Math.random() * (GAME_HEIGHT - OBSTACLE_GAP))
      );
      if (gameHasStarted) {
        setScore((score) => score + 1);
      }
    }
  }, [gameHasStarted, obstacleLeft]);

  useEffect(() => {
    const hasCollidedWithTopObject =
      birdPosition >= 0 && birdPosition < obstacleHeight;
    const hasCollidedWithBottomObject =
      birdPosition <= GAME_WIDTH &&
      birdPosition >= GAME_WIDTH - bottomObstacleHeight;

    if (
      obstacleLeft >= 0 &&
      obstacleLeft <= OBSTACLE_WIDTH &&
      (hasCollidedWithBottomObject || hasCollidedWithTopObject)
    ) {
      setBirdPosition(GAME_WIDTH / 2);
      setGameHasStarted(false);
      document.getElementById("game-over").style.display = "block";
    }
  }, [gameHasStarted, obstacleLeft]);

  const handleClick = () => {
    let newBirdPosition = birdPosition - JUMP_HEIGHT;
    if (!gameHasStarted) {
      setGameHasStarted(true);

      setScore(0);
    } else if (newBirdPosition < 0) {
      setBirdPosition(0);
    } else {
      setBirdPosition(newBirdPosition);
    }
  };
  return (
    <Div onClick={handleClick}>
      <GameBox
        height={GAME_HEIGHT}
        width={GAME_WIDTH}
        className="bg--transparent ba  bw b--white"
      >
        <Bird size={BIRD_SIZE} top={birdPosition} />
        <Obstacle
          top={0 - BIRD_SIZE}
          width={OBSTACLE_WIDTH}
          height={obstacleHeight}
          left={obstacleLeft}
        />
        <Obstacle
          top={
            GAME_HEIGHT - (obstacleHeight + bottomObstacleHeight) - BIRD_SIZE
          }
          width={OBSTACLE_WIDTH}
          height={bottomObstacleHeight}
          left={obstacleLeft}
        />
      </GameBox>
      <span id="score">{score}</span>
      <span id="high-score"> High Score: {highScore}</span>
      <h6 id="game-over"> Game Over! </h6>
    </Div>
  );
};

export default BirdGame;

const Bird = styled.div`
  position: relative;
  background-color: white;
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  top: ${(props) => props.top}px;
  border-radius: 50%;
  z-index: 1;
`;

const Div = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  & span {
    margin-top: 10px;
    color: white;
    font-size: 20px;
    position: absolute;
  }
  & h6 {
    color: white;
    font-size: 24px;
    position: absolute;
    display: none;
  }
`;

const GameBox = styled.div`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;

  overflow: hidden;
`;

const Obstacle = styled.div`
  position: relative;
  background-color: background: #cc95c0; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #7aa1d2,
    #dbd4b4,
    #cc95c0
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #7aa1d2,
    #dbd4b4,
    #cc95c0
  );;
  top: ${(props) => props.top}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  left: ${(props) => props.left}px;
`;
