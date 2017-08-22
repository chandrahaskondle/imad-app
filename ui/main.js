var button=document.getElementById('counter');
var counter=5;
button.onclick =function(){

    var request = new XMLHttpRequest();
    request.onreadystatechange =function() {
        
    };
    
  counter = counter + 1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
};