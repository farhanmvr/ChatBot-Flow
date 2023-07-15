import { useState } from 'react';
import AppContext from './AppContext';
import FlowArea from './components/FlowArea';
import SideBar from './components/SideBar';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';

import './index.css';
import Header from './components/Header';
import AlertTemplate from './components/AlertTemplate';

// Options for alert
const options = {
  position: positions.TOP_CENTER,
  timeout: 2000,
  transition: transitions.FADE,
};

function App() {
  const [selectedNode, setSelectedNode] = useState({}); // Selected node
  const [nonTargetNodes, setNonTargetNodes] = useState(new Set()); // Nodes which is not having target
  const [nodesAdded, setNodesAdded] = useState([]); // All nodes added to panel

  return (
    <AppContext.Provider
      value={{
        selectedNode,
        setSelectedNode,
        nonTargetNodes,
        setNonTargetNodes,
        nodesAdded,
        setNodesAdded,
      }}
    >
      <AlertProvider template={AlertTemplate} {...options}>
        <div className="header">
          <Header />
        </div>
        <div className="row" style={{ height: '100vh' }}>
          <div className="col-9 p-0">
            {/* Area where all added nodes and its connections are displayed */}
            <FlowArea />
          </div>
          <div className="col-3 p-0">
            {/* Side panel for adding new Nodes and editing nodes */}
            <SideBar />
          </div>
        </div>
      </AlertProvider>
    </AppContext.Provider>
  );
}

export default App;
