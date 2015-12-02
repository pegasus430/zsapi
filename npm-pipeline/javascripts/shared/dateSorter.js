module.exports = function(a, b) {
  var auxA =Array();
  var auxB =Array();
  auxA = a.split('/'); 
  auxB = b.split('/');
  if(parseInt(auxA[0]) == parseInt(auxB[0]) && parseInt(auxA[1]) == parseInt(auxB[1]) && parseInt(auxA[2]) == parseInt(auxB[2]) ){
    return 0;
  }
  if(parseInt(auxA[2]) != parseInt(auxB[2])){ 
    if( parseInt(auxA[2]) > parseInt(auxB[2]) ){
      return 1; 
    }else{
      return -1; 
    }
  }else{
    if(parseInt(auxA[0]) != parseInt(auxB[0]) ){ 
      if( parseInt(auxA[0]) > parseInt(auxB[0]) ){
        return 1; 
      }else{
        return -1; 
      }
    }else{
      if ( parseInt(auxA[1]) > parseInt(auxB[1]) ) {
        return 1; 
      }else{
        return -1;
      }
    }
    
  }
  
}