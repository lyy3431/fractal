import { useState } from 'react';
import { MainLayoutTabs } from './components/Layout/MainLayoutTabs';
import { ShapeTree } from './components/Tree/ShapeTree';
import { ShapeInfo } from './components/Info/ShapeInfo';
import { FractalCanvas } from './components/Canvas/FractalCanvas';
import { shapesData } from './data/shapes';
import type { ShapeNode } from './types';
import './App.css';

function App() {
  const [selectedShape, setSelectedShape] = useState<ShapeNode | null>(null);

  const handleSelectShape = (node: ShapeNode) => {
    // 只有叶子节点（没有子节点）才能被选中用于显示
    if (!node.children || node.children.length === 0) {
      setSelectedShape(node);
    }
  };

  return (
    <MainLayoutTabs
      sidebar={
        <ShapeTree
          data={shapesData}
          selectedId={selectedShape?.id || null}
          onSelect={handleSelectShape}
        />
      }
      infoContent={<ShapeInfo shape={selectedShape} />}
      canvasContent={<FractalCanvas shape={selectedShape} />}
    />
  );
}

export default App;
