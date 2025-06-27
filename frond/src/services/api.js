/**
 * API服务配置
 * 定义了后端服务的基础URL地址
 */
const API_BASE_URL = 'http://localhost:8000';

/**
 * 获取可用的提示词模板列表
 * @returns {Promise<Object>} 提示词模板列表
 */
export const getPrompts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/prompts`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching prompts:', error);
    throw error;
  }
};

/**
 * 获取历史分析记录
 * @returns {Promise<Object>} 历史分析记录列表
 */
export const getHistory = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/history`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching history:', error);
    throw error;
  }
};

/**
 * 获取特定历史记录的内容
 * @param {string} id - 历史记录ID
 * @returns {Promise<string>} 历史记录内容
 */
export const getHistoryItem = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/history/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Error fetching history item:', error);
    throw error;
  }
};

/**
 * 删除历史记录
 * @param {string} id - 历史记录ID
 * @returns {Promise<Object>} 操作结果
 */
export const deleteHistory = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/history/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting history:', error);
    throw error;
  }
};

/**
 * 上传PDF文件
 * @param {File} file - PDF文件
 * @param {string} promptName - 提示词模板
 * @param {string} clientId - 客户端ID
 * @returns {Promise<Object>} 上传结果
 */
export const uploadPdfFile = async (file, promptName, clientId) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('prompt_name', promptName);
    
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        'X-Client-ID': clientId
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

/**
 * 创建WebSocket连接，用于流式处理分析结果
 * @param {string} clientId - 客户端ID
 * @param {boolean} isFile - 是否是文件分析
 * @returns {WebSocket} WebSocket连接
 */
export const createAnalysisWebSocket = (clientId, isFile = false) => {
  const endpoint = isFile ? 'ws/analyze_file' : 'ws/analyze';
  const wsUrl = `ws://localhost:8000/${endpoint}/${clientId}`;
  
  try {
    const socket = new WebSocket(wsUrl);
    
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    return socket;
  } catch (error) {
    console.error('Error creating WebSocket:', error);
    throw error;
  }
};

/**
 * 流式处理论文URL的API函数（传统方式，保留向后兼容）
 * 该函数用于向后端发送请求，获取论文分析的流式响应
 * 
 * @param {string} url - 需要分析的论文URL地址
 * @param {string} promptName - 使用的提示词模板名称，默认为'yuanbao'
 * @returns {Object} - 返回一个包含流处理方法的对象
 */
export const processPaperUrlStream = async (url, promptName = 'yuanbao') => {
  try {
    // 向后端API发送GET请求，传递论文URL和提示词模板名称
    // 使用encodeURIComponent确保URL参数被正确编码
    const response = await fetch(`${API_BASE_URL}/api/analyze?url=${encodeURIComponent(url)}&prompt_name=${promptName}`, {
      method: 'GET',
    });

    // 检查HTTP响应状态，如果不是成功状态码，抛出错误
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 检查响应体是否存在，确保浏览器支持ReadableStream
    if (!response.body) {
      throw new Error('ReadableStream not supported');
    }

    // 获取响应的ReadableStream用于流式读取数据
    const reader = response.body.getReader(); // 获取流读取器
    const decoder = new TextDecoder(); // 创建文本解码器，用于将二进制数据转换为文本

    // 返回一个包含流处理方法的对象
    return {
      stream: reader, // 原始流读取器
      decoder, // 文本解码器
      /**
       * 读取流中的下一个数据块
       * @returns {Promise<Object>} 包含done状态和内容的对象
       */
      async read() {
        try {
          // 从流中读取下一个数据块
          const { done, value } = await reader.read();
          // 如果流已结束，返回done=true
          if (done) {
            return { done: true, content: '' };
          }
          // 解码二进制数据为文本，stream:true表示这是流的一部分，可能有未完成的多字节字符
          const chunk = decoder.decode(value, { stream: true });
          // 返回解码后的文本块
          return { done: false, content: chunk };
        } catch (error) {
          // 记录并重新抛出读取过程中的错误
          console.error('Error reading stream:', error);
          throw error;
        }
      },
      /**
       * 取消流的读取
       */
      cancel() {
        reader.cancel();
      },
    };
  } catch (error) {
    // 捕获并记录整个流处理过程中的错误
    console.error('Error in processPaperUrlStream:', error);
    // 重新抛出错误，让调用者处理
    throw error;
  }
};