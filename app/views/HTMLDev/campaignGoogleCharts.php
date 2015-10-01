<?php 
$title = "";
$menuActive = "campaign";?>
<!DOCTYPE html>
<!--[if IE 8]>			<html class="ie ie8"> <![endif]-->
<!--[if IE 9]>			<html class="ie ie9"> <![endif]-->
<!--[if gt IE 9]><!-->	<html> <!--<![endif]-->
<head>

	<!-- Meta -->
	<meta charset="utf-8">
	<meta name="keywords" content="HTML5 Template" />
	<meta name="description" content="">
	<meta name="author" content="">

	<title>ZippySpot | Responsive Admin Template</title>

	<!-- Mobile Metas -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<!-- Favicon -->
	<link rel="shortcut icon" href="/favicon.ico">

	<!-- Bootstrap Core CSS -->
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/bootstrap-table.css"  rel="stylesheet" > 

	<!-- DROPDOWN PLUGIN CSS -->
	<link href="css/plugin/jquery.selectBox.css" rel="stylesheet">

	<!-- TOUR PLUGIN CSS -->
	<link href="css/plugin/hopscotch.css" rel="stylesheet">

	<!-- Datepicker plugin CSS -->
	<link href="css/plugin/bootstrap-datepicker3.standalone.css" rel="stylesheet">

	<!-- Plugins CSS -->
	<link href="css/plugin/magnific-popup.css"  rel="stylesheet" > 
	<link href="css/plugin/cropper.css"  rel="stylesheet" > 
	<link href="css/plugin/jquery.minicolors.css"  rel="stylesheet" > 

	<!-- CSS -->
	<link href="css/style.css" rel="stylesheet">

	<!-- Custom Fonts -->
	<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
	<link href='http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,700,900' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Roboto+Condensed:400,300,300italic,700,400italic' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>

	<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
		<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
	<![endif]-->

</head>

<body id="home">

<div id="wrapper">


	<!-- NAV / VERTICAL SIDEMENU Start -->
	<div class="db-header " id="db-header">
		<div class="logo">
			<a href="./index.php"><img src="img/logo_zippy.png" alt=""/></a>
		</div>
		<div class="db-navbar">
			<ul>
				<li id="dashboard" <?php if($menuActive == "dash")echo('class="active"');?> ><a href="./dashboard.php"><i><img src="img/ico/ico_dash.svg" alt=""/></i><span>Dashboard</span></a></li>
				<li id="business" <?php if($menuActive == "bProfile")echo('class="active"');?> ><a href="./businessProfile.php"><i><img src="img/ico/ico_bizProfile.svg" alt=""/></i><span>Biz Profile</span></a></li>
				<li id="greetings" <?php if($menuActive == "greetings")echo('class="active"');?> ><a href="./greetings.php"><i><img src="img/ico/ico-notifications.svg" alt=""/></i><span>Greetings</span></a></li>
				<li id="campaigns" <?php if($menuActive == "campaigns")echo('class="active"');?> ><a href="./campaigns.php"><i><img src="img/ico/icon-campaign.svg" alt=""/></i><span>Campaigns</span></a></li>
				<li id="customers" <?php if($menuActive == "customers")echo('class="active"');?> ><a href="./customers.php"><i><img src="img/ico/icon-customers.svg" alt=""/></i><span>Customers</span></a></li>
				<li id="receipts" <?php if($menuActive == "receipts")echo('class="active"');?> ><a href="./receipts.php"><i><img src="img/ico/icon-receipt.svg" alt=""/></i><span>Receipts</span></a></li>
				<li id="locations" <?php if($menuActive == "location")echo('class="active"');?> ><a href="./locations.php"><i><img src="img/ico/icon-location.svg" alt=""/></i><span>Locations</span></a></li>
			</ul>
		</div>
	</div>
	<!-- NAV / VERTICAL SIDEMENU End -->

	<!-- HEADER Start -->
	<div class="header">
		<div class="container">
			<div class="row">
				<div class="col-md-6 col-sm-6 col-xs-3">
					<div class="nav-trigger"></div>
					<div class="welcome">
						Get some Coffee
					</div>
					<div class="battery-status full hidden-xs">
						<div class="ico"><img src="img/ico/ico_storeBattery.svg" alt=""/></div>
						<ul class="battery-ui">
							<li>Location Name 1 <span><em class="bg-color2" style="width:25%"></em></span></li>
							<li>Location Name 2 <span><em class="bg-color3" style="width:50%"></em></span></li>
							<li>Location Name 3 <span><em style="width:100%"></em></span></li>
							<li>Location Name 4 <span><em class="bg-color3" style="width:50%"></em></span></li>
							<li>Location Name 5 <span><em class="bg-color2" style="width:25%"></em></span></li>
						</ul>
					</div>
				</div>
				<div class="col-md-6 col-sm-6 col-xs-9 profile-head">
					<div class="profile">
						<div class="battery-status full visible-xs">
							<div class="ico"><img src="img/ico/ico_storeBattery.svg" alt=""></div>
							<ul class="battery-ui">
								<li>Location Name 1 <span><em class="bg-color2" style="width:25%"></em></span></li>
								<li>Location Name 2 <span><em class="bg-color3" style="width:50%"></em></span></li>
								<li>Location Name 3 <span><em style="width:100%"></em></span></li>
								<li>Location Name 4 <span><em class="bg-color3" style="width:50%"></em></span></li>
								<li>Location Name 5 <span><em class="bg-color2" style="width:25%"></em></span></li>
							</ul>
						</div>
						<img class="profile-pic" src="img/profile.png" alt=""/>
						<span>Adam Ostyanko</span>
						<ul class="profile-ui">
							<li><a href="profile.php"><img src="img/ico/icon-profile.svg" alt=""/> Profile</a></li>
							<li><a href="#"><img src="img/ico/icon-heart.svg" alt=""/> Help</a></li>
							<li><a href="#"><img src="img/ico/icon-logout.svg" alt=""/> Log Out</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- HEADER End -->
	<!-- PAGE HEADER Start -->
	<div class="page-head bg-color6">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<h4>Campaigns</h4>
				</div>
			</div>
		</div>
	</div>
	<!-- PAGE HEADER End -->

	<div class="container">

		<!-- CAMPAIGN HEADER start -->
		<div class="row content-head">
			<div class="col-md-8 col-sm-12">
				<h4>SINGLE CAMPAIGN	OVERVIEW</h4>
				<span class="subtitle">Every Thursday</span>
			</div>
			
			<div class="col-md-4 col-sm-6">
				<select class="fullWidth">
				  <option value="State">State</option>
				  <option value="Albana">Albana</option>
				  <option value="Texas">Texas</option>
				  <option value="Alaska">Alaska</option>
				  <option value="Newyork">Newyork</option>
				</select>
			</div>
		
			<div class="col-md-12">
				<div class="row">
					<div class="col-md-12">
						<h4 class="normal">Most popular location: <b>Trenton Rd</b></h4>
					</div>
				</div>
				<div class="row">
					<div class="col-md-8 col-md-offset-4">
						<ul class="camp-stats">
							<li class="active"><span>25</span> Active Campaigns</li>
							<li class="redemptions"><span>15</span> Redemptions</li>
							<li class="visits"><span>108</span> Visits</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!-- CAMPAIGN HEADER end -->

		<!-- ANALYSIS Start -->
		<div class="row">
			<div class="col-md-12">
				<div class="campaign-analysis">
					<ul>
						<li class="ups campaigns"><span>+111</span> New Campaigns</li>
						<li class="downs visitors"><span>100%</span> New Visitors</li>
						<li class="ups redemptions"><span>+999</span> New Redemptions</li>
						<li class="downs sales"><span>100%</span> New Sales</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- ANALYSIS End -->

		<div class="row chart-wrap">

			<!-- AREA CHART Start -->
			<div class="col-md-7">
       			<div id="area-chart" ></div>
			</div>
			<!-- AREA CHART End -->

			<!-- PIE/DONUT CHART Start -->
			<div class="col-md-5">
       			<div id="pie-chart" ></div>
			</div>
			<!-- PIE/DONUT CHART End -->
		</div>
	</div>

</div>

<!-- jQuery -->
<script src="js/jquery.js"></script>
<script src="js/jquery.mobile.custom.js"></script>


<!-- Bootstrap Core JavaScript -->
<script src="js/bootstrap.min.js"></script>

<!-- Plugins -->
<script type="text/javascript" src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1','packages':['corechart']}]}"></script>
<script type="text/javascript" src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1','packages':['corechart']}]}"></script>
<script src="js/plugins/select/jquery.selectBox.js"></script>
<script src="js/plugins/masonry/masonry.pkgd.js"></script>
<script src="js/plugins/highcharts/highcharts.js"></script>
<script src="js/plugins/highcharts/exporting.js"></script>
<script src="js/plugins/datepicker/bootstrap-datepicker.js"></script>
<script src="js/bootstrap-table.js"></script>
<script src="js/plugins/popup/jquery.magnific-popup.min.js"></script>
<script src="js/plugins/cropper/cropper.js"></script>
<script src="js/plugins/minicolors/jquery.minicolors.js"></script>
<script src="js/plugins/color-thief/color-thief.js"></script>
<script src="js/plugins/hopscotch/hopscotch.js"></script>
<?php echo $showTour; ?>
<script src="js/mainGoogleCharts.js"></script>


</body>
</html>
