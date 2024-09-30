const axios = require('axios');
const asyncHandler = require('express-async-handler');
const { v4: uuidv4 } = require('uuid');
// // Example usage
const baseURL = 'https://sandbox.momodeveloper.mtn.com/v1_0'
const apiUserId = '75fe6efc-7f89-4f07-85ad-f5932c4c60f8'; // Replace with your API User ID
const subscriptionKey = '2b002c5c001e432198eb0cfe8e3eff17'; // Replace with your Subscription Key
const MOMO_Payment_Create_User_Id = asyncHandler(async (req, res) => {
    const subscr_key = subscriptionKey; // Use your actual subscription key
  // const providerCallbackHost = 'http://localhost:8000/momo/momo_callback'; // Use your callback host
  // const providerCallbackHost = 'clinic.com';


  // Generate a unique X-Reference-Id
  const referenceId = uuidv4();
  console.log(referenceId)

  const url = `${baseURL}/apiuser`;

  const config = {
    headers: {
      'X-Reference-Id': referenceId,
      'Ocp-Apim-Subscription-Key': subscr_key,
      'Content-Type': 'application/json'
    }
  };

  const requestBody = {
    "providerCallbackHost": "http://localhost:8000/momo/momo_callback"
  };
  console.log(config)
  console.log(requestBody)

  try {
    const response = await axios.post(url, requestBody,config);
    console.log(response.data);
    res.status(201).json({ success: true, status: response.status });
  } catch (error) {
    console.error('Error creating user:', error.response.data);
    res.status(500).json({ success: false, error: error });
  }
});

const MOMO_Payment_Create_Api_key = asyncHandler(async (req, res)=> {
  console.log(subscriptionKey)
  console.log(apiUserId)
  const url = `${baseURL}/apiuser/${apiUserId}/apikey`;

  try {
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          'Ocp-Apim-Subscription-Key': subscriptionKey,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.status === 201) {
      console.log('API Key created successfully');//49039134f2ad40a992ea5be993a79331 got this
      console.log('API Key:', response.data.apiKey);
    } else {
      console.log('Failed to create API Key', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error creating API Key:', error.response ? error.response.data : error.message);
  }
});
const MOMO_Payment_Get_User_Detail = asyncHandler(async(req,res)=>{
  const url = `${baseURL}/apiuser/${apiUserId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey
      }
    });

    if (response.status === 200) {
      console.log('User details:', response.data);
      res.json({
        succes:true,
        status:response.status,
        data:response.data
      })
    } else {
      console.log('Failed to get user details', response.status, response.statusText);
    }
  } catch (error) {
    console.error('Error getting user details:', error.response ? error.response.data : error.message);
  }
})




const MOMO_callback = asyncHandler(async (req, res) => {
  console.log("++++++++++++++++++++++++++++++")
    console.log(req.body)
    console.log(res)
  });

module.exports = {
  MOMO_Payment_Create_User_Id,
  MOMO_Payment_Create_Api_key,
  MOMO_Payment_Get_User_Detail,
  MOMO_callback
}
