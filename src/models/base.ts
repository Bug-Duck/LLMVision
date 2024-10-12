import { Document } from "langchain/document"
import { readFileSync } from "fs"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

export interface VisionBaseParams {
  /**
   * The path to the document to use.
   */
  documentPath?: string
}

export class VisionBase {
  params: Record<string, any> = {}
  document: Document | undefined
  splitter: RecursiveCharacterTextSplitter | undefined
  splittedDocument: Document[] | undefined

  /**
   * Initialize the model.
   */
  async init(params?: VisionBaseParams) {
    this.params = params ?? {}
    this.document = new Document({
      pageContent: readFileSync(this.params.documentPath ?? '../document/main.md', 'utf-8'),
      metadata: {
        source: this.params.documentPath
      }
    })
    this.splitter = new RecursiveCharacterTextSplitter({
      chunkOverlap: 200,
      chunkSize: 500,
    })
    this.splittedDocument = await this.splitter.splitDocuments([this.document!])
  }

  /**
   * Generate a animation.
   * @param userInput The user input.
   * @param width The width of the animation.
   * @param height The height of the animation.
   */
  async generate(
    userInput: string,
    width: number,
    height: number,
  ): Promise<string> {
    return new Promise(() => {})
  }
 }