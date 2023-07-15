/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import AppContext from '../AppContext';
import MessageNode from './MessageNode';
import { v4 as uuidv4 } from 'uuid';

const nodeTypes = { message: MessageNode };
let sourceConnection = {}; // Keep track of source connection for each node

const FlowArea = () => {
  const {
    selectedNode,
    setSelectedNode,
    nonTargetNodes,
    setNonTargetNodes,
    setNodesAdded,
  } = useContext(AppContext);
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = (params) => {
    // Make source connection true for this node
    sourceConnection = { ...sourceConnection, [params?.source]: true };

    // delete target node from non-target-nodes set since this got one target connection
    const updatedValues = new Set(nonTargetNodes);
    updatedValues.delete(params?.target);
    setNonTargetNodes(updatedValues);

    // Add edge
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          markerEnd: {
            type: MarkerType.Arrow,
          },
        },
        eds
      )
    );
  };

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Add node on drop
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: uuidv4(),
        type,
        position,
        data: { label: 'test message' },
        sourcePosition: 'right',
        targetPosition: 'left',
      };
      setNodesAdded((prev) => [...prev, newNode]);
      setNonTargetNodes((prevValues) => new Set([...prevValues, newNode?.id]));

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  // set selected node for editing in side panel
  const onNodeClick = (event, node) => setSelectedNode(node);

  // reset editing if user clicks on panel (ie outside of node)
  const onPanelClick = () => {
    if (selectedNode?.id) setSelectedNode({});
  };

  useEffect(() => {
    setNodes(
      nodes?.map((el) => (el?.id === selectedNode?.id ? selectedNode : el))
    );
  }, [selectedNode]);

  // Allow only one connection from source handle
  const isValidConnection = (connection) =>
    !sourceConnection?.[connection?.source];

  return (
    <div className="dndflow" style={{ height: '100%' }}>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onPaneClick={onPanelClick}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            elementsSelectable
            fitView
            nodeTypes={nodeTypes}
            isValidConnection={isValidConnection}
          >
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default FlowArea;
