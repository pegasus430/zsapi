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




    //Export UI
    $(".open-export-ui").click(function(event) {
        event.preventDefault();
        $(".export-ui").toggleClass("active");
         event.stopPropagation();
    });

    $('html').click(function() {
        $(".export-ui").removeClass("active");
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