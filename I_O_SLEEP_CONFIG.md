# File I/O Sleep Configuration

## Overview

This project now includes configurable sleep delays after file I/O operations. This feature allows you to throttle or simulate slower file system access for testing or performance analysis purposes.

## Configuration

### Central Configuration File

The sleep delay is configured via the `IOSleepConfig` object in [src/iosleep.ts](src/iosleep.ts):

```typescript
import { IOSleepConfig } from "./iosleep";

// Set the delay to 5 milliseconds
IOSleepConfig.setDelay(5);

// Get the current delay
const currentDelay = IOSleepConfig.getDelay();
```

### Default Behavior

By default, the delay is set to **0 milliseconds** (no delay). File I/O operations execute at normal speed.

## Implementation Details

### Synchronous File I/O Wrappers

All synchronous `fs.*Sync` operations have been wrapped with automatic sleep delays. Use `fsSync` instead of `fs`:

```typescript
import { fsSync } from "./iowrapper";

// Instead of: fs.existsSync(path)
const exists = fsSync.existsSync(path);

// Instead of: fs.statSync(path)
const stat = fsSync.statSync(path);

// Instead of: fs.readFileSync(path)
const content = fsSync.readFileSync(path);

// Instead of: fs.unlinkSync(path)
fsSync.unlinkSync(path);
```

**Wrapped sync methods:**
- `existsSync()`
- `statSync()`
- `readFileSync()`
- `writeFileSync()`
- `unlinkSync()`
- `readdirSync()`
- `mkdirSync()`
- `accessSync()`
- `lstatSync()`
- `readlinkSync()`
- `renameSync()`
- `chmodSync()`
- `rmdirSync()`
- `truncateSync()`

### Asynchronous File I/O Wrappers

Async `fs` callbacks have been wrapped with automatic sleep delays:

```typescript
import { fsAsync } from "./iowrapper";

const data = await fsAsync.readFile(path);
await fsAsync.writeFile(path, data);
const stat = await fsAsync.stat(path);
await fsAsync.unlink(path);
```

**Wrapped async methods:**
- `readFile()`
- `writeFile()`
- `stat()`
- `unlink()`
- `readdir()`
- `mkdir()`
- `access()`
- `lstat()`
- `readlink()`
- `rename()`
- `chmod()`
- `rmdir()`
- `truncate()`

### VS Code workspace.fs Wrappers

For `workspace.fs` operations (async), use the helper functions to wrap them:

```typescript
import { createWorkspaceFsStat, createWorkspaceFsReadDirectory, createWorkspaceFsWriteFile } from "./iowrapper";

// Create wrappers (pass the workspace object)
const statWithDelay = createWorkspaceFsStat(workspace);
const readWithDelay = createWorkspaceFsReadDirectory(workspace);
const writeWithDelay = createWorkspaceFsWriteFile(workspace);

// Use them
const stat = await statWithDelay(uri);
const entries = await readWithDelay(uri);
await writeWithDelay(uri, data);
```

**Available helper functions:**
- `createWorkspaceFsStat(workspace)`
- `createWorkspaceFsReadDirectory(workspace)`
- `createWorkspaceFsWriteFile(workspace)`
- `createWorkspaceFsDelete(workspace)`
- `createWorkspaceFsRename(workspace)`
- `createWorkspaceFsCopy(workspace)`
- `createWorkspaceFsCreateDirectory(workspace)`

## Files Modified

The following files have been updated to use the new I/O sleep wrappers:

### Synchronous I/O Wrappers Used In:
- `src/cobscanner.ts`
- `src/cobscanner_worker.ts`
- `src/fileutils.ts`
- `src/filesourcehandler.ts`
- `src/vscommon_commands.ts`
- `src/vsdotmarkdown.ts`
- `src/vsexternalfeatures.ts`
- `src/vsfileutils.ts`

### Asynchronous I/O Wrappers Used In:
- `src/vscobscanner.ts`
- `src/vscobolutils.ts`
- `src/vssourcescannerutils.ts`
- `src/vssourceviewtree.ts`
- `src/web/extension.ts`

## New Files Created

1. **[src/iosleep.ts](src/iosleep.ts)** - Central configuration for I/O sleep delays
2. **[src/iowrapper.ts](src/iowrapper.ts)** - Wrapper utilities for fs and workspace.fs operations

## Usage Examples

### Example 1: Simulating Slow File System Access

```typescript
import { IOSleepConfig } from "./iosleep";
import { fsSync } from "./iowrapper";

// Enable 10ms delay after each file I/O operation
IOSleepConfig.setDelay(10);

// Now all file operations will include a 10ms delay
const exists = fsSync.existsSync("/path/to/file");
const stat = fsSync.statSync("/path/to/file");
```

### Example 2: Testing Performance Impact

```typescript
import { IOSleepConfig } from "./iosleep";

// Test with different delays to measure performance impact
const delays = [0, 5, 10, 25, 50];

for (const delay of delays) {
    IOSleepConfig.setDelay(delay);
    // Run your code and measure performance
    console.log(`Testing with ${delay}ms delay...`);
}
```

### Example 3: Runtime Configuration

```typescript
import { IOSleepConfig } from "./iosleep";

// Get delay from environment variable
const delayMs = parseInt(process.env.IO_SLEEP_MS || "0", 10);
IOSleepConfig.setDelay(delayMs);
```

## How It Works

### Synchronous Operations

For synchronous operations, the sleep is implemented using:
1. `Atomics.wait()` on a SharedArrayBuffer (preferred - non-blocking within worker threads)
2. Busy-wait fallback if Atomics.wait fails (blocks the thread)

### Asynchronous Operations

For asynchronous operations, the sleep uses `setTimeout()` to pause before resolving the promise.

## Performance Considerations

- **Zero overhead when delay is 0ms** - The code checks if delay > 0 before sleeping
- **Synchronous operations** may block the main thread if using busy-wait fallback
- **Asynchronous operations** are non-blocking and suitable for most use cases
- Use asynchronous wrappers when possible for better performance

## Testing

When testing with I/O delays enabled, remember that:
- Tests may run significantly slower
- Some timeouts may need to be adjusted
- Performance profiling results will be different from production

Set the delay back to 0 before committing code for production use.
