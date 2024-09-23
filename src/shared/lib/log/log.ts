/**
 * For Vite
 *
 * Logs information to the console for debugging purposes.
 *
 * @param {...any} args - The information to be logged.
 * @returns {void}
 */

export const log = function (...args: unknown[]): void {
  // * Логи показываются только в режиме разработки
  const isDevMode = process.env.NODE_ENV === 'development';

  if (!window.location.hostname.endsWith('webflow.io') && !isDevMode) {
    return;
  }

  const error = new Error();
  const stackLines = error.stack?.split('\n');

  if (stackLines && stackLines.length > 2) {
    window.console.log('👉', stackLines[2]);
    // * Если содержимое является инстансом ошибки то будет вывод как console.error
    args.forEach((arg) => {
      if (arg instanceof Error) {
        window.console.error('❌', arg);
      } else {
        window.console.log('🚦', arg);
      }
    });
    window.console.log('⏳', String(Date.now()).slice(-5));
    window.console.log('\n');
  } else {
    // * Если содержимое является инстансом ошибки то будет вывод как console.error
    args.forEach((arg) => {
      if (arg instanceof Error) {
        window.console.error('🚧', arg);
      } else {
        window.console.log('🚧', arg);
      }
    });
    window.console.log('⏳', String(Date.now()).slice(-5));
    window.console.log('\n');
  }
};
