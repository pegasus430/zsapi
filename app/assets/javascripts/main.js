$( document ).ready(function(){
    /* PREVIEW CAMPAIGN*/
    if($('.preview-campaign').length){
        $('input').change(function(){
            console.log('hoho');
            updatePreview();
        });
        $('select').selectBox().change(function () {
            console.log('hoho2',$(this).val());
            updatePreview();
        });

    }   
});