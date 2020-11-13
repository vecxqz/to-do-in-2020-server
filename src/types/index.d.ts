declare interface cell {
  columnIndex: number /**横轴下标 */;
  rowIndex: number /**纵轴下标 */;
  x: number /** 横轴坐标*/;
  y: number /** 纵轴坐标 */;
  height?: number /** 格子高度*/;
  width?: number /** 格子宽度 */;
  size: number /** 格子边长 */;
  color?: string /** 格子当前颜色 */;
  backgroundColor: string /** 格子默认背景色 */;
}

declare interface layer {
  [index: number]: Array<cell> /** 存储格子数据 */;
  length: number;
}
declare interface layerMeta {
  layerName: string;
  width: number;
  height: number;
  canvasImageDataString: string;
  canvasImageData: CanvasImageData;
  key: string | number;
}
/** 单页数据类型*/
declare interface page {
  pageName: string;
  key: string | number;
  previewUrl: string;
  imageData: string;
  imageDataString: string;
  width: number;
  height: number;
  layers: Array<layerMeta>;
}
declare interface canvasData {
  title?: string;
  createTtme?: string;
  layer: layer;
}

declare interface eventPoint {
  startPoint: {
    e?: MouseEvent;
    x?: number;
    y?: number;
  };
  endPoint: {
    e?: MouseEvent;
    x?: number;
    y?: number;
  };
  lastStartPoint: {
    e?: MouseEvent;
    x?: number;
    y?: number;
  };
  lastEndPoint: {
    e?: MouseEvent;
    x?: number;
    y?: number;
  };
}

declare interface selectArea {
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
  data?: layer;
  isSet?: Boolean;
  isMove?: Boolean;
  isClickOut?: Boolean;
}

declare interface canvasMeta {
  id?: number;
  guid: string;
  key: string;
  width: number;
  height: number;
  data: Buffer;
}

declare interface pageMeta {
  id?: number;
  userId: number;
  canvasId: string;
  data: string;
}

declare interface userMeta {
  id?: number;
  username: string;
  password: string;
}
