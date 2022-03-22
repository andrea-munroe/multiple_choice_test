db.query(
	'SELECT id, harvestDate, species, quantity from other_game_harvest WHERE username = ? AND hunting_year = ? ORDER BY harvestDate DESC',
	[
		username,
		hunting_year
	],
	function(error, results, fields) {
		if (error) throw error;
		//
		// All is well with the "other" harvests query, add to harvests object and move to next query
		// console.log("results length in the other_game query is = " + results.length + " for username " + username);
		if (results.length) {
			// query has values
			results.forEach(function(result) {
				harvests.push(result);
			});
		}
		//Move on to next query
		db.query(
			'SELECT id, harvestDate, species, 1 as Quantity from doe_harvest WHERE username = ? AND hunting_year = ? ORDER BY harvestDate DESC',
			[
				username,
				hunting_year
			],
			function(error, results, fields) {
				if (error) throw error;
				//Query is fine on the does, add it to the harvest object
				if (results.length) {
					// query has values
					// console.log("results from the doe_harvest table are: " + JSON.stringify(results));
					results.forEach(function(result) {
						if (!result.quantity) {
							result.quantity = 1;
						}
						result.species = 'Doe'; //to help differentiate between bucks and does
						harvests.push(result);
					});
				}

				db.query(
					'SELECT id, harvestDate, species, 1 as Quantity from buck_harvest WHERE username = ? AND hunting_year = ? ORDER BY harvestDate DESC',
					[
						username,
						hunting_year
					],
					function(error, results, fields) {
						if (error) throw error;
						//Query is fine on the does, add it to the harvest object
						if (results.length) {
							// query has values
							// console.log("results from the doe_harvest table are: " + JSON.stringify(results));
							results.forEach(function(result) {
								if (!result.quantity) {
									result.quantity = 1;
								}
								result.species = 'Buck';
								harvests.push(result);
							});
						}

						db.query(
							'SELECT id, harvestDate, species, 1 as Quantity from turkey_harvest WHERE username = ? AND hunting_year = ? ORDER BY harvestDate DESC',
							[
								username,
								hunting_year
							],
							function(error, results, fields) {
								if (error) throw error;
								//Query is fine on the does, add it to the harvest object
								// console.log("In show harvests route, turkey_harvest object is "+ JSON.stringify(results));
								if (results.length) {
									// query has values
									// console.log("results from the doe_harvest table are: " + JSON.stringify(results));
									results.forEach(function(result) {
										if (!result.quantity) {
											result.quantity = 1;
										}
										harvests.push(result);
									});
								}
								//sort by harvest date in descending order
								harvests.sort(function(a, b) {
									return b.harvestDate - a.harvestDate;
								});
								res.render('edit/edit_other', {
									harvests,
									hunting_year
								});
							}
						);
					}
				);
			}
		);
	}
);
