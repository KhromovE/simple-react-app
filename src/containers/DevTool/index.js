import React from 'react';
import { createDevTools } from 'redux-devtools';
import SliderMonitor from 'redux-slider-monitor';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

/**
 * Create the DevTools component and export it.
 */
export default createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"  // Hide or show the dock with "ctrl-h".
    changePositionKey="ctrl-q"    // Change the position of the dock with "ctrl-q".
    changeMonitorKey="ctrl-m"     // Change the monitor of the dock with "ctrl-m".
    defaultPosition="bottom"
  >
    <LogMonitor />
    <SliderMonitor />
  </DockMonitor>,
);
