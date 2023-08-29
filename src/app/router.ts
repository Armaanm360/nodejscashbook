import { Router } from "express";
import BasicRouter from "../BasicModule/basic.router";


class RootRouter {

  //this should be public
  public v1Router = Router();
  private basicRouter = new BasicRouter();


  //learn about constructor
  //where we define - we make that from scratch
  constructor() {
    this.callV1Router();
  }

  //now call callV1Router
  //which has to be private

  private callV1Router() {

    //define the first basic route


    this.v1Router.use("/simple", this.basicRouter.BasicRouter);


  }

}

export default RootRouter;