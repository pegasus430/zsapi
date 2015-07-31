
<div id="receipe-popup" class="white-popup">
	<span class="title">Receipt #<?php echo $_GET['receiptId'] ;?></span>
	<div class="container">
		<img src="<?php echo $_GET['img'] ;?>">
		<table>
			<tbody>
				<tr>
					<td class="left" >Receipt ID</td>
					<td>#<?php echo $_GET['receiptId'] ;?></td>
				</tr>
				<tr>
					<td class="left" >Location</td>
					<td><?php echo $_GET['location'] ;?></td>
				</tr>
				<tr>
					<td class="left" >Date</td>
					<td><?php echo $_GET['date'] ;?></td>
				</tr>
				<tr>
					<td class="left" >Amount</td>
					<td><?php echo $_GET['amount'] ;?></td>
				</tr>
				<tr>
					<td class="left" >Date Approved</td>
					<td><?php echo $_GET['dateAproved'] ;?></td>
				</tr>
			</tbody>
		</table>
		<a class="issue-link" href="#">Report a Problem</a>
	</div>
  
</div>