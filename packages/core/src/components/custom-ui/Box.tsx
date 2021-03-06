import React from 'react';
import { DragSource, ConnectDragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';

const style: React.CSSProperties = {
  position: 'absolute',
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move',
};

export interface IBoxProps {
  id: any;
  left: number;
  top: number;
  hideSourceOnDrag?: boolean;

  // Collected Props
  connectDragSource: ConnectDragSource;
  isDragging?: boolean;
}

const Box: React.FC<IBoxProps> = ({
  hideSourceOnDrag,
  left,
  top,
  connectDragSource,
  isDragging,
  children,
}) => {
  if (isDragging && hideSourceOnDrag) {
    return null;
  }

  return connectDragSource(
    <div style={{ ...style, left, top }}>{children}</div>,
  );
};

export default DragSource(
  ItemTypes.BOX,
  {
    beginDrag(props: IBoxProps) {
      const { id, left, top } = props;
      return { id, left, top };
    },
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
)(Box);
