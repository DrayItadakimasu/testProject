import React, { forwardRef, ReactNode, Ref, useImperativeHandle, useState } from 'react';
import { RightOutlined } from '@ant-design/icons';
interface IProps {
  width: number;
  onWidthChange?: (width: number) => void;
  onMouseUp?: () => void;
  hasDrag?: boolean;
  children: ReactNode;
}
export interface DraggableLayoutRef {
  width: number;
}
const DraggableLayout = forwardRef(function DraggableLayout(
  { width, children, onWidthChange, hasDrag = true, onMouseUp }: IProps,
  ref: Ref<DraggableLayoutRef>
) {
  useImperativeHandle(ref, () => ({ width }));
  // state
  const [moving, setMoving] = useState<boolean>(false);
  // actions
  const handleMouseDown = () => {
    setMoving(true);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };
  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    setMoving(false);
    if (onMouseUp) onMouseUp();
  };
  const handleMouseMove = (event: MouseEvent) => {
    const windowWidth = window.innerWidth;
    const mouseX = event.clientX;
    const percent = windowWidth / 100;
    const result = mouseX / percent;
    if (onWidthChange !== undefined) onWidthChange(result);
  };
  return (
    <div style={{ width: width + '%' }} className="draggable-layout">
      {hasDrag && (
        <div className="draggable-layout__trigger" onMouseDown={handleMouseDown}>
          <RightOutlined color="red" />
        </div>
      )}
      <div className={`draggable-layout__content ${moving ? 'moving' : ''}`}>{children}</div>
    </div>
  );
});

export default DraggableLayout;
