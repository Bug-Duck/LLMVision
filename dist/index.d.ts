import { Document } from 'langchain/document';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { ZhipuAIEmbeddingsParams, ZhipuAIEmbeddings } from '@langchain/community/embeddings/zhipuai';
import { ChatZhipuAIParams, ChatZhipuAI } from '@langchain/community/chat_models/zhipuai';
import { FaissStore } from '@langchain/community/vectorstores/faiss';

interface VisionBaseParams {
    /**
     * The path to the document to use.
     */
    documentPath?: string;
}
declare class VisionBase {
    params: Record<string, any>;
    document: Document | undefined;
    splitter: RecursiveCharacterTextSplitter | undefined;
    splittedDocument: Document[] | undefined;
    /**
     * Initialize the model.
     */
    init(params?: VisionBaseParams): Promise<void>;
    /**
     * Generate a animation.
     * @param userInput The user input.
     * @param width The width of the animation.
     * @param height The height of the animation.
     */
    generate(userInput: string, width: number, height: number): Promise<string>;
}

interface VisionZhipuAIParams extends VisionBaseParams {
    model: ChatZhipuAIParams['modelName'];
    embeddingsModel: ZhipuAIEmbeddingsParams['modelName'];
    key: string;
}
declare class VisionZhipuAI extends VisionBase {
    embeddings: ZhipuAIEmbeddings | undefined;
    store: FaissStore | undefined;
    model: ChatZhipuAI | undefined;
    init(params: VisionZhipuAIParams): Promise<void>;
    generate(userInput: string, width: number, height: number): Promise<string>;
}

export { VisionBase, type VisionBaseParams, VisionZhipuAI, type VisionZhipuAIParams };
