import React from 'react';
import { DraggableSquare } from './DraggableSquare';
import { Square } from '../services/squareService';

interface BoardProps {
  squares: Square[];
  onMoveSquare: (id: number, x: number, y: number) => void;
}

export const Board: React.FC<BoardProps> = ({ squares, onMoveSquare }) => {
  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      paddingTop: '60px',
      overflow: 'hidden',
      backgroundColor: '#f8fafc'
    }}>
      {squares.map((square) => (
        <DraggableSquare
          key={square.id}
          square={square}
          onMove={onMoveSquare}
        />
      ))}
    </div>
  );
};