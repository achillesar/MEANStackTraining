var update = document.getElementById("update");

update.addEventListener("click", function(){
  fetch("Quotes", {
  method: "put",
  headers: {"Content-Type": "application/json"},
  body: JSON.stringify({
    "name": "Ralph Waldo Emerson",
    "quote": "Nobody can bring you peace but yourself."
  })
}).then(function(res){
  if (res.ok){
    window.location.reload(true)
    return res.json()
  }

}).then(function(data) {
  console.log(data)
  window.location.reload(true)
})
})

var del = document.getElementById("delete")
del.addEventListener("click", function () {
 fetch("Quotes", {
   method: "delete",
   headers: {
     "Content-Type": "application/json"
   },
   body: JSON.stringify({
     "name": "balaji"
   })
 })
 .then( function(res){
   if (res.ok)
   { window.location.reload(true)
     return res.json()
   }
 }).
 then(function(data){
   console.log(data)
   window.location.reload(true)
 })
})
