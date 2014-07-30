
// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define

define(function(require) {
    // Zepto provides nice js and DOM methods (very similar to jQuery,
    // and a lot smaller):
    // http://zeptojs.com/
    var $ = require('zepto');

    // Need to verify receipts? This library is included by default.
    // https://github.com/mozilla/receiptverifier
    require('receiptverifier');

    // Want to install the app locally? This library hooks up the
    // installation button. See <button class="install-btn"> in
    // index.html
    require('./install-button');

    // Write your app here.
    
    var periods = [
                   //{name:"Midnight": hour:0, minutes:0},
                   {name:"Before School",  hour: 0, minutes:0},
                   {name:"Period 1",       hour: 8, minutes:30},
                   {name:"Period 2",       hour: 9, minutes:20},
                   {name:"Tutor b/Break a",hour:10, minutes:10},
                   {name:"Tutor a/Break b",hour:10, minutes:30},
                   {name:"Period 3",       hour:10, minutes:50},
                   {name:"Period 4",       hour:11, minutes:40},
                   {name:"Period 5a (Lunch)",hour:12, minutes:30},
                   {name:"Period 5b (Lunch)",hour:13, minutes:15},
                   {name:"Period 6",       hour:14, minutes:00},
                   {name:"Break",          hour:14, minutes:50},
                   {name:"Period 7",       hour:15, minutes:05},
                   {name:"Enrichment",     hour:15, minutes:55},
                   {name:"After School",   hour:16, minutes:45},
                   {name:"Night",  hour:23, minutes:59}
                 ];
    periods.forEach(function(element, index, array){
      array[index].totseconds = (((element.hour * 60) +element.minutes) * 60) +0;
    });
    
    var checktime = function(){
        var curtime = new Date();
        //console.log(curtime);
        var timetext = curtime.getHours()+":"+curtime.getMinutes();//+":"+curtime.getSeconds();
        var daytime =(((curtime.getHours() * 60) +curtime.getMinutes()) * 60) +curtime.getSeconds();
     
        var loopcount = 0;
        //console.log("period start ", periods[0]);
        //console.log("daytime", daytime);
        
        
        while ( loopcount < 20 &&  periods[1].totseconds < daytime ) {
              loopcount ++ ;
            //console.log("loopcount", loopcount);
            //console.log("period while", periods[0]);
        
            
            console.log("periods before gone=", periods);
            var gone = periods.shift();
            console.log(gone);
            
            periods.push(gone);
            
            console.log("periods after push=", periods);
        }
            
            
        
        //var timetext = curtime.toTimeString();
        $("#time").html(timetext);
        $("#period").html(periods[0].name);
        
        var secsleft = periods[1].totseconds -  daytime;
        //console.log(secsleft);
        var lefttext = Math.round(secsleft/60)+" minutes remaining";//+":"+ (secsleft % 60);
        $("#timeleft").html(lefttext);
        
    };
    
    checktime();
    
    setInterval(checktime, 10000);
        
    
    
    
    


});

