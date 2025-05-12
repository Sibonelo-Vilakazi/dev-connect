import { ErrorHandler, Injectable, Injector } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    const chunkFailedMessage = /Loading chunk [^\s]+ failed/;

    if (chunkFailedMessage.test(error?.message)) {
      console.warn('Chunk load failure detected. Forcing hard reload...');
      // Wait a second to avoid an infinite loop
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      // Log or handle other errors as needed
      console.error('Global error:', error);
    }
  }
}