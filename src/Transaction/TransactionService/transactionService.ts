import AbstractService from "../../abstract/abstract.service";


class TransService extends AbstractService{

  public async createServiceTrans(payload:any){
   

    const userid = payload[0].user_id;

        const dbdata = await this.db('transactions').where('user_id',userid)

        //console.log(dbdata);
        const requestdata = payload;

        
    //  return {
    //   success: true,
    //   code: 201,
    //   message: 'Data Fetched Successfully',
    //   data: dbdata,
    // };




const objA = dbdata;
const objB = requestdata;



const difference = [];

for(const itemB of objB){

  const itemA = objA.find((item)=>item.from_app_id === itemB.from_app_id);
  if (!itemA) {
    difference.push(itemB);
    
  }

}


const objectC = {
  difference
}

if (difference.length === 0) {
   return {
      success: true,
      code: 201,
      message: 'Data Already Exported'
      // data: requestdata,
    };
}else{
const newinserted = await this.db('transactions').insert(difference);
   return {
      success: true,
      code: 201,
      message: 'Data Exported Successfully',
      data: newinserted,
    };
}

// console.log(objectC);


//console.log(difference);




// await this.db('transactions').insert(difference);

// console.log(objectC);



// const objA = {
//   "data": [
//     {
//       "id": 1,
//       "name": "armaan"
//     },
//     {
//       "id": 2,
//       "name": "nim"
//     },
    
//   ]
// };


// const objB = {
//   "data": [
//     {
//       "id": 2,
//       "name": "nim"
//     },
//     {
//       "id": 3,
//       "name": "Himbar"
//     },
//     {
//       "id": 5,
//       "name": "dilbar"
//     }
//   ]
// };

// //create a third object to merge 

// const difference = [];

// for(const itemB of objB.data){

//   const itemA = objA.data.find((item)=>item.id === itemB.id);
//   if (!itemA) {

//     difference.push(itemB);
    
//   }

// }


// const objectC = {
//   "data":difference
// }

// console.log(objectC);







 return {
      success: true,
      code: 201,
      message: 'Data Exported Successfully',
      // data: requestdata,
    };
  }
  

  public async listServiceTrans(userid:number | any){

   const data = await this.db('transactions').where('user_id',userid);

     return {
      success: true,
      code: 201,
      message: 'Data Fetched Successfully',
      // data: {data},
    };
  }



}

export default TransService;