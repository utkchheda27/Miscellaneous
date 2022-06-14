const form=document.getElementById("vote-form");

//form submit event
form.addEventListener("submit",(e)=>{
    if(e){
    const choice=document.querySelector("input[name=stack]:checked").value;
    const data={stack:choice};

    //sending post request
    fetch("http://localhost:3000/poll",{
        method:"post",
        body:JSON.stringify(data),//makes json string before sending
        headers:new Headers({
            "Content-Type":"application/json" //lets it know that it is json
        })
    })//fetch returns a promis so use .then,with fetch we have to use 2 .then
      .then(res=>res.json())
      .then(data=>console.log(data))
      .catch(err=>console.log(err));


    e.preventDefault();
}
})

//let coz it is varying dont use 
//create array
let dataPoints=[
    {label:"MERN",y:0},
    {label:"LAMP",y:0},
    {label:"DJANGO",y:0},
    {label:"Ruby on Rails",y:0},
    {label:"Something Else",y:0}
]

//create variable with chart container ID
const chartContainer=document.querySelector("#chartContainer");

if(chartContainer){
    const chart=new CanvasJS.Chart("chartContainer",{
        animationEnabled:true,
        theme:"theme1",
        title:{
            text:"Results"
        },
        data:[
            {
                type:"column",
                dataPoints:dataPoints
            }
        ]
    });
    chart.render();

        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;
        // above line shows whats happening and prins on client side console
        
        var pusher = new Pusher('0019b32075c7c166e5de', {
          cluster: 'ap2'
        });

        //subscribe to appropriate channel as mentioned in poll.js ka pusher.trigger
        var channel = pusher.subscribe('poll');
        channel.bind('vote', function(data) {//bind to appropriate event
            //adding data to our bar chart
            //manipulating data points array
            dataPoints=dataPoints.map(x=>{
            if(x.label==data.stack){
                x.y+=data.points;//x is the option and y is the value
                return x;
            }else{
                return x;
            }
          });
          chart.render(); //re render the chart
        });
}