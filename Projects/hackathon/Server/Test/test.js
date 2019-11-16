const axios = require('axios');
const _ = require('lodash');

var list =[];

var xxx = (i) => axios({
    method: 'get',
    url: `https://api.data.gov.in/resource/cb579e8f-e4e0-48eb-a058-1fc812a38ff2?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&offset=${i}&limit=10`,
    params : {
        sub_district_name: "Behat"
    }
  })
  .then( (data) =>
  {  data.data.records.map((key , index) =>{
     
   
    list.push(key.area_name);
   
  })
      
  })
  .catch((err) =>{
      console.log(err);
  });


  function apple(){
     let i =10;
       xxx(i);
       i+=10;
   setInterval( () => console.log(_.uniq(list)) , 1000 );

   
  }
  let i=0;
   while(i< 100)
    { 
      apple();
      i++;
    }


