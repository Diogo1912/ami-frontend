import React, { useState, useRef } from 'react';
import { Square } from '../services/squareService';

interface DraggableSquareProps {
  square: Square;
  onMove: (id: number, x: number, y: number) => void;
}

export const DraggableSquare = ({ square, onMove }: DraggableSquareProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, initialX: 0, initialY: 0 });
  const squareRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      initialX: square.x,
      initialY: square.y,
    });
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    const newX = Math.max(0, dragStart.initialX + deltaX);
    const newY = Math.max(0, dragStart.initialY + deltaY);

    if (squareRef.current) {
      squareRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
    }
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (!isDragging) return;

    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    const newX = Math.max(0, dragStart.initialX + deltaX);
    const newY = Math.max(0, dragStart.initialY + deltaY);

    onMove(square.id, newX, newY);
  };

  return (
    <div
      ref={squareRef}
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        transform: `translate(${square.x}px, ${square.y}px)`,
        width: `${square.size}px`,
        height: `${square.size}px`,
        backgroundColor: square.color,
        cursor: isDragging ? 'grabbing' : 'grab',
        borderRadius: '8px',
        boxShadow: isDragging 
          ? '0 10px 25px rgba(0, 0, 0, 0.2)' 
          : '0 2px 10px rgba(0, 0, 0, 0.1)',
        transition: isDragging ? 'none' : 'box-shadow 0.2s ease',
        userSelect: 'none',
        zIndex: isDragging ? 1000 : 1,
        border: '2px solid rgba(255, 255, 255, 0.2)',
      }}
    />
  );
};