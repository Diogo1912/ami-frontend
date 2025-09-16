import React, { useState, useEffect } from 'react';
import { Board } from './components/Board';
import { Header } from './components/Header';
import { squareService, Square } from './services/squareService';
import { toast, ToastContainer } from './components/Toast';

function App() {
  const [squares, setSquares] = useState<Square[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSquares();
  }, []);

  const loadSquares = async () => {
    try {
      const data = await squareService.getAll();
      setSquares(data);
    } catch (error) {
      toast.error('Failed to load squares');
      console.error('Error loading squares:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSquare = async () => {
    const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#F97316'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newSquare = {
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 200,
      size: 80,
      color: randomColor,
    };

    try {
      const createdSquare = await squareService.create(newSquare);
      setSquares(prev => [...prev, createdSquare]);
      toast.success('Square added!');
    } catch (error) {
      toast.error('Failed to add square');
      console.error('Error adding square:', error);
    }
  };

  const handleMoveSquare = async (id: number, x: number, y: number) => {
    setSquares(prev =>
      prev.map(square =>
        square.id === id ? { ...square, x, y } : square
      )
    );

    try {
      await squareService.update(id, { x, y });
    } catch (error) {
      toast.error('Failed to save position');
      loadSquares();
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#64748b'
      }}>
        Loading squares...
      </div>
    );
  }

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Header onAddSquare={handleAddSquare} />
      <Board squares={squares} onMoveSquare={handleMoveSquare} />
      <ToastContainer />
    </div>
  );
}

export default App;