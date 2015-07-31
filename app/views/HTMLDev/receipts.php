<?php 
$title = "";
$menuActive = "receipts";
include('header.php'); ?>

	<div class="container">

		<!-- CAMPAIGNS start -->
		<div class="row content-head">
			<div class="col-md-8 col-sm-12">
				<h4>Verified Receipts</h4>
			</div>
			<div class="col-md-4 col-sm-12">
        <select class="fullWidth" >
          <option value="Trenton RD">Trenton RD</option>
          <option value="Texas">Texas</option>
          <option value="Alaska">Alaska</option>
          <option value="Newyork">Newyork</option>
        </select>
			</div>
		</div>

		<div class="row">
			<div class="col-md-12 campaigns-selector">
				<div class="view">VIEW</div>
        <select class="mobileFullWidth" >
          <option value="All">All</option>
          <option value="Today">Today</option>
          <option value="Past 30 days">Past 30 days</option>
        </select>
			</div>
		</div>

		<div class="table-responsive">
          <table data-toggle="table" data-toolbar="#custom-toolbar" data-show-columns="false" data-search="false" data-show-refresh="false" data-show-filter="false" data-show-toggle="false" data-show-export="false" data-pagination="true" data-pagination-v-align="both" data-striped="true" class="table table-hover table-condensed table-bordered">
            <thead>
              <tr>
                <th class="first" data-align="left" data-sortable="true">ID</th>
                <th data-align="left" data-sortable="true">Image</i></th>
                <th data-align="left" data-sortable="true" data-sorter="dateSorter">Date</th>
                <th data-align="left" data-sortable="true">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>000145</td>
                <td><a href="popupReceipt.php?img=img/popupImagePlaceholder.png&receiptId=123213&location=Trenton Td&date=4/9/2015&amount=$11.25&dateAproved=4/19/2015" class="simple-ajax-popup-align-top" >View Receipt</a></td>
                <td>4/19/2015</td>
                <td>$11.25</td>
              </tr>
              <tr>
                <td>000245</td>
                <td><a href="#">View Receipt</a></td>
                <td>3/18/2015</td>
                <td>$10.00</td>
              </tr>
              <tr>
                <td>000345</td>
                <td><a href="#">View Receipt</a></td>
                <td>4/29/2015</td>
                <td>$1.25</td>
              </tr>
              <tr>
                <td>000445</td>
                <td><a href="#">View Receipt</a></td>
                <td>7/19/2015</td>
                <td>$2.25</td>
              </tr>
              <tr>
                <td>000545</td>
                <td><a href="#">View Receipt</a></td>
                <td>6/19/2015</td>
                <td>$2.70</td>
              </tr>
              <tr>
                <td>000245</td>
                <td><a href="#">View Receipt</a></td>
                <td>4/1/2015</td>
                <td>$13.25</td>
              </tr>
              <tr>
                <td>000145</td>
                <td><a href="#">View Receipt</a></td>
                <td>4/9/2015</td>
                <td>$11.15</td>
              </tr>
              <tr>
                <td>000645</td>
                <td><a href="#">View Receipt</a></td>
                <td>4/10/2015</td>
                <td>$1.25</td>
              </tr>
              <tr>
                <td>000845</td>
                <td><a href="#">View Receipt</a></td>
                <td>4/10/2015</td>
                <td>$10.75</td>
              </tr>
              <tr>
                <td>000945</td>
                <td><a href="#">View Receipt</a></td>
                <td>4/12/2015</td>
                <td>$9.77</td>
              </tr>
              <tr>
                <td>001450</td>
                <td><a href="#">View Receipt</a></td>
                <td>4/13/2015</td>
                <td>$5.25</td>
              </tr>
            </tbody>
          </table>
        </div>
		<!-- CAMPAIGNS end -->



		<!-- NEW CAMPAIGNS POPUP! -->
		<div id="new-campaign-popup" class="white-popup mfp-hide">
			<span class="title">Select a Campaign</span>
		  	<div>
		  		<a href="#">
		  			<img class="percent" src="img/percent.png">
		  			<h4>New Coupon</h4>
		  			<span>Ex: Get 10% Off an Item</span>
		  		</a>
		  	</div>
		  	<div>
		  		<a href="#">
		  			<img class="cup" src="img/cup.png">
		  			<h4>New Reward</h4>
		  			<span>Ex: Redeem your points</span>
		  		</a>
		  	</div>
		  	<div class="last">
		  		<a href="#">
		  			<img class="star" src="img/star.png">
		  			<h4>New Special</h4>
		  			<span>Ex: Half-Price Wednesdays</span>
		  		</a>
		  	</div>
		</div>
		<!-- NEW CAMPAIGNS POPUP end -->

	</div>

<?php include('footer.php');?>
