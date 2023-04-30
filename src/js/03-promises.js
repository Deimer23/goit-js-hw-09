import Notiflix from 'notiflix';
const form = document.querySelector('.form');

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject)=>{    
    const shouldResolve = Math.random() > 0.3;  
    setTimeout(()=>{
      if (shouldResolve) {
        resolve({position, delay})  
      } else {
        reject({position, delay});
      }
    }, delay);
     
  });

  promise.then(({position1, delay1})=>{
      Notiflix.Notify.success(`✅ Fulfilled promise ${position1} in ${delay1}ms`);
  }).catch(({ position1, delay1 }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position1} in ${delay1}ms`);
  });
 
}
form.addEventListener('submit', (event)=>{
    event.preventDefault();
    const {elements:{delay, step, amount}} = event.currentTarget;    
    let delayTemp = Number(delay.value);
    for(let i = 1; i<= Number(amount.value); i+=1){
      createPromise(i, delayTemp);
      delayTemp += Number(step.value);  
      console.log(delayTemp);      
    }
});
