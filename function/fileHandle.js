window.HandleFileSys = class {

    /**
     * @param {Object} opts -(optional) specify additional parameters (for file).
     * @return {FileSystemFileHandle} Handle to the existing picked file.(single file)
     */
    static async getFileHandle(opts) {
        var fileHandle;

        if ('showOpenFilePicker' in window) {

            if (operate.isUseless(opts) && !operate.isObject(opts)) {
                opts = {
                    types: [{
                        description: 'Text file',
                        accept: {
                            'text/plain': ['.txt']
                        },
                    }],
                }
            }

            [fileHandle] = await window.showOpenFilePicker(opts);
        } else {
            // For Chrome 85 and earlier...

            if (operate.isUseless(opts) && !operate.isObject(opts)) {
                opts = {
                    type: 'save-file',
                    accepts: [{
                        description: 'Text file',
                        extensions: ['txt'],
                        mimeTypes: ['text/plain'],
                    }],
                }

                fileHandle = await window.chooseFileSystemEntries();
            }
        }
        
        return fileHandle;
    }

    /**
     * Create a handle to a new (default text) file on the local file system.
     * @param {boolean} showPicker - on true, showSaveFilePicker is executed (default true)
     * @param {FileSystemDirectoryHandle|Object} dirHandleOrOpts - directory Handle if showPicker is set to false.
     * @param {Object} fileName - file Name if showPicker is set to false  (for new file).
     * @param {boolean} create - if file does not exists in given directory, whether to create it or not (default true).
     * @return {FileSystemFileHandle} Handle to the new file.
     */
    static async getNewFileHandle(showPicker, dirHandleOrOpts, fileName = "", create = true) {
        var fileHandle;

        if (showPicker) {
            if ('showSaveFilePicker' in window) {

                if (operate.isUseless(dirHandleOrOpts) && !operate.isObject(dirHandleOrOpts)) {
                    dirHandleOrOpts = {
                        types: [{
                            description: 'Text file',
                            accept: {
                                'text/plain': ['.txt']
                            },
                        }],
                        excludeAcceptAllOption: true,
                        multiple: false
                    }
                }

                fileHandle = await window.showSaveFilePicker(dirHandleOrOpts);
            } else {
                // For Chrome 85 and earlier...

                if (operate.isUseless(dirHandleOrOpts) && !operate.isObject(dirHandleOrOpts)) {
                    dirHandleOrOpts = {
                        type: 'save-file',
                        accepts: [{
                            description: 'Text file',
                            extensions: ['txt'],
                            mimeTypes: ['text/plain'],
                        }],
                    }
                }

                fileHandle = await window.chooseFileSystemEntries(dirHandleOrOpts);
            }

        } else {

            fileName = this.getValidFileName(fileName);
            // In this new directory, create a file named "fileName".
            fileHandle = await dirHandleOrOpts.getFileHandle(fileName, {
                create: create
            });

        }

        return fileHandle;
    }

    /**
     * @param {Object} opts -(optional) specify additional parameters (for Directory).
     * @return {FileSystemDirectoryHandle} Handle to the existing picked directory.
     */
    static async getDirHandle(opts) {
        var dirHandle;
        if ('showDirectoryPicker' in window) {
            dirHandle = await window.showDirectoryPicker();
        } else {
            // For Chrome 85 and earlier...
            dirHandle = await window.chooseFileSystemEntries();
        }

        return dirHandle;
    }

    /**
     * Create a handle to a new (default text) file on the local file system.
     * @param {FileSystemDirectoryHandle} dirHandle - directory Handle from which to get directory.
     * @param {string} dirName - name of directory (default "").
     * @param {boolean} create - if directory does not exists, whether to create directory or not (default true).
     * @return {FileSystemFileHandle} Handle to the new directory.
     */
    static async getNewDirHandle(dirHandle, dirName = "", create = true) {
        if (operate.isUseless(dirName) || dirName === "") {
            dirName = "New Folder";
        }

        var newDirHandle = await dirHandle.getDirectoryHandle(dirName, {
            create: create
        });
        return newDirHandle;
    }

    /**
     * 
     * @param {FileSystemFileHandle} fileHandle - handle of file to get.
     * @return {File} - returns file.
     */
    static async getFile(fileHandle) {
        if (!fileHandle) {
            fileHandle = await this.getFileHandle();
        }
        const file = await fileHandle.getFile();
        return file;
    }

    /**
     * Reads the raw text from a file.
     *
     * @param {File} file
     * @return {!Promise<string>} A promise that resolves to the parsed string.
     */
    static readFile(file) {
        // If the new .text() reader is available, use it.
        if (file.text) {
            return file.text();
        }
        // Otherwise use the traditional file reading technique.
        return this.readFileLegacy(file);
    }

    /**
     * Reads the raw text from a file.
     *
     * @private
     * @param {File} file
     * @return {Promise<string>} A promise that resolves to the parsed string.
     */
    static readFileLegacy(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener('loadend', (e) => {
                const text = e.srcElement.result;
                resolve(text);
            });
            reader.readAsText(file);
        });
    }

    /**
     * Writes the contents to disk.
     *
     * @param {FileSystemFileHandle} fileHandle File handle to write to.
     * @param {string} contents Contents to write.
     */
    static async writeFile(fileHandle, contents) {
        // Support for Chrome 82 and earlier.
        if (fileHandle.createWriter) {
            // Create a writer (request permission if necessary).
            const writer = await fileHandle.createWriter();
            // Write the full length of the contents
            await writer.write(0, contents);
            // Close the file and write the contents to disk
            await writer.close();
            return;
        }
        // For Chrome 83 and later.
        // Create a FileSystemWritableFileStream to write to.
        const writable = await fileHandle.createWritable();
        // Write the contents of the file to the stream.
        await writable.write(contents);
        // Close the file and write the contents to disk.
        await writable.close();
    }

    /**
     * Under Construction
     */
    static async updateFile() {

    }

    static async deleteFile(dirHandle, fileName) {
        if (!operate.isUseless(fileName) && fileName !== "") {

            let fileHandle = this.getNewFileHandle(false, dirHandle, fileName, false);

            if (!operate.isUseless(fileHandle)) {
                await dirHandle.removeEntry(fileName);
            }
        }
    }

    static async deleteDir(dirHandle, dirName) {
        if (!operate.isUseless(dirName) && dirName !== "") {

            let directoryHandle = this.getNewDirHandle(dirHandle, dirName, false);

            if (!operate.isUseless(directoryHandle)) {
                await directoryHandle.removeEntry(dirName, {
                    recursive: true
                });
            }
        }
    }

    static async putHandleInIDB() {

    }

    /**
     * Verify the user has granted permission to read or write to the file, if
     * permission hasn't been granted, request permission.
     *
     * @param {FileSystemFileHandle} fileHandle File handle to check.
     * @param {boolean} withWrite True if write permission should be checked.
     * @return {boolean} True if the user has granted read/write permission.
     */
    static async verifyPermission(fileHandle, withWrite) {
        const opts = {};
        if (withWrite) {
            opts.writable = true;
            // For Chrome 86 and later...
            opts.mode = 'readwrite';
        }
        // Check if we already have permission, if so, return true.
        if (await fileHandle.queryPermission(opts) === 'granted') {
            return true;
        }
        // Request permission to the file, if the user grants permission, return true.
        if (await fileHandle.requestPermission(opts) === 'granted') {
            return true;
        }
        // The user did nt grant permission, return false.
        return false;
    }

    static getValidFileName(fileName) {
        if (operate.isUseless(fileName) || fileName === "") {
            let ISODate = new Date(Date.now()).toISOString();
            fileName = this.uniqueId(4) + "_" + this.uniqueId(4) + "_" + ISODate + ".txt";
        }

        while (fileName.indexOf(':') > -1) {
            fileName = fileName.replace(":", "-");
        }
        return fileName
    }



    /////////////////////////////////////////////////////////////////////////////////////////////////

    static uniqueId(length) {
        let randy = Math.floor(Math.random() * Math.pow(10, 4)),
            timmy = Date.now();
        length = Math.min(12, length);
        return (timmy.toString(36).slice(-8) + randy.toString(36)).slice(-length);;
    }


}
////////////////////////////////////////////Testing///////////////////////////////////////////////////////////

document.getElementById('clickBtn').onclick = async function () {
    var dir = await HandleFileSys.getDirHandle();
    var fileHandle = await HandleFileSys.getNewFileHandle(false, dir, "anyFile.txt", true);
    await HandleFileSys.writeFile(fileHandle, "Hello! this is vipin suthar");
}