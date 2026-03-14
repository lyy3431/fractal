import type { ReactElement } from 'react';
import type { ShapeNode } from '../../types';
import './ShapeInfo.css';

interface ShapeInfoProps {
  shape: ShapeNode | null;
}

// 简单的 Markdown 风格渲染器
function renderMarkdown(text: string): ReactElement[] {
  const lines = text.split('\n');
  const elements: ReactElement[] = [];
  let inCodeBlock = false;
  let listItems: ReactElement[] = [];
  let listType: 'ul' | 'ol' | null = null;

  const flushList = () => {
    if (listItems.length > 0) {
      const ListTag = listType!;
      elements.push(
        <ListTag key={`list-${elements.length}`} className="info-list">
          {listItems}
        </ListTag>
      );
      listItems = [];
      listType = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 代码块
    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) {
      elements.push(
        <pre key={i} className="info-code">
          <code>{line}</code>
        </pre>
      );
      continue;
    }

    // 标题
    if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={i} className="info-h3">
          {line.slice(4)}
        </h3>
      );
      continue;
    }

    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={i} className="info-h2">
          {line.slice(3)}
        </h2>
      );
      continue;
    }

    if (line.startsWith('# ')) {
      flushList();
      elements.push(
        <h1 key={i} className="info-h1">
          {line.slice(2)}
        </h1>
      );
      continue;
    }

    // 处理行内格式
    const processInline = (text: string): ReactElement[] => {
      const parts = text.split(/(\*\*.*?\*\*)/g);
      return parts.map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j}>{part.slice(2, -2)}</strong>;
        }
        return <span key={j}>{part}</span>;
      });
    };

    // 有序列表
    const orderedMatch = line.match(/^(\d+)\. (.+)$/);
    if (orderedMatch) {
      if (listType === 'ul') flushList();
      listType = 'ol';
      listItems.push(<li key={i}>{processInline(orderedMatch[2])}</li>);
      continue;
    }

    // 无序列表
    if (line.startsWith('- ') || line.startsWith('• ')) {
      if (listType === 'ol') flushList();
      listType = 'ul';
      listItems.push(<li key={i}>{processInline(line.slice(2))}</li>);
      continue;
    }

    // 空行
    if (line.trim() === '') {
      flushList();
      continue;
    }

    // 普通段落
    flushList();
    elements.push(
      <p key={i} className="info-paragraph">
        {processInline(line)}
      </p>
    );
  }

  flushList();
  return elements;
}

export function ShapeInfo({ shape }: ShapeInfoProps) {
  if (!shape) {
    return (
      <div className="shape-info">
        <div className="info-empty">
          <div className="empty-message">
            <span className="empty-icon">📖</span>
            <p>请从左侧选择一个图形</p>
            <p className="empty-hint">查看详细介绍和可视化效果</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shape-info">
      <div className="info-content">
        <div className="info-description">
          {renderMarkdown(shape.description)}
        </div>
      </div>
    </div>
  );
}
