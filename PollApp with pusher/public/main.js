const form=document.getElementById("vote-form");

//form submit event
form.addEventListener("submit",(e)=>{
    const choice=document.querySelector("input[name=stack]:checked").value;
    const data={stack:choice};

    //sending post request
    fetch("http://localhost:3000/poll",{
        method:'post',
        body:JSON.stringify(data),//makes json string before sending
        headers:new Headers({
            "Content-Type":"application/json" //lets it know that it is json
        })
    })//fetch returns a promis so use .then,with fetch we have to use 2 .then
      .then(res=>res.json())
      .catch(err=>console.log(err));

    e.preventDefault();
})

fetch("http://localhost:3000/poll")
.then(res=>res.json())
.then(data=>{
    let votes=data.votes;
    let totalVotes=votes.length;
    document.querySelector('#chartTitle').textContent = `Total Votes: ${totalVotes}`;

    let voteCounts = {
        MERN: 0,
        LAMP: 0,
        DJANGO: 0,
        Ruby: 0,
        Something:0
    };

    //count vote points for each
    //cotepoints-acc/current
    voteCounts =votes.reduce((acc,vote)=>((acc[vote.stack]=(acc[vote.stack] || 0)+ parseInt(vote.points)),acc),{});

    //let coz it is varying dont use 
//create array
let dataPoints=[
    {label:"MERN",y:voteCounts.MERN},
    {label:"LAMP",y:voteCounts.LAMP},
    {label:"DJANGO",y:voteCounts.DJANGO},
    {label:"Ruby on Rails",y:voteCounts.Ruby},
    {label:"Something Else",y:voteCounts.Something}
]

//create variable with chart container ID
const chartContainer=document.querySelector("#chartContainer");

if(chartContainer){
    // Listen for the event.
    document.addEventListener('votesAdded', function (e) { 
        document.querySelector('#chartTitle').textContent = `Total Votes: ${e.detail.totalVotes}`;
    });

    const chart=new CanvasJS.Chart("chartContainer",{
        animationEnabled:true,
        theme:"theme1",
        title:{
            
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
          cluster: 'ap2',
          encrypted: true
        });

        //subscribe to appropriate channel as mentioned in poll.js ka pusher.trigger
        var channel = pusher.subscribe('poll');

        channel.bind('vote', function(data) {//bind to appropriate event
            //adding data to our bar chart
            //manipulating data points array
        
        dataPoints.forEach((point)=>{
            if(point.label==data.stack)
            {
                 point.y+=data.points;
                 totalVotes+=data.points;
                 var event = new CustomEvent('votesAdded',{detail:{totalVotes:totalVotes}});
                 // Dispatch the event.
                 document.dispatchEvent(event);
            }
        });
        chart.render(); //re render the chart
      });

}
})

