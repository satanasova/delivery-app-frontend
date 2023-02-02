export class XPromise<T> extends Promise<T> {
  resolve: any;
  reject: any;

  constructor(callback: (resCallback: any, rejCallback: any) => any) {
    let actualResolve;
    let actualReject;

    super((res: any, rej: any) => {
      callback(res, rej);
      actualResolve = res;
      actualReject = rej;
    });

    this.resolve = actualResolve;
    this.reject = actualReject;
  }
}
