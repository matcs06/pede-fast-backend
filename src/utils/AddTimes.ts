function timeToMins(time:any) {
  var b = time.split(':');
  return b[0]*60 + +b[1];
}

// Convert minutes to a time in format hh:mm
// Returned value is in range 00  to 24 hrs
function timeFromMins(mins:any) {
  function z(n:any){return (n<10? '0':'') + n;}
  var h = (mins/60 |0) % 24; 
  var m = mins % 60;
  return z(h) + ':' + z(m);
}

// Add two times in hh:mm format
function addTimes(t0:any, t1:any) {
   return timeFromMins(timeToMins(t0) + timeToMins(t1));
}


function uniqueArray(arr: Array<string>){
  
  const uniqueArray = arr.filter(function(item, pos) {
    
    return arr.indexOf(item) == pos ;
  })

  var unavailableArray:Array<string> = []

  uniqueArray.map((value)=>{
    if(value.split(" ").length > 1){
      const newValue = value.split(" ")[0]
      unavailableArray.push(newValue)
    }
  })

  unavailableArray.map((value, index)=>{
    if(uniqueArray.indexOf(value) != -1){
      const uniqueArrayIndex = uniqueArray.indexOf(value)
      uniqueArray.splice(uniqueArrayIndex, 1)
    }
  })

  return uniqueArray

} 
  

export {addTimes, uniqueArray}