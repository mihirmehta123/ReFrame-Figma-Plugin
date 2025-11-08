# ReFrame - Figma Plugin

A Figma plugin that automatically renames frames based on their layout mode. ReFrame helps you maintain consistent naming conventions by renaming frames to semantic names that reflect their layout behavior.

## Features

- **Automatic Renaming**: Renames frames based on their layout mode
  - **Horizontal Layout** → `Inline`
  - **Vertical Layout** → `Stack`
  - **Layout Mode None** → `Div`
- **Recursive Processing**: Processes selected frames and all their nested children, grandchildren, and deeper descendants
- **Zero Configuration**: Runs automatically when opened - no user input required
- **Batch Processing**: Handles multiple selected frames at once

## Installation

### For Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Build the Plugin**
   ```bash
   npm run build
   ```
   
   Or use watch mode for automatic rebuilding:
   ```bash
   npm run watch
   ```

3. **Import to Figma**
   - Open Figma Desktop App
   - Go to `Plugins` → `Development` → `Import plugin from manifest...`
   - Select the `manifest.json` file from this directory

### For Production

After building, you can publish the plugin to the Figma Community or distribute the `manifest.json` and `code.js` files.

## Usage

1. **Select Frames**: Select one or more frames in your Figma document that you want to rename
2. **Run the Plugin**: 
   - Go to `Plugins` → `Development` → `ReFrame`
   - Or use the keyboard shortcut if configured
3. **Automatic Processing**: The plugin will automatically:
   - Find all frames within the selected nodes (including nested frames)
   - Rename them based on their layout mode
   - Show a notification with the count of renamed frames
   - Close automatically when done

### Example

If you have a frame structure like this:
```
Frame (Horizontal Layout)
  ├── Frame (Vertical Layout)
  │   ├── Frame (No Layout)
  │   └── Frame (Horizontal Layout)
  └── Frame (No Layout)
```

After running the plugin, it will be renamed to:
```
Inline
  ├── Stack
  │   ├── Div
  │   └── Inline
  └── Div
```

## Development

### Project Structure

```
ReFrame/
├── code.ts          # Main plugin code (TypeScript)
├── code.js          # Compiled JavaScript (generated)
├── manifest.json    # Plugin manifest
├── package.json     # Dependencies and scripts
└── tsconfig.json    # TypeScript configuration
```

### Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch for changes and auto-compile
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically

### Requirements

- Node.js (v14 or higher recommended)
- npm or yarn
- Figma Desktop App (for plugin development)

## How It Works

1. The plugin gets the currently selected nodes from Figma
2. It recursively traverses each selected node to find all frames (including nested ones)
3. For each frame found, it checks the `layoutMode` property:
   - `HORIZONTAL` → Renames to `Inline`
   - `VERTICAL` → Renames to `Stack`
   - `NONE` → Renames to `Div`
4. Shows a notification with the total count of renamed frames

## Notes

- The plugin only processes **frames** - other node types are ignored
- If no frames are selected, the plugin will show a notification asking you to select at least one frame
- The plugin processes frames recursively, so all nested frames within selected nodes will be renamed

## License

This project is open source and available for use and modification.

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.
