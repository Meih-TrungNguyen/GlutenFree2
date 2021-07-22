import math from '../test/math'


test('should calculate total tip',()=>{
   const total= math(10,0.3)

   if (total!==1.3)
   throw new Error ('Wrong'+total)

})