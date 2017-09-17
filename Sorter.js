var Sorter = function(elements, displayLeft, displayRight, showResult) {
	var self = this;
	self.result = [];
	self.left = [];
	self.leftIndex = 0;
	self.right = [];
	self.rightIndex = 0;
	self.sorted = [];
	self.unsorted = [];
	self.unsortedIndex = 0;
	
	self.displayLeft = displayLeft;
	self.displayRight = displayRight;
	self.showResult = showResult;
	
	var shuffle = function(arr) {
		var i = 0;
		var j = 0;
		var temp = null;

	  for (i = arr.length - 1; i > 0; i -= 1) {
		j = Math.floor(Math.random() * (i + 1))
		temp = arr[i]
		arr[i] = arr[j]
		arr[j] = temp
	  }
	  
	  return arr;
	};	

	self.done = function() {
		self.sorted.push(self.result);
		if (self.unsortedIndex + 1 < self.unsorted.length) {
			self.setupUnsorted();
			return;
		}
		
		if (self.unsortedIndex + 1 == self.unsorted.length) {
			self.sorted.push(self.unsorted[self.unsortedIndex]);
		}
		
		if (self.sorted.length > 1) {
			self.unsorted = self.sorted;
			self.unsortedIndex = 0;
			self.sorted = [];
			self.setupUnsorted();
			return;
		}
		
		// DONE
		self.showResult(self.sorted[0]);
	};
	
	self.concatResult = function() {
		self.result = self.result.concat(self.left.slice(self.leftIndex, self.left.length))
				.concat(self.right.slice(self.rightIndex, self.right.length));
	};
	
	self.pickedLeft = function() {
		var next = false;
		self.result.push(self.left[self.leftIndex]);
		self.leftIndex++;
		if (self.leftIndex < self.left.length) {
			next = self.left[self.leftIndex];
		}
		
		if (next !== false) {
			displayLeft(next);
		} else {
			self.concatResult();
			self.done();
		}
	};
	
	self.pickedRight = function() {
		var next = false;
		self.result.push(self.right[self.rightIndex]);
		self.rightIndex++;
		if (self.rightIndex < self.right.length) {
			next = self.right[self.rightIndex];
		}
		
		if (next !== false) {
			displayRight(next);
		} else {
			self.concatResult();
			self.done();
		}
	};
	
	self.pickerFunctions = function() {
		return {
			left: self.pickedLeft,
			right: self.pickedRight
		};
	};
	
	self.setupUnsorted = function() {
		self.setup(self.unsorted[self.unsortedIndex++], self.unsorted[self.unsortedIndex++]);
	};

	self.setup = function(a, b) {
		self.result = [];
		self.left = a;
		self.leftIndex = 0;
		self.right = b;
		self.rightIndex = 0;
		self.displayLeft(self.left[self.leftIndex]);
		self.displayRight(self.right[self.rightIndex]);
	};

	self.unsorted = shuffle(elements.map((x) => { return [x]; }));
	self.setupUnsorted();	
};