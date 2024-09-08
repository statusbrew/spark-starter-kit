declare module 'quagga' {
    interface Quagga {
      init(options: any, callback: (err: any) => void): void;
      start(): void;
      stop(): void;
      onDetected(callback: (result: any) => void): void;
    }
  
    const Quagga: Quagga;
  
    export default Quagga;
  }