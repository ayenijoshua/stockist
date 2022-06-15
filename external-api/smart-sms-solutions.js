const axios = require('axios')
const config = require('config')

const baseUrl = 'https://app.smartsmssolutions.com/io/api/client/v1'
const apiToken = config.get('smartSMSToken')

/**
 * curl --location --request POST 'https://app.smartsmssolutions.com/io/api/client/v1/sms/' \
    --form 'token="your-apix-token"' \
    --form 'sender="sender-id"' \
    --form 'to="080xxxxxxxx"' \
    --form 'message="message-content"' \
    --form 'type="mesasge-type"' \
    --form 'routing="routing"' \
    --form 'ref_id="unique-ref-id"' \
    --form 'simserver_token="simserver-token"' \
    --form 'dlr_timeout="dlr-timeout"' \
    --form 'schedule="time-in-future"'
    Username: samtiens2013@gmail.com

Password: Vonoctavon25
 */

module.exports = smartSMS  = {

    async sendSMS(data){
        console.log(data)
      const res = await axios.get(`${baseUrl}/sms?to=${data.phones}&token=${apiToken}&sender=LILONGHERO&message=${data.message}&routing=5`)
      if(res.data.code == 1000){
          return true 
      }
      console.log(res.data)
      return false
    },

    async getBalance(){
        const res = await axios.get(`${baseUrl}/balance?token=${apiToken}`)
        return res.data
    },

}