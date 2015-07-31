$( document ).ready(function(){


    // COLOR PICKER! 
    if ($('.colorPicker').length) {
        /*$.minicolors.defaults = $.extend($.minicolors.defaults, {
            changeDelay: 200,
            letterCase: 'uppercase',
            theme: 'bootstrap'
        });*/
        $('.colorPicker').minicolors({
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

    
    

    // PROFILE
    $(".profile").click(function(event) {
        $(".profile-ui").toggleClass("active");
        $(".profile-pic").toggleClass("active");
         event.stopPropagation();
    });

    $('html').click(function() {
        $(".profile-ui").removeClass("active");
        $(".profile-pic").removeClass("active");
    });

    // MASONRY
    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: 223
    });

    // BATTERY
    $(".battery-status").click(function() {
        $(".battery-ui").toggleClass("active");
        $(".ico").toggleClass("active");
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
        $('#area-chart').highcharts({
            chart: {
    		 backgroundColor: '#f4f4f5',
                type: 'area'
            },
            title: {
                text: 'Last 7 Days'
            },
            xAxis: {
                allowDecimals: false,
                labels: {
                    formatter: function() {
                        return this.value; // clean, unformatted number for year
                    }
                }
            },
            tooltip: {
                pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                area: {
                    pointStart: 1940,

                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        fillOpacity: 1,
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [{
                name: 'Redemptions',
                data: [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104
                ]
            }, {
                name: 'Coupons',
                data: [null, null, null, null, null, null, null, null, null, null,
                    5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
                    4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
                    15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
                    33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
                    35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
                    21000, 20000, 19000, 18000, 18000, 17000, 16000
                ]
            }, {
                name: 'Recorded Visits',
                data: [null, null, null, null, null, null, null, null, null, null,
                    5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
                    4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    34304, 33464, 33708, 34099, 34357, 34237, 34401, 24344, 23586,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358
                ]


            }]
        });
    });

    Highcharts.setOptions({
        colors: ['#4cd9b9', '#4990e2', '#ff0141']
    });

    // HIGHCHART JS - PIE CHART
    $(function() {

        $(document).ready(function() {

            // Build the chart
            $('#pie-chart').highcharts({
                chart: {
    			 backgroundColor: '#f4f4f5',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Redemptions'
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        borderColor: '#fff',
                        innerSize: '57%',
                        allowPointSelect: false,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            formatter: function() {
                                return Math.round(this.percentage * 100) / 100 + '%';
                            },
                            distance: -30,
                            style: {
                                color: 'white',
                            }
                        },
                        showInLegend: true
                    }
                },

                series: [{
                    name: "Redemptions",
                    colorByPoint: true,
                    data: [{
                        name: "Today",
                        y: 14.628
                    }, {
                        name: "Yesterday",
                        y: 9.31
                    }, {
                        name: "This Week",
                        y: 2.66
                    }]
                }]
            });
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
                    $('.paleteColors').append('<div class="color" style="background-color: rgb('+colors[i][0]+','+colors[i][1]+','+colors[i][2]+');"></div>');
                };
            }; 
        })(img);

        reader.readAsDataURL(file);
    }    
}



