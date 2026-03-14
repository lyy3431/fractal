import { useState } from 'react';
import type { ShapeNode } from '../../types';
import './ShapeTree.css';

interface ShapeTreeItemProps {
  node: ShapeNode;
  selectedId: string | null;
  onSelect: (node: ShapeNode) => void;
  depth?: number;
}

function ShapeTreeItem({ node, selectedId, onSelect, depth = 0 }: ShapeTreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
    onSelect(node);
  };

  return (
    <div className="tree-node">
      <div
        className={`tree-item ${selectedId === node.id ? 'selected' : ''}`}
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
        onClick={handleClick}
      >
        {hasChildren && (
          <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
            ▶
          </span>
        )}
        {!hasChildren && <span className="expand-icon empty"></span>}
        <span className="node-name">{node.name}</span>
      </div>
      {hasChildren && isExpanded && (
        <div className="tree-children">
          {node.children!.map((child) => (
            <ShapeTreeItem
              key={child.id}
              node={child}
              selectedId={selectedId}
              onSelect={onSelect}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface ShapeTreeProps {
  data: ShapeNode;
  selectedId: string | null;
  onSelect: (node: ShapeNode) => void;
}

export function ShapeTree({ data, selectedId, onSelect }: ShapeTreeProps) {
  return (
    <div className="shape-tree">
      <div className="tree-header">图形导航</div>
      <ShapeTreeItem node={data} selectedId={selectedId} onSelect={onSelect} />
    </div>
  );
}
