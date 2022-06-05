const puppeteer=require("puppeteer");//puppeteer imitates chrome
//puppeteer actions take time to load and download so be patient as we are dealing with the entire data of that page or site
const fs=require("fs/promises")//file system module fs..wont use default fs but fs/promises hence messy callbacks avoided
const cron =require("node-cron");//node-cron library for scheduling at specific time


async function start(){
    const browser=await puppeteer.launch();
    const page=await browser.newPage();

    //***TAKING SCREENSHOTS***
    // await page.goto("https://learnwebcode.github.io/practice-requests/");
    // await page.screenshot({path:"amazing.png"});//by default ss is setviewport to window size
    //but we can modify that
    //what if we have a really long page like a wikipedia page
    // await page.goto("https://en.wikipedia.org/wiki/JavaScript");
    // await page.screenshot({path:'a.png',fullPage:true});//full length of page property
    
    //***TAKING NAMES AND OUTPUTTING THEM ON A REGULAR TXT FILE***
    await page.goto("https://learnwebcode.github.io/practice-requests/");
    const names=await page.evaluate(()=>{
        
        //in this function ur associated with browser(chrome) and not nodejs environment or this teminal
        //thus console.log() a result is printed in browser not terminal
        //can add in js functions for client side interaction
        //document.querySelectorAll(".info strong")//returns a node list of elements and not an array
        //rather write

        //***SAVING TEXT IN A FILE***
        return Array.from(document.querySelectorAll(".info strong")).map(x=>x.textContent);
    })
    await fs.writeFile("names.txt",names.join("\r\n"))//return and newline
 

    //***SIMULATING CLICK EVENT***
    await page.click("#clickme")
    //$eval is eqvt to document.querySelector()
    const clickedData= await page.$eval("#data",el => el.textContent)
    console.log(clickedData);



    //***SIMULATING FILLING OF A FORM***
    //fill out correct value in form and wait for network access to subsequent page and get data from it
    await page.type("#ourfield","blue")//(css id/selector of that input,value to be given to input)
    //wrap it in Promise.all([])...just syntax
    await Promise.all([page.click("#ourform button"),page.waitForNavigation()]) //waitForNavigation() is redirecting to page where form gets submitted
    //#message is the id of msg on redirected page
    const info=await page.$eval("#message",el=>el.textContent);
    console.log(info);



    //***EXTRACTING IMAGES AND SAVING ONTO HARD DISK***
    //$$eval is selecting multiple elements hence no need of Array.from
    const photos=await page.$$eval("img",(imgs)=>{ //"img" is like css like selector
        return imgs.map(x=> x.src) //imgs is array and not node list
    })
   
    //for of loop allows await keyword
    for(const photo of photos){
        const imagepage=await page.goto(photo);
        //we used split("/").pop()to get last part of url to be named as image
        await fs.writeFile(photo.split("/").pop(),await imagepage.buffer());//buffer() from puppeteer
    }


    //puppeteer browser closes once work done nd releases resources
    await browser.close()
}

//***SCHEDULING/REPEATING A TASK***

//start() would just start tasks off..we want to schedule intervals etc
//setInterval(start,5000)//(function,wait time in ms)
//after every 5 secs script runs and tasks start and continue to run forever untill we manually stop

//want to run at specific time of day
//use node-cron library to schedule it at specific time
cron.schedule("*/5 * * * * *",start)//check cron tab or cron job
//this runs every 5 sec
//but for it to run node must be running till that time..cumbersome

//linux has cron-job functionalities which are absent in windows and protective in mac
//LINUX OP!!!
//call cron job once and it will upto operating system to carry it out.