class RateLimiter {
  private queue: Array<() => Promise<any>> = [];
  private isProcessing = false;
  private lastRequestTime = 0;
  private minInterval = 5000; // 5 seconds between requests
  private isBlocked = false;
  private blockUntil = 0;

  async execute<T>(apiCall: () => Promise<T>): Promise<T> {
    // Check if we're in a blocked state
    if (this.isBlocked && Date.now() < this.blockUntil) {
      throw new Error('Rate limit exceeded. Please wait before making more requests.');
    }
    
    if (this.isBlocked && Date.now() >= this.blockUntil) {
      this.isBlocked = false;
    }

    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const now = Date.now();
          const timeSinceLastRequest = now - this.lastRequestTime;
          
          if (timeSinceLastRequest < this.minInterval) {
            await new Promise(resolve => setTimeout(resolve, this.minInterval - timeSinceLastRequest));
          }
          
          this.lastRequestTime = Date.now();
          const result = await apiCall();
          resolve(result);
        } catch (error: any) {
          if (error?.status === 429 || error?.message?.includes('429')) {
            // Block all requests for 2 minutes
            this.isBlocked = true;
            this.blockUntil = Date.now() + 120000; // 2 minutes
            this.queue.length = 0; // Clear queue
            reject(new Error('Rate limit exceeded. All API calls blocked for 2 minutes.'));
          } else {
            reject(error);
          }
        }
      });
      
      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;
    
    this.isProcessing = true;
    
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        await task();
      }
    }
    
    this.isProcessing = false;
  }
}

export const geminiRateLimiter = new RateLimiter();