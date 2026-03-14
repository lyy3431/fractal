// 图形节点接口
export interface ShapeNode {
  id: string;
  name: string;
  description: string;
  parameters?: Record<string, any>;
  children?: ShapeNode[];
}

// 图形类别
export type ShapeCategory = 'fractal' | 'geometry' | 'pattern';

// 画布状态接口
export interface CanvasState {
  zoom: number;
  offsetX: number;
  offsetY: number;
  isDragging: boolean;
  lastX: number;
  lastY: number;
}

// 渲染器接口
export interface FractalRenderer {
  render: (
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    parameters: Record<string, any>,
    canvasState: CanvasState
  ) => void;
}

// 参数配置接口
export interface ParameterConfig {
  name: string;
  key: string;
  type: 'number' | 'color' | 'select';
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
}
