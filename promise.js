class cutPromise {
  constructor(executor) {
    this.state = null;
    this.value = null;
    this.reason = null;
    this.onFullfilledCallback = [];
    this.onRejectCallback = [];
    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.onFullfilledCallback.forEach((item) => item(this.value));
      }
    };
    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        this.onRejectCallback.forEach((item) => item(this.reason));
      }
    };
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFullfilled, onRejected) {
    if (this.state === "fulfilled") {
      onFullfilled(this.value);
    } else if (this.state === "rejected") {
      onRejected(this.reason);
    } else {
      this.onFullfilledCallback.push(onFullfilled);
      this.onRejectCallback.push(onRejected);
    }
  }
}

let p = new cutPromise((resolve) => {
  resolve("hello");
});
p.then((res) => console.log(res));
console.log("ji");
