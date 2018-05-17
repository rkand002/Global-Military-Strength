var ThreeCode = {};
var countryCodes = {};
var CountryNameArr = [];
var curIPunderSugg;
var selectCountry=[];
		$( document ).ready(function(){
			$('html').animate({scrollTop:0}, 1);
    		$('body').animate({scrollTop:0}, 1);
			matching();
			//to search during comparision 
			$( ".countryIP" ).keyup(function(event) {
				curIPunderSugg = $(this)
				var input = $(this).val().toLocaleLowerCase();
				if(input.length <3){
					return false;
				}


				var matchedCountries="<ul class='list-group'>";
			  	
			  	CountryNameArr.forEach(function(ele){
			  		if(ele.toLocaleLowerCase().indexOf(input) != -1){
			  			if(ele != "United States of America" && ele != "Greenland")
			  			{
			  			/*for(var i=0;i<selectCountry.length;i++){
			  				if(selectCountry[i].toLocaleLowerCase() != ele.toLocaleLowerCase()){*/
			  					matchedCountries+="<li class='list-group-item'>"+ele+"</li>";
			  			}
			  			/*	}

			  			}*/
    					// alert(str2 + " found");
					}
				});	
				matchedCountries+="</ul>";
			  	console.log(matchedCountries);    
			  	$(".countriesListDiv").html(matchedCountries);	
			  	$(".countriesListDiv").css( {position:'absolute',
		  				   			 top:curIPunderSugg.offset().top+31,
			  				   		  left:curIPunderSugg.offset().left});
			  	$(".countriesListDiv").show();
			  		
			});
			//end of comparision search bar
			// to search at the top of world map
			$( ".CountryInput" ).keyup(function(event) {
				curIPunderSugg = $(this)
				var input = $(this).val().toLocaleLowerCase();
				if(input.length <3){
					return false;
				}
				var matchedCountries="<ul class='list-group'>";
			  	
			  	CountryNameArr.forEach(function(ele){
			  		if(ele.toLocaleLowerCase().indexOf(input) != -1){
			  			if( ele != "Greenland")
			  			{
			  				matchedCountries+="<li class='list-group-item'>"+ele+"</li>";
						}
					}	
				});	
				matchedCountries+="</ul>";
			  	 console.log(matchedCountries);   
			  	 $(".countriesListDivForSmallCount").show(); 
			  	$(".countriesListDivForSmallCount").html(matchedCountries);	
			  	$(".countriesListDivForSmallCount").css( {position:'absolute',
		  				   			 top:curIPunderSugg.offset().top+31,
			  				   		  left:curIPunderSugg.offset().left});
			  	// $(".countriesListDiv").show();
			  
				});


				$(document).on('click',".countriesListDivForSmallCount li",function(){
					curIPunderSugg.val($(this).html());
					$(".countriesListDivForSmallCount").hide(); 
				  	var compareCountryList =[];
					$(".CountryInput").val($(this).html());						
					newbubble($(this).html());
					$('html,body').animate({
						scrollTop: $('.OtherMaps').offset().top
					},'slow');
				 });


			// end of top search bar
			$(document).on("click",".countriesListDiv li",function(){

				selectCountry.push($(this).html());
				curIPunderSugg.val($(this).html());
				$(".countriesListDiv").hide();

			});


			$(".comparePlayerButt").click(function(){
				var compareCountryList =[];
				 $(".countryIP").each(function(idx){
				 	compareCountryList.push($(this).val());
				 	if(idx==3){
				 		$("#MultipleBarChart").empty();

				 		MultipleBarCharts(compareCountryList);
				 		$('html,body').animate({
							scrollTop: $('.MultiBar').offset().top
						},'slow');

				 		//setTimeout(function(){ MultipleBarCharts(compareCountryList); }, 1000);

				 	}
				 });
			});
		});

		// matching country codes with three letter country code
function matching(){

		var count = 0;
		var list_countries=[];
		d3.json("projectData.json",function(error1,dataFromProjectJsonFile){
			d3.json("slim-3.json", function(error, dataFromSlimJsonFile) {
				var jsondataarr = dataFromSlimJsonFile["rows"];
				
				dataFromProjectJsonFile.forEach(function(item1){
					// console.log(item1["Country"]);
					CountryNameArr.push(item1["Country"]);
					list_countries.push(item1["Country"]);
					jsondataarr.forEach(function(item){
						// console.log(item["name"]);
						if(item["name"]==item1["Country"]){
							list_countries.splice(-1,1);
							// console.log(item["name"] + " - " + item1["Country"]);
							// ThreeCode.push({
							// 	key : "alpha-3",
							// 	value : item["alpha-3"]
							// });
							if(!ThreeCode.hasOwnProperty(item["alpha-3"])){

								ThreeCode[item["alpha-3"]] = {"fillKey": "authorHasTraveledTo" , "Count": item1["Ranks"]}
							}
							if(!countryCodes.hasOwnProperty(item["alpha-3"])){
								countryCodes[item["alpha-3"]] = item1["Country"]
							}
							// console.log(Highlight["key2"]);
						}
					});

				});
				WorldMap();
			});
			
		});
}	


function WorldMap() {
			$('.datamap').empty();
			$("#map").empty();
			// $('body').append('<div id="map" class="col-sm-12 col-xs-12 col-lg-6 col-md-6" style="height: 800px; width: 60%; margin-left: 20%"></div>');
			$(".maptitle").html("Military Ranking of different Countries");
			// console.log(countryCodes);
			var basic_choropleth = new Datamap({
				element : document.getElementById("map"),
				projection : 'mercator',
				fills : {
					defaultFill : "#36648B",
					authorHasTraveledTo : "#36648B"
					// countrieswithnoarmy : "#2844D4"
                
				},
				geographyConfig: {
			        highlightBorderColor: '#7d7d7d',
			        highlightBorderWidth: 1,
			        popupTemplate: function (geo, data) {
			            if ( !data )
			            	
			            return ['<div style = "padding:5px; padding-right: 30px; padding-left: 20px; position:absolute; border-radius: 5px; top: 70px; left: 90px; background: white; color: black; border: 1px solid #CCC; font-size: 12px;"><strong>',
			        		geo.properties.name,'</strong></div>' ].join(''); 
			            return ['<div style = "padding:5px; padding-right: 30px; padding-left: 20px; position:absolute; border-radius: 5px; top: 70px; left: 125px; box-shadow: 1px 1px 5px #CCC; font-size: 12px; border: 1px solid #CCC; background: white; color: black;"><strong>',
			                 geo.properties.name+':' + data.Count,
			                '</strong></div>'].join('');
			        }
			    },
			    //class="hoverinfo"
				//style = "padding:4px; border-radius: 1px; background-color: #FFF; box-shadow: 1px 1px 5px #CCC; font-size: 12px; border: 1px solid #CCC; top: 50px; left: 90px;
				//position:absolute; top:50px; left: 70px; background: black; color: white;
			    // console.log(ThreeCode);
				data :  
				ThreeCode,
				
				done : function(datamap) {
					datamap.svg.selectAll('.datamaps-subunit').on('click',
							function(geography) {
								// console.log(countryCodes[geography.id]);
								$(".OtherMaps").show();	
								$(".MultipleBarChartCover").hide();	

								if (countryCodes[geography.id] != "Greenland" ){
									newbubble(countryCodes[geography.id]);
									$('html,body').animate({
										scrollTop: $('.OtherMaps').offset().top
									},'slow');
								}
								else
								{
									alert("This country has no Army");
								}
							})
					//  .on("mousemove",function(d){
					// 	$("#myTip").attr("style","position:absolute;top:"+(event.pageY+5)+"px;left:"+(event.pageX+10)+"px;display:block;");
					// 	$("#myTip").empty();
					// 	$("#myTip").append("<div>"+d.properties.name+"</div>");
					// 	$("#myTip").show();
					// 	console.log(d);
					// })
					//  .on("mouseover",function(d){
					// 	$("#myTip").attr("style","position:absolute;top:"+(event.pageY+5)+"px;left:"+(event.pageX+10)+"px;display:block;");
					// 	$("#myTip").empty();
					// 	$("#myTip").append("<div>"+d.properties.name+"</div>");
					// 	$("#myTip").show();
					// 	console.log(d);
					// })
					//  .on("mouseout",function(d){
					// 	$("#myTip").hide();
					// 	console.log(d);
					// });
				}		
		 	});

}

// Nuclear weapons world map
function NuclearWeapons() {
		
		$('.datamap').empty();
		$("#map").empty();
		// $('body').append('<div id="map" class="col-sm-12 col-xs-12 col-lg-6 col-md-6" style="height: 800px; width: 60%; margin-left: 20%"></div>');
		$(".maptitle").html("Countries Possessing Nuclear Weapons");
		var basic_choropleth = new Datamap({
				element : document.getElementById("map"),
				projection : 'mercator',
				fills : {
					defaultFill : "#99A3A4",
					authorHasTraveledTo : "#34495E",
				},
				geographyConfig: {
			        highlightBorderColor: '#7d7d7d',
			        highlightBorderWidth: 1,
			        popupTemplate: function (geo, data) {
			            if ( !data )
			            return ['<div style = "padding:5px; padding-right: 30px; padding-left: 20px; position:absolute; border-radius: 5px; top: 70px; left: 90px; background: white; color: black; border: 1px solid #CCC; font-size: 12px;"><strong>',
			        		geo.properties.name,'</strong></div>' ].join(''); 
			            return ['<div style = "padding:5px; padding-right: 30px; padding-left: 20px; position:absolute; border-radius: 5px; top: 70px; left: 125px; box-shadow: 1px 1px 5px #CCC; font-size: 12px; border: 1px solid #CCC; background: white; color: black;"><strong>',
			                 geo.properties.name +':' + data.Count,
			                '</strong></div>'].join('');
			        }
			    },

			    // console.log(ThreeCode);
				data :  
				{
					RUS : {
						fillKey : "authorHasTraveledTo",
						Count : 11000

					},
					USA : {
						fillKey : "authorHasTraveledTo",
						Count : 8500

					},
					FRA : {
						fillKey : "authorHasTraveledTo",
						Count : 300

					},
					CHN : {
						fillKey : "authorHasTraveledTo",
						Count : 240

					},
					GBR : {
						fillKey : "authorHasTraveledTo",
						Count : 225

					},
					ISR : {
						fillKey : "authorHasTraveledTo",
						Count : 80

					},
					PAK : {
						fillKey : "authorHasTraveledTo",
						Count : 110

					},
					IND : {
						fillKey : "authorHasTraveledTo",
						Count : 90

					},
					PRK : {
						fillKey : "authorHasTraveledTo",
						Count : 20

					},

				},
				done : function(datamap) {
					datamap.svg.selectAll('.datamaps-subunit').on('click',
							function(geography) {
								// console.log(countryCodes[geography.id]);
								$(".OtherMaps").show();	
								$(".MultipleBarChartCover").hide();	

								newbubble(countryCodes[geography.id]);
								$('html,body').animate({
									scrollTop: $('.OtherMaps').offset().top

								},'slow');

							});
				}
		 });
}

//bubble chart for onclick event on world map
function newbubble(countryCodes){
	// $('.datamap').empty();
	$(".OtherMaps").show();
	$("#newbubble").empty();
	$('.horbar').empty();
	$('.BrushibarHeading').empty();
	$('.OtherMaps h4.Bubbleheading').text("Weapons Possessed by" +' '+ countryCodes );
	var dataarr = [];
	d3.json("projectData.json",function(error1,dataFromProjectJsonFile){
		dataFromProjectJsonFile.forEach(function(item1){
			// console.log(item1["Country"]);
			// console.log(item["name"]);
			if(item1["Country"]== countryCodes){
				for(var key in item1){
					if(key != 'Man Power' && key != 'Reserve Man power' && key != 'Population' && key != 'Country' && key != 'Ranks'){
						var count = item1[key].toString().replace(",","");
						var datadic = {'text' : key , 'count' : parseInt(count)};
						dataarr.push(datadic);
					}	
				}
			}	
		});
	var bubbleChart = new d3.svg.BubbleChart({
    supportResponsive: true,
    //container: => use @default
    size: 600,
    //viewBoxSize: => use @default
    innerRadius: 500 / 3.5,
    //outerRadius: => use @default
    radiusMin: 55,
    //radiusMax: use @default
    //intersectDelta: use @default
    //intersectInc: use @default
    //circleColor: use @default
    data: {
      items: dataarr,
      eval: function (item) {return item.count;},
      classed: function (item) {return item.text.split(" ").join("");}
    },
    plugins: [
      {
        name: "central-click",
        options: {
          // text: "",
          style: {
            "font-size": "12px",
            "font-style": "italic",
            "font-family": "Source Sans Pro, sans-serif",
            //"font-weight": "700",
            "text-anchor": "middle",
            "fill": "white"
          },
          attr: {dy: "65px"},
          centralClick: function() {
            alert("Here is more details!!");
          }
        }
      },
      {
        name: "lines",
        options: {
          format: [
            {// Line #0
              textField: "count",
              classed: {count: true},
              style: {
                "font-size": "28px",
                "font-family": "Source Sans Pro, sans-serif",
                "text-anchor": "middle",
                fill: "white"
              },
              attr: {
                dy: "0px",
                x: function (d) {return d.cx;},
                y: function (d) {return d.cy;}
              }
            },
            {// Line #1
              textField: "text",
              classed: {text: true},
              style: {
                "font-size": "13px",
                "font-family": "Source Sans Pro, sans-serif",
                "text-anchor": "middle",
                fill: "white"
              },
              attr: {
                dy: "20px",
                x: function (d) {return d.cx;},
                y: function (d) {return d.cy;}
              }
            }
          ],
			          	centralFormat: [
			            {// Line #0
			              style: {"font-size": "50px"},
			              attr: {}
            			},
            			{// Line #1
              				style: {"font-size": "30px"},
              				attr: {dy: "40px"}
            			}
          			]
        		}
      		}]
  		});
	});
}

function MultiBarCoverDisplay(){
	$(".OtherMaps").hide();
	$("#MultipleBarChart").empty();
	$(".MultipleBarChartCover").show();	
}


function MultipleBarCharts(countryArr){

 	$("#horizontalbar").empty();
	$("#newbubble").empty();

 	// $("#MultipleBarChart").empty();
 	var flag=0;

 	d3.json("projectData.json",function(error1,dataFromProjectJsonFile){
		var MultiBararr = [];
		dataFromProjectJsonFile.forEach(function(item1){
			// console.log(item1["Country"]);
			// console.log(item["name"]);
			if(flag==0){
				for(var key in item1){
					if(key!="Country" && key!="Ranks"){
						MultiBararr.push({"chart_title":key,"unit":"Number"});	

					}
					
				}
				flag=1;
			}
			console.log(MultiBararr);
			var k=0;
			while(k<countryArr.length){
				if(countryArr[k]==""){
					countryArr.splice(k,1);
					k-=1;
				}
				k+=1;
			}


			for(var i=0;i<countryArr.length;i++){
				if(item1["Country"] == countryArr[i]){
					for(var key in item1){
						console.log(key);
						if(key != 'Country' && key != 'Ranks'){
							var count = parseInt(String(item1[key]).replace(/\,/g, ''));
							var countryName= countryArr[i];
							for(var j=0;j<MultiBararr.length;j++){

								if(key==MultiBararr[j]["chart_title"]){
									if(key == "Population")
									{
										MultiBararr[j][countryName]= parseInt(count)/1000000;
										MultiBararr[j]["unit"] = "Millions";
									}
									else if(key == "Man Power")
									{
										MultiBararr[j][countryName]= parseInt(count)/100000;
										MultiBararr[j]["unit"] = "Lakhs";
									}
									else if(key == "Reserve Man power")
									{
										MultiBararr[j][countryName]= parseInt(count)/100000;
										MultiBararr[j]["unit"] = "Lakhs";
									}
									else{
										MultiBararr[j][countryName]= parseInt(count);
									}
								}
							}
							// var MultiBarDic = {'chart_title' : key, 'unit' : "Number"};
							// MultiBarDic[countryName] = parseInt(count);
							// MultiBararr.push(MultiBarDic);
						}	
					}
					
				}	
			}
			console.log(MultiBararr);



		});

		var WIDTH = 800;

		var COLOR_1 = "#154360";

		var COLOR_2 = "#21618C";

		var COLOR_3 = "#148F77";

		var COLOR_4 = "#229954";


		// var X_DATA_PARSE = vida.string;

		// var Y_DATA_PARSE = vida.number;

		var Y_DATA_FORMAT = d3.format("");

		var margin = {top: 70, right: 20, bottom: 80, left: 50},
		    width = WIDTH - margin.left - margin.right,
		    height = WIDTH - margin.top - margin.bottom;

		var groups = [];

		var makeBar = function(width, height, bar_data) {
		  var Y_DATA_FORMAT = d3.format("");
		  
		  var Y_AXIS_LABEL = bar_data.unit;
		  
		  if (bar_data.unit === 'percentage') {
		    Y_DATA_FORMAT = d3.format(".1%");
		  }
		  
		  var x = d3.scale.ordinal()
		    .rangeRoundBands([0, width], 0.1);

		  var y = d3.scale.linear()
		      .range([height, 0]);
		  
		  var xAxis = d3.svg.axis()
		    .scale(x)
		    .orient("bottom");
		  
		  var yAxis = d3.svg.axis()
		      .scale(y)
		      .orient("left")
		      .tickFormat(Y_DATA_FORMAT);
		  
		  var value_data = _.map(groups, function(d) {
		    return {x_axis: d, y_axis: bar_data[d]};
		  });
		  
		  x.domain(value_data.map(function(d) { return d.x_axis; }));
		  y.domain([0, d3.max(value_data, function(d) { return d.y_axis; })]);

		  var svg = d3.select("#MultipleBarChart").append("svg")
		      .attr("width", width + margin.left + margin.right)
		      .attr("height", height + margin.top + margin.bottom)
		    .append("g")
		      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		      
		  var detailBox = svg.append("svg:text")
		      .attr("dx", "20px")
		      .attr("dy", "-5px")
		      .attr("text-anchor", "right")
		      .style("fill", "#1D5096")
		      .style("font-weight", "bold");

		  var title = svg.append("text")
		      .attr("x", 0)
		      .attr("y", -50)
		      .attr("class","chart-title")
		      .text(bar_data.chart_title);

		  svg.append("g")
		      .attr("class", "x axis")
		      .style("stroke-width", "1px")
		  	  .style("stroke","#000000")
		  	  .style("fill", "none")
		      .attr("transform", "translate(0," + height + ")")
		      .call(xAxis)
		      .selectAll("text")
		      .style("text-anchor", "end")
		      .attr("dx", "-.8em")
		      .attr("dy", "-.55em")
		      .attr("transform", "rotate(-45)" );

		  svg.append("g")
		      .attr("class", "y axis")
		      .style("stroke-width", "1px")
		  	  .style("stroke","#000000")
		  	  .style("fill", "none")
		      .call(yAxis)
		      .append("text")
		      .attr("transform", "rotate(0)")
		      .attr("y", -25)
		      .attr("x", 0)
		      
		      .style("text-anchor", "left")
		      .text(Y_AXIS_LABEL);

		  svg.selectAll(".bar")
		      .data(value_data)
		    .enter().append("rect")
		      .style("fill", function(d) {
		        if (d.x_axis === groups[0]) {
		          return COLOR_1;
		        } if (d.x_axis === groups[1]) {
		          return COLOR_2;
		        }if (d.x_axis === groups[2]) {
		          return COLOR_3;
		        }else{
		          return COLOR_4;
		        }
		     
		      })
		      .attr("x", function(d) { return x(d.x_axis); })
		      .attr("width", x.rangeBand())
		      .attr("y", function(d) { return y(d.y_axis); })
		      .attr("height", function(d) { return height - y(d.y_axis); })
		      .on("mouseover", function(d, i, j) {
		        detailBox.attr("x", x.range()[i] - Y_DATA_FORMAT(d.y_axis).length / 2)
		          .attr("y", y(d.y_axis))
		          .text(Y_DATA_FORMAT(d.y_axis))
		          .style("visibility", "visible");
		      
		        d3.select(this)
		          .style("opacity", 0.7);
		      }).on("mouseout", function() {
		        detailBox.style("visibility", "hidden");
		        
		        d3.select(this)
		          .style("opacity", 1.0);
		      });
		};

		var width = width / MultiBararr.length - 10;
		width = width > 180 ? width : 180;
		console.log(MultiBararr[0]);
		var keys = Object.keys(MultiBararr[0]);
		for (var i = 0; i < keys.length; i++) {
		  if (keys[i] !== "chart_title" && keys[i] !== "unit") {
		    groups.push(keys[i]);
		  }
		}

		for (i = 0; i < MultiBararr.length; i++) {
		  makeBar(width, width, MultiBararr[i]);
		}
	});
	return;
}
