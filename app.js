//La firma es el nombre de la función, los parámetros y lo que retorna
function animateElement(element, start, target, duration){ //Retornará promesa con elemento
    element.style.left = start;
    let counter = 0;
    const delta = (target - start)*40/duration; //delta es lo que se debe mover por cuadro
    return new Promise((resolve, reject)=>{ // Acá se está declarando la promesa. Los parametros indican lo que resuelven y lo que se rechaza, cuando se resuelve se llama a resolve() y si no se llama a reject()
        const loop = setInterval(()=>{ // toma una funcion y la repite cada ciertos milisegundos
            const current = start + counter++ * delta; //a acá indicamos el movimientoto, ++counter hace que sume y luego se multiplique. Counter ++ suma después. Formula = posición inicial + velocidad*tiempo
            element.style.left = current;
          
            if(start > target && current <= target){ // acá indicamos cuando queremos que finalize el moviento que seria alb llegar a target
                element.style.left = current;
              
                clearInterval(loop); // Acá se termina la promesa
                resolve();//Si queremos pasar una respuesta es a través del parámetro de resolve
            }else if(start < target && current >= target){
                element.style.left = current;
                clearInterval(loop); // Acá se termina la promesa
                resolve();//Si queremos pasar una respuesta es a través del parámetro de resolve
            }
        }, 40);// 40 e2 lo que se va a demorar en ejecutar la funcion de nuevo, entre cada llamada a la funcion
    });
               
  }
  function animateElementUp(elementUp, startUp, targetUp, durationUp){ //Retornará promesa con elemento
    elementUp.style.top = startUp;
    let counter = 0;
    const delta = (targetUp - startUp)*40/durationUp; //delta es lo que se debe mover por cuadro
    return new Promise((resolve, reject)=>{ // Acá se está declarando la promesa. Los parametros indican lo que resuelven y lo que se rechaza, cuando se resuelve se llama a resolve() y si no se llama a reject()
        const loop = setInterval(()=>{ // toma una funcion y la repite cada ciertos milisegundos
            const current = startUp + counter++ * delta; //a acá indicamos el movimientoto, ++counter hace que sume y luego se multiplique. Counter ++ suma después. Formula = posición inicial + velocidad*tiempo
            elementUp.style.top = current;
          
            if(startUp > targetUp && current <= targetUp){ // acá indicamos cuando queremos que finalize el moviento que seria alb llegar a target
                elementUp.style.top = current;
              
                clearInterval(loop); // Acá se termina la promesa
                resolve();//Si queremos pasar una respuesta es a través del parámetro de resolve
            }else if(startUp < targetUp && current >= targetUp){
                elementUp.style.top = current;
                clearInterval(loop); // Acá se termina la promesa
                resolve();//Si queremos pasar una respuesta es a través del parámetro de resolve
            }
        }, 40);// 40 e2 lo que se va a demorar en ejecutar la funcion de nuevo, entre cada llamada a la funcion
    });
               
  }

  
  // Somos programadoras de la promise
  //===================== Promise ===================
  // Somos las usuarias de la promise
  
  //Secuencial
  
  const allLi = document.getElementsByTagName("p");
  /*animateElement(allLi[0], -200, 200, 4000).then(()=>{ // coordenadas fuera de la pantalla se indican con numeros negativos. Acá se está haciendo uso de la promesa por fuera.
    console.log("Terminó la animación de doge");
    return animateElement(allLi[1], -200, 200, 4000); //" cá tenemos una promesa anidada, es como decirle: hiciste esto, y ahora haz esto otro
  }).then(()=>{ 
    console.log("Terminó de llegar el cate");
  }).catch(()=>{
    console.log("Falló la animación");
  }); */
  
  Promise.all( // esto devuelve un arreglo de promesas y ejecutarlas a la vez, se resuelve cuansdo terminan todas las promesas.
    [
       animateElement(allLi[1], -200, 1000, 7000),
        animateElement(allLi[0], -200, 900, 8000),      
        
        
    ]
  ).then((results)=>{
    console.log("Todas las animaciones  bajaron");
    return Promise.all( // esto devuelve un arreglo de promesas y ejecutarlas a la vez, se resuelve cuansdo terminan todas las promesas.
        [
          animateElementUp(allLi[1], 0, 200, 8000),
          animateElementUp(allLi[0], 0, 200, 7000)
          
        ]
    )
  }).then((results)=>{
    console.log("Todas las animaciones");
    return Promise.all( // esto devuelve un arreglo de promesas y ejecutarlas a la vez, se resuelve cuansdo terminan todas las promesas.
        [
          animateElement(allLi[1], 1000, 1, 8000),
          animateElement(allLi[0], 900, 100, 4000)
          
        ]
    )
  }).then((results)=>{
    console.log("Todas las animaciones  bajaron");
    return Promise.all( // esto devuelve un arreglo de promesas y ejecutarlas a la vez, se resuelve cuansdo terminan todas las promesas.
        [
          animateElementUp(allLi[1], 200, 10, 8000),
          animateElementUp(allLi[0], 200, 10, 7000)
          
        ]
    )
  }).then((results)=>{
    console.log("Todas las animaciones");
    return Promise.all( // esto devuelve un arreglo de promesas y ejecutarlas a la vez, se resuelve cuansdo terminan todas las promesas.
        [
          animateElement(allLi[1], 1, 1000, 8000),
          animateElement(allLi[0], 100, 900, 4000)
          
        ]
    )
  }).then(()=>{
    console.log("Terminaron las animaciones de vuelta");
  }).catch(()=>{
    console.log("Falló la animación");
  });