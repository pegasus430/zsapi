<?php 
$title = "";
$menuActive = "campaign";
include('header.php'); ?>
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
				<div id="area-chart"></div>
			</div>
			<!-- AREA CHART End -->

			<!-- PIE/DONUT CHART Start -->
			<div class="col-md-5">
				<div id="pie-chart" style="min-width: 310px; height: 400px; max-width: 600px; margin: 0 auto"></div>
			</div>
			<!-- PIE/DONUT CHART End -->
		</div>
	</div>


<?php include('footer.php');?>
