async function n(a,o){const t=await(await fetch(`http://localhost:8080/api/${a}`,{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer "+o}})).json();return console.log(t),await t}export{n as G};