import express, { Application, NextFunction, Request, Response } from 'express';

class App {

  public app: Application;
  private port: number;
  // private origin: string[] = origin

  constructor(port: number) {
    this.app = express();
    this.port = port;
    //rest

  }

  //start server

  public startServer() {
    this.app.listen(this.port, () => {
      console.log(`Cashbook Server is on the Fire:${this.port}🚀`);
    });
  }


}

export default App;