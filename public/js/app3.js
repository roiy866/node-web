console.log('Client side javascript file is loaded !! ')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value;
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if (data.error_message) {
                messageTwo.textContent='there is errrrorrrr '+data.error_message
                messageOne.textContent=''
            } else {
                messageOne.textContent='location='+data.location
                messageTwo.textContent= 'forecast is ' + data.forecast

            }
            console.log(data)
            //                forecast: reply.forecastData,
            //                 location: reply.location,
            //                 address:req.query.address

        })
    })
    console.log(location)
})