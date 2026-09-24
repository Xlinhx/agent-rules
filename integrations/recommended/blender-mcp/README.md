# Blender MCP Integration

Primary 3D modeling, asset generation, UV unwrapping, auto-rigging, and glTF/GLB export integration using `ahujasid/mcp-for-blender`.

## Capability
- `modeling.3d`: Direct programmatic control of Blender via `bpy`.
- `asset.3d.compose`: Asset fetching (Poly Haven, Poly Pizza), UV mapping, armature rigging, animation looping, and decimation bake.

## Execution
Runs isolated via `uvx mcp-for-blender`.
Connects to Blender via internal TCP socket (port 9876).
