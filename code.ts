// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This plugin renames frames based on their layout mode:
// - Horizontal layout → "Inline"
// - Vertical layout → "Stack"
// - Layout mode none → "Div"

// Recursively find all frames within a node and its children
function findAllFrames(node: SceneNode): FrameNode[] {
  const frames: FrameNode[] = [];
  
  // If the node itself is a frame, add it
  if (node.type === 'FRAME') {
    frames.push(node);
  }
  
  // If the node has children, recursively search them
  if ('children' in node) {
    for (const child of node.children) {
      frames.push(...findAllFrames(child));
    }
  }
  
  return frames;
}

// Get selected nodes
const selection = figma.currentPage.selection;

if (selection.length === 0) {
  figma.notify('Please select at least one frame to rename.');
  figma.closePlugin();
} else {
  // Collect all frames from selected nodes and their descendants
  const frames: FrameNode[] = [];
  for (const node of selection) {
    frames.push(...findAllFrames(node));
  }
  
  let renamedCount = 0;
  
  // Iterate through all frames and rename them based on layout mode
  for (const frame of frames) {
    if (frame.layoutMode === 'HORIZONTAL') {
      frame.name = 'Inline';
      renamedCount++;
    } else if (frame.layoutMode === 'VERTICAL') {
      frame.name = 'Stack';
      renamedCount++;
    } else if (frame.layoutMode === 'NONE') {
      frame.name = 'Div';
      renamedCount++;
    }
  }
  
  // Show a message and close the plugin
  figma.notify(`Renamed ${renamedCount} frame(s) based on layout mode.`);
  figma.closePlugin();
}
