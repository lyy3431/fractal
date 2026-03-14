import { useState, useEffect, useCallback } from 'react';
import type { ShapeNode, CanvasState } from '../types';

interface UseFractalRenderOptions {
  initialZoom?: number;
  initialOffsetX?: number;
  initialOffsetY?: number;
}

export function useFractalRender(
  shape: ShapeNode | null,
  options: UseFractalRenderOptions = {}
) {
  const {
    initialZoom = 1,
    initialOffsetX = 0,
    initialOffsetY = 0
  } = options;

  const [canvasState, setCanvasState] = useState<CanvasState>({
    zoom: initialZoom,
    offsetX: initialOffsetX,
    offsetY: initialOffsetY,
    isDragging: false,
    lastX: 0,
    lastY: 0
  });

  const [parameters, setParameters] = useState<Record<string, any>>({});

  // 初始化参数
  useEffect(() => {
    if (shape?.parameters) {
      setParameters(shape.parameters);
    }
  }, [shape?.id]);

  // 重置视图当切换图形
  useEffect(() => {
    const defaults: Record<string, Partial<CanvasState>> = {
      mandelbrot: { offsetX: -0.5, offsetY: 0 },
      julia: { offsetX: 0, offsetY: 0 },
      sierpinski: { zoom: 1 }
    };

    const shapeDefaults = shape ? defaults[shape.id] : {};
    setCanvasState(prev => ({
      ...prev,
      zoom: initialZoom,
      ...shapeDefaults
    }));
  }, [shape?.id, initialZoom]);

  // 平移控制
  const startDrag = useCallback((x: number, y: number) => {
    setCanvasState(prev => ({
      ...prev,
      isDragging: true,
      lastX: x,
      lastY: y
    }));
  }, []);

  const updateDrag = useCallback((x: number, y: number, sensitivity: number = 500) => {
    setCanvasState(prev => {
      if (!prev.isDragging) return prev;
      const dx = x - prev.lastX;
      const dy = y - prev.lastY;
      return {
        ...prev,
        offsetX: prev.offsetX - dx / (sensitivity * prev.zoom),
        offsetY: prev.offsetY - dy / (sensitivity * prev.zoom),
        lastX: x,
        lastY: y
      };
    });
  }, []);

  const endDrag = useCallback(() => {
    setCanvasState(prev => ({ ...prev, isDragging: false }));
  }, []);

  // 缩放控制
  const zoomIn = useCallback((factor: number = 1.1) => {
    setCanvasState(prev => ({
      ...prev,
      zoom: Math.min(1000, prev.zoom * factor)
    }));
  }, []);

  const zoomOut = useCallback((factor: number = 0.9) => {
    setCanvasState(prev => ({
      ...prev,
      zoom: Math.max(0.1, prev.zoom * factor)
    }));
  }, []);

  const setZoom = useCallback((zoom: number) => {
    setCanvasState(prev => ({
      ...prev,
      zoom: Math.max(0.1, Math.min(1000, zoom))
    }));
  }, []);

  // 重置
  const resetView = useCallback(() => {
    const defaults: Record<string, CanvasState> = {
      mandelbrot: {
        zoom: 1,
        offsetX: -0.5,
        offsetY: 0,
        isDragging: false,
        lastX: 0,
        lastY: 0
      },
      julia: {
        zoom: 1,
        offsetX: 0,
        offsetY: 0,
        isDragging: false,
        lastX: 0,
        lastY: 0
      },
      sierpinski: {
        zoom: 1,
        offsetX: 0,
        offsetY: 0,
        isDragging: false,
        lastX: 0,
        lastY: 0
      }
    };

    const shapeDefault = shape ? defaults[shape.id] : defaults.julia;
    setCanvasState(shapeDefault);
  }, [shape]);

  // 参数更新
  const updateParameter = useCallback((key: string, value: any) => {
    setParameters(prev => ({ ...prev, [key]: value }));
  }, []);

  return {
    canvasState,
    parameters,
    startDrag,
    updateDrag,
    endDrag,
    zoomIn,
    zoomOut,
    setZoom,
    resetView,
    updateParameter,
    setParameters
  };
}
