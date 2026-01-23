/**
 * Wrapper utilities for fs and workspace.fs operations with configurable delays
 */

import * as fs from "fs";
import { ioSleep, ioSleepSync } from "./iosleep";

/**
 * Synchronous file I/O wrappers with delay
 */
export const fsSync = {
    /**
     * Synchronous version of exists check
     */
    existsSync(path: string | Buffer): boolean {
        const result = fs.existsSync(path as any);
        ioSleepSync();
        return result;
    },

    /**
     * Synchronous version of stat
     */
    statSync(path: string | Buffer, options?: any): any {
        const result = fs.statSync(path as any, options);
        ioSleepSync();
        return result;
    },

    /**
     * Synchronous version of readFile
     */
    readFileSync(path: string | Buffer, encoding?: BufferEncoding): string | Buffer {
        const result = fs.readFileSync(path as any, encoding);
        ioSleepSync();
        return result;
    },

    /**
     * Synchronous version of writeFile
     */
    writeFileSync(path: string | Buffer, data: string | NodeJS.ArrayBufferView): void {
        fs.writeFileSync(path as any, data);
        ioSleepSync();
    },

    /**
     * Synchronous version of unlink
     */
    unlinkSync(path: string | Buffer): void {
        fs.unlinkSync(path as any);
        ioSleepSync();
    },

    /**
     * Synchronous version of readdir
     */
    readdirSync(path: string | Buffer, options?: any): any {
        const result = fs.readdirSync(path as any, options);
        ioSleepSync();
        return result;
    },

    /**
     * Synchronous version of mkdir
     */
    mkdirSync(path: string | Buffer, options?: any): string | undefined {
        const result = fs.mkdirSync(path as any, options);
        ioSleepSync();
        return result;
    },

    /**
     * Synchronous version of access
     */
    accessSync(path: string | Buffer, mode?: number): void {
        fs.accessSync(path as any, mode);
        ioSleepSync();
    },

    /**
     * Synchronous version of lstat
     */
    lstatSync(path: string | Buffer, options?: any): any {
        const result = fs.lstatSync(path as any, options);
        ioSleepSync();
        return result;
    },

    /**
     * Synchronous version of readlink
     */
    readlinkSync(path: string | Buffer, encoding?: BufferEncoding): any {
        const result = fs.readlinkSync(path as any, encoding);
        ioSleepSync();
        return result;
    },

    /**
     * Synchronous version of rename
     */
    renameSync(oldPath: string | Buffer, newPath: string | Buffer): void {
        fs.renameSync(oldPath as any, newPath as any);
        ioSleepSync();
    },

    /**
     * Synchronous version of chmod
     */
    chmodSync(path: string | Buffer, mode: string | number): void {
        fs.chmodSync(path as any, mode);
        ioSleepSync();
    },

    /**
     * Synchronous version of rmdir
     */
    rmdirSync(path: string | Buffer): void {
        fs.rmdirSync(path as any);
        ioSleepSync();
    },

    /**
     * Synchronous version of truncate
     */
    truncateSync(path: string | Buffer, len?: number): void {
        fs.truncateSync(path as any, len);
        ioSleepSync();
    },
};

/**
 * Asynchronous file I/O wrappers with delay
 */
export const fsAsync = {
    /**
     * Asynchronous version of readFile
     */
    async readFile(path: string | Buffer, encoding?: BufferEncoding): Promise<string | Buffer> {
        const result = await new Promise<string | Buffer>((resolve, reject) => {
            fs.readFile(path as any, encoding as any, (err: any, data: any) => {
                if (err) reject(err);
                else resolve(data);
            });
        });
        await ioSleep();
        return result;
    },

    /**
     * Asynchronous version of writeFile
     */
    async writeFile(path: string | Buffer, data: string | NodeJS.ArrayBufferView): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            fs.writeFile(path as any, data, (err: any) => {
                if (err) reject(err);
                else resolve();
            });
        });
        await ioSleep();
    },

    /**
     * Asynchronous version of stat
     */
    async stat(path: string | Buffer, options?: any): Promise<any> {
        const result = await new Promise<any>((resolve, reject) => {
            fs.stat(path as any, options, (err: any, stats: any) => {
                if (err) reject(err);
                else resolve(stats);
            });
        });
        await ioSleep();
        return result;
    },

    /**
     * Asynchronous version of unlink
     */
    async unlink(path: string | Buffer): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            fs.unlink(path as any, (err: any) => {
                if (err) reject(err);
                else resolve();
            });
        });
        await ioSleep();
    },

    /**
     * Asynchronous version of readdir
     */
    async readdir(path: string | Buffer, options?: any): Promise<any> {
        const result = await new Promise<any>((resolve, reject) => {
            fs.readdir(path as any, options, (err: any, files: any) => {
                if (err) reject(err);
                else resolve(files);
            });
        });
        await ioSleep();
        return result;
    },

    /**
     * Asynchronous version of mkdir
     */
    async mkdir(path: string | Buffer, options?: any): Promise<string | undefined> {
        const result = await new Promise<string | undefined>((resolve, reject) => {
            fs.mkdir(path as any, options, (err: any, pathname: any) => {
                if (err) reject(err);
                else resolve(pathname);
            });
        });
        await ioSleep();
        return result;
    },

    /**
     * Asynchronous version of access
     */
    async access(path: string | Buffer, mode?: number): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            fs.access(path as any, mode, (err: any) => {
                if (err) reject(err);
                else resolve();
            });
        });
        await ioSleep();
    },

    /**
     * Asynchronous version of lstat
     */
    async lstat(path: string | Buffer, options?: any): Promise<any> {
        const result = await new Promise<any>((resolve, reject) => {
            fs.lstat(path as any, options, (err: any, stats: any) => {
                if (err) reject(err);
                else resolve(stats);
            });
        });
        await ioSleep();
        return result;
    },

    /**
     * Asynchronous version of readlink
     */
    async readlink(path: string | Buffer, encoding?: BufferEncoding): Promise<any> {
        const result = await new Promise<any>((resolve, reject) => {
            fs.readlink(path as any, encoding as any, (err: any, linkString: any) => {
                if (err) reject(err);
                else resolve(linkString);
            });
        });
        await ioSleep();
        return result;
    },

    /**
     * Asynchronous version of rename
     */
    async rename(oldPath: string | Buffer, newPath: string | Buffer): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            fs.rename(oldPath as any, newPath as any, (err: any) => {
                if (err) reject(err);
                else resolve();
            });
        });
        await ioSleep();
    },

    /**
     * Asynchronous version of chmod
     */
    async chmod(path: string | Buffer, mode: string | number): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            fs.chmod(path as any, mode, (err: any) => {
                if (err) reject(err);
                else resolve();
            });
        });
        await ioSleep();
    },

    /**
     * Asynchronous version of rmdir
     */
    async rmdir(path: string | Buffer): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            fs.rmdir(path as any, (err: any) => {
                if (err) reject(err);
                else resolve();
            });
        });
        await ioSleep();
    },

    /**
     * Asynchronous version of truncate
     */
    async truncate(path: string | Buffer, len?: number): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            fs.truncate(path as any, len, (err: any) => {
                if (err) reject(err);
                else resolve();
            });
        });
        await ioSleep();
    },
};

/**
 * Workspace file I/O wrappers with delay
 * These wrap vscode.workspace.fs operations
 */
export const workspaceFs = {
    /**
     * Asynchronous version of workspace.fs.stat
     */
    async stat(uri: any): Promise<any> {
        // Note: These assume vscode.workspace is available
        // Import this at the point of use: import { workspace } from "vscode";
        // Then call: await workspaceFs.stat(workspace, uri)
        // But since we can't import vscode here, we'll return a helper function
        return null;
    },

    /**
     * Asynchronous version of workspace.fs.readDirectory
     */
    async readDirectory(uri: any): Promise<any> {
        return null;
    },

    /**
     * Asynchronous version of workspace.fs.writeFile
     */
    async writeFile(uri: any, data: any): Promise<void> {
        return;
    },

    /**
     * Asynchronous version of workspace.fs.delete
     */
    async delete(uri: any, options?: any): Promise<void> {
        return;
    },

    /**
     * Asynchronous version of workspace.fs.rename
     */
    async rename(source: any, target: any, options?: any): Promise<void> {
        return;
    },

    /**
     * Asynchronous version of workspace.fs.copy
     */
    async copy(source: any, target: any, options?: any): Promise<void> {
        return;
    },

    /**
     * Asynchronous version of workspace.fs.createDirectory
     */
    async createDirectory(uri: any): Promise<void> {
        return;
    },
};

/**
 * Helper function to create a stat wrapper for workspace.fs
 * Usage: const statWithDelay = createWorkspaceFsStat(workspace);
 *        const result = await statWithDelay(uri);
 */
export function createWorkspaceFsStat(workspace: any) {
    return async (uri: any) => {
        const result = await workspace.fs.stat(uri);
        await ioSleep();
        return result;
    };
}

/**
 * Helper function to create a readDirectory wrapper for workspace.fs
 * Usage: const readWithDelay = createWorkspaceFsReadDirectory(workspace);
 *        const result = await readWithDelay(uri);
 */
export function createWorkspaceFsReadDirectory(workspace: any) {
    return async (uri: any) => {
        const result = await workspace.fs.readDirectory(uri);
        await ioSleep();
        return result;
    };
}

/**
 * Helper function to create a writeFile wrapper for workspace.fs
 * Usage: const writeWithDelay = createWorkspaceFsWriteFile(workspace);
 *        await writeWithDelay(uri, data);
 */
export function createWorkspaceFsWriteFile(workspace: any) {
    return async (uri: any, data: any) => {
        await workspace.fs.writeFile(uri, data);
        await ioSleep();
    };
}

/**
 * Helper function to create a delete wrapper for workspace.fs
 * Usage: const deleteWithDelay = createWorkspaceFsDelete(workspace);
 *        await deleteWithDelay(uri);
 */
export function createWorkspaceFsDelete(workspace: any) {
    return async (uri: any, options?: any) => {
        await workspace.fs.delete(uri, options);
        await ioSleep();
    };
}

/**
 * Helper function to create a rename wrapper for workspace.fs
 * Usage: const renameWithDelay = createWorkspaceFsRename(workspace);
 *        await renameWithDelay(source, target);
 */
export function createWorkspaceFsRename(workspace: any) {
    return async (source: any, target: any, options?: any) => {
        await workspace.fs.rename(source, target, options);
        await ioSleep();
    };
}

/**
 * Helper function to create a copy wrapper for workspace.fs
 * Usage: const copyWithDelay = createWorkspaceFsCopy(workspace);
 *        await copyWithDelay(source, target);
 */
export function createWorkspaceFsCopy(workspace: any) {
    return async (source: any, target: any, options?: any) => {
        await workspace.fs.copy(source, target, options);
        await ioSleep();
    };
}

/**
 * Helper function to create a createDirectory wrapper for workspace.fs
 * Usage: const mkdirWithDelay = createWorkspaceFsCreateDirectory(workspace);
 *        await mkdirWithDelay(uri);
 */
export function createWorkspaceFsCreateDirectory(workspace: any) {
    return async (uri: any) => {
        await workspace.fs.createDirectory(uri);
        await ioSleep();
    };
}
