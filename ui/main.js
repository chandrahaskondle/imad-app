var button=document.getElementById('counter');
var counter=5;
button.onclick =function(){
  
  counter++;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
};