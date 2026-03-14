import { useEffect, useRef, useState, useCallback } from 'react';
import type { ShapeNode, CanvasState } from '../../types';
import {
  renderMandelbrot,
  renderJulia,
  renderSierpinski,
  renderNewton,
  renderBurningShip,
  renderPhoenix,
  renderSierpinskiCarpet,
  renderKochSnowflake,
  renderCantorSet,
  renderApollonian,
  renderHilbertCurve,
  renderDragonCurve,
  renderGoldenSpiral,
  renderLissajous,
  renderHTree
} from './renderers';
import { parameterConfigs } from '../../data/shapes';
import './FractalCanvas.css';

interface FractalCanvasProps {
  shape: ShapeNode | null;
}

// 不需要缩放/平移的图形 ID
const NO_ZOOM_PAN_IDS = [
  'sierpinski',
  'sierpinski-carpet',
  'koch-snowflake',
  'cantor-set',
  'apollonian',
  'hilbert-curve',
  'dragon-curve',
  'golden-spiral',
  'h-tree',
  'lissajous'
];

export function FractalCanvas({ shape }: FractalCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    zoom: 1,
    offsetX: -0.5,
    offsetY: 0,
    isDragging: false,
    lastX: 0,
    lastY: 0
  });
  const [parameters, setParameters] = useState<Record<string, any>>({});
  const [showControls, setShowControls] = useState(false);

  // 初始化参数和视图
  useEffect(() => {
    if (shape?.parameters) {
      setParameters(shape.parameters);
    } else {
      setParameters({});
    }

    // 根据图形设置默认视图
    const defaults: Record<string, Partial<CanvasState>> = {
      mandelbrot: { offsetX: -0.5, offsetY: 0, zoom: 1 },
      julia: { offsetX: 0, offsetY: 0, zoom: 1 },
      'burning-ship': { offsetX: -1.8, offsetY: 0.08, zoom: 1 },
      newton: { offsetX: 0, offsetY: 0, zoom: 1 },
      phoenix: { offsetX: 0, offsetY: 0, zoom: 1 }
    };

    const shapeDefault = shape ? defaults[shape.id] : {};
    setCanvasState({
      zoom: 1,
      offsetX: -0.5,
      offsetY: 0,
      isDragging: false,
      lastX: 0,
      lastY: 0,
      ...shapeDefault
    });
  }, [shape?.id, shape?.parameters]);

  // 渲染函数 - 使用 shape.parameters 作为默认值，用户修改后的 parameters 会覆盖
  const render = useCallback((renderParams?: Record<string, any>) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !shape) return;

    const rect = container.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);

    // 设置画布实际分辨率（支持高 DPI）
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    // 使用传入的参数或 state 中的参数
    const renderParameters = renderParams !== undefined ? renderParams : parameters;

    // 根据图形 ID 选择渲染器
    switch (shape.id) {
      case 'mandelbrot':
        renderMandelbrot(canvas, width, height, renderParameters, canvasState);
        break;
      case 'julia':
        renderJulia(canvas, width, height, renderParameters, canvasState);
        break;
      case 'sierpinski':
        renderSierpinski(canvas, width, height, renderParameters, canvasState);
        break;
      case 'newton':
        renderNewton(canvas, width, height, renderParameters, canvasState);
        break;
      case 'burning-ship':
        renderBurningShip(canvas, width, height, renderParameters, canvasState);
        break;
      case 'phoenix':
        renderPhoenix(canvas, width, height, renderParameters, canvasState);
        break;
      case 'sierpinski-carpet':
        renderSierpinskiCarpet(canvas, width, height, renderParameters, canvasState);
        break;
      case 'koch-snowflake':
        renderKochSnowflake(canvas, width, height, renderParameters, canvasState);
        break;
      case 'cantor-set':
        renderCantorSet(canvas, width, height, renderParameters, canvasState);
        break;
      case 'apollonian':
        renderApollonian(canvas, width, height, renderParameters, canvasState);
        break;
      case 'hilbert-curve':
        renderHilbertCurve(canvas, width, height, renderParameters, canvasState);
        break;
      case 'dragon-curve':
        renderDragonCurve(canvas, width, height, renderParameters, canvasState);
        break;
      case 'golden-spiral':
        renderGoldenSpiral(canvas, width, height, renderParameters, canvasState);
        break;
      case 'lissajous':
        renderLissajous(canvas, width, height, renderParameters, canvasState);
        break;
      case 'h-tree':
        renderHTree(canvas, width, height, renderParameters, canvasState);
        break;
    }
  }, [shape, parameters, canvasState]);

  // 渲染触发 - 当 shape 改变时，立即使用 shape.parameters 渲染
  useEffect(() => {
    if (shape?.parameters) {
      // shape 改变时立即使用新参数渲染，避免等待 state 更新
      render(shape.parameters);
    } else {
      render();
    }
  }, [shape, render]);

  // 窗口大小变化
  useEffect(() => {
    const handleResize = () => render();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [render]);

  // 鼠标事件处理
  const handleMouseDown = (e: React.MouseEvent) => {
    if (NO_ZOOM_PAN_IDS.includes(shape?.id || '')) return;
    setCanvasState(prev => ({
      ...prev,
      isDragging: true,
      lastX: e.clientX,
      lastY: e.clientY
    }));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasState.isDragging) return;
    const dx = e.clientX - canvasState.lastX;
    const dy = e.clientY - canvasState.lastY;

    setCanvasState(prev => ({
      ...prev,
      offsetX: prev.offsetX - dx / (500 * prev.zoom),
      offsetY: prev.offsetY - dy / (500 * prev.zoom),
      lastX: e.clientX,
      lastY: e.clientY
    }));
  };

  const handleMouseUp = () => {
    setCanvasState(prev => ({ ...prev, isDragging: false }));
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (NO_ZOOM_PAN_IDS.includes(shape?.id || '')) return;
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setCanvasState(prev => ({
      ...prev,
      zoom: Math.max(0.1, Math.min(1000, prev.zoom * delta))
    }));
  };

  // 参数变化处理
  const handleParameterChange = (key: string, value: any) => {
    setParameters(prev => ({ ...prev, [key]: value }));
  };

  // 重置视图
  const handleReset = () => {
    const defaults: Record<string, Partial<CanvasState>> = {
      mandelbrot: { offsetX: -0.5, offsetY: 0, zoom: 1 },
      julia: { offsetX: 0, offsetY: 0, zoom: 1 },
      'burning-ship': { offsetX: -1.8, offsetY: 0.08, zoom: 1 },
      newton: { offsetX: 0, offsetY: 0, zoom: 1 },
      phoenix: { offsetX: 0, offsetY: 0, zoom: 1 }
    };

    const shapeDefault = shape ? defaults[shape.id] : {};
    setCanvasState(prev => ({
      ...prev,
      zoom: 1,
      offsetX: -0.5,
      offsetY: 0,
      ...shapeDefault
    }));
  };

  const configs = shape ? parameterConfigs[shape.id] : undefined;
  const supportsZoomPan = shape && !NO_ZOOM_PAN_IDS.includes(shape.id);

  return (
    <div className="fractal-canvas" ref={containerRef}>
      <canvas
        ref={canvasRef}
        className={`canvas-element ${supportsZoomPan ? 'interactive' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      />

      {supportsZoomPan && (
        <>
          <div className="canvas-controls">
            <button onClick={handleReset} className="control-btn">
              重置视图
            </button>
            <button onClick={() => setShowControls(!showControls)} className="control-btn">
              {showControls ? '隐藏参数' : '显示参数'}
            </button>
          </div>

          <div className="canvas-info">
            <span>缩放：{canvasState.zoom.toFixed(2)}x</span>
            <span>位置：({canvasState.offsetX.toFixed(3)}, {canvasState.offsetY.toFixed(3)})</span>
          </div>
        </>
      )}

      {!supportsZoomPan && configs && (
        <div className="canvas-controls-simple">
          <button onClick={() => setShowControls(!showControls)} className="control-btn">
            {showControls ? '隐藏参数' : '显示参数'}
          </button>
        </div>
      )}

      {configs && showControls && (
        <div className="parameter-panel">
          <div className="panel-header">
            <h4>参数设置</h4>
            <button className="close-btn" onClick={() => setShowControls(false)}>×</button>
          </div>
          {configs.map(config => (
            <div key={config.key} className="parameter-item">
              <label>{config.name}</label>
              {config.type === 'number' && (
                <input
                  type="number"
                  value={parameters[config.key]}
                  onChange={(e) => handleParameterChange(config.key, parseFloat(e.target.value))}
                  min={config.min}
                  max={config.max}
                  step={config.step}
                />
              )}
              {config.type === 'color' && (
                <input
                  type="color"
                  value={parameters[config.key]}
                  onChange={(e) => handleParameterChange(config.key, e.target.value)}
                />
              )}
              {config.type === 'select' && (
                <select
                  value={parameters[config.key]}
                  onChange={(e) => handleParameterChange(config.key, e.target.value)}
                >
                  {config.options?.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
