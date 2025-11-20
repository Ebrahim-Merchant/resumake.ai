declare module 'swiftlatex' {
  export class PdfTeXEngine {
    loadEngine(): Promise<void>
    makeMemFSFolder(path: string): Promise<void>
    writeMemFSFile(path: string, content: Uint8Array | string): Promise<void>
    setEngineMainFile(path: string): Promise<void>
    compileLaTeX(): Promise<{ pdf: Uint8Array }>
  }

  export class XeTeXEngine {
    loadEngine(): Promise<void>
    makeMemFSFolder(path: string): Promise<void>
    writeMemFSFile(path: string, content: Uint8Array | string): Promise<void>
    setEngineMainFile(path: string): Promise<void>
    compileLaTeX(): Promise<{ pdf: Uint8Array }>
  }

  export class DvipdfmxEngine {
    loadEngine(): Promise<void>
    makeMemFSFolder(path: string): Promise<void>
    writeMemFSFile(path: string, content: Uint8Array | string): Promise<void>
    setEngineMainFile(path: string): Promise<void>
    compilePDF(): Promise<{ pdf: Uint8Array }>
  }
}
