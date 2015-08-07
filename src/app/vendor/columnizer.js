/* Columnizer for posts */

/* 
   custom functionality to allow posts to fit the page 
   and still work with ReactJS and the page/filter transitions
*/

var columnizerData = {
	cells: null,
	minWidthCell: 375,
	columns: null,
	columnjq: null,
	columnized: false,
	element: null
}


var columnizer = function()
{
	if(!columnizerData.columnized)
	{
		columnizerData.element = $('.posts-list');
		columnizerData.cells = columnizerData.element.find('.post');
		columnizerData.element.addClass('columnized');

		updateColumnCount();

		var columnsString = ''; 
		var width = (100/columnizerData.columns)+'%';
		for (var i = 0; i < columnizerData.columns; i++) {
			columnsString += '<div class="tile-column"></div>';
		};

		columnizerData.columnjq = $(columnsString);
		setcolumnWidth();

		columnizerData.element.append(columnizerData.columnjq);
		columnizerData.element.find('.tile-column').eq(0).append(columnizerData.cells);

		columnizerData.columnized = true;
	}
};


var setcolumnWidth = function(override)
{
	var _columns = (typeof override === 'undefined') ? columnizerData.columns : override;

	var width = (100/_columns)+'%';
	columnizerData.columnjq.css('width', (100/_columns)+'%');
}

var updateColumnCount = function()
{
	columnizerData.columns = Math.floor(columnizerData.element.width()/columnizerData.minWidthCell);
	if(columnizerData.columns <= 0)
	{
		columnizerData.columns = 1;
	}
}

var addcolumnsIfNeeded = function()
{
	if(columnizerData.columnjq.length < columnizerData.columns)
	{
		columnizerData.element.append('<div class="tile-column"></div>');
		columnizerData.columnjq = columnizerData.element.find('.tile-column');
		setcolumnWidth();
	}
}

var removecolumnsIfNeeded = function()
{
	if(columnizerData.columnjq.length > columnizerData.columns)
	{
		columnizerData.columnjq.eq(-1).remove();
		setcolumnWidth();
	}
}


var cleanupColumns = function()
{
	var tileColumns = columnizerData.element.find('.tile-column');
}


var columnizerUpdate = function()
{
	if(columnizerData.columnized)
	{

		var getSmallest = function(list)
		{
			var firstSmallest;
			var smallestHeight;  
			for (var i = 0; i < list.length; i++) {

			  	var height = list[i];
			    if ((!firstSmallest && firstSmallest !== 0) || height<smallestHeight) {
			        firstSmallest = i;
			        smallestHeight = height;
			    }

		  	};  
			
			return firstSmallest;
		};

		columnizerData.columnjq = columnizerData.element.find('.tile-column');
		columnizerData.columnjq.eq(0).removeClass('oneColumn');

		updateColumnCount();
		addcolumnsIfNeeded();
		setcolumnWidth();
		columnizerData.columnjq.show();


		columnizerData.element = $('.posts-list');

		var tileColumns = columnizerData.element.find('.tile-column');


		var heights = [];

		columnizerData.cells.each(function()
		{
			heights.push(this.offsetHeight);
		});


		var columnsHeight = [];

		for (var i = 0; i < columnizerData.columns; i++) {
			columnsHeight.push(0);
		};

		for (var i = 0; i < columnizerData.cells.length; i++) {
			var indexSmallest = getSmallest(columnsHeight);
			columnsHeight[indexSmallest]+=heights[i];
			tileColumns.eq(indexSmallest).append(columnizerData.cells[i]);
		};

		var usedColumns = 0;

		for (var i = 0; i < heights.length; i++) {
			if (heights[i] > 0)
			{
				usedColumns++;
			}
		};

		if(columnizerData.columnjq.length > usedColumns)
		{
			for (var i = usedColumns; i < columnizerData.columnjq.length; i++) {
				columnizerData.columnjq.eq(i).hide();
			};
		}
		else
		{
			usedColumns = columnizerData.columns;
		}

		removecolumnsIfNeeded();

		if(usedColumns === 1)
		{
			columnizerData.columnjq.eq(0).addClass('oneColumn');
		}

		setcolumnWidth(usedColumns);
	}
}


var uncolumnize = function()
{
	if(columnizerData.columnized)
	{
		columnizerData.element = $('.posts-list');
		columnizerData.element.append(columnizerData.cells);
		columnizerData.element.removeClass('columnized');
		columnizerData.element.find('.tile-column').remove();
		columnizerData.columnized = false;		

		columnizerData.cells = null;
		columnizerData.columns = null;
		columnizerData.columnjq = null;
		columnizerData.element = null;
	}

}

$(window).on('resize', function()
{
	if(columnizerData.columnized)
	{
		columnizerUpdate();
	}

});

