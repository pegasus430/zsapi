

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
				<div class="col-md-6 col-sm-6 col-xs-9">
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
							<li><a href="#"><img src="img/ico/icon-profile.svg" alt=""/> Profile</a></li>
							<li><a href="#"><img src="img/ico/icon-heart.svg" alt=""/> Help</a></li>
							<li><a href="#"><img src="img/ico/icon-logout.svg" alt=""/> Log Out</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- HEADER End -->

	<div class="container">

		<!-- LOCATIONS start -->
		<div class="row content-head">
			<div class="col-md-8 col-sm-12">
				<h4>Today's Stats</h4>
			</div>
			<div class="col-md-4 col-sm-12">
				<select class="fullWidth" >
		          <option value="day">Trenton RD</option>
		          <option value="Texas">Texas</option>
		          <option value="Alaska">Alaska</option>
		        </select>
				
			</div>
		</div>
		<!-- LOCATIONS end -->

		<!-- CAMPAIGN CONTENT start -->
		<div class="campaign-wrap locations">
			<div class="row">
				<div class="col-md-3 col-sm-12 column">
					<div class="location-wrap">
						<a href="#"><img class="percent img-responsive" src="img/percent.png"></a>
						<div class="text-center">
							<h4 class="border-top"><span class="number-green">+3</span> New Campaigns</h4>
						</div>
					</div>
				</div>
				<div class="col-md-3 col-sm-12 column">
					<div class="location-wrap">
						<a href="#"><img class="cup img-responsive" src="img/cup.png"></a>
						<div class="text-center">
							<h4 class="border-top"><span class="number-green">+23</span> New Rewards</h4>
						</div>
					</div>
				</div>
				<div class="col-md-3 col-sm-12 column">
					<div class="location-wrap">
						<a href="#"><img class="star img-responsive" src="img/star.png"></a>
						<div class="text-center">
							<h4 class="border-top"><span class="number-green">+15</span> New Specials</h4>
						</div>
					</div>
				</div>
				<div class="col-md-3 col-sm-12 column">
					<div class="location-wrap">
						<a href="#"><img class="location img-responsive" src="img/location.png"></a>
						<div class="text-center">
							<h4 class="border-top"><span class="number-green">+23</span> Check-ins</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- CAMPAIGN CONTENT End -->

	</div>

	<!-- GRAPH / CHART Start -->
	<div class="graph-wrap">
		<div class="container">

			<!-- ACTIVITY Start -->
			<div class="row content-head">
				<div class="col-md-4">
					<h4>Today's Stats</h4>
				</div>
				<div class="col-md-8">
					<ul class="camp-stats">
						<li class="active"><span>10</span> Active Campaigns</li>
						<li class="redemptions"><span>23</span> Redemptions</li>
						<li class="visits"><span>413</span> Visits</li>
					</ul>
				</div>
			</div>
			<!-- ACTIVITY End -->

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
	</div>
	<!-- GRAPH / CHART End -->

<?php include('footer.php');?>