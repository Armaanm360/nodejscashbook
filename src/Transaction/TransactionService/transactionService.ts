import AbstractService from "../../abstract/abstract.service";


class TransService extends AbstractService{

  public async createServiceTrans(payload:any){
   

    const userid = payload[0].user_id;

        const dbdata = await this.db('transactions').where('user_id',userid)

        const datacount = dbdata.length;

        const dbuserid = dbdata[0].user_id;

        const dbpackage = await this.db('users').where('id',dbuserid).join('packages','packages.package_id','=','users.package_activated');
        
        const activatedpackage = dbpackage[0].package_name;
        



       if (datacount === 10 && activatedpackage === 'FREE') {
        return {
          success:false,
          code:401,
          message:'You Are Running FREE version,For More Entry,please check our packages'
        }
        
       }else if(datacount === 20 && activatedpackage === 'STANDARD'){
        return {
          success:false,
          code:401,
          message:'You Are Running STANDARD version,For More Entry,please check our packages'
        }
       }else if(datacount === 30 && activatedpackage === 'PLUS'){
        return {
          success:false,
          code:401,
          message:'You Are Running PLUS version,For More Entry,please check our packages'
        }
       }else if(datacount === 40 && activatedpackage === 'PREMIUM'){
        return {
          success:false,
          code:401,
          message:'You Are Running PREMIUM version,For More Entry,please check our packages'
        }
      }else{
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
      data: difference,
    };
}
      }
       

  }


  //create payment 

  public async createPayment(payload:any){

    const user_id = payload.user_id;

    const current_package = payload.current_package;

    const requested_package = payload.request_package;

    const given_amount = parseFloat(payload.amount);


    const requested_package_price = await this.db('packages').select('package_price').where('package_id',requested_package).first();


    const request_package_name =requested_package_price.package_name;


    const final_price = parseFloat(requested_package_price.package_price)




    if (current_package > requested_package) {
    return {
      success: true,
      code: 401,
      message: 'The Package You Are Looking For Is Not Available',
    };
      // console.log('The Package You Are Looking For Is Not Available');
    }else if(given_amount < final_price){

    return {
      success: true,
      code: 401,
      message: 'Invalid Amount',
    };
     // console.log('Invalid Amount');
    }else{


      const confirm_payment = await this.db('payments').insert({amount:given_amount,requested_package:requested_package,user_id:user_id})

      const update_user_package = await this.db('users').where({id:user_id}).update({package_activated:requested_package}); 

      const info = await this.db('users').where({'id':user_id}).join('packages','packages.package_id','=','users.package_activated').first();

      let getUserId = info.username;
      let email = info.username;
      let getUserPackage = info.package_name;
      let getUserPackageId = info.package_id;


      console.log('Payment Successful');

     return {
      success: true,
      code: 201,
      message: 'Payment Successful',
      data: {email,getUserPackage,getUserPackageId},

 
    };
    }



   



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

  public async listPackages(){

   const data = await this.db('packages');

     return {
      success: true,
      code: 201,
      message: 'Data Fetched Successfully',
      data: {data},
    };
  }



}

export default TransService;