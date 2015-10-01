$( document ).ready(function(){


    
    
    /* HIDDE/SHOW GRETINGS */
    if ($('#greetingSelector').length) {
        $('#greetingSelector').change(function () {
            if ($(this).val() == 'new') {
                $('.customGreeting').show();
            }else{
                $('.customGreeting').hide();
            }
        });
    };

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

    /* CUSTOM DROP DOWN */
    $('select').selectBox({'mobile':true});

    /* SHOW CUSTOM DAYS SELECTOR */
    $('.daysOfTheMonth .radio').click(function(e){
        if($('.customDays').find('input').is(':checked')){
            $('.customDaySelector').addClass('active');
        }else{
            $('.customDaySelector').removeClass('active');
        }
    });

    /* SWIPE TO OPEN MENU */
    $('body').on("swipeleft",function(){
      $('.ui-overlay-a').removeClass("active");
      $('.db-header').removeClass("active");
      $('.header').removeClass("active");
      $('#home').removeClass("active");
    });
    $('body').on("swiperight",function(){
      $('.ui-overlay-a').addClass("active");
      $('.db-header').addClass("active");
      $('.header').addClass("active");
      $('#home').addClass("active");
      
    });


    // COLOR PICKER! 
    if ($('#colorPicker1').length) {
        $('#colorPicker1').minicolors({
            control: 'wheel',
            position: 'right'
        });
    }
    if ($('#colorPicker2').length) {
        $('#colorPicker2').minicolors({
            control: 'wheel',
            position: 'right'
        });
    }

    // DATE PICKER!
    if ($('.input-group.date').length) {
        $('.input-group.date').datepicker({
            autoclose: true,
            orientation: 'top',
            todayHighlight: true
        });
    }

    // DAYs PICKER
    if ($('.customDaySelector').length) {
        $('.customDaySelector').datepicker({
            startDate: "05/01/2016",
            endDate: "05/31/2016",
            multidate: true,
            multidateSeparator: ",",
            calendarWeeks: true,
            todayHighlight: true
        });
        $('.customDaySelector').on("changeDate", function(event) {
            var dates = new Array();
            var day = new Array();
            aux = "";
            dates = $('.customDaySelector').datepicker('getFormattedDate').split(',');
            for (var i = dates.length - 1; i >= 0; i--) {
                day = dates[i].split('/');
                aux = aux + day[1]+"," ;
            };
            $("#customDaySelector_input").val( aux );
        });
    }

    //     UPLOAD IMAGE ON THE GO!
    if ($('.upload-campaign-image').length) {
        $('.upload-campaign-image').click(function() {
            $(this).next('input[type="file"]').trigger('click');
            return false;
        });
    }
    

    //open Popup
    if ($('.open-popup-link').length) {
        $('.open-popup-link').magnificPopup({
          type:'inline',
          midClick: true,
          removalDelay: 500,
          mainClass: 'mfp-fade'
        });
    };

    if ($('.open-crop-popup-link').length) {
        $('.open-crop-popup-link').magnificPopup({
          type:'inline',
          midClick: true,
          removalDelay: 500,
          mainClass: 'mfp-fade',
          callbacks: {
            open: function() {
                $('#crop-image-popup .container > img').cropper({
                  aspectRatio: 1 / 1,
                  checkImageOrigin: true,
                  responsive: true,
                  modal: true,
                  crop: function(data) {
                    //console.log(data);
                    // Output the result data for cropping image.
                  }
                });
                $('.crop-btn').click(function(e){
                    $('.imgPlaceHolder img').attr('src',$('#crop-image-popup .container > img').cropper('getCroppedCanvas').toDataURL("image/jpeg", 1.0));
                    $('.mfp-close').click();
                });
            },
            close: function() {
              // Will fire when popup is closed
            }
          }
        });
    };

    // OPEN AJAX POPUP!
    if ($('.simple-ajax-popup-align-top').length) {
        $('.simple-ajax-popup-align-top').magnificPopup({
          type: 'ajax',
          alignTop: true,
          overflowY: 'scroll' // as we know that popup content is tall we set scroll overflow by default to avoid jump
        });
    }

    
    
    // MASONRY
    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: 223
    });

    // PROFILE
    $(".profile").click(function(event) {
        $(".profile-ui").toggleClass("active");
        $(".profile-pic").toggleClass("active");
         $(".battery-ui").removeClass("active");
        $(".ico").removeClass("active")
         event.stopPropagation();
    });

    $('html').click(function() {
        $(".profile-ui").removeClass("active");
        $(".profile-pic").removeClass("active");
    });


    //Export UI
    $(".open-export-ui").click(function(event) {
        event.preventDefault();
        $(".export-ui").toggleClass("active");
         event.stopPropagation();
    });

    $('html').click(function() {
        $(".export-ui").removeClass("active");
    });



    // BATTERY
    $(".battery-status").click(function() {
        $(".battery-ui").toggleClass("active");
        $(".ico").toggleClass("active");
        $(".profile-ui").removeClass("active");
        $(".profile-pic").removeClass("active");
         event.stopPropagation();
    });

    $('html').click(function() {
        $(".battery-ui").removeClass("active");
        $(".ico").removeClass("active");
    });

    $(".battery-ui").mouseleave(function(){
        setTimeout(
          function() 
          {
            $(".battery-ui").removeClass("active");
          }, 3000);
    });

    // HIGHCHART JS - AREA CHART
    $(function() {

        $(document).ready(function() {
            google.setOnLoadCallback(drawChart);
            function drawChart() {
            var data = google.visualization.arrayToDataTable([
                  ['', 'Redemptions', 'Coupons','Recorded Visits'],
                  ['1945',  6,      0, 0],
                  ['1946',  11,     0, 0],
                  ['1947',  32,     0, 0],
                  ['1948',  110,    0, 0],
                  ['1949',  235,    0, 0],
                  ['1950',  640,    0, 5],
                  ['1951',  1005,   0, 25],
                  ['1952',  1436,   0, 50],
                  ['1953',  2063,   0, 120],
                  ['1954',  3057,   0, 150],
                  ['1955',  4618,   0, 200],
                  ['1956',  6444,   5, 426],
                  ['1957',  9822,   25, 660],
                  ['1958',  15468,  50, 869],
                  ['1959',  20434,  120, 1060],
                  ['1960',  24126,  150, 1605],
                  ['1961',  27387,  200, 2471],
                  ['1962',  29459,  426, 3322],
                  ['1963',  31056,  660, 4238],
                  ['1964',  31982,  869, 5221],
                  ['1965',  32040,  1060, 6129],
                  ['1966',  31233,  1605, 7089],
                  ['1967',  29224,  2471, 8339],
                  ['1968',  27342,  3322, 9399],
                  ['1969',  26662,  4238, 10538],
                  ['1970',  26956,  5221, 11643],
                  ['1971',  27912,  6129, 13092],
                  ['1972',  28999,  6826, 14478],
                  ['1973',  28965,  7089, 26956],
                  ['1974',  27826,  8339, 27912],
                  ['1975',  25579,  9399, 28999],
                  ['1976',  25722,  10538, 28965],
                  ['1977',  24826,  11643, 27826],
                  ['1978',  24605,  13092, 25579],
                  ['1979',  24304,  14478, 25722],
                  ['1980',  23464,    15915, 24605],
                  ['1981',  23708,    17385, 34304],
                  ['1982',  24099,    19055, 33464],
                  ['1983',  24357,    21205, 33708],
                  ['1984',  24237,    23044, 34099],
                  ['1985',  24401,    25393, 34357],
                  ['1986',  24401,    27935, 34237],
                  ['1987',  23586,    30062, 34401],
                  ['1988',  22380,    32049, 24344],
                  ['1989',  21004,    33952, 23586],
                  ['1990',  17287,    35804, 22380],
                  ['1991',  14747,    37431, 21004],
                  ['1992',  13076,    39197, 17287],
                  ['1993',  12555,    45000, 14747],
                  ['1994',  12144,    43000, 13076],
                  ['1995',  11009,    41000, 12555],
                  ['1996',  10950,    39000, 12144],
                  ['1997',  10871,    37000, 11009],
                  ['1998',  10824,    35000, 10950],
                  ['1999',  10577,    33000, 10871],
                  ['2000',  10527,    31000, 10824],
                  ['2001',  10475,    29000, 10577],
                  ['2002',  10421,    27000, 10527],
                  ['2003',  10358,    25000, 10475],
                  ['2004',  10295,    24000, 10421],
                  ['2005',  10104,    23000, 10358]

            ]);
                

            var options = {
              title: 'Last 7 Days',
              animation: {
                startup: 'true', 
                duration: 400
              },
              hAxis:{ textPosition: 'none' },
              vAxis: {minValue: 0},
              legend: {position: 'bottom', maxLines: 3},
              height: 400,
              colors: ['#4CD9B9','#FF0141','#4990E2'],
              areaOpacity: 0.9,
              backgroundColor: '#f4f4f5',
              
            };

            var chart = new google.visualization.AreaChart(document.getElementById('area-chart'));
            chart.draw(data, options);
          }
        });
    });

    // HIGHCHART JS - PIE CHART
    $(function() {
        $(document).ready(function() {
            google.setOnLoadCallback(drawChart);
            function drawChart() {

                var data = google.visualization.arrayToDataTable([
                  ['Source', 'Redemptions'],
                  ['This Week',     10],
                  ['Yesterday', 55],
                  ['Today', 35]
                ]);

                var options = {
                  title: 'Redemptions',
                  pieHole: 0.4,
                  backgroundColor: '#f4f4f5',
                  pieSliceTextStyle: {
                    color: '#FFF',
                    fontSize:15
                  },
                  legend: {position: 'bottom', maxLines: 3},
                  slices: {0: {color: '#4CD9B9'}, 1:{color:'#FF0141'}, 2:{color:'#4990E2'}},
                    tooltip: {text: 'percentage'}
                };

                var chart = new google.visualization.PieChart(document.getElementById('pie-chart'));
                chart.draw(data, options);
            }
        });
    });

    // NAVBAR ACT
    $(".nav-trigger").click(function() {
        $("#home").toggleClass("active");
        $(".header").toggleClass("active");
        $(".db-header").toggleClass("active");

    });
});


// UPDATE IMAGES ON THE GO!
function handleFiles(fileInput) {
    var files = fileInput.files;
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var imageType = /image.*/;
 
        if (!file.type.match(imageType)) {
            continue;
        }
        // insert the img in the popup cropper
        var img = document.createElement("img");
        img.classList.add("obj");
        img.file = file;
        $('#crop-image-popup .container').html(img);
        var reader = new FileReader();
        reader.onload = (function(aImg) { 
            return function(e) { 
                aImg.src = e.target.result; 
            }; 
        })(img);
        reader.readAsDataURL(file);

        // insert the img in the placeholder
        var img2 = document.createElement("img");
        img2.classList.add("obj");
        img2.file = file;

        $('.imgPlaceHolder').html(img2);
        var reader2 = new FileReader();
        reader2.onload = (function(aImg) { 
            return function(e) { 
                $('.campaignImage').attr('value', e.target.result);
                aImg.src = e.target.result; 
                /* SHOW PLACEHOLDER AND CROP BUTTON ON MOBILE AFTER UPDATE */
                $('.tempHideOnMobile').show();
            }; 
        })(img2);
        reader2.readAsDataURL(file);
    }    
}


// UPDATE BUSINESS LOGO ON THE GO!
function handleFilesLogo(fileInput) {
    var files = fileInput.files;
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var imageType = /image.*/;
 
        if (!file.type.match(imageType)) {
            continue;
        }
        
        var img = document.createElement("img");
        img.classList.add("obj");
        img.file = file;

        $('.imgPlaceHolder').html(img);

        var reader = new FileReader();
        reader.onload = (function(aImg) { 
            return function(e) { 
                $('.campaignImage').attr('value', e.target.result);
                aImg.src = e.target.result; 

                // color theif generating pallete
                var image = new Image();
                image.src = aImg.src;
                var colorThief = new ColorThief();
                var colors = Array();
                colors = colorThief.getPalette(image, 5);
                $('.paleteColors').empty();
                for (var i = colors.length - 1; i >= 0; i--) {
                    var hex = rgb2hex('rgb('+colors[i][0]+','+colors[i][1]+','+colors[i][2]+')');
                    $('.paleteColors').append('<div class="color" val="'+hex+'" style="background-color: rgb('+colors[i][0]+','+colors[i][1]+','+colors[i][2]+');"></div>');
                };

                $('.paleteColors .color').click(function(){
                    if($('.lastActive').length ) {
                        $('.lastActive input').val( $(this).attr('val'));
                        if ($('.lastActive #colorPicker1').length) {

                            $('#colorPicker1').minicolors('value',$(this).attr('val'));
                        };
                        if ($('.lastActive #colorPicker2').length) {
                            $('#colorPicker2').minicolors('value',$(this).attr('val'));
                        };
                    };
                });
            }; 
        })(img);

        reader.readAsDataURL(file);
    }    
}


/* TRANSFORM RGB TO HEX */
var hexDigits = new Array
        ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); 
function rgb2hex(rgb) {
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
function hex(x) {
  return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
 }

function dateSorter(a, b) {
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


function updatePreview(){
    $('.previewHeader').css('background-color', $('#colorPicker1').val());
    $('.content, .socialFooter').css('background-color', $('#colorPicker2').val());
    $('.previewHeader img').attr('src', $('.logoImage').val());

    $('.content h1').html($('.businessName').val());
    var text = $('.address').val()+' '+$('.address2').val()+' '+$('.city').val()+' '+$('.state').val()+' '+$('.zipCode').val();
    $('.content p').html(text);
    
}
